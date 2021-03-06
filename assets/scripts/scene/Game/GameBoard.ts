
import { _decorator, Component, Node, v2, instantiate, Vec2, v3 } from 'cc';
import { TILE_NODE_PROPS, TILE_NODE_TYPE } from '../../enum/tileNode';
import { TBoard } from '../../interface/board';
import { TTile } from '../../interface/tile';
import { AppleSprite } from '../../sprite/AppleSprite';
import { BananaSprite } from '../../sprite/BananaSprite';
import { CoinSprite } from '../../sprite/CoinSprite';
import { MelonSprite } from '../../sprite/MelonSprite';
import { SpriteManager } from '../../sprite/SpriteManager';
import { TileSprite } from '../../sprite/TileSprite';
import { WallSprite } from '../../sprite/WallSprite';
import { Snake } from './Snake';
const { ccclass, property } = _decorator;

type TFood = {
    index: string
    node: Node
    type: 'NON_BONUS' | 'BONUS'
}

@ccclass('GameBoard')
export class GameBoard extends Component {
    private removeFoodCallback?: () => void

    private board: TTile[][] = []

    private food: TFood[] = []

    @property(TileSprite)
    public readonly tileSprite?: TileSprite

    @property(WallSprite)
    public readonly wallSprite?: WallSprite;

    @property(AppleSprite)
    public readonly appleSprite?: AppleSprite;

    @property(BananaSprite)
    public readonly bananaSprite?: BananaSprite;

    @property(MelonSprite)
    public readonly melonSprite?: MelonSprite;

    @property(CoinSprite)
    public readonly coinSprite?: CoinSprite;

    @property(Node)
    public readonly tileNode?: Node;

    constructor () {
        super('GameBoard')
    }

    public generateBoard (config: TBoard['tiles']) {
        this.board = this.generateBoardFromConfig(config);
        this.generateBoardSprite();
    }

    private generateBoardFromConfig (config: TBoard['tiles']): TTile[][] {
        return config.map((row, rowIdx) => {
            return row.map((tile, colIdx) => {
                return {
                    value: tile,
                    index: v2(colIdx, rowIdx)
                }
            })
        })
    }

    private assignNodeToTile(colIndex: number, rowIndex: number, node: Node) {
        const tile = this.getTile(colIndex, rowIndex);
        if (tile) {
            tile.node = node;
        }
    }

    private getTile(colIndex: number, rowIndex: number) {
        const row = this.board[rowIndex];
        if (row) {
            return row[colIndex];
        }
        return undefined;
    }


    private generateBoardSprite () {
        this.board.forEach((row, rowIdx) => {
            row.forEach((tile, colIdx) => {
                const tileNodeSprite =  this.getTileNodeSprite(tile)
                if (tileNodeSprite) {
                    const { x, y } =  this.getTilePosition(colIdx, rowIdx)
                    const node = instantiate(tileNodeSprite)
                    node.setParent(this.tileNode || this.node);
                    node.setPosition(x, y);
                    node.active = true;

                    node.getComponent(TileSprite)?.adjustTexture((colIdx + rowIdx) % 2 === 0);
                    this.assignNodeToTile(colIdx, rowIdx, node);
                }
            })
        })
    }

    private getTileNodeSprite (tileNode: TTile) {
        const type = tileNode.value;
        switch (type) {
            case TILE_NODE_TYPE.TILE:
                return this.tileSprite?.node;
            case TILE_NODE_TYPE.WALL:
                return this.wallSprite?.node;
            default:
                return this.tileSprite?.node;
        }
    }

    public getTilePosition(colIndex: number, rowIndex: number) {
        return {
            x: colIndex * TILE_NODE_PROPS.SIZE,
            y: -rowIndex * TILE_NODE_PROPS.SIZE
        };
    }

    public getTileNode ({ x, y }: Vec2) {
        const targetTile = this.getTile(x, y)
        const isWallTileNode = targetTile?.value === TILE_NODE_TYPE.WALL
        
        if (!targetTile || isWallTileNode) return undefined

        return targetTile
    }

    private getFoodScore (type: TFood['type']) {
        if (type === 'NON_BONUS') return 1
        return 5
    }

    public eatFoodByIndex (colIndex: number, rowIndex: number): number {
        const targetIndex = this.food.findIndex(({ index }) => index === `${colIndex}-${rowIndex}`)
        const food: TFood | undefined = this.food[targetIndex];

        if (food) {
            food.node.destroy()
            this.food.splice(targetIndex, 1)
            return this.getFoodScore(food.type)
        }

        return 0
    }

    public getPassableTile (snake: Snake) {
        const snakeTileIndexes = snake.getParts().map((part) => `${part.index.x}-${part.index.y}`)
        const foodTileIndexes = this.food.map(({ index }) => index);
        return this.board.reduce((passableTiles, row, rowIndex) => {
            const passableTile = row.filter((tile, colIndex) => (tile.value !== TILE_NODE_TYPE.WALL)
                && snakeTileIndexes.every((position) => position !== `${colIndex}-${rowIndex}`)
                && foodTileIndexes.every((position) => position !== `${colIndex}-${rowIndex}`)
            )

            return [
                ...passableTiles,
                ...passableTile
            ]
        }, [] as TTile[])
    }

    private removeFood (colIndex: number, rowIndex: number, isOnlyBonus: boolean = true) {
        this.eatFoodByIndex(colIndex, rowIndex)
    }

    public spawnRandomFood (snake: Snake, isBonusFood: boolean = false) {
        const passableTile = this.getPassableTile(snake)
        const random1 = Math.floor(Math.random() * passableTile.length)
        const randomTile1 = passableTile[random1]
        this.spawnFoodAt(randomTile1.index.x, randomTile1.index.y, isBonusFood ? 'BONUS' : 'NON_BONUS')

        if (isBonusFood) {
            this.removeFoodCallback = () => {
                this.removeFood(randomTile1.index.x, randomTile1.index.y)
            }
            this.scheduleOnce(this.removeFoodCallback, 5)
        }

        return randomTile1.index
    }

    public spawnFoodAt(colIndex: number, rowIndex: number, foodType: TFood['type'] = 'NON_BONUS') {
        const { appleSprite, coinSprite, bananaSprite, melonSprite, tileNode } = this

        if (!appleSprite
            || !bananaSprite
            || !coinSprite
            || !melonSprite
            || !tileNode) return;

        const selectedTile = this.getTile(colIndex, rowIndex)

        if (!selectedTile?.node) return;

        let node = this.getRandomFood([appleSprite, bananaSprite, melonSprite])
        if (foodType === 'BONUS') {
            node = instantiate(coinSprite.node)
        }
        node.setParent(tileNode || this.node)
        node.setPosition(v3(selectedTile.node.position.x, selectedTile.node.position.y))
        node.active = true

        this.food.push({
            index: `${colIndex}-${rowIndex}`,
            node,
            type: foodType
        })

        return `${colIndex}-${rowIndex}`
    }

    private getRandomFood (foodSprite: SpriteManager[]): Node {
        const random = Math.floor(Math.random() * foodSprite.length)
        const node = instantiate(foodSprite[random].node)
        return node
    }
}

/**
 * [1] Class member could be defined like this.
 * [2] Use `property` decorator if your want the member to be serializable.
 * [3] Your initialization goes here.
 * [4] Your update function goes here.
 *
 * Learn more about scripting: https://docs.cocos.com/creator/3.0/manual/en/scripting/
 * Learn more about CCClass: https://docs.cocos.com/creator/3.0/manual/en/scripting/ccclass.html
 * Learn more about life-cycle callbacks: https://docs.cocos.com/creator/3.0/manual/en/scripting/life-cycle-callbacks.html
 */

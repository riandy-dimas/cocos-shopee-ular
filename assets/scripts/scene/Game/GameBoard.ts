
import { _decorator, Component, Node, v2, instantiate, Vec2, v3 } from 'cc';
import { TILE_NODE_PROPS, TILE_NODE_TYPE } from '../../enum/tileNode';
import { TBoard } from '../../interface/board';
import { TTile } from '../../interface/tile';
import { AppleSprite } from '../../sprite/AppleSprite';
import { TileSprite } from '../../sprite/TileSprite';
import { WallSprite } from '../../sprite/WallSprite';
import { Snake } from './Snake';
const { ccclass, property } = _decorator;

type TFood = {
    index: string
    node: Node
    type: 'APPLE'
}

@ccclass('GameBoard')
export class GameBoard extends Component {
    private dummyBoard: TBoard['tiles'] = [
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0],
        [0, 0, 0, 1, 1, 1, 1, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 1, 1, 1, 0, 0, 0],
        [0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0],
        [0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 1, 1, 0, 0, 0, 0, 1, 1, 1, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    ]

    private board: TTile[][] = []

    private food: TFood[] = []

    @property(TileSprite)
    public readonly tileSprite?: TileSprite

    @property(WallSprite)
    public readonly wallSprite?: WallSprite;

    @property(AppleSprite)
    public readonly appleSprite?: AppleSprite;

    @property(Node)
    public readonly tileNode?: Node;

    constructor () {
        super('GameBoard')
    }

    public generateBoard (config: TBoard['tiles'] = this.dummyBoard) {
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

    public getPassableTile (snake: Snake) {
        const snakeTileIndexes = snake.getParts().map((part) => `${part.index.x}-${part.index.y}`)
        return this.board.reduce((passableTiles, row, rowIndex) => {
            const passableTile = row.filter((tile, colIndex) => (tile.value !== TILE_NODE_TYPE.WALL)
                && snakeTileIndexes.every((position) => position !== `${colIndex}-${rowIndex}`))

            return [
                ...passableTiles,
                ...passableTile
            ]
        }, [] as TTile[])
    }

    public spawnRandomFood (snake: Snake) {
        const passableTile = this.getPassableTile(snake)
        const randomTile = passableTile[Math.floor(Math.random() * passableTile.length)]

        this.spawnFoodAt(randomTile.index.x, randomTile.index.y)
    }

    public spawnFoodAt(colIndex: number, rowIndex: number, foodType: TFood['type'] = 'APPLE') {
        const { appleSprite, tileNode } = this

        if (!appleSprite || !tileNode) return;

        const selectedTile = this.getTile(colIndex, rowIndex)

        if (!selectedTile?.node) return;

        const node = instantiate(appleSprite.node)
        node.setParent(tileNode || this.node)
        node.setPosition(v3(selectedTile.node.position.x, selectedTile.node.position.y))
        node.active = true

        this.food.push({
            index: `${colIndex}-${rowIndex}`,
            node,
            type: foodType
        })
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

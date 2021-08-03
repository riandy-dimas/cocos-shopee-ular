
import { _decorator, Component, Node, v2, instantiate, v3, tween, Vec2, Vec3, macro, math } from 'cc';
import { SNAKE_BODY_PART, SNAKE_EVENT } from '../../enum/snake';
import { TSnakeConfig, TSnakePart } from '../../interface/snake';
import { SnakeSprite } from '../../sprite/SnakeSprite';
const { ccclass, property } = _decorator;

type TDirection = {
    directionX: number
    directionY: number
}

@ccclass('Snake')
export class Snake extends Component {
    @property(SnakeSprite)
    public readonly snakeSprite?: SnakeSprite;
    
    private parts: TSnakePart[] = [];
    
    private swallowingParts: TSnakePart[] = [];
    
    private updateInterval = 0.25;
    
    private movementDirection = v2(0, 0);
    
    public createSnake (config: TSnakeConfig) {
        const head = this.getHead();
        const neck = this.getNeck();
        
        if (!head || !neck) return;
        
        const { x, y } = this.getDirectionBetweenParts(neck, head);
        // Set snake direction by checking head and neck position
        this.movementDirection.set(x, y);
        this.adjustTextures();
    }
    
    public getHead () {
        return this.parts[0];
    }
    
    public getNeck () {
        return this.parts[1];
    }
    
    public getTail () {
        return this.parts[this.parts.length - 1];
    }
    
    public adjustTextures() {
        this.parts.reduce<TSnakePart | null>((previousPart, part) => {
            this.adjustPartTexture(previousPart, part);
            return part;
        }, null);
    }
    
    public adjustPartTexture(previousPart: TSnakePart | null, part: TSnakePart) {
        const { sprite } = part;
        
        if (previousPart) {
            const { x, y } = this.getDirectionBetweenParts(part, previousPart);
            
            const isTail = part === this.getTail();
            if (isTail) {
                sprite.adjustTexture(SNAKE_BODY_PART.TAIL);
            } else {
                sprite.adjustTexture(SNAKE_BODY_PART.BODY);
            }
            
            this.setPartDirection(part, x, y);
        } else {
            const { x, y } = this.movementDirection;
            sprite.adjustTexture(SNAKE_BODY_PART.HEAD);
            this.setPartDirection(part, x, y);
        }
    }
    
    private setPartDirection(part: TSnakePart, directionX: number, directionY: number) {
        const { direction } = part;
        const isTurning = this.isPartChangingDirection(part, directionX, directionY);
        
        if (direction) {
            direction.set(directionX, directionY);
        } else {
            part.direction = v2(directionX, directionY);
        }
        
        if (isTurning) {
            this.rotatePartToMatchDirection(part);
        }
    }
    ////
    private isPartChangingDirection(part: TSnakePart, directionX: number, directionY: number) {
        const { direction } = part;
        
        if (!direction) return true;
        
        if (direction.x === directionX && direction.y === directionY) return false;
        
        return true;
    }
    
    private rotatePartToMatchDirection(part: TSnakePart) {
        const { direction, sprite } = part;
        
        if (!direction) return;
        
        const nextRotation = this.getPartRotationByDirection(direction.x, direction.y);
        const { rotation: currentRotation } = part || {};
        if (!nextRotation || !currentRotation) return;
        
        const { x, y, z } = nextRotation;
        
        const { z: currentZ } = currentRotation;
        
        /**
        * To prevent sharp turns
        */
        let diffZ = z - currentZ;
        if (diffZ < -180) {
            diffZ = (diffZ + 360) % 360;
        } else if (diffZ > 180) {
            diffZ = (diffZ - 360) % 360;
        }
        
        part.rotation?.set(x, y, z);
        tween(this.node).to(this.updateInterval, {},
            {
                onUpdate(_, ratio) {
                    if (ratio === undefined) return;
                    sprite.node.setRotationFromEuler(x, y, currentZ + diffZ * ratio);
                },
                onComplete() {
                    sprite.node.setRotationFromEuler(x, y, z);
                }
            }
        ).start();
    }
        
        
    /////

    public getParts() {
        return this.parts;
    }

    public addPart(x: number, y: number, posX: number, posY: number) {
        const { snakeSprite } = this;
        
        if (!snakeSprite) return undefined;
        
        const sprite = instantiate(snakeSprite.node);
        sprite.setParent(this.node);
        sprite.setPosition(posX, posY);
        sprite.active = true;
        
        const part: TSnakePart = {
            sprite: sprite.getComponent(SnakeSprite) as SnakeSprite,
            index: v2(x, y),
            position: v3(posX, posY, 0),
            rotation: v3(0, 0, 0),
        };
        
        this.parts.push(part);
        return part;
    }
    
    private getPartRotationByDirection(directionX: number, directionY: number) {
        if (directionY === -1) {
            return v3(0, 0, 0);
        } else if (directionX === 1) {
            return v3(0, 0, -90);
        } else if (directionY === 1) {
            return v3(0, 0, -180);
        } else if (directionX === -1) {
            return v3(0, 0, -270);
        }
    }
    
    
    private getDirectionBetweenParts(partA: TSnakePart, partB: TSnakePart) {
        return v2(
            partB.index.x - partA.index.x,
            partB.index.y - partA.index.y,
        );
    }

    // Move the snake
    private isNextDirectionPossible (targetDirection: TDirection) {
        /**
         * Check whether the target direction (user input) is perpendicular
         * or parallel with the current snake direction
         * + the head is not facing the neck.
         */

        const { index: { x: headX, y: headY } } = this.getHead()
        const { index: { x: neckX, y: neckY } } = this.getNeck()
        const { directionX, directionY } = targetDirection

        /**
         * Check whether the head direction will face the neck by
         * summing up current head position with the target direction,
         * if the sum position is the same as the neck position, return false
         */
        const isHeadDirectionPossible = !(
            headX + directionX === neckX &&
            headY + directionY === neckY
        )

        /**
         * Check whether the direction is perpendicular,
         * return true
         */
        const isDirectionPerpendicular = !(
            directionX === this.movementDirection.x &&
            directionY === this.movementDirection.y
        )

        return isHeadDirectionPossible && isDirectionPerpendicular
    }

    public changeMovingDirection (targetDirection: TDirection) {
        if (this.isNextDirectionPossible(targetDirection)) {
            const { directionX, directionY } = targetDirection;
            this.movementDirection.set(directionX, directionY)
            return true
        }
        return false
    }

    public startMove () {
        this.refreshMovementScheduler()
    }

    private moveHeadTo (index: Vec2, position: Vec3) {
        this.refreshPartPosition(this.getHead(), index, position);
    }

    private movePartAfterHead () {
        this.parts.reduce<{ index: math.Vec2, position: math.Vec3 } | undefined>((previousPart, part) => {
            const { x, y } = part.index;
            const { x: posX, y: posY } = part.position;

            if (previousPart) {
                // Update non-head position
                this.refreshPartPosition(part, previousPart.index, previousPart.position);
            }
            return {
                index: v2(x, y),
                position: v3(posX, posY)
            }
        }, undefined)
    }

    public doMoveTo (index: Vec2, position: Vec3) {

        /**
         * The part after head position will be refreshed
         * on the next scheduler, each part will adjust its
         * position by following the previous part
         */
        this.movePartAfterHead()

        /**
         * Move the head, and the other part will follows
         * in the next update schedule
         */
        this.moveHeadTo(index, position)

        /** Adjust the snake textures after changing the position */
        this.adjustTextures()
    }

    private refreshPartPosition(part: TSnakePart, index: Vec2, position: Vec3) {
        const { x, y } = index;
        const { x: posX, y: posY } = position;
        
        /** Update snake part index position on board */
        part.index.set(x, y);
        /** Update snake part location on the board (relative to board size) */
        part.position.set(position);
        /** Move snake sprite using tween animation to the designated location */
        tween(part.sprite.node).to(
            this.updateInterval,
            {
                position: v3(posX, posY)
            },
            {
                easing: 'fade'
            }
        ).start();
    }

    private refreshMovementScheduler () {
        this.unschedule(this.moving)
        this.schedule(this.moving, this.updateInterval, macro.REPEAT_FOREVER)
    }

    public moving () {
        this.node.emit(SNAKE_EVENT.MOVE, this.movementDirection)
    }

    public doDie () {
        this.unschedule(this.moving)
    }

    public isTouchSelf () {
        const head = this.getHead()
        return this.parts.some((part) => part !== head && head.index.x === part.index.x && head.index.y === part.index.y)
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
        
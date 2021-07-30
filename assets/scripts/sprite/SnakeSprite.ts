
import { _decorator, Component, Node } from 'cc';
import { ASSET_KEY } from '../enum/asset';
import { SNAKE_BODY_PART } from '../enum/snake';
import { SpriteManager } from './SpriteManager';
const { ccclass, property } = _decorator;

@ccclass('SnakeSprite')
export class SnakeSprite extends SpriteManager {
    constructor() {
        super('SnakeSprite', ASSET_KEY.SNAKE_ROUND_OBJECT, 0);
    }
    
    public adjustTexture(part: SNAKE_BODY_PART) {
        switch(part) {
            case SNAKE_BODY_PART.HEAD: {
                this.setFrame(0);
                break;
            }    
            
            case SNAKE_BODY_PART.BODY: {
                this.setFrame(3);
                break;
            }
            
            case SNAKE_BODY_PART.BODY_EAT: {
                this.setFrame(1);
                break;
            }
            
            case SNAKE_BODY_PART.TAIL: {
                this.setFrame(2);
                break;
            }
            
            default: {
                break;
            }
        }
        this.reload();
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

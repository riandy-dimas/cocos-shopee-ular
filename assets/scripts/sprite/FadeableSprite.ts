
import { _decorator, Component, Node, Color, tween } from 'cc';
import { ASSET_KEY } from '../enum/asset';
import { TRANSITION_EVENT } from '../enum/transition';
import { SpriteManager } from './SpriteManager';
const { ccclass, property } = _decorator;

@ccclass('FadeableSprite')
export class FadeableSprite extends SpriteManager {
    constructor () {
        super('FadeableSprite', ASSET_KEY.WHITE_PANEL);
    }

    fadeIn(duration = 1, color: Color = Color.BLACK, targetOpacity = 255, onComplete?: () => void, onStart?: () => void) {
        this.reload();
        this.setColor(color);
        this.setOpacity(0);
        tween(this.uiOpacity).to(
            duration, 
            { opacity: targetOpacity },
            {
                onStart: () => {
                    onStart?.()
                },
                onComplete: () => {
                    onComplete?.()
                }
            }
        ).start();
    }

    fadeOut(duration = 1, color: Color = Color.BLACK, targetOpacity = 0, onComplete?: () => void, onStart?: () => void) {
        this.reload();
        this.setColor(color);
        this.setOpacity(255);
        tween(this.uiOpacity).to(
            duration,
            { opacity: targetOpacity },
            {
                onStart: () => {
                    onStart?.()
                },
                onComplete: () => {
                    onComplete?.()
                }
            }
        ).start();
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

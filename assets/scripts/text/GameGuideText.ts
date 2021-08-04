
import { _decorator, Component, Node, assetManager, RichText, TTFFont, v3 } from 'cc';
import { ASSET_KEY } from '../enum/asset';
const { ccclass, property } = _decorator;

@ccclass('GameGuideText')
export class GameGuideText extends Component {
    @property(RichText)
    public readonly guideText?: RichText;

    onLoad () {
        if (this.guideText) {
            this.guideText.font = this.getFont();
            this.guideText.fontSize = 48
            this.guideText.lineHeight = 48
            this.guideText.string = '<color=#FFFFFF>Press/Tap Keypad to Start</color>'
            this.node.setScale(v3(0.5, 0.5, 1))
        }        
    }

    private getFont() {
        const result = assetManager.assets.get(ASSET_KEY.SHOPEE_FONT);
        return result as TTFFont;
    }

    public showNode (val: boolean = true) {
        this.node.active = val
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


import { _decorator, Component, Node, RichText, assetManager, TTFFont, v3 } from 'cc';
import { ASSET_KEY } from '../../enum/asset';
const { ccclass, property } = _decorator;

@ccclass('InvalidLevelText')
export class InvalidLevelText extends Component {
    @property(RichText)
    public readonly labelText?: RichText;

    onLoad () {
        if (this.labelText) {
            this.labelText.font = this.getFont();
            this.labelText.fontSize = 64
            this.labelText.lineHeight = 64
            this.labelText.string = '<color=#000000>Invalid Level<br/>Configuration</color>'
            this.node.setScale(v3(0.5, 0.5, 1))
        }

    }

    private getFont() {
        const result = assetManager.assets.get(ASSET_KEY.SHOPEE_FONT);
        return result as TTFFont;
    }

    public show (val: boolean = true) {
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

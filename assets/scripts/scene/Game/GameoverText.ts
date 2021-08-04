
import { _decorator, Component, Node, RichText, assetManager, TTFFont, v3 } from 'cc';
import { ASSET_KEY } from '../../enum/asset';
const { ccclass, property } = _decorator;

@ccclass('GameoverText')
export class GameoverText extends Component {
    @property(RichText)
    public readonly scoreLabel?: RichText;

    @property(RichText)
    public readonly scoreValue?: RichText;

    onLoad () {
        if (this.scoreLabel) {
            this.scoreLabel.font = this.getFont();
            this.scoreLabel.fontSize = 40
            this.scoreLabel.lineHeight = 40
            this.scoreLabel.string = '<color=#000000>Your Score</color>'
            this.node.setScale(v3(0.5, 0.5, 1))
        }

        if (this.scoreValue) {
            this.scoreValue.font = this.getFont();
            this.scoreValue.fontSize = 96
            this.scoreValue.lineHeight = 96
            this.node.setScale(v3(0.5, 0.5, 1))
        }        
    }

    public updateScore (score: number) {
        if (this.scoreValue) {
            this.scoreValue.string = `<color=#000000>${Math.round(score).toString()}</color>`;
        }
    }

    private getFont() {
        const result = assetManager.assets.get(ASSET_KEY.SHOPEE_FONT);
        return result as TTFFont;
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

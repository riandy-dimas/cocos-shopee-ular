
import { _decorator, Component, RichText, assetManager, TTFFont, v3 } from 'cc';
import { ASSET_KEY } from '../enum/asset';
const { ccclass, property } = _decorator;

@ccclass('ScoreText')
export class ScoreText extends Component {
    private score: number = 0;

    @property(RichText)
    public readonly scoreText?: RichText;

    onLoad () {
        this.updateScore(this.score);

        if (this.scoreText) {
            this.scoreText.font = this.getFont();
            this.scoreText.fontSize = 48
            this.scoreText.lineHeight = 48
            this.node.setScale(v3(0.5, 0.5, 1))
        }        
    }

    public updateScore (score: number) {
        if (this.scoreText) {
            this.scoreText.string = Math.round(score).toString();
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

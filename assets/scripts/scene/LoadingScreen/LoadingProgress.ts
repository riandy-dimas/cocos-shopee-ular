
import { _decorator, Component, Node, RichText, ProgressBar } from 'cc';
import { ASSET_LOADER_STYLE }  from '../../enum/assetLoader'
const { ccclass, property } = _decorator;

@ccclass('LoadingProgress')
export class LoadingProgress extends Component {
  @property(RichText)
  public textPercentLoaded?: RichText;

  @property(ProgressBar)
  public progressBarLoaded?: ProgressBar;
  
  public updatePercentText (progress: number, key?: string) {
    const { textPercentLoaded } = this;
    const progressPercent = Math.floor(progress * 100);

    if (textPercentLoaded) {
      textPercentLoaded.string = `<color=${ASSET_LOADER_STYLE.TEXT_PERCENT_COLOR}>${progressPercent}%</color>`;

      if (progressPercent === 100) {
        textPercentLoaded.string = `<color=${ASSET_LOADER_STYLE.TEXT_PERCENT_COLOR}>Tap to start!</color>`
      }
    }

    if (this.progressBarLoaded) {
      this.progressBarLoaded.progress = progress;
    }
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

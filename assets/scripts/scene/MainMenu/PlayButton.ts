
import { _decorator, Button, Node, Color, Label, Sprite, assetManager, TTFFont } from 'cc';
import { ASSET_KEY } from '../../enum/asset';
const { ccclass, property } = _decorator;

@ccclass('PlayButton')
export class PlayButton extends Button {
  onLoad () {
    this.setupButton()
  }
  
  private setupButton () {
    
    const buttonLabel = this.getComponentInChildren(Label);
    const buttonSprite = this.getComponent(Sprite);
    
    if (buttonSprite) {
      buttonSprite.color = new Color().fromHEX('#DF5838')
    }
    
    if (buttonLabel) {
      buttonLabel.font = this.getFont();
      buttonLabel.fontSize = 36;
      buttonLabel.string = 'Play';
      buttonLabel.color = new Color().fromHEX('#FFFFFF');
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

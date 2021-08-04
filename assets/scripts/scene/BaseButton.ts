
import { _decorator, Button, Node, Color, Label, Sprite, assetManager, TTFFont, v3 } from 'cc';
import { ASSET_KEY } from '../enum/asset';
const { ccclass, property } = _decorator;

@ccclass('BaseButton')
export class BaseButton extends Button {
  private buttonLabel?: Label | null
  private buttonSprite?: Sprite | null

  onLoad () {
    this.buttonLabel = this.getComponentInChildren(Label);
    this.buttonSprite = this.getComponent(Sprite);

    this.setupButton()
  }

  public configureButton (buttonHexColor: string, text: string, buttonTextHexColor: string, size: number) {
    const { buttonLabel, buttonSprite } = this
    
    if (buttonSprite) {
      buttonSprite.color = new Color().fromHEX(buttonHexColor)
    }
    
    if (buttonLabel) {
      buttonLabel.string = text;
      buttonLabel.fontSize = size;
      buttonLabel.color = new Color().fromHEX(buttonTextHexColor);
    }
  }
  
  private setupButton () {
    const { buttonLabel, buttonSprite } = this
    
    if (buttonSprite) {
      buttonSprite.color = new Color().fromHEX('#DF5838')
    }
    
    if (buttonLabel) {
      buttonLabel.font = this.getFont();
      buttonLabel.fontSize = 72;
      buttonLabel.string = 'Play';
      buttonLabel.color = new Color().fromHEX('#FFFFFF');
      buttonLabel.node.setScale(v3(0.5, 0.5, 1))
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

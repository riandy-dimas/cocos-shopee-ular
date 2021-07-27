
import { _decorator, Component, Node, Sprite } from 'cc';
import { SoundToggleControl } from '../../control/SoundToggleControl';
import { ASSET_KEY } from '../../enum/asset';
import { MAIN_MENU_CONTROL_EVENT } from '../../enum/mainMenuControl';
import { SpriteManager } from '../../sprite/SpriteManager';

const { ccclass, property } = _decorator;

@ccclass('SoundToggleButton')
export class SoundToggleButton extends SpriteManager {
  private isSoundOn: boolean = true;

  @property(SoundToggleControl)
  public readonly soundToggleControl?: SoundToggleControl;

  constructor () {
    super('SoundLogoOn', ASSET_KEY.SOUND_ON);
  }
  
  onLoad () {
    super.onLoad();
    this.soundToggleControl?.registerTouchEvent();
  }

  start () {
    this.setupToggleButton();
  }

  public setToOff () {
    super.setupSprite(ASSET_KEY.SOUND_OFF)
  }

  public setToOn () {
    super.setupSprite(ASSET_KEY.SOUND_ON)
  }

  private setupToggleButton () {
    this.soundToggleControl?.node.on(MAIN_MENU_CONTROL_EVENT.TOUCH_END, () => {
      console.log('___SOUND_TAP_', this.isSoundOn)
      if (this.isSoundOn) {
        this.isSoundOn = false;
        this.setToOff()
      } else {
        this.isSoundOn = true;
        this.setToOn()
      }
    })
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

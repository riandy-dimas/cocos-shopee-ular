
import { _decorator, Component, Node, Sprite } from 'cc';
import { BackgroundMusic } from '../../audio/BackgroundMusic';
import { SoundToggleControl } from '../../control/SoundToggleControl';
import { ASSET_KEY } from '../../enum/asset';
import { MAIN_MENU_CONTROL_EVENT } from '../../enum/mainMenuControl';
import { GlobalData } from '../../globalData';
import { SpriteManager } from '../../sprite/SpriteManager';

const { ccclass, property } = _decorator;

@ccclass('SoundToggleButton')
export class SoundToggleButton extends SpriteManager {
  @property(BackgroundMusic)
  public readonly backgroundMusic?: BackgroundMusic;

  @property(GlobalData)
  public readonly globalData?: GlobalData;
  
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
    this.backgroundMusic?.play();
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
      if (this.globalData) {
        const { getData, saveData } = this.globalData;
        const isSoundOn = getData('isSoundOn');
        console.log('___SOUND_TAP_', isSoundOn)
        if (isSoundOn) {
          saveData({ isSoundOn: false })
          this.backgroundMusic?.stop();
          this.setToOff()
        } else {
          saveData({ isSoundOn: true })
          this.backgroundMusic?.play();
          this.setToOn()
        } 
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

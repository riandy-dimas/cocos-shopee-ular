
import { _decorator, game } from 'cc';
import { SoundToggleControl } from '../../control/SoundToggleControl';
import { ASSET_KEY } from '../../enum/asset';
import { MAIN_MENU_CONTROL_EVENT } from '../../enum/mainMenu';
import { SOUND_TOGGLE_EVENT } from '../../enum/soundToggle';
import { GlobalData } from '../../globalData';
import { SpriteManager } from '../../sprite/SpriteManager';

const { ccclass, property } = _decorator;

@ccclass('SoundToggleButton')
export class SoundToggleButton extends SpriteManager {
  @property(GlobalData)
  public readonly globalData?: GlobalData;
  
  @property(SoundToggleControl)
  public readonly soundToggleControl?: SoundToggleControl;
  
  constructor () {
    super('SoundLogoOn', ASSET_KEY.SOUND_ON);
  }
  
  onLoad () {
    super.onLoad();
  }
  
  start () {
    if (this.globalData) {
      const { saveData } = this.globalData
      const isSoundOn = this.globalData.getData('isSoundOn')
      this.handleToggleButtonUI(!isSoundOn, saveData);
    }
    this.setupToggleButton();
  }
  
  public setToOff () {
    super.setupSprite(ASSET_KEY.SOUND_OFF)
  }
  
  public setToOn () {
    super.setupSprite(ASSET_KEY.SOUND_ON)
  }

  private handleToggleButtonUI (isSoundOn: boolean, saveData: GlobalData['saveData']) {
    if (isSoundOn) {
      saveData({ isSoundOn: false })
      this.setToOff()
    } else {
      saveData({ isSoundOn: true })
      this.setToOn()
    } 
  }
  
  private setupToggleButton () {
    this.soundToggleControl?.registerTouchEvent();
    this.soundToggleControl?.node.on(MAIN_MENU_CONTROL_EVENT.TOUCH_END, () => {
      if (this.globalData) {
        const { getData, saveData } = this.globalData;
        const isSoundOn = getData('isSoundOn');
        this.handleToggleButtonUI(isSoundOn, saveData);

        game.emit(SOUND_TOGGLE_EVENT.SOUND_TOGGLE);
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

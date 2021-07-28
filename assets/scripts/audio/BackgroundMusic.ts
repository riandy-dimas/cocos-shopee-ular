
import { _decorator } from 'cc';
import { ASSET_KEY } from '../enum/asset';
import { AudioManager } from './AudioManager';
const { ccclass, property } = _decorator;

@ccclass('BackgroundMusic')
export class BackgroundMusic extends AudioManager {
  constructor () {
    super('BackgroundMusic', ASSET_KEY.BACKGROUND_MUSIC, true)
  }

  setVolume (volume: number) {
    super.setupAudio(volume)
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

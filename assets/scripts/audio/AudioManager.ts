
import {
  _decorator,
  Component,
  AudioSource,
  AudioClip,
  assetManager,
  Node,
} from 'cc';
import { ASSET_KEY } from '../enum/asset';
const { ccclass, property } = _decorator;

@ccclass('AudioManager')
export class AudioManager extends Component {
  private audioSource?: AudioSource | null;

  constructor (
    name: string,
    protected readonly audioKey: ASSET_KEY,
    protected loop = false,
    protected volume = 1,
  ) {
    super(name)
  }
  
  private reload () {
    this.audioSource = this.getComponent(AudioSource);
    this.setupAudio();
  }

  private getAudioClip() {
    const result = assetManager.assets.get(this.audioKey);
    return result as AudioClip;
  }
  
  /**
   * If volume args passed, play the audio;
   * @param vol Volume to be set 0.0 to 1.0
   */
  protected setupAudio(vol?: number) {
    const { audioSource, loop, volume } = this;
    const audioClip = this.getAudioClip();

    if (!audioSource || !audioClip) return;

    audioSource.clip = audioClip;
    audioSource.loop = loop;
    audioSource.volume = vol || volume;

    if (typeof vol !== 'undefined') {
      audioSource.play();
    }
  }

  play() {
    this.reload();
    this.audioSource?.play();
  }

  stop() {
    this.audioSource?.stop();
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

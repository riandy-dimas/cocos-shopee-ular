
import {
  _decorator,
  Component,
  AudioSource,
  AudioClip,
  assetManager,
  game,
  Node,
} from 'cc';
import { ASSET_KEY } from '../enum/asset';
import { SOUND_TOGGLE_EVENT } from '../enum/soundToggle';
import { GlobalData } from '../globalData';
const { ccclass, property } = _decorator;

@ccclass('AudioManager')
export class AudioManager extends Component {
  private audioSource?: AudioSource | null;

  @property(GlobalData)
  public readonly globalData?: GlobalData;

  constructor (
    name: string,
    protected readonly audioKey: ASSET_KEY,
    protected loop = false,
    protected volume = 1,
    protected shouldPlayAwake = true,
  ) {
    super(name)
  }

  onLoad () {
    game.on(SOUND_TOGGLE_EVENT.SOUND_TOGGLE, this.handleToggleSound, this)
  }

  private isSoundOn () {
    const { globalData } = this

    if (globalData) {
      return globalData.getData('isSoundOn');
    }

    return false;
  }

  private handleToggleSound () {
    this.setVolume(this.volume);
  }

  private setVolume (vol: number) {
    const { audioSource } = this

    if (!audioSource) return

    if (this.isSoundOn()) {
      audioSource.volume = vol;
    } else {
      audioSource.volume = 0;
    }
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
  protected setupAudio() {
    const { audioSource, loop, volume, shouldPlayAwake } = this;
    const audioClip = this.getAudioClip();

    if (!audioSource || !audioClip) return;

    audioSource.clip = audioClip;
    audioSource.loop = loop;
    audioSource.playOnAwake = shouldPlayAwake;

    this.setVolume(volume)
  }

  play(vol?: number) {
    if (typeof vol !== 'undefined') {
      this.volume = vol;
    }

    this.reload();
    this.audioSource?.play();
  }

  stop() {
    this.audioSource?.stop();
  }

  pause() {
    this.audioSource?.pause();
  }

  isPlaying() {
    return this.audioSource?.playing || false
  }

  getDuration () {
    return this.audioSource?.duration;
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


import {
  _decorator,
  Component,
  RichText,
  Node,
  assetManager,
  TTFFont,
  find,
  director,
  instantiate,
  Director,
  game,
} from 'cc';
import { BackgroundMusic } from '../../audio/BackgroundMusic';
import { ButtonSfx } from '../../audio/ButtonSfx';
import { PlayButtonControl } from '../../control/PlayButtonControl';
import { ASSET_KEY } from '../../enum/asset';
import { PERSIST_NODE_NAME } from '../../enum/persistNode';
import { SCENE_KEY } from '../../enum/scene';
import { GlobalData } from '../../globalData';
import { MainMenuLogo } from '../../sprite/MainMenuLogo';
import { PlayButton } from './PlayButton';
const { ccclass, property } = _decorator;

@ccclass('MainMenu')
export class MainMenu extends Component {
  private fontTtf: TTFFont | null = null;
  
  @property(ButtonSfx)
  public readonly buttonSfx?: ButtonSfx;
  
  @property(RichText)
  public readonly highscoreTitle?: RichText;
  
  @property(RichText)
  public readonly highscoreValue?: RichText;
  
  @property(MainMenuLogo)
  public readonly gameLogo?: MainMenuLogo;
  
  @property(PlayButton)
  public readonly playButton?: PlayButton;
  
  @property(PlayButtonControl)
  public readonly playButtonControl?: PlayButtonControl;
  
  @property(BackgroundMusic)
  public readonly bgMusic?: BackgroundMusic;

  @property(GlobalData)
  public readonly globalData?: GlobalData;
  
  onLoad () {
    this.fontTtf = this.getFont();
    this.setupText();
    this.setHighscoreText('Highscore');
    this.setHighscoreValue(0);
  }
  
  start () {
    this.setupBgMusic();
    this.setupPlayButton();
  }
  
  private setupText () {
    const { highscoreValue, highscoreTitle, fontTtf } = this;
    if (highscoreTitle) {
      highscoreTitle.font = fontTtf;
      highscoreTitle.fontSize = 36;
    }
    if (highscoreValue) {
      highscoreValue.font = fontTtf;
      highscoreValue.fontSize = 48;
    }
  }
  
  private setupBgMusic () {
    const { bgMusic } = this
    
    if (!bgMusic) return
    
    if (find(PERSIST_NODE_NAME.BACKGROUND_MUSIC)) return
  
    const node = instantiate(bgMusic.node);
    node.name = PERSIST_NODE_NAME.BACKGROUND_MUSIC;

    const bgMusicNode = node.getComponent(BackgroundMusic)
    bgMusicNode?.play();
    director.on(Director.EVENT_AFTER_SCENE_LAUNCH, () => {
      node.getComponent(BackgroundMusic)?.play();
    });
    game.addPersistRootNode(node);
    
  }
  
  private setHighscoreText (text: string) {
    const { highscoreTitle } = this;
    
    if (highscoreTitle) {
      highscoreTitle.string = `<color=#FFFFFF>${text}</color>`;
    }
  }
  
  public setHighscoreValue (value: number) {
    const { highscoreValue } = this;
    
    if (highscoreValue) {
      highscoreValue.string = `<color=#FFFFFF>${value}</color>`;
    }
  }
  
  private getFont() {
    const result = assetManager.assets.get(ASSET_KEY.SHOPEE_FONT);
    return result as TTFFont;
  }
  
  private setupPlayButton () {
    this.playButtonControl?.registerTouchEvent();
    this.playButtonControl?.node.on(Node.EventType.TOUCH_END, () => {
      this.buttonSfx?.play();
      this.redirectToGameScene();
    }, this)
  }
  
  
  private redirectToGameScene () {
    const duration = this.buttonSfx?.getDuration() || 0;
    const isSoundOn = this.globalData?.getData('isSoundOn') || false
    setTimeout(() => {
      director.loadScene(SCENE_KEY.GAME);
    }, isSoundOn ? duration * 1000 - 500 : 0)
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

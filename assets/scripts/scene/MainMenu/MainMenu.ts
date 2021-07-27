
import {
  _decorator,
  Component,
  RichText,
  Node,
  assetManager,
  TTFFont,
} from 'cc';
import { BackgroundMusic } from '../../audio/BackgroundMusic';
import { ASSET_KEY } from '../../enum/asset';
import { MainMenuLogo } from '../../sprite/MainMenuLogo';
const { ccclass, property } = _decorator;

@ccclass('MainMenu')
export class MainMenu extends Component {
  private fontTtf: TTFFont | null = null;

  @property(BackgroundMusic)
  public readonly backgroundMusic?: BackgroundMusic;

  @property(RichText)
  public readonly highscoreTitle?: RichText;

  @property(RichText)
  public readonly highscoreValue?: RichText;

  @property(MainMenuLogo)
  public readonly gameLogo?: MainMenuLogo;

  onLoad () {
    this.fontTtf = this.getFont();
    this.setupFont();
    this.setHighscoreText('Highscore');
    this.setHighscoreValue(0);
  }

  start () {
    this.backgroundMusic?.play();
  }

  private setupFont () {
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


import { _decorator, Component, Node, director } from 'cc';
import { BackgroundMusic } from '../../audio/BackgroundMusic';
import { SCENE_KEY } from '../../enum/scene';
import { GlobalData } from '../../globalData';
import { GameBoard } from './GameBoard';
const { ccclass, property } = _decorator;

@ccclass('Game')
export class Game extends Component {
  private bgMusic?: BackgroundMusic | null

  @property(GlobalData)
  public readonly globalData?: GlobalData;

  @property(GameBoard)
  public readonly gameBoard?: GameBoard;
  
  onLoad () {
    this.bgMusic = this.node.scene?.getComponentInChildren(BackgroundMusic);
  }

  start () {
    this.gameBoard?.generateBoard()
    if (this.globalData) {
      const isSoundOn = this.globalData.getData('isSoundOn');
    }
  }

  redirectToMainMenu () {
    director.loadScene(SCENE_KEY.MAIN_MENU)
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

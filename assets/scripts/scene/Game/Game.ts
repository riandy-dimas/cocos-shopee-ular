
import { _decorator, Component, Node, director } from 'cc';
import { BackgroundMusic } from '../../audio/BackgroundMusic';
import { SCENE_KEY } from '../../enum/scene';
import { GlobalData } from '../../globalData';
import { TSnakeConfig } from '../../interface/snake';
import { GameBoard } from './GameBoard';
import { Snake } from './Snake';
const { ccclass, property } = _decorator;

@ccclass('Game')
export class Game extends Component {
  private bgMusic?: BackgroundMusic | null
  
  @property(GlobalData)
  public readonly globalData?: GlobalData;
  
  @property(GameBoard)
  public readonly gameBoard?: GameBoard;
  
  @property(Snake)
  public readonly snake?: Snake;
  
  private dummySnake: TSnakeConfig = {
    parts: [
      { x: 1, y: 3 },
      { x: 1, y: 4 },
      { x: 1, y: 5 },
      { x: 1, y: 6 },
    ],
    velocity: {
      initial: 0.3,
      accelerateMultiplier: 0.9,
      accelerateEvery: 2,
      minimum: 0.12,
    }
  }
  
  onLoad () {
    this.bgMusic = this.node.scene?.getComponentInChildren(BackgroundMusic);
  }
  
  start () {
    this.gameBoard?.generateBoard()
    this.generateSnakeOnBoard(this.dummySnake)
  }
  
  redirectToMainMenu () {
    director.loadScene(SCENE_KEY.MAIN_MENU)
  }
  
  private generateSnakeOnBoard (config: TSnakeConfig) {
    const { gameBoard, snake } = this
    
    if (!gameBoard || !snake) return
    
    const { parts } = config
    parts.forEach((part) => {
      const { x, y } = part
      const { x: posX, y: posY } = gameBoard.getTilePosition(x, y)
      snake.addPart(x, y, posX, posY)
    })
    snake.createSnake(config)
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

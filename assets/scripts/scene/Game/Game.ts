
import { _decorator, Component, Node, director, systemEvent, SystemEvent } from 'cc';
import { BackgroundMusic } from '../../audio/BackgroundMusic';
import { KeypadControl } from '../../control/KeypadControl';
import { KEYPAD_EVENT } from '../../enum/keypad';
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
  
  @property(KeypadControl)
  public readonly keypadControl?: KeypadControl;
  
  private dummySnake: TSnakeConfig = {
    parts: [
      { x: 1, y: 1 },
      { x: 2, y: 1 },
      { x: 3, y: 1 },
      { x: 4, y: 1 },
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
    this.setupKeypad()
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
  
  private setupKeypad () {
    const { keypadControl: keypad } = this
    
    if (!keypad) return
    
    keypad.node.on(KEYPAD_EVENT.PRESS_UP, () => {
      this.handleSnakeDirection(0, -1); 
    });
    
    keypad.node.on(KEYPAD_EVENT.PRESS_RIGHT, () => {
      this.handleSnakeDirection(1, 0);
    });
    
    keypad.node.on(KEYPAD_EVENT.PRESS_DOWN, () => {
      this.handleSnakeDirection(0, 1);
    });
    
    keypad.node.on(KEYPAD_EVENT.PRESS_LEFT, () => {
      this.handleSnakeDirection(-1, 0);
    });

  }
  
  private handleSnakeDirection (x: number, y: number) {
    if (!this.snake) return
    const isDirectionChanged = this.snake.changeMovingDirection({ directionX: x, directionY: y })

    if (isDirectionChanged) {
      this.snake.adjustTextures()
    }
    console.log('___HANDLE_SNAKE_DIRECTION', { isDirectionChanged })
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

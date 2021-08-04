
import { _decorator, Component, Node, director, Vec2, v2, Color } from 'cc';
import { BackgroundMusic } from '../../audio/BackgroundMusic';
import { CrashSfx } from '../../audio/CrashSfx';
import { TurnSfx } from '../../audio/TurnSfx';
import { KeypadControl } from '../../control/KeypadControl';
import { GAME_EVENT } from '../../enum/game';
import { KEYPAD_EVENT } from '../../enum/keypad';
import { SCENE_KEY } from '../../enum/scene';
import { SNAKE_EVENT } from '../../enum/snake';
import { GlobalData } from '../../globalData';
import { TSnakeConfig } from '../../interface/snake';
import { GameBoard } from './GameBoard';
import { Snake } from './Snake';
import { getData, storeData } from '../../util/localStorage';
import { LOCAL_STORAGE_KEY } from '../../enum/localStorage';
import { ScoreText } from '../../text/ScoreText';
import { HighscoreText } from '../../text/HighscoreText';
import { TLevelConfig } from '../../interface/level';
import { getLevelConfig } from '../../config/level';
import { EatSfx } from '../../audio/EatSfx';
import { Dialogue } from './Dialogue';
import { FadeableSprite } from '../../sprite/FadeableSprite';
import { TRANSITION_VALUE } from '../../enum/transition';
const { ccclass, property } = _decorator;

@ccclass('Game')
export class Game extends Component {
  private currentScore: number = 0;
  
  private levelConfig?: TLevelConfig

  @property(GlobalData)
  public readonly globalData?: GlobalData;
  
  @property(GameBoard)
  public readonly gameBoard?: GameBoard;
  
  @property(Snake)
  public readonly snake?: Snake;
  
  @property(KeypadControl)
  public readonly keypadControl?: KeypadControl;

  @property(TurnSfx)
  public readonly turnSfx?: TurnSfx;

  @property(CrashSfx)
  public readonly crashSfx?: CrashSfx;

  @property(EatSfx)
  public readonly eatSfx?: EatSfx;

  @property(ScoreText)
  public readonly scoreText?: ScoreText;

  @property(HighscoreText)
  public readonly highscoreText?: HighscoreText;

  @property(Dialogue)
  public readonly gameOverDialogue?: Dialogue;

  @property(FadeableSprite)
  public readonly backdrop?: FadeableSprite;

  @property(FadeableSprite)
  public readonly transitionScreen?: FadeableSprite;

  onLoad () {
    this.levelConfig = getLevelConfig(0)
  }
  
  start () {
    this.transitionScreen?.fadeOut(TRANSITION_VALUE.DURATION)

    this.gameBoard?.generateBoard(this.levelConfig!.maze)
    this.generateSnakeOnBoard(this.levelConfig!.snake)
    this.setupKeypad()
    this.setupSnakeMovementListener()
    this.setupHighscore();

    if (this.snake) {
      this.gameBoard?.spawnRandomFood(this.snake)
    }
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
      this.snake.node.once(SNAKE_EVENT.MOVE, () => {
        this.turnSfx?.play()
      })
    }

    this.node.emit(GAME_EVENT.GAME_SNAKE_DIRECTION_CHANGE, { x, y })
  }

  private setupSnakeMovementListener() {
    const { snake, gameBoard } = this;

    if (!snake || !gameBoard) return;

    this.node.once(GAME_EVENT.GAME_SNAKE_DIRECTION_CHANGE, () => {
      snake.startMove()
      snake.moving()
    })

    snake.node.on(SNAKE_EVENT.MOVE, this.handleSnakeMovement, this);
  }


  private handleSnakeMovement ({ x: targetDirectionX, y: targetDirectionY }: Vec2) {
    const { snake, gameBoard } = this;

    if (!snake || !gameBoard) return;

    const { x: headPositionX, y: headPositionY } = snake.getHead().index
    const nextHeadPosition: Vec2 = v2(
      headPositionX + targetDirectionX,
      headPositionY + targetDirectionY
    )
    const nextTile = gameBoard.getTileNode(nextHeadPosition)

    const isAnyFootEaten = gameBoard.eatFoodByIndex(nextHeadPosition.x, nextHeadPosition.y)

    snake.handleSwallowingFood()

    if (nextTile && nextTile.node) {
      snake.doMoveTo(nextTile.index, nextTile.node.position)
    } else {
      this.handleGameOver()
    }

    if (snake.isTouchSelf()) {
      this.handleGameOver()
    }

    if (isAnyFootEaten) {
      this.handleFoodEaten(gameBoard, snake)
    }

  }

  private handleFoodEaten (gameBoard: GameBoard, snake: Snake) {
    snake.eatFood()

    this.eatSfx?.play()
    this.handleUpdateScore(1)
    gameBoard.spawnRandomFood(snake)
  }

  private setupHighscore () {
    const currentHighscore = getData(LOCAL_STORAGE_KEY.HIGHSCORE) as number || 0
    this.highscoreText?.updateScore(currentHighscore)
  }

  private handleUpdateScore (point: number = 0) {
    const { currentScore, highscoreText, scoreText } = this

    if (!highscoreText || !scoreText) return

    const currentHighscore = getData(LOCAL_STORAGE_KEY.HIGHSCORE) || 0
    let score = currentScore + point;

    this.currentScore = score;
    scoreText.updateScore(score)

    if (score > currentHighscore) {
      highscoreText.updateScore(score)
      storeData({ key: LOCAL_STORAGE_KEY.HIGHSCORE, data: score})
    }
  }

  private handleGameOver () {
    console.log('___GAME_OVER___')
    this.crashSfx?.play()
    this.snake?.doDie()
    this.backdrop?.fadeIn(0.3, Color.BLACK, 125)
    this.gameOverDialogue?.show()
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

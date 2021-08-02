
import { _decorator, Component, Node, Animation, systemEvent, SystemEvent } from 'cc';
import { KEYPAD_EVENT } from '../enum/keypad';
import { KeypadDownSprite } from '../sprite/KeypadDownSprite';
import { KeypadLeftSprite } from '../sprite/KeypadLeftSprite';
import { KeypadRightSprite } from '../sprite/KeypadRightSprite';
import { KeypadUpSprite } from '../sprite/KeypadUpSprite';
const { ccclass, property } = _decorator;

@ccclass('KeypadControl')
export class KeypadControl extends Component {
    @property(KeypadDownSprite)
    public readonly keypadDown?: KeypadDownSprite;
    
    @property(KeypadLeftSprite)
    public readonly keypadLeft?: KeypadLeftSprite;
    
    @property(KeypadRightSprite)
    public readonly keypadRight?: KeypadRightSprite;
    
    @property(KeypadUpSprite)
    public readonly keypadUp?: KeypadUpSprite;
    
    start () {
        this.registerTouchEvent();
        this.setupKeyboard();
    }
    
    private playAnimation (keypadNode?: KeypadDownSprite | KeypadLeftSprite | KeypadRightSprite | KeypadUpSprite) {
        const animation = keypadNode?.getComponent(Animation)
        if (animation) {
            animation: animation.play();
        }
    }

    private handlePressKey (direction: KEYPAD_EVENT) {
        switch (direction) {
            case KEYPAD_EVENT.PRESS_DOWN:
                this.playAnimation(this.keypadDown)
                break;
            case KEYPAD_EVENT.PRESS_LEFT:
                this.playAnimation(this.keypadLeft)
                break;
            case KEYPAD_EVENT.PRESS_RIGHT:
                this.playAnimation(this.keypadRight)
                break;
            case KEYPAD_EVENT.PRESS_UP:
                this.playAnimation(this.keypadUp)
                break;
        
            default:
                break;
        }

        this.node.emit(direction)
    }
    
    private registerTouchEvent () {
        this.keypadDown?.node.on(Node.EventType.TOUCH_START, () => {
            this.handlePressKey(KEYPAD_EVENT.PRESS_DOWN)
        })
        this.keypadUp?.node.on(Node.EventType.TOUCH_START, () => {
            this.handlePressKey(KEYPAD_EVENT.PRESS_UP)
        })
        this.keypadRight?.node.on(Node.EventType.TOUCH_START, () => {
            this.handlePressKey(KEYPAD_EVENT.PRESS_RIGHT)
        })
        this.keypadLeft?.node.on(Node.EventType.TOUCH_START, () => {
            this.handlePressKey(KEYPAD_EVENT.PRESS_LEFT)
        })
    }
    
    private setupKeyboard () {
        this.node.once(Node.EventType.NODE_DESTROYED, () => {
            systemEvent.off(SystemEvent.EventType.KEY_DOWN);
        });
        
        systemEvent.on(SystemEvent.EventType.KEY_DOWN, (event) => {
            switch(event.keyCode) {
                case 37: {
                    //left
                    this.handlePressKey(KEYPAD_EVENT.PRESS_LEFT);
                    break;
                }
                
                case 38: {
                    //up
                    this.handlePressKey(KEYPAD_EVENT.PRESS_UP);
                    break;
                }
                
                case 39: {
                    //right
                    this.handlePressKey(KEYPAD_EVENT.PRESS_RIGHT);
                    break;
                }
                
                case 40: {
                    //down
                    this.handlePressKey(KEYPAD_EVENT.PRESS_DOWN);
                    break;
                }
                
                default: {
                    break;
                }
            }
        });
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

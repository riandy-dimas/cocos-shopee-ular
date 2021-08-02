
import { _decorator, Component, Node } from 'cc';
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
    }

    private registerTouchEvent () {
        this.keypadDown?.node.on(Node.EventType.TOUCH_START, () => {
            this.node.emit(KEYPAD_EVENT.PRESS_DOWN)
        })
        this.keypadUp?.node.on(Node.EventType.TOUCH_START, () => {
            this.node.emit(KEYPAD_EVENT.PRESS_UP)
        })
        this.keypadRight?.node.on(Node.EventType.TOUCH_START, () => {
            this.node.emit(KEYPAD_EVENT.PRESS_RIGHT)
        })
        this.keypadLeft?.node.on(Node.EventType.TOUCH_START, () => {
            this.node.emit(KEYPAD_EVENT.PRESS_LEFT)
        })
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

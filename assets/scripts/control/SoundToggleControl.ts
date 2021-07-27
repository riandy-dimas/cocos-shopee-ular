
import { _decorator, Component, Node } from 'cc';
import { MAIN_MENU_CONTROL_EVENT } from '../enum/mainMenuControl';
const { ccclass, property } = _decorator;

@ccclass('SoundToggleControl')
export class SoundToggleControl extends Component {
  public registerTouchEvent() {
    this.node.on(Node.EventType.TOUCH_END, () => {
      this.node.emit(MAIN_MENU_CONTROL_EVENT.TOUCH_END);
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

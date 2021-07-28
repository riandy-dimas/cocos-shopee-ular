
import { _decorator, Component, Node } from 'cc';
import { BackgroundMusic } from '../../audio/BackgroundMusic';
const { ccclass, property } = _decorator;

@ccclass('Game')
export class Game extends Component {
  private bgMusic?: BackgroundMusic | null
  
  onLoad () {
    this.bgMusic = this.node.scene?.getComponentInChildren(BackgroundMusic);
  }

  start () {
    // setTimeout(() => {
    //   this.bgMusic?.stop()
    // }, 2000)
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

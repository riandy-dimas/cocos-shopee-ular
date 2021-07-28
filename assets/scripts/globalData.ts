
import { _decorator, Component, Node } from 'cc';
import { TGlobalData } from './interface/globalData'
const { ccclass, property } = _decorator;

declare global {
  interface Window { ___GLOBAL_VARIABLE___: TGlobalData; }
}

@ccclass('GlobalData')
export class GlobalData extends Component {
  onLoad () {
    window.___GLOBAL_VARIABLE___ = window.___GLOBAL_VARIABLE___ || {};
  }

  saveData (data: Partial<TGlobalData>) {
    window.___GLOBAL_VARIABLE___ = {
      ...window.___GLOBAL_VARIABLE___,
      ...data,
    };
  }

  getData (dataKey: keyof TGlobalData) {
    return window.___GLOBAL_VARIABLE___[dataKey];
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

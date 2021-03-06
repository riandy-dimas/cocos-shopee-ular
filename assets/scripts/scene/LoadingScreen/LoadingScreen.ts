
import { _decorator, Component, Node, director, assetManager, Color } from 'cc';
import { ASSET_LOADER_EVENT } from '../../enum/assetLoader';
import { SCENE_KEY } from '../../enum/scene';
import { AssetLoader } from '../../assetLoader';
import { LoadingProgress } from './LoadingProgress';
import { LoadingScreenControl } from '../../control/LoadingScreenControl';
import { LOADING_SCREEN_CONTROL_EVENT } from '../../enum/loadingScreenControl';
import { GlobalData } from '../../globalData';
import { BackgroundMusic } from '../../audio/BackgroundMusic';
import { FadeableSprite } from '../../sprite/FadeableSprite';
import { TRANSITION_VALUE } from '../../enum/transition';

const { ccclass, property } = _decorator;

@ccclass('LoadingScreen')
export class LoadingScreen extends Component {
  @property(AssetLoader)
  public readonly assetLoader?: AssetLoader;
  
  @property(LoadingProgress)
  public readonly loadingProgress?: LoadingProgress;
  
  @property(LoadingScreenControl)
  public readonly loadingScreenControl?: LoadingScreenControl;

  @property(GlobalData)
  public readonly globalData?: GlobalData;

  @property(BackgroundMusic)
  public readonly bgMusic?: BackgroundMusic;

  @property(FadeableSprite)
  public readonly transitionScreen?: FadeableSprite;

  onLoad () {
    this.globalData?.saveData({
      isSoundOn: true,
    })
  }
  
  start () {
    this.startLoadAssets();
  }
  
  private startLoadAssets () {
    const { assetLoader, loadingProgress } = this;
    
    if (!assetLoader || !loadingProgress) return;
    
    assetLoader.node.on(ASSET_LOADER_EVENT.START, (progress: number) => {
      loadingProgress.updatePercentText(progress);
    })
    
    assetLoader.node.on(ASSET_LOADER_EVENT.ASSET_LOAD_SUCCESS, (progress: number, key:string) => {
      loadingProgress.updatePercentText(progress, key);
    });
    
    assetLoader.node.on(ASSET_LOADER_EVENT.ASSET_LOAD_FAILURE, () => {
      console.log('ERROR_FETCHING_DATA!');
    })
    
    assetLoader.node.on(ASSET_LOADER_EVENT.COMPLETE, () => {
      this.onComplete();
    })
    
    assetLoader.startAssetsLoad();
  }
  
  private onComplete () {
    this.bgMusic?.play(0)

    this.loadingScreenControl?.registerTouchEvent();
    this.loadingScreenControl?.node.once(LOADING_SCREEN_CONTROL_EVENT.TOUCH_END, () => {
      this.redirectToMainMenuScene()
    })
  }
  
  private redirectToMainMenuScene () {
    this.transitionScreen?.fadeIn(
      TRANSITION_VALUE.DURATION,
      undefined,
      undefined,
      () => {
        director.loadScene(SCENE_KEY.MAIN_MENU);
      }
    )
  }

  onDestroy () {
    this.bgMusic?.stop();
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


import { _decorator, Component, Node, AnimationClip, assetManager } from 'cc';
import { ASSET_KEY } from '../enum/asset';
import { generateAnimationClip } from '../util/animation';
import { SpriteManager } from './SpriteManager';
const { ccclass, property } = _decorator;

type TCoinTextureFrame = 0 | 1 | 2 | 3 | 4 | 5

@ccclass('CoinSprite')
export class CoinSprite extends SpriteManager {
    private readonly coinAnimationKey = 'COIN_ANIMATION'

    constructor() {
        super('CoinSprite', ASSET_KEY.COIN_OBJECT, 0);
    }
    
    onLoad () {
        super.onLoad()
        this.setupAnimation()
    }

    start () {
        console.log('__PLAY_ANIMATION')
        this.animation?.play(this.coinAnimationKey)
    }
    
    private setupAnimation() {
        const { coinAnimationKey } = this;
        
        const coinAnimationClip = this.getCoinAnimationClip();
        
        if (coinAnimationClip) {
            this.animation?.createState(coinAnimationClip, coinAnimationKey);
        }
    }

    private getCoinAnimationClip() {
        const { coinAnimationKey } = this;

        const animationAsset = assetManager.assets.get(coinAnimationKey);

        if (animationAsset) return animationAsset as AnimationClip;
    
        const animationClip = this.generateCoinAnimationClip();

        if (animationClip) {
            assetManager.assets.add(coinAnimationKey, animationClip);
        }

        return animationClip;
    }

    public generateCoinAnimationClip() {
        const { textureKey } = this;

        const animationClip = generateAnimationClip(
            assetManager, 
            textureKey, 
            [0, 1, 2, 3, 4, 5], 
            32,
            AnimationClip.WrapMode.Loop
        );
        
        return animationClip;
    }

    public playCoinAnimationClip() {
        this.animation?.play(this.coinAnimationKey);
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

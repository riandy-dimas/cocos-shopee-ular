
import {
  _decorator,
  Component,
  Sprite,
  assetManager,
  SpriteFrame,
  Animation,
  UITransform,
  UIOpacity,
  Color
} from 'cc';
import { getSpriteFrameKey } from '../util/spritesheet'
const { ccclass, property } = _decorator;

@ccclass('SpriteManager')
export class SpriteManager extends Component {
  protected sprite?: Sprite | null;
  
  protected uiTransform?: UITransform | null;
  
  protected uiOpacity?: UIOpacity | null;
  
  protected animation?: Animation | null;
  
  protected presetDimension = { width: 0, height: 0 };
  
  constructor(
    name: string,
    protected readonly textureKey: string,
    protected readonly frameKey?: number | string,
    ) {
      super(name);
    }
    
    onLoad() {
      this.sprite = this.getComponent(Sprite);
      this.uiTransform = this.getComponent(UITransform);
      this.uiOpacity = this.getComponent(UIOpacity);
      this.animation = this.getComponent(Animation);
      this.presetDimension = this.getPresetDimension();
      
      this.reload();
    }
    
    protected reload() {
      this.setupSprite();
      this.adjustSize();
    }
    
    protected getSpriteFrame(textureKey?: string, frameKey?: number | string) {
      return assetManager.assets.get(getSpriteFrameKey(textureKey || this.textureKey, frameKey || this.frameKey)) as SpriteFrame;
    }
    
    protected setupSprite(textureKey?: string, frameKey?: number | string) {
      if (this.sprite) {
        this.sprite.spriteFrame = this.getSpriteFrame(textureKey, frameKey);
      }
    }
    
    protected getPresetDimension() {
      const { presetDimension, uiTransform } = this;
      
      if (!uiTransform) return presetDimension;
      
      const { width, height } = uiTransform;
      return { width, height };
    }
    
    protected adjustSize() {
      const { uiTransform, presetDimension } = this;
      const { width, height } = presetDimension;
      
      uiTransform?.setContentSize(width, height);
    }
    
    public setOpacity(opacity: number) {
      if (this.uiOpacity) {
        this.uiOpacity.opacity = opacity;
      }
    }
    
    public setColor(color: Color) {
      if (this.sprite) {
        this.sprite.color = color;
      }
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
  
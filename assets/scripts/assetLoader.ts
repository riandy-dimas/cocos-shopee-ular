
import {
  _decorator,
  Component,
  Node,
  assetManager,
  resources,
  Asset,
  ImageAsset,
  SpriteFrame,
  math,
  Texture2D
} from 'cc';
import { getAssets } from './config/asset';
import { ASSET_EXTENSION, ASSET_TYPE } from './enum/asset';
import { ASSET_LOADER_EVENT } from './enum/assetLoader';
import { AssetConfig, AssetTypeConfig } from './interface/asset';
import { getAssetKey } from './util/asset';
import { getSpriteFrameKey } from './util/spritesheet';
const { ccclass, property } = _decorator;


@ccclass('AssetLoader')
export class AssetLoader extends Component {
  private ALLOW_LOCAL_ASSET: boolean = true;
  
  private assetsToLoad: AssetConfig[] = [];
  private loadCount: number = 0;
  
  constructor () {
    super('AssetLoader');
    this.assetsToLoad = getAssets()
  }
  
  public startAssetsLoad () {
    const { ALLOW_LOCAL_ASSET } = this
    
    this.node.emit(ASSET_LOADER_EVENT.START, this.getProgress())
    
    this.assetsToLoad.forEach((asset) => {
      const {
        key,
        type,
        url,
        config,
        ext,
        localUrl,
      } = asset;
      
      if (ALLOW_LOCAL_ASSET && localUrl) {
        this.loadLocalAsset(key, type, localUrl, config);
      } else {
        this.loadRemoteAsset(key, type, url, ext, config);
      }
    })
  }
  
  /**
   * Get the progress of loading asset data
   * @returns Loaded asset data of total assets to load
   */
  private getProgress() {
    return this.loadCount / this.assetsToLoad.length;
  }
  
  /**
   * Get asset data from local
   */
  private loadLocalAsset(
    key: string,
    type: ASSET_TYPE,
    url: string,
    config?: AssetTypeConfig,
  ) {
    resources.load(url, (e, data) => {
      this.handleLoadedAsset(key, type, url, e, data, config);
      
      // TODO: Error handling, will this become infinite loop?
      if (e) {
        this.loadLocalAsset(key, type, url, config);
      }
    });
  }

  /**
   * Get asset data remotely
   */
  private loadRemoteAsset(key: string, type: ASSET_TYPE, url: string, ext?: ASSET_EXTENSION, config?: AssetTypeConfig) {
    assetManager.loadRemote(url, { ext }, (e, data) => {
        this.handleLoadedAsset(key, type, url, e, data, config);

        if (e) {
            this.loadRemoteAsset(key, type, url, ext, config);
        }
    });
  }

    
  private handleLoadedAsset(
    key: string,
    type: ASSET_TYPE, 
    url: string, 
    e: Error | null, 
    data: Asset,
    config?: AssetTypeConfig
  ) {
    if (!e) {
      this.loadCount += 1;
      this.handleLoadedAssetByType(key, data._uuid, type, config);
      this.node.emit(ASSET_LOADER_EVENT.ASSET_LOAD_SUCCESS, this.getProgress(), key, url);
    } else {
      this.node.emit(ASSET_LOADER_EVENT.ASSET_LOAD_FAILURE, this.getProgress(), key, url);
    }
    
    // All data has been loaded
    if (this.loadCount === this.assetsToLoad.length) {
      this.node.emit(ASSET_LOADER_EVENT.COMPLETE, this.getProgress());
    }
  }
      
  private handleLoadedAssetByType(
    key: string,
    uuid: string,
    type: ASSET_TYPE, 
    config?: AssetTypeConfig
  ) {
    switch(type) {
      case ASSET_TYPE.SPRITESHEET: {
        this.remapAssetManagerEntry(getAssetKey(key), uuid);
        this.handleLoadedSpritesheet(getAssetKey(key), key, config);
        break;
      }
      
      case ASSET_TYPE.IMAGE: {
        this.remapAssetManagerEntry(getAssetKey(key), uuid);
        this.handleLoadedImage(getAssetKey(key), key);
        break;
      }
      
      case ASSET_TYPE.AUDIO: {
        this.remapAssetManagerEntry(key, uuid);
        break;
      }
      
      default: {
        this.remapAssetManagerEntry(key, uuid);
        break;
      }
    }
  }
  
  /**
   * Re-map assets data that has been saved (by default) using UUID as the key,
   * with custom `key` so we can access it easily.
   * 
   * @param key Key for the asset
   * @param uuid Default UUID of the asset
   */
  private remapAssetManagerEntry(key: string, uuid: string) {
    const entry = assetManager.assets.get(uuid);

    if (!entry) return;

    assetManager.assets.add(key, entry);
    assetManager.assets.remove(uuid);
  }
  
  private handleLoadedSpritesheet(assetKey: string, key: string, config?: AssetTypeConfig) {
    const imageAsset = assetManager.assets.get(assetKey) as ImageAsset;
    const { width, height } = imageAsset || {};
    const { frameWidth, frameHeight, paddingX, paddingY } = { paddingX: 0, paddingY: 0, ...config };

    if (!width || !height || !frameWidth || !frameHeight) return;
    
    const texture = new Texture2D();
    texture.image = imageAsset;

    let frameIndex = 0;
    for (let row = 0; row < height; row += (frameHeight + paddingY)) {
        for (let col = 0; col < width; col += (frameWidth + paddingX)) {
            const spriteFrame = new SpriteFrame();
            spriteFrame.texture = texture;
            spriteFrame.rect = math.rect(col, row, frameWidth, frameHeight);
            assetManager.assets.add(getSpriteFrameKey(key, frameIndex++), spriteFrame);
        }
    }
  }

  private handleLoadedImage(assetKey: string, key: string) {
      const imageAsset = assetManager.assets.get(assetKey) as ImageAsset;

      if (!imageAsset) return;

      const spriteFrame = SpriteFrame.createWithImage(imageAsset);
      assetManager.assets.add(key, spriteFrame);
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
      
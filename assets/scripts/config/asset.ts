import { ASSET_EXTENSION, ASSET_KEY, ASSET_TYPE } from "../enum/asset";
import { AssetConfig } from "../interface/asset";

function getShopeeAssetUrl(url: string) {
  return `https://cf.shopee.co.id/file/${url}`;
}

/**
* Get all the assets of the game, the assets are listed down here
* @returns List of assets used in the game
*/
export function getAssets() {
  const assets = new Array<AssetConfig>();
  
  assets.push({
    key: ASSET_KEY.DUMMY,
    type: ASSET_TYPE.IMAGE,
    url: getShopeeAssetUrl('6119dca1932fa645d831b3ab57614677'),
    ext: ASSET_EXTENSION.PNG,
  });
  
  // Font
  assets.push({
    key: ASSET_KEY.SHOPEE_FONT,
    type: ASSET_TYPE.FONT,
    url: '',
    localUrl: 'font/Shopee2021-Bold'
  })
  
  // General UI
  assets.push({
    key: ASSET_KEY.GAME_LOGO,
    type: ASSET_TYPE.IMAGE,
    url: '',
    localUrl: 'image/general/logo_shopee_ular',
  })
  assets.push({
    key: ASSET_KEY.SOUND_OFF,
    type: ASSET_TYPE.IMAGE,
    url: '',
    localUrl: 'image/general/sprite_sound_off'
  })
  assets.push({
    key: ASSET_KEY.SOUND_ON,
    type: ASSET_TYPE.IMAGE,
    url: '',
    localUrl: 'image/general/sprite_sound_on'
  })
  assets.push({
    key: ASSET_KEY.WHITE_PANEL,
    type: ASSET_TYPE.IMAGE,
    url: '',
    localUrl: 'image/general/white_sprite',
  })
  
  // Game UI
  assets.push({
    key: ASSET_KEY.KEYPAD,
    type: ASSET_TYPE.SPRITESHEET,
    url: '',
    localUrl: 'image/game/keypad',
    config: {
      frameWidth: 124,
      frameHeight: 124,
      paddingX: 20,
      paddingY: 16
    }
  });
  
  assets.push({
    key: ASSET_KEY.TILE_PANEL,
    type: ASSET_TYPE.SPRITESHEET,
    url: '',
    localUrl: 'image/game/sprite_tile',
    config: {
      frameWidth: 48,
      frameHeight: 48
    }
  })
  assets.push({
    key: ASSET_KEY.WALL_OBJECT,
    type: ASSET_TYPE.IMAGE,
    url: '',
    localUrl: 'image/game/sprite_wall',
  })
  assets.push({
    key: ASSET_KEY.APPLE_OBJECT,
    type: ASSET_TYPE.IMAGE,
    url: '',
    localUrl: 'image/game/sprite_apple'
  })
  assets.push({
    key: ASSET_KEY.MELON_OBJECT,
    type: ASSET_TYPE.IMAGE,
    url: '',
    localUrl: 'image/game/melon_sprite'
  })
  assets.push({
    key: ASSET_KEY.BANANA_OBJECT,
    type: ASSET_TYPE.IMAGE,
    url: '',
    localUrl: 'image/game/banana_sprite'
  })
  assets.push({
    key: ASSET_KEY.BASKET_OBJECT,
    type: ASSET_TYPE.IMAGE,
    url: '',
    localUrl: 'image/game/basket_sprite'
  })
  assets.push({
    key: ASSET_KEY.TROPHY_OBJECT,
    type: ASSET_TYPE.IMAGE,
    url: '',
    localUrl: 'image/game/sprite_trophy'
  })
  assets.push({
    key: ASSET_KEY.COIN_OBJECT,
    type: ASSET_TYPE.SPRITESHEET,
    url: '',
    localUrl: 'image/game/spritesheet_coin',
    config: {
      frameWidth: 171,
      frameHeight: 171,
      paddingX: 25,
    }
  })
  
  // Snake Player
  assets.push({
    key: ASSET_KEY.SNAKE_OBJECT,
    type: ASSET_TYPE.SPRITESHEET,
    url: '',
    localUrl: 'image/game/spritesheet_snake',
    config: {
      frameWidth: 96,
      frameHeight: 96,
    }
  })
  assets.push({
    key: ASSET_KEY.SNAKE_ROUND_OBJECT,
    type: ASSET_TYPE.SPRITESHEET,
    url: '',
    localUrl: 'image/game/spritesheet_round',
    config: {
      frameWidth: 96,
      frameHeight: 96,
      paddingX: 1,
    }
  })
  
  // General Audio
  assets.push({
    key: ASSET_KEY.BACKGROUND_MUSIC,
    type: ASSET_TYPE.AUDIO,
    url: '',
    localUrl: 'audio/bg-music'
  })
  assets.push({
    key: ASSET_KEY.BUTTON_SFX,
    type: ASSET_TYPE.AUDIO,
    url: '',
    localUrl: 'audio/button-sfx'
  })
  
  // In Game Audio
  assets.push({
    key: ASSET_KEY.CRASH_SFX,
    type: ASSET_TYPE.AUDIO,
    url: '',
    localUrl: 'audio/sfx/crash'
  })
  assets.push({
    key: ASSET_KEY.EAT_SFX,
    type: ASSET_TYPE.AUDIO,
    url: '',
    localUrl: 'audio/sfx/eat'
  })
  assets.push({
    key: ASSET_KEY.TURN_SFX,
    type: ASSET_TYPE.AUDIO,
    url: '',
    localUrl: 'audio/sfx/turn'
  })
  
  return assets;
}

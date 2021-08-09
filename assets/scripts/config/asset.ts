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
    url: 'https://res.cloudinary.com/riandydb/raw/upload/v1628319883/cocos-snake/font/Shopee2021-Bold_fyndzn.ttf',
    // localUrl: 'font/Shopee2021-Bold'
  })
  
  // General UI
  assets.push({
    key: ASSET_KEY.GAME_LOGO,
    type: ASSET_TYPE.IMAGE,
    url: 'https://res.cloudinary.com/riandydb/image/upload/v1628319837/cocos-snake/image/logo_shopee_ular_bl2dnz.png',
    // localUrl: 'image/general/logo_shopee_ular',
  })
  assets.push({
    key: ASSET_KEY.SOUND_OFF,
    type: ASSET_TYPE.IMAGE,
    url: 'https://res.cloudinary.com/riandydb/image/upload/v1628319837/cocos-snake/image/sprite_sound_off_djojfl.png',
    // localUrl: 'image/general/sprite_sound_off'
  })
  assets.push({
    key: ASSET_KEY.SOUND_ON,
    type: ASSET_TYPE.IMAGE,
    url: 'https://res.cloudinary.com/riandydb/image/upload/v1628319837/cocos-snake/image/sprite_sound_on_e9wota.png',
    // localUrl: 'image/general/sprite_sound_on'
  })
  assets.push({
    key: ASSET_KEY.WHITE_PANEL,
    type: ASSET_TYPE.IMAGE,
    url: 'https://res.cloudinary.com/riandydb/image/upload/v1628319837/cocos-snake/image/white_sprite_sdefwv.png',
    // localUrl: 'image/general/white_sprite',
  })
  
  // Game UI
  assets.push({
    key: ASSET_KEY.KEYPAD,
    type: ASSET_TYPE.SPRITESHEET,
    url: 'https://res.cloudinary.com/riandydb/image/upload/v1628319813/cocos-snake/image/keypad_c1laze.png',
    // localUrl: 'image/game/keypad',
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
    url: 'https://res.cloudinary.com/riandydb/image/upload/v1628319814/cocos-snake/image/sprite_tile_inahlv.png',
    // localUrl: 'image/game/sprite_tile',
    config: {
      frameWidth: 48,
      frameHeight: 48
    }
  })
  assets.push({
    key: ASSET_KEY.WALL_OBJECT,
    type: ASSET_TYPE.IMAGE,
    url: 'https://res.cloudinary.com/riandydb/image/upload/v1628319814/cocos-snake/image/sprite_wall_m92ilv.png',
    // localUrl: 'image/game/sprite_wall',
  })
  assets.push({
    key: ASSET_KEY.APPLE_OBJECT,
    type: ASSET_TYPE.IMAGE,
    url: 'https://res.cloudinary.com/riandydb/image/upload/v1628319814/cocos-snake/image/sprite_apple_lzxobd.png',
    // localUrl: 'image/game/sprite_apple'
  })
  assets.push({
    key: ASSET_KEY.MELON_OBJECT,
    type: ASSET_TYPE.IMAGE,
    url: 'https://res.cloudinary.com/riandydb/image/upload/v1628319814/cocos-snake/image/melon_sprite_pryhwv.png',
    // localUrl: 'image/game/melon_sprite'
  })
  assets.push({
    key: ASSET_KEY.BANANA_OBJECT,
    type: ASSET_TYPE.IMAGE,
    url: 'https://res.cloudinary.com/riandydb/image/upload/v1628319813/cocos-snake/image/banana_sprite_dnr3ct.png',
    // localUrl: 'image/game/banana_sprite'
  })
  assets.push({
    key: ASSET_KEY.BASKET_OBJECT,
    type: ASSET_TYPE.IMAGE,
    url: 'https://res.cloudinary.com/riandydb/image/upload/v1628319813/cocos-snake/image/basket_sprite_dtggk3.png',
    // localUrl: 'image/game/basket_sprite'
  })
  assets.push({
    key: ASSET_KEY.TROPHY_OBJECT,
    type: ASSET_TYPE.IMAGE,
    url: 'https://res.cloudinary.com/riandydb/image/upload/v1628319814/cocos-snake/image/sprite_trophy_wcoqcg.png',
    // localUrl: 'image/game/sprite_trophy'
  })
  assets.push({
    key: ASSET_KEY.COIN_OBJECT,
    type: ASSET_TYPE.SPRITESHEET,
    url: 'https://res.cloudinary.com/riandydb/image/upload/v1628319814/cocos-snake/image/spritesheet_coin_lx278c.png',
    // localUrl: 'image/game/spritesheet_coin',
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
    url: 'https://res.cloudinary.com/riandydb/image/upload/v1628319815/cocos-snake/image/spritesheet_snake_qptinf.png',
    // localUrl: 'image/game/spritesheet_snake',
    config: {
      frameWidth: 96,
      frameHeight: 96,
    }
  })
  assets.push({
    key: ASSET_KEY.SNAKE_ROUND_OBJECT,
    type: ASSET_TYPE.SPRITESHEET,
    url: 'https://res.cloudinary.com/riandydb/image/upload/v1628319815/cocos-snake/image/spritesheet_round_s1dk9c.png',
    // localUrl: 'image/game/spritesheet_round',
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
    url: 'https://res.cloudinary.com/riandydb/video/upload/v1628319059/cocos-snake/audio/bg-music_naj4oh.mp3',
    // localUrl: 'audio/bg-music'
  })
  assets.push({
    key: ASSET_KEY.BUTTON_SFX,
    type: ASSET_TYPE.AUDIO,
    url: 'https://res.cloudinary.com/riandydb/video/upload/v1628319699/cocos-snake/audio/button-sfx_jxztwb.mp3',
    // localUrl: 'audio/button-sfx'
  })
  
  // In Game Audio
  assets.push({
    key: ASSET_KEY.CRASH_SFX,
    type: ASSET_TYPE.AUDIO,
    url: 'https://res.cloudinary.com/riandydb/video/upload/v1628319715/cocos-snake/audio/crash_dqsvlm.mp3',
    // localUrl: 'audio/sfx/crash'
  })
  assets.push({
    key: ASSET_KEY.EAT_SFX,
    type: ASSET_TYPE.AUDIO,
    url: 'https://res.cloudinary.com/riandydb/video/upload/v1628319716/cocos-snake/audio/eat_ihjk8u.mp3',
    // localUrl: 'audio/sfx/eat'
  })
  assets.push({
    key: ASSET_KEY.TURN_SFX,
    type: ASSET_TYPE.AUDIO,
    url: 'https://res.cloudinary.com/riandydb/video/upload/v1628319716/cocos-snake/audio/turn_iicl9k.mp3',
    // localUrl: 'audio/sfx/turn'
  })
  
  return assets;
}

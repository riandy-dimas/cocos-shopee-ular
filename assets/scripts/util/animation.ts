import { AssetManager, AnimationClip, SpriteFrame } from "cc";
import { getSpriteFrameKey } from "./spritesheet";

export function generateAnimationClip(
  assetManager: AssetManager,
  textureKey: string, 
  frameIndexes: Array<number>, 
  frameRate: number,
  wrapMode: AnimationClip['wrapMode'] = AnimationClip.WrapMode.Default,
) {
  const frames = new Array<SpriteFrame>();
  frameIndexes.forEach((frameIndex) => {
      frames.push(
        assetManager.assets.get(getSpriteFrameKey(textureKey, frameIndex)) as SpriteFrame
      );
  });
  const animationClip = AnimationClip.createWithSpriteFrames(frames, frameRate);
  if (animationClip) {
    animationClip.wrapMode = wrapMode;
  }
  return animationClip;
}

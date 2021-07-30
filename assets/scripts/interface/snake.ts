import { math } from "cc";
import { SnakeSprite } from "../sprite/SnakeSprite";

export type TSnakeConfig = {
  parts: { x: number, y: number }[],
  velocity: {
    initial: 0.3,
    accelerateMultiplier: 0.9,
    accelerateEvery: 2,
    minimum: 0.12,
  }
}

export type TSnakePart = {
  sprite: SnakeSprite;
  index: math.Vec2;
  position: math.Vec3;
  rotation: math.Vec3;
  direction?: math.Vec2;
}

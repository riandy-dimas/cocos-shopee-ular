import { math, Node } from "cc";

export type TTile = {
  value: number;
  node?: Node;
  index: math.Vec2;
}

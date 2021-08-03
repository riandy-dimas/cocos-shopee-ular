import { TBoard } from "./board";
import { TSnakeConfig } from "./snake";

export type TLevelConfig = {
  maze: TBoard['tiles']
  snake: TSnakeConfig
}

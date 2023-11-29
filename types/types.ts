export type NodeType = {
  row: number;
  col: number;
  isWall: boolean;
  isWeight: boolean;
  isStartNode: boolean;
  isFinishNode: boolean;
};

export type Grid = NodeType[][];

export type StartNodePosition = {
  row: number;
  col: number;
};

export type FinishNodePosition = {
  row: number;
  col: number;
};

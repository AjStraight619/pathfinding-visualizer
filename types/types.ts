export type NodeType = {
  row: number;
  col: number;
  isWall: boolean;
  isWeight: boolean;
  isStartNode: boolean;
  isFinishNode: boolean;
  gScore: number;
  hScore: number;
  fScore: number;
  weight: number;
  isVisited: boolean;
  isShortestPath: boolean;
  parent: NodeType | null;
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

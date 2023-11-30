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
  parent: NodeType | null;
  isAnimated?: boolean;
  distance: number;
  totalDistance: number;
  opened?: boolean;
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

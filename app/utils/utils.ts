import { Grid, NodeType } from "@/types/types";
export const ROWS = 28;
export const COLS = 55;

export const getNewGridWithWallToggled = (
  grid: Grid,
  row: number,
  col: number
): Grid => {
  const newGrid = grid.slice();
  const node = newGrid[row][col];
  const newNode = {
    ...node,
    isWall: !node.isWall,
  };
  newGrid[row][col] = newNode;
  return newGrid;
};

export const getNewGridWithWeightToggled = (
  grid: Grid,
  row: number,
  col: number
): Grid => {
  const newGrid = grid.slice();
  const node = newGrid[row][col];
  let newNode = {
    ...node,
    isWeight: !node.isWeight,
  };
  newGrid[row][col] = newNode;
  return newGrid;
};

export const createNode = (row: number, col: number): NodeType => {
  let isStartNode = row === 10 && col === 8;
  let isFinishNode = row === 10 && col === 45;
  return {
    row,
    col,
    isStartNode,
    isFinishNode,
    isWall: false,
    isWeight: false,
  };
};

export const getInitialGrid = () => {
  const grid = [];
  for (let i = 0; i < ROWS; i++) {
    const currentRow = [];
    for (let j = 0; j < COLS; j++) {
      currentRow.push(createNode(i, j));
    }
    grid.push(currentRow);
  }
  return grid;
};

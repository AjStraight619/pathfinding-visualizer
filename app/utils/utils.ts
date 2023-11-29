import { Grid, NodeType } from "@/types/types";
export const ROWS = 32;
export const COLS = 55;

/**
 * Toggles the wall state of a specific node in the grid.
 * @param {Grid} grid - The current grid state.
 * @param {number} row - The row index of the node.
 * @param {number} col - The column index of the node.
 * @returns {Grid} - The new grid state after toggling the wall.
 */
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

/**
 * Toggles the weight state of a specific node in the grid.
 * @param {Grid} grid - The current grid state.
 * @param {number} row - The row index of the node.
 * @param {number} col - The column index of the node.
 * @returns {Grid} - The new grid state after toggling the weight.
 */

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
    weight: node.isWeight ? 1 : calculateRandomWeight(),
  };
  newGrid[row][col] = newNode;
  return newGrid;
};

/**
 * Creates a new node with specified properties.
 * @param {number} row - The row index for the new node.
 * @param {number} col - The column index for the new node.
 * @returns {NodeType} - A new node object.
 */

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
    gScore: Infinity,
    hScore: Infinity,
    fScore: Infinity,
    isVisited: false,
    isShortestPath: false,
    weight: 1,
    parent: null,
  };
};

/**
 * Generates the initial grid state.
 * @returns {Grid} - A grid populated with node objects.
 */

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

const calculateRandomWeight = () => {
  return Math.floor(Math.random() * 10) + 1;
};

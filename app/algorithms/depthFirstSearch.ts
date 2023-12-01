import { NodeType } from "@/app/types/types";
import { getNeighbors, getNeighborsForDiagonal } from "@/app/utils/utils";

// Recursive implementation
export const depthFirstSearch = (
  grid: NodeType[][],
  startNode: NodeType,
  finishNode: NodeType,
  allowDiagonal: boolean
): NodeType[] => {
  if (!startNode || !finishNode || startNode === finishNode) {
    return [];
  }
  const visitedNodesInOrder: NodeType[] = [];
  depthFirstSearchHelper(
    startNode,
    finishNode,
    visitedNodesInOrder,
    grid,
    allowDiagonal
  );
  visitedNodesInOrder.reverse();
  return visitedNodesInOrder;
};

function depthFirstSearchHelper(
  currentNode: NodeType,
  finishNode: NodeType,
  visitedNodesInOrder: NodeType[],
  grid: NodeType[][],
  allowDiagonal: boolean
): boolean {
  currentNode.isVisited = true;
  visitedNodesInOrder.unshift(currentNode);

  if (currentNode === finishNode) {
    return true;
  }

  const neighbors = allowDiagonal
    ? getNeighborsForDiagonal(currentNode, grid)
    : getNeighbors(currentNode, grid);

  for (const neighbor of neighbors) {
    if (!neighbor.isVisited && !neighbor.isWall) {
      neighbor.parent = currentNode;
      if (
        depthFirstSearchHelper(
          neighbor,
          finishNode,
          visitedNodesInOrder,
          grid,
          allowDiagonal
        )
      ) {
        return true;
      }
    }
  }
  return false;
}

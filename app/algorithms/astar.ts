import { getNeighbors, getNeighborsForDiagonal } from "@/app/utils/utils";
import { NodeType } from "@/types/types";
import Heap from "heap";

let counter = 0;

export const aStar = (
  grid: NodeType[][],
  startNode: NodeType,
  finishNode: NodeType,
  allowDiagonal?: boolean
) => {
  startNode.gScore = 0;
  startNode.fScore = heuristic(startNode, finishNode);

  const openSet = new Heap<NodeType>((a, b) => a.fScore - b.fScore);
  openSet.push(startNode);

  const closedSet = new Set<NodeType>();

  while (!openSet.empty()) {
    const currentNode = openSet.pop();
    if (!currentNode) {
      return []; // The open set was empty; the goal was not reachable
    }

    if (currentNode === null) {
      return [];
    }

    if (currentNode.isWall) continue;

    currentNode.isVisited = true;

    if (
      currentNode.row === finishNode.row &&
      currentNode.col === finishNode.col
    ) {
      finishNode.isVisited = true;
      console.log(counter++);
      return Array.from(closedSet);
    }

    closedSet.add(currentNode);

    const neighbors = allowDiagonal
      ? getNeighborsForDiagonal(currentNode, grid)
      : getNeighbors(currentNode, grid);

    for (const neighbor of neighbors) {
      if (closedSet.has(neighbor) || neighbor.isWall) {
        continue;
      }
      console.log("Neighbor: ", neighbor);

      let tempGScore = currentNode.gScore + neighbor.weight;

      if (!neighbor.isVisited || tempGScore < neighbor.gScore) {
        neighbor.gScore = tempGScore;
        neighbor.hScore = heuristic(neighbor, finishNode);
        neighbor.fScore = neighbor.gScore + neighbor.hScore;
        neighbor.parent = currentNode;

        if (!neighbor.isVisited) {
          openSet.push(neighbor);
        } else {
          openSet.updateItem(neighbor);
        }

        neighbor.isVisited = true;
      }
    }
  }
  return [];
};

const heuristic = (node: NodeType, finishNode: NodeType) => {
  return (
    Math.abs(node.row - finishNode.row) + Math.abs(node.col - finishNode.col)
  );
};

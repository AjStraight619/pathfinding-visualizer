import { NodeType } from "@/types/types";
import { useSpring } from "@react-spring/web";
import { useEffect, useState } from "react";

type useNodeAnimationsProps = {
  visitedNodesInOrder: NodeType[] | null;
  nodesInShortestPathOrder: NodeType[] | null;
};

/**
 * Custom hook for animating nodes in a pathfinding grid.
 *
 * @param {Object} props - The properties for the hook.
 * @param {NodeType} props.startNode - The starting node of the pathfinding algorithm.
 * @param {NodeType[]} props.visitedNodesInOrder - An array of nodes visited in order during the pathfinding algorithm.
 * @param {NodeType[]} props.nodesInShortestPathOrder - An array of nodes that form the shortest path, found by the pathfinding algorithm.
 * @returns {Object} Returns an object containing the spring API for animations.
 */

export const useNodeAnimations = ({
  visitedNodesInOrder,
  nodesInShortestPathOrder,
}: useNodeAnimationsProps): object => {
  const [currentNodePosition, setCurrentNodePosition] =
    useState<NodeType | null>(
      visitedNodesInOrder && visitedNodesInOrder.length > 0
        ? visitedNodesInOrder[0]
        : null
    );

  const [spring, springApi] = useSpring(() => ({
    from: { x: currentNodePosition?.row, y: currentNodePosition?.col },
  }));

  useEffect(() => {
    console.log("spring animation initiated");
    console.log(spring);
  }, [springApi, spring]);

  useEffect(() => {
    if (visitedNodesInOrder && nodesInShortestPathOrder) {
      visitedNodesInOrder.forEach((node, nodeIdx) => {
        setTimeout(() => {
          const element = document.getElementById(
            `node-${node.row}-${node.col}`
          );
          springApi.start({
            from: { x: currentNodePosition?.row, y: currentNodePosition?.col },
            to: { x: node.row, y: node.col },
          });
          if (element) {
            element.classList.add("node-visited");
          }
        }, nodeIdx * 50);
      });

      // Schedule the animation of the shortest path after all visited nodes have been animated
      setTimeout(() => {
        nodesInShortestPathOrder.forEach((node, nodeIdx) => {
          setTimeout(() => {
            const element = document.getElementById(
              `node-${node.row}-${node.col}`
            );
            if (element) {
              element.classList.add("node-shortest-path");
            }
          }, nodeIdx * 25);
        });
      }, visitedNodesInOrder.length * 50);
    }
  }, [visitedNodesInOrder, nodesInShortestPathOrder]);

  // return spring animations here, might create context to avoid excessive prop drilling
  return {};
};

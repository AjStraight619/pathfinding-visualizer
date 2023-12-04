"use client";
import { useAlgorithmContext } from "@/context/AlgorithmContext";
import { useGridContext } from "@/context/GridContext";
import { useNodeContext } from "@/context/NodeContext";
import { useNodeAnimations } from "@/hooks/useNodeAnimations";
import { algorithms } from "@/lib/algorithmList";
import { Algorithm, NodeType } from "@/lib/types";
import { getInitialGrid, getNodesInShortestPathOrder } from "@/lib/utils";
import * as DropdownMenu from "@radix-ui/react-dropdown-menu";
import { useState } from "react";
import { FaCaretDown } from "react-icons/fa";
import { DelaySlider } from "./slider/DelaySlider";
import Button from "./ui/Button";

import { motion } from "framer-motion";

const GridController = () => {
  const [speed, setSpeed] = useState<number[]>([35]);
  const [open, setOpen] = useState(false);
  const { grid, setGrid, didResetGrid, setDidResetGrid } = useGridContext();
  const { selectedAlgorithm, setSelectedAlgorithm, allowDiagonalMovement } =
    useAlgorithmContext();
  const { startNodePosition, finishNodePosition } = useNodeContext();
  const [visitedNodesInOrder, setVisitedNodesInOrder] = useState<
    NodeType[] | null
  >(null);
  const [nodesInShortestPathOrder, setNodesInShortestPathOrder] = useState<
    NodeType[] | null
  >(null);

  const runAlgorithm = () => {
    setDidResetGrid(false);
    const startNode = grid[startNodePosition.row][startNodePosition.col];
    const finishNode = grid[finishNodePosition.row][finishNodePosition.col];
    const visitedNodesInOrder = selectedAlgorithm.func(
      grid,
      startNode,
      finishNode,
      allowDiagonalMovement
    );
    const nodesInShortestPathOrder = getNodesInShortestPathOrder(finishNode);
    if (visitedNodesInOrder && nodesInShortestPathOrder) {
      setVisitedNodesInOrder(visitedNodesInOrder);
      setNodesInShortestPathOrder(nodesInShortestPathOrder);
    }
  };

  const clearBoard = () => {
    setGrid((prevGrid) =>
      prevGrid.map((row) =>
        row.map((node) => {
          const element = document.getElementById(
            `node-${node.row}-${node.col}`
          );
          element?.classList.remove("node-visited", "node-shortest-path");
          return {
            ...node,
            isVisited: false,
          };
        })
      )
    );

    setDidResetGrid(true);
  };

  const resetGrid = () => {
    setGrid(() => getInitialGrid());
    grid.forEach((row) =>
      row.map((node) => {
        const element = document.getElementById(`node-${node.row}-${node.col}`);
        element?.classList.remove("node-visited", "node-shortest-path");
      })
    );
    setDidResetGrid(true);
  };

  const {} = useNodeAnimations({
    visitedNodesInOrder,
    setVisitedNodesInOrder,
    nodesInShortestPathOrder,
    setNodesInShortestPathOrder,
    speed,
    didResetGrid,
  });

  const handleSelectedAlgorithm = (algorithm: Algorithm) => {
    setSelectedAlgorithm(algorithm);
    setOpen(!open);
  };

  return (
    <nav className="fixed top-0 w-full h-[5rem] border-b border-slate-500 sm:px-[0.2rem] md:px-[0.2rem] lg:px-[0.5rem]">
      <motion.div
        className="flex justify-start items-center gap-4 w-full h-full"
        initial={{ opacity: 0, y: 100 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{
          delay: 0.1,
        }}
      >
        <Button onClick={runAlgorithm}>
          Visualize {selectedAlgorithm.name}
        </Button>
        <DropdownMenu.Root open={open} onOpenChange={setOpen}>
          <DropdownMenu.Trigger>
            <div className="flex flex-row gap-2 hover:cursor-pointer bg- p-1 rounded-md">
              {selectedAlgorithm.name}
              <FaCaretDown className="mt-1" />
            </div>
          </DropdownMenu.Trigger>
          <DropdownMenu.Content>
            <ul className="bg-black rounded-md sm:p-[0.1rem] md:p-[0.1rem] lg:p-[0.3rem] ">
              {algorithms.map((algorithm, idx) => (
                <motion.li
                  className="flex items-center justify-center h-3/4 pt-[0.2rem] p-2 hover:cursor-pointer hover:bg-blue-400  rounded-sm"
                  key={idx}
                  initial={{ y: -50, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  onClick={(e) => handleSelectedAlgorithm(algorithm)}
                >
                  {algorithm.name}
                </motion.li>
              ))}
            </ul>
          </DropdownMenu.Content>
        </DropdownMenu.Root>
        <button onClick={clearBoard} className="hover:cursor-pointer">
          Clear Visualizations
        </button>
        <button onClick={resetGrid} className="hover:cursor-pointer">
          Reset Board
        </button>
        <DelaySlider setSpeed={setSpeed} />
      </motion.div>
    </nav>
  );
};

export default GridController;

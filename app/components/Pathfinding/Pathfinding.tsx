"use client";
import { useNodeAnimations } from "@/app/hooks/useNodeAnimations";
import { algorithms } from "@/app/lib/algorithmList";
import { Algorithm, NodeType } from "@/app/types/types";
import { getInitialGrid, getNodesInShortestPathOrder } from "@/app/utils/utils";
import { Flex } from "@radix-ui/themes";
import { useState } from "react";
import Grid from "../grid/Grid";
import Legend from "../ui/legend/Legend";
import Navbar from "../ui/navbar/Navbar";

type DirectionOfWall = {
  up: boolean;
  down: boolean;
  left: boolean;
  right: boolean;
};

const Pathfinding = () => {
  const [grid, setGrid] = useState(getInitialGrid());
  const [speed, setSpeed] = useState([35]);
  const [isAnimating, setIsAnimating] = useState(false);
  const [isWeightToggled, setIsWeightToggled] = useState(false);
  const [allowDiagonalMovement, setAllowDiagonalMovement] = useState(false);
  const [visitedNodesInOrder, setVisitedNodesInOrder] = useState<
    NodeType[] | null
  >(null);
  const [nodesInShortestPathOrder, setNodesInShortestPathOrder] = useState<
    NodeType[] | null
  >(null);
  const [selectedAlgorithm, setSelectedAlgorithm] = useState<Algorithm>(
    algorithms[0]
  );

  const [didResetGrid, setDidResetGrid] = useState(false);

  const [startNodePosition, setStartNodePosition] = useState<NodeType>({
    row: 10,
    col: 8,
    isWall: false,
    isFinishNode: false,
    isWeight: false,
    isStartNode: true,
    isVisited: true,
    gScore: 0,
    hScore: 0,
    fScore: 0,
    weight: 1,
    parent: null,
    totalDistance: 0,
    distance: 0,
  });
  const [finishNodePosition, setFinishNodePosition] = useState<NodeType>({
    row: 10,
    col: 45,
    isWall: false,
    isFinishNode: true,
    isWeight: false,
    isStartNode: false,
    isVisited: false,
    gScore: 0,
    hScore: 0,
    fScore: 0,
    weight: 1,
    parent: null,
    totalDistance: 0,
    distance: 0,
  });

  const toggleWeightsWalls = () => setIsWeightToggled(!isWeightToggled);

  const {} = useNodeAnimations({
    visitedNodesInOrder,
    setVisitedNodesInOrder,
    nodesInShortestPathOrder,
    setNodesInShortestPathOrder,
    speed,
    didResetGrid,
  });

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

  // const calculateAdditionalInfo = (node: NodeType, grid: NodeType[][]) => {
  //   const { row, col } = node;

  //   const directionOfWall: DirectionOfWall = {
  //     up: false,
  //     down: false,
  //     left: false,
  //     right: false,
  //   };

  //   if (row > 0 && grid[row - 1][col].isWall) {
  //     directionOfWall.up = true;
  //   }
  //   if (row < grid.length - 1 && grid[row + 1][col].isWall) {
  //     directionOfWall.down = true;
  //   }
  //   if (col > 0 && grid[row][col - 1].isWall) {
  //     directionOfWall.left = true;
  //   }
  //   if (col < grid[0].length - 1 && grid[row][col + 1].isWall) {
  //     directionOfWall.right = true;
  //   }

  //   return {
  //     ...node,
  //     directionOfWall,
  //   };
  // };

  return (
    <Flex direction={"column"} gap={"2"} justify={"center"} align={"center"}>
      <Navbar
        resetGrid={resetGrid}
        clearBoard={clearBoard}
        toggleWeightsWalls={toggleWeightsWalls}
        isWeightToggled={isWeightToggled}
        runAlgorithm={runAlgorithm}
        algorithms={algorithms}
        selectedAlgorithm={selectedAlgorithm}
        setSelectedAlgorithm={setSelectedAlgorithm}
        setSpeed={setSpeed}
      />
      <Flex
        direction="row"
        justify="start"
        mx="auto"
        gap="4"
        wrap="nowrap"
        width={"100%"}
      >
        <div className="p-6 flex flex-row gap-5">
          <Grid
            isWeightToggled={isWeightToggled}
            startNodePosition={startNodePosition}
            setStartNodePosition={setStartNodePosition}
            finishNodePosition={finishNodePosition}
            setFinishNodePosition={setFinishNodePosition}
            grid={grid}
            setGrid={setGrid}
          />

          <Legend />
        </div>
      </Flex>
    </Flex>
  );
};

export default Pathfinding;

"use client";
import { getInitialGrid, getNodesInShortestPathOrder } from "@/app/utils/utils";
import { Flex } from "@radix-ui/themes";
import { useEffect, useState } from "react";
import Grid from "../grid/Grid";
import Legend from "../ui/legend/Legend";
import Navbar from "../ui/navbar/Navbar";

import { aStar } from "@/app/algorithms/astar";
import { beamSearch } from "@/app/algorithms/beamSearch";
import { bestFirstSearch } from "@/app/algorithms/bestFirstSearch";
import { breadthFirstSearch } from "@/app/algorithms/breadthFirstSearch";
import { depthFirstSearch } from "@/app/algorithms/depthFirstSearch";
import { dijkstra } from "@/app/algorithms/dijkstra";
import { greedyBFS } from "@/app/algorithms/greedyBFS";
import { jumpPointSearch } from "@/app/algorithms/jumpPointSearch";
import { NodeType } from "@/types/types";

import { useNodeAnimations } from "@/app/hooks/useNodeAnimations";

type DirectionOfWall = {
  up: boolean;
  down: boolean;
  left: boolean;
  right: boolean;
};

export type Algorithm = {
  name: string;
  func: (
    grid: NodeType[][],
    startNode: NodeType,
    finishNode: NodeType,
    allowDiagonal: boolean,
    beamWidth?: number
  ) => NodeType[];
};

const Pathfinding = () => {
  const aStarAlgorithm: Algorithm = {
    name: "A* Search",
    func: aStar,
  };

  const beamSearchAlgorithm: Algorithm = {
    name: "Beam Search",
    func: beamSearch,
  };

  const bestFirstSearchAlgorithm: Algorithm = {
    name: "Best First Search",
    func: bestFirstSearch,
  };

  const breadthFirstSearchAlgorithm: Algorithm = {
    name: "Breadth First Search",
    func: breadthFirstSearch,
  };

  const depthFirstSearchAlgorithm: Algorithm = {
    name: "Depth First Search",
    func: depthFirstSearch,
  };

  const dijkstraAlgorithm: Algorithm = {
    name: "Dijkstra's Algorithm",
    func: dijkstra,
  };

  const greedyBFSAlgorithm: Algorithm = {
    name: "Greedy Best First Search",
    func: greedyBFS,
  };

  const jumpPointSearchAlgorithm: Algorithm = {
    name: "Jump Point Search",
    func: jumpPointSearch,
  };

  const algorithms: Algorithm[] = [
    aStarAlgorithm,
    beamSearchAlgorithm,
    bestFirstSearchAlgorithm,
    breadthFirstSearchAlgorithm,
    depthFirstSearchAlgorithm,
    dijkstraAlgorithm,
    greedyBFSAlgorithm,
    jumpPointSearchAlgorithm,
  ];
  const [isWeightToggled, setIsWeightToggled] = useState(false);
  const [allowDiagonalMovement, setAllowDiagonalMovement] = useState(false);
  const [visitedNodesInOrder, setVisitedNodesInOrder] = useState<
    NodeType[] | null
  >(null);
  const [nodesInShortestPathOrder, setNodesInShortestPathOrder] = useState<
    NodeType[] | null
  >(null);
  const [grid, setGrid] = useState<NodeType[][]>([]);
  const [selectedAlgorithm, setSelectedAlgorithm] =
    useState<Algorithm>(aStarAlgorithm);
  // initial state = fast
  const [speed, setSpeed] = useState([10]);

  useEffect(() => {
    setGrid(getInitialGrid());
  }, []);

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

  const handleSpeedChange = (newSpeed: number[]) => {
    console.log("New speed from slider: ", newSpeed);
    setSpeed(newSpeed);
  };

  const {} = useNodeAnimations({
    visitedNodesInOrder,
    nodesInShortestPathOrder,
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
  };

  const resetGrid = () => {
    setGrid(() => getInitialGrid());
    grid.forEach((row) =>
      row.map((node) => {
        const element = document.getElementById(`node-${node.row}-${node.col}`);
        element?.classList.remove("node-visited", "node-shortest-path");
      })
    );
  };

  const runAlgorithm = () => {
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

  const calculateAdditionalInfo = (node: NodeType, grid: Grid) => {
    const { row, col } = node;

    const directionOfWall: DirectionOfWall = {
      up: false,
      down: false,
      left: false,
      right: false,
    };

    if (row > 0 && grid[row - 1][col].isWall) {
      directionOfWall.up = true;
    }
    if (row < grid.length - 1 && grid[row + 1][col].isWall) {
      directionOfWall.down = true;
    }
    if (col > 0 && grid[row][col - 1].isWall) {
      directionOfWall.left = true;
    }
    if (col < grid[0].length - 1 && grid[row][col + 1].isWall) {
      directionOfWall.right = true;
    }

    return {
      ...node,
      directionOfWall,
    };
  };

  return (
    <Flex direction={"column"}>
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
        speed={speed}
        handleSpeedChange={handleSpeedChange}
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
            grid={grid}
            setGrid={setGrid}
            startNodePosition={startNodePosition}
            setStartNodePosition={setStartNodePosition}
            finishNodePosition={finishNodePosition}
            setFinishNodePosition={setFinishNodePosition}
          />

          <Legend />
        </div>
      </Flex>
    </Flex>
  );
};

export default Pathfinding;

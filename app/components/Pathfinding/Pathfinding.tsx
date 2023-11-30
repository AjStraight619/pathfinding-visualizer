"use client";
import { getInitialGrid } from "@/app/utils/utils";
import { Flex } from "@radix-ui/themes";
import { useState } from "react";
import Grid from "../grid/Grid";
import Legend from "../ui/legend/Legend";
import Navbar from "../ui/navbar/Navbar";

import aStar from "@/app/algorithms/astar";
import { NodeType } from "@/types/types";

export type VisitOrderMapType = Map<string, number> | null;

const Pathfinding = () => {
  const [isWeightToggled, setIsWeightToggled] = useState(false);
  const [grid, setGrid] = useState<Grid>(getInitialGrid());
  const [visitOrderMap, setVisitOrderMap] = useState<VisitOrderMapType>(null);
  const [visitedNodesInOrder, setVisitedNodesInOrder] = useState<
    NodeType[] | null
  >(null);

  const [startNodePosition, setStartNodePosition] = useState<NodeType>({
    row: 10,
    col: 8,
    isWall: false,
    isFinishNode: false,
    isWeight: false,
    isStartNode: true,
    isShortestPath: false,
    isVisited: true,
    gScore: 0,
    hScore: 0,
    fScore: 0,
    weight: 1,
    parent: null,
  });
  const [finishNodePosition, setFinishNodePosition] = useState<NodeType>({
    row: 10,
    col: 45,
    isWall: false,
    isFinishNode: true,
    isWeight: false,
    isStartNode: false,
    isShortestPath: true,
    isVisited: false,
    gScore: 0,
    hScore: 0,
    fScore: 0,
    weight: 1,
    parent: null,
  });

  const toggleWeightsWalls = () => setIsWeightToggled(!isWeightToggled);

  const clearBoard = () => {
    setGrid((prevGrid) =>
      prevGrid.map((row) =>
        row.map((node) => {
          return {
            ...node,
            isWall: false,
          };
        })
      )
    );
  };

  const resetGrid = () => {
    const newGrid = getInitialGrid();
    setGrid(newGrid);
  };

  const runAlgorithm = () => {
    console.log("running algorithm");
    const visitedNodesInOrder = aStar(
      grid,
      startNodePosition,
      finishNodePosition
    );

    console.log(
      "these are the visited nodes in order: ",
      visitedNodesInOrder,
      "Length: ",
      visitedNodesInOrder.length
    );

    const visitOrderMap = new Map();
    visitedNodesInOrder.forEach((node, index) => {
      const key = `${node.row}-${node.col}`;
      visitOrderMap.set(key, index);
    });
    setVisitedNodesInOrder(visitedNodesInOrder);
    setVisitOrderMap(visitOrderMap);
  };

  return (
    <>
      <Navbar
        resetGrid={resetGrid}
        clearBoard={clearBoard}
        toggleWeightsWalls={toggleWeightsWalls}
        isWeightToggled={isWeightToggled}
        runAlgorithm={runAlgorithm}
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
            visitOrderMap={visitOrderMap}
            isWeightToggled={isWeightToggled}
            grid={grid}
            setGrid={setGrid}
            startNodePosition={startNodePosition}
            setStartNodePosition={setStartNodePosition}
            finishNodePosition={finishNodePosition}
            setFinishNodePosition={setFinishNodePosition}
            // visitedNodesInOrder={visitedNodesInOrder}
          />

          <Legend />
        </div>
      </Flex>
    </>
  );
};

export default Pathfinding;

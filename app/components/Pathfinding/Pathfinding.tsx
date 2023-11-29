"use client";
import { getInitialGrid } from "@/app/utils/utils";
import { useState } from "react";
import Grid from "../grid/Grid";
import Navbar from "../ui/navbar/Navbar";

const Pathfinding = () => {
  const [isWeightToggled, setIsWeightToggled] = useState(false);
  const [grid, setGrid] = useState<Grid>(getInitialGrid());
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

  return (
    <>
      <Navbar
        resetGrid={resetGrid}
        clearBoard={clearBoard}
        toggleWeightsWalls={toggleWeightsWalls}
        isWeightToggled={isWeightToggled}
      />
      <Grid isWeightToggled={isWeightToggled} grid={grid} setGrid={setGrid} />
    </>
  );
};

export default Pathfinding;

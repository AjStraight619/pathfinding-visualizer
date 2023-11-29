"use client";
import { getInitialGrid } from "@/app/utils/utils";
import { Flex } from "@radix-ui/themes";
import { useState } from "react";
import Grid from "../grid/Grid";
import Legend from "../ui/legend/Legend";
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
          />

          <Legend />
        </div>
      </Flex>
    </>
  );
};

export default Pathfinding;

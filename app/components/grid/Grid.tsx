"use client";
import "@/app/components/node/node.css";
import {
  getNewGridWithWallToggled,
  getNewGridWithWeightToggled,
} from "@/app/utils/utils";
import { Grid } from "@/types/types";
import { Grid as RadixGrid } from "@radix-ui/themes";
import dynamic from "next/dynamic";
import { SetStateAction, useState } from "react";
import { HTML5Backend } from "react-dnd-html5-backend";
import Node from "../node/Node";

type GridProps = {
  grid: Grid;
  setGrid: React.Dispatch<SetStateAction<Grid>>;
  isWeightToggled: boolean;
};

const DndProvider = dynamic(
  () => import("react-dnd").then((dnd) => dnd.DndProvider),
  { ssr: false }
);

const Grid = ({ grid, setGrid, isWeightToggled }: GridProps) => {
  const [isMouseDown, setIsMouseDown] = useState(false);
  const [startNodePosition, setStartNodePosition] = useState({
    row: 10,
    col: 8,
  });
  const [finishNodePosition, setFinishNodePosition] = useState({
    row: 10,
    col: 35,
  });

  const handleMouseDown = (row: number, col: number) => {
    const newGrid = isWeightToggled
      ? getNewGridWithWeightToggled(grid, row, col)
      : getNewGridWithWallToggled(grid, row, col);
    setGrid(newGrid);
    setIsMouseDown(true);
  };

  const handleMouseEnter = (row: number, col: number) => {
    if (isMouseDown) {
      const newGrid = isWeightToggled
        ? getNewGridWithWeightToggled(grid, row, col)
        : getNewGridWithWallToggled(grid, row, col);
      setGrid(newGrid);
    }
  };

  const handleMouseUp = (e: any) => {
    e.preventDefault();
    setIsMouseDown(false);
  };

  const handleDrop = (
    startRow: number,
    startCol: number,
    endRow: number,
    endCol: number,
    nodeType: string
  ) => {
    setIsMouseDown(false);
    setGrid((prevGrid) => {
      return prevGrid.map((row, rowIndex) =>
        row.map((node, colIndex) => {
          let newNode = { ...node };

          if (rowIndex === startRow && colIndex === startCol) {
            newNode.isStartNode = false;
            newNode.isFinishNode = false;
          } else if (rowIndex === endRow && colIndex === endCol) {
            newNode.isStartNode = nodeType === "start";
            newNode.isFinishNode = nodeType === "finish";
          }

          return newNode;
        })
      );
    });

    if (nodeType === "start") {
      setStartNodePosition({ row: endRow, col: endCol });
    } else if (nodeType === "finish") {
      setFinishNodePosition({ row: endRow, col: endCol });
    }

    console.log("After move - Start:", startNodePosition);
  };

  // const getStartAndFinishNodePositions = (
  //   grid: Grid,
  //   startNodePosition: StartNodePosition,
  //   finishNodePosition: FinishNodePosition
  // ) => {
  //   let startNode = { row: -1, col: -1 };
  //   let finishNode = { row: -1, col: -1 };

  //   grid.forEach((row, rowIdx) => {
  //     row.forEach((_, colIdx) => {
  //       if (
  //         startNodePosition.row === rowIdx &&
  //         startNodePosition.col === colIdx
  //       ) {
  //         startNode = { row: rowIdx, col: colIdx };
  //       }
  //       if (
  //         finishNodePosition.row === rowIdx &&
  //         finishNodePosition.col === colIdx
  //       ) {
  //         finishNode = { row: rowIdx, col: colIdx };
  //       }
  //     });
  //   });

  //   return { startNode, finishNode };
  // };

  return (
    <div className="mt-10">
      <DndProvider backend={HTML5Backend}>
        <RadixGrid>
          {grid.map((row, rowIdx) => (
            <div key={rowIdx} className="node-row">
              {row.map((node, nodeIdx) => {
                const {
                  row,
                  col,
                  isStartNode,
                  isFinishNode,
                  isWall,
                  isWeight,
                } = node;
                return (
                  <Node
                    key={nodeIdx}
                    row={row}
                    col={col}
                    isStartNode={isStartNode}
                    isFinishNode={isFinishNode}
                    isWall={isWall}
                    isWeight={isWeight}
                    startNodePosition={startNodePosition}
                    finishNodePosition={finishNodePosition}
                    handleMouseDown={handleMouseDown}
                    handleMouseUp={handleMouseUp}
                    handleMouseEnter={handleMouseEnter}
                    onDrop={handleDrop}
                  />
                );
              })}
            </div>
          ))}
        </RadixGrid>
      </DndProvider>
    </div>
  );
};

export default Grid;

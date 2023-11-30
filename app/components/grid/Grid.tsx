"use client";
import "@/app/components/node/node.css";
import {
  getNewGridWithWallToggled,
  getNewGridWithWeightToggled,
} from "@/app/utils/utils";
import { Grid, NodeType } from "@/types/types";
import { Grid as RadixGrid } from "@radix-ui/themes";
import dynamic from "next/dynamic";
import { SetStateAction, useState } from "react";
import { HTML5Backend } from "react-dnd-html5-backend";
import { VisitOrderMapType } from "../Pathfinding/Pathfinding";
import Node from "../node/Node";

type GridProps = {
  grid: Grid;
  setGrid: React.Dispatch<SetStateAction<Grid>>;
  isWeightToggled: boolean;
  startNodePosition: NodeType;
  setStartNodePosition: React.Dispatch<SetStateAction<NodeType>>;
  finishNodePosition: NodeType;
  setFinishNodePosition: React.Dispatch<SetStateAction<NodeType>>;
  // visitedNodesInOrder: NodeType[] | null;
  visitOrderMap: VisitOrderMapType;
};

const DndProvider = dynamic(
  () => import("react-dnd").then((dnd) => dnd.DndProvider),
  { ssr: false }
);

/**
 * Component representing the entire grid.
 * @param {GridProps} props - The properties passed to the grid component.
 */
const Grid = ({
  grid,
  setGrid,
  isWeightToggled,
  // visitedNodesInOrder,
  visitOrderMap,
}: GridProps) => {
  const [isMouseDown, setIsMouseDown] = useState(false);
  const [startNodePosition, setStartNodePosition] = useState({
    row: 10,
    col: 8,
  });
  const [finishNodePosition, setFinishNodePosition] = useState({
    row: 10,
    col: 45,
  });

  /**
   * Handles the mouse down event on a grid node.
   * @param {number} row - The row index of the clicked node.
   * @param {number} col - The column index of the clicked node.
   */
  const handleMouseDown = (row: number, col: number) => {
    if (
      (row === startNodePosition.row && col === startNodePosition.col) ||
      (row === finishNodePosition.row && finishNodePosition.col)
    ) {
      return;
    }
    const newGrid = isWeightToggled
      ? getNewGridWithWeightToggled(grid, row, col)
      : getNewGridWithWallToggled(grid, row, col);
    setGrid(newGrid);
    setIsMouseDown(true);
  };

  /**
   * Handles the mouse enter event on a grid node.
   * @param {number} row - The row index of the entered node.
   * @param {number} col - The column index of the entered node.
   */
  const handleMouseEnter = (row: number, col: number) => {
    if (isMouseDown) {
      const newGrid = isWeightToggled
        ? getNewGridWithWeightToggled(grid, row, col)
        : getNewGridWithWallToggled(grid, row, col);
      setGrid(newGrid);
    }
  };

  /**
   * Handles the mouse up event on the grid.
   * @param {Event} e - The event object.
   */
  const handleMouseUp = (e: any) => {
    e.preventDefault();
    setIsMouseDown(false);
  };

  /**
   * Handles dropping a node onto the grid.
   * @param {number} startRow - The start row index of the drag operation.
   * @param {number} startCol - The start column index of the drag operation.
   * @param {number} endRow - The end row index of the drag operation.
   * @param {number} endCol - The end column index of the drag operation.
   * @param {string} nodeType - The type of the node being dragged.
   */
  const handleDrop = (
    startRow: number,
    startCol: number,
    endRow: number,
    endCol: number,
    nodeType: string
  ) => {
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
  };

  return (
    <>
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
                  isVisited,
                  isWeight,
                } = node;
                if (isVisited) {
                  console.log("visited node during algorithm run");
                }
                const key = `${node.row}-${node.col}`;
                const visitOrder = visitOrderMap?.get(key);
                return (
                  <Node
                    key={`${rowIdx}-${nodeIdx}`}
                    row={row}
                    col={col}
                    isStartNode={isStartNode}
                    isFinishNode={isFinishNode}
                    isWall={isWall}
                    isWeight={isWeight}
                    isVisited={isVisited}
                    visitOrder={visitOrder}
                    // visitedNodesInOrder={visitedNodesInOrder}
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
    </>
  );
};

export default Grid;

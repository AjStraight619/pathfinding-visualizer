"use client";
import Node from "@/components/node/Node";
import "@/components/node/node.css";
import { useGridContext } from "@/context/GridContext";
import { useNodeContext } from "@/context/NodeContext";
import {
  getNewGridWithWallToggled,
  getNewGridWithWeightToggled,
} from "@/lib/utils";
import dynamic from "next/dynamic";
import React, { useCallback, useState } from "react";
import { HTML5Backend } from "react-dnd-html5-backend";

type GridProps = {
  isWeightToggled: boolean;
};

const DndProvider = dynamic(
  () => import("react-dnd").then((dnd) => dnd.DndProvider),
  { ssr: false }
);

/**
 * The Grid component represents the visualization area for pathfinding algorithms.
 * It renders a grid of nodes, where each node can be a start node, finish node, wall, or weight.
 * This component manages the logic for mouse events to update the grid state and for drag-and-drop functionality.
 *
 * @param {GridProps} props - The properties passed to the grid component.
 *      - isWeightToggled: boolean indicating whether weights or walls are being toggled
 *      - startNodePosition: current position of the start node
 *      - setStartNodePosition: function to update the start node position
 *      - finishNodePosition: current position of the finish node
 *      - setFinishNodePosition: function to update the finish node position
 *      - grid: the current state of the grid
 *      - setGrid: function to update the grid state
 */

const Grid = ({ isWeightToggled }: GridProps) => {
  console.log("grid component is re rendering");
  const { grid, setGrid } = useGridContext();

  const {
    setStartNodePosition,
    setFinishNodePosition,
    startNodePosition,
    finishNodePosition,
  } = useNodeContext();
  const [localGrid, setLocalGrid] = useState([...grid]);
  const [isMouseDown, setIsMouseDown] = useState(false);

  /**
   * Handles the mouse down event on a grid node.
   * @param {number} row - The row index of the clicked node.
   * @param {number} col - The column index of the clicked node.
   */
  const handleMouseDown = useCallback(
    (row: number, col: number) => {
      console.log("handle mouse down called");
      if (
        (row === startNodePosition.row && col === startNodePosition.col) ||
        (row === finishNodePosition.row && col === finishNodePosition.col)
      ) {
        return;
      }
      const newGrid = isWeightToggled
        ? getNewGridWithWeightToggled(grid, row, col)
        : getNewGridWithWallToggled(grid, row, col);
      setGrid(newGrid);
      setIsMouseDown(true);
    },
    [startNodePosition, finishNodePosition, isWeightToggled, grid, setGrid]
  );

  /**
   * Handles the mouse enter event on a grid node.
   * @param {number} row - The row index of the entered node.
   * @param {number} col - The column index of the entered node.
   */
  const handleMouseEnter = useCallback(
    (row: number, col: number) => {
      console.log("handle mouse enter called");
      if (isMouseDown) {
        const newGrid = isWeightToggled
          ? getNewGridWithWeightToggled(grid, row, col)
          : getNewGridWithWallToggled(grid, row, col);
        setLocalGrid(newGrid);
      }
    },
    [isMouseDown, isWeightToggled, grid]
  );

  /**
   * Handles the mouse up event on the grid.
   * @param {Event} e - The event object.
   */
  const handleMouseUp = useCallback(
    (e: React.MouseEvent<HTMLElement>) => {
      e.preventDefault();
      setIsMouseDown(false);
      setGrid(localGrid);
    },
    [localGrid, setGrid]
  );

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
      console.log("updating start node");

      setStartNodePosition((prevPosition) => ({
        ...prevPosition,
        row: endRow,
        col: endCol,
      }));
    } else if (nodeType === "finish") {
      setFinishNodePosition((prevPosition) => ({
        ...prevPosition,
        row: endRow,
        col: endCol,
      }));
    }
  };

  return (
    <div className="sm:pl-0 md:pl-[4rem]">
      <DndProvider backend={HTML5Backend}>
        <div className="flex flex-col">
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

                return (
                  <Node
                    key={nodeIdx}
                    row={row}
                    col={col}
                    isStartNode={isStartNode}
                    isFinishNode={isFinishNode}
                    isWall={isWall}
                    isWeight={isWeight}
                    isVisited={isVisited}
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
        </div>
      </DndProvider>
    </div>
  );
};

export default Grid;

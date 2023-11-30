import { FinishNodePosition, StartNodePosition } from "@/types/types";
import { ChevronRightIcon, StarIcon } from "@heroicons/react/24/solid";
import { animated, useSpring } from "@react-spring/web";
import { useEffect } from "react";
import { useDrag, useDrop } from "react-dnd";
import "./node.css";
type DragItem = {
  row: number;
  col: number;
};

type NodeProps = {
  row: number;
  col: number;
  isStartNode: boolean;
  isFinishNode: boolean;
  isWall: boolean;
  isWeight: boolean;
  isVisited: boolean;
  visitOrder: number | undefined;
  // visitedNodesInOrder: NodeType[] | null;
  handleMouseDown: (row: number, col: number) => void;
  handleMouseEnter: (row: number, col: number) => void;
  handleMouseUp: (e: any) => void;
  startNodePosition: StartNodePosition;
  finishNodePosition: FinishNodePosition;
  onDrop: (
    startRow: number,
    startCol: number,
    endRow: number,
    endCol: number,
    nodeType: string
  ) => void;
};

/**
 * A draggable and droppable node component.
 * @param {NodeProps} props - Properties passed to the Node component.
 */
const Node = ({
  row,
  col,
  isStartNode,
  isFinishNode,
  isWall,
  isWeight,
  startNodePosition,
  finishNodePosition,
  isVisited,
  visitOrder,
  // visitedNodesInOrder,
  onDrop,
  handleMouseDown,
  handleMouseEnter,
  handleMouseUp,
  ...rest
}: NodeProps) => {
  /**
   * Configures the drag functionality for the node.
   */

  const [{ isDragging }, dragRef] = useDrag(
    () => ({
      type: "NODE",
      item: {
        row,
        col,
        nodeType: isStartNode ? "start" : isFinishNode ? "finish" : "normal",
      },
      canDrag: isStartNode || isFinishNode,
      collect: (monitor) => ({
        isDragging: monitor.isDragging(),
      }),
    }),
    [row, col, isStartNode, isFinishNode]
  );
  /**
   * Configures the drop functionality for the node.
   */
  const [, dropRef] = useDrop(
    {
      accept: "NODE",
      canDrop: (item: DragItem & { nodeType: string }) => {
        // Conditions to determine whether the node can be dropped
        if (
          item.nodeType === "start" &&
          row === finishNodePosition.row &&
          col === finishNodePosition.col
        ) {
          return false;
        }

        if (
          item.nodeType === "finish" &&
          row === startNodePosition.row &&
          col === startNodePosition.col
        ) {
          return false;
        }

        return true;
      },
      drop: (item: DragItem & { nodeType: string }, monitor) => {
        if (!monitor.didDrop()) {
          onDrop(item.row, item.col, row, col, item.nodeType);
        }
      },
    },
    [row, col, startNodePosition, finishNodePosition]
  );

  // const [springStyle, api] = useSpring(() => ({
  //   opacity: isVisited ? 1 : 0.5,
  //   transform: isVisited ? "scale(1)" : "scale(0.9)",
  //   backgroundColor: isVisited ? "indigo" : "transparent", // Ensure this is a valid CSS color value
  // }));

  // useEffect(() => {
  //   visitedNodesInOrder?.forEach((node, index) => {

  //     api.start({
  //       opacity: 1,
  //       transform: "scale(1)", // or any other transformation
  //       backgroundColor: "indigo", // change background color when visited
  //       delay: index * 100, // delay based on order in visitedNodesInOrder
  //     });
  //   });
  // }, [visitedNodesInOrder, api]);

  const [visitedStyles, visitedApi] = useSpring(() => ({
    transform: "scale(1)",
    backgroundColor: isWall ? "grey" : "transparent",
    boxShadow: "0px 0px 0px rgba(0, 0, 0, 0)",
  }));

  const [wallStyles, wallApi] = useSpring(() => ({
    backgroundColor: isWall ? "grey" : "transparent",
  }));

  useEffect(() => {
    // Update the spring if the wall state changes
    wallApi.start({
      backgroundColor: isWall ? "grey" : "transparent",
    });
  }, [isWall, wallApi]);

  useEffect(() => {
    if (isVisited && visitOrder !== undefined) {
      console.log("use effect running when creating walls...");
      const delay = visitOrder * 10; // Adjust the delay as needed
      visitedApi.start({
        transform: "scale(1)", // Slightly scale up the node
        backgroundColor: "indigo", // Change the background color
        boxShadow: "0px 0px 10px rgba(0, 0, 0, 0.5)", // Add a shadow effect
        delay,
        config: { tension: 300 }, // Adjust the spring tension for a snappier effect
      });
    }
  }, [isVisited, visitedApi, visitOrder]);

  const extra = isFinishNode
    ? "node-finish"
    : isStartNode
    ? "node-start"
    : isWall
    ? "wall-node"
    : isWeight
    ? "weight-node"
    : "";

  const combinedStyles = {
    ...visitedStyles,
  };

  return (
    <animated.div
      id={`node-${row}-${col}`}
      ref={(node) => dragRef(dropRef(node))}
      style={combinedStyles}
      className={`node ${extra} ${
        isStartNode || isFinishNode ? "cursor-grab" : ""
      } ${isDragging ? "cursor-grabbing" : ""}`}
      onMouseDown={() => handleMouseDown(row, col)}
      onMouseEnter={() => handleMouseEnter(row, col)}
      onMouseUp={handleMouseUp}
    >
      {isStartNode && <ChevronRightIcon />}
      {isFinishNode && <StarIcon />}
      {/* Other node content */}
    </animated.div>
  );
};

export default Node;

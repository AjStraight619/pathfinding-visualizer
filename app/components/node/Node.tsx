import { FinishNodePosition, StartNodePosition } from "@/types/types";
import { ChevronRightIcon, StarIcon } from "@heroicons/react/24/solid";
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

  onDrop,
  handleMouseDown,
  handleMouseEnter,
  handleMouseUp,
  ...rest
}: NodeProps) => {
  /**
   * Configures the drag functionality for the node.
   *
   *
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

  // useEffect(() => {
  //   if (isVisited && visitOrder !== undefined) {
  //     console.log("use effect running when creating walls...");
  //     const delay = visitOrder * 10; // Adjust the delay as needed
  //     visitedApi.start({
  //       transform: "scale(1)", // Slightly scale up the node
  //       backgroundColor: "indigo", // Change the background color
  //       boxShadow: "0px 0px 10px rgba(0, 0, 0, 0.5)", // Add a shadow effect
  //       delay,
  //       config: { tension: 300 }, // Adjust the spring tension for a snappier effect
  //     });
  //   }
  // }, [isVisited, visitedApi, visitOrder]);

  // if (isCurrentlyAnimatingNode) {
  //   return (
  //     <AnimatedNode
  //       node={node}
  //       {...rest}
  //       visitedNodesInOrder={visitedNodesInOrder}
  //     />
  //   );
  // }

  const extra = isFinishNode
    ? "node-finish"
    : isStartNode
    ? "node-start"
    : isWall
    ? "wall-node"
    : isWeight
    ? "weight-node"
    : "";

  return (
    <>
      <div
        id={`node-${row}-${col}`}
        ref={(node) => dragRef(dropRef(node))}
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
      </div>
    </>
  );
};

export default Node;

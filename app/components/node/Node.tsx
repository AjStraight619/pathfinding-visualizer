import { FinishNodePosition, NodeType, StartNodePosition } from "@/types/types";
import { ChevronRightIcon, StarIcon } from "@heroicons/react/24/solid";
import { useDrag, useDrop } from "react-dnd";
import "./node.css";

type DragItem = {
  row: number;
  col: number;
};

type NodeProps = {
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
} & NodeType;

const Node = ({
  row,
  col,
  isStartNode,
  isFinishNode,
  isWall,
  isWeight,
  startNodePosition,
  finishNodePosition,
  onDrop,
  handleMouseDown,
  handleMouseEnter,
  handleMouseUp,
}: NodeProps) => {
  const [, dragRef] = useDrag(
    () => ({
      type: "NODE",
      item: {
        row,
        col,
        nodeType: isStartNode ? "start" : isFinishNode ? "finish" : "normal",
      },
      canDrag: isStartNode || isFinishNode,
    }),
    [row, col, isStartNode, isFinishNode]
  );

  const [, dropRef] = useDrop(
    {
      accept: "NODE",

      canDrop: (item: DragItem & { nodeType: string }) => {
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
    <div
      id={`node-${row}-${col}`}
      ref={(node) => dragRef(dropRef(node))}
      className={`node ${extra}`}
      onMouseDown={() => handleMouseDown(row, col)}
      onMouseEnter={() => handleMouseEnter(row, col)}
      onMouseUp={handleMouseUp}
    >
      {isStartNode && <ChevronRightIcon />}
      {isFinishNode && <StarIcon />}
    </div>
  );
};

export default Node;

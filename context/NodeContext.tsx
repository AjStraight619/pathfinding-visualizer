"use client";
import { NodeType } from "@/lib/types";
import React, {
  SetStateAction,
  createContext,
  useContext,
  useState,
} from "react";

type NodeContextType = {
  startNodePosition: NodeType;
  setStartNodePosition: React.Dispatch<SetStateAction<NodeType>>;
  finishNodePosition: NodeType;
  setFinishNodePosition: React.Dispatch<SetStateAction<NodeType>>;
};

const NodeContext = createContext<NodeContextType | null>(null);

export const useNodeContext = () => {
  const context = useContext(NodeContext);
  if (!context) {
    // Throw an error if the context is used outside of its provider
    throw new Error("useGridContext must be used within a GridContextProvider");
  }
  return context;
};

export const NodeContextProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
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
  return (
    <NodeContext.Provider
      value={{
        startNodePosition,
        finishNodePosition,
        setStartNodePosition,
        setFinishNodePosition,
      }}
    >
      {children}
    </NodeContext.Provider>
  );
};

export default NodeContext;

"use client";
import { NodeType } from "@/lib/types";
import { getInitialGrid } from "@/lib/utils";
import React, {
  SetStateAction,
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";

type GridContextType = {
  grid: NodeType[][];
  setGrid: React.Dispatch<SetStateAction<NodeType[][]>>;
  didResetGrid: boolean;
  setDidResetGrid: React.Dispatch<SetStateAction<boolean>>;
};

const GridContext = createContext<GridContextType | null>(null);

export const useGridContext = () => {
  const context = useContext(GridContext);
  if (!context) {
    // Throw an error if the context is used outside of its provider
    throw new Error("useGridContext must be used within a GridContextProvider");
  }
  return context;
};

export const GridContextProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [grid, setGrid] = useState<NodeType[][]>([]);
  const [didResetGrid, setDidResetGrid] = useState(false);

  useEffect(() => {
    setGrid(getInitialGrid());
  }, []);

  return (
    <GridContext.Provider
      value={{ grid, setGrid, didResetGrid, setDidResetGrid }}
    >
      {children}
    </GridContext.Provider>
  );
};

export default GridContextProvider;

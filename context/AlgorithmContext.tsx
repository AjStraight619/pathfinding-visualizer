"use client";
import { algorithms } from "@/lib/algorithmList";
import { Algorithm } from "@/lib/types";
import { SetStateAction, createContext, useContext, useState } from "react";

type AlgorithmContextType = {
  allowDiagonalMovement: boolean;
  setAllowDiagonalMovement: React.Dispatch<SetStateAction<boolean>>;
  selectedAlgorithm: Algorithm;
  setSelectedAlgorithm: React.Dispatch<SetStateAction<Algorithm>>;
};

const AlgorithmContext = createContext<AlgorithmContextType | null>(null);

export const useAlgorithmContext = () => {
  const context = useContext(AlgorithmContext);
  if (!context) {
    // Throw an error if the context is used outside of its provider
    throw new Error("useGridContext must be used within a GridContextProvider");
  }
  return context;
};

export const AlgorithmContextProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [allowDiagonalMovement, setAllowDiagonalMovement] = useState(false);

  const [selectedAlgorithm, setSelectedAlgorithm] = useState<Algorithm>(
    algorithms[0]
  );

  return (
    <AlgorithmContext.Provider
      value={{
        allowDiagonalMovement,
        setAllowDiagonalMovement,
        selectedAlgorithm,
        setSelectedAlgorithm,
      }}
    >
      {children}
    </AlgorithmContext.Provider>
  );
};

export default AlgorithmContextProvider;

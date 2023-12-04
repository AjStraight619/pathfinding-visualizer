import { useAlgorithmContext } from "@/context/AlgorithmContext";
import { Algorithm } from "@/lib/types";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";

const AlgorithmInfo = () => {
  const { selectedAlgorithm } = useAlgorithmContext();
  const [algorithmInfo, setAlgorithmInfo] =
    useState<Algorithm>(selectedAlgorithm);

  useEffect(() => {
    setAlgorithmInfo(selectedAlgorithm);
  }, [selectedAlgorithm]);
  const { name, description, guaranteesShortestPath, weighted } = algorithmInfo;

  return (
    <motion.div className="justify-start">
      <motion.span></motion.span>
    </motion.div>
  );
};

export default AlgorithmInfo;

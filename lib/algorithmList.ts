import { Algorithm } from "@/lib/types";
import { aStar } from "../algorithms/astar";
import { beamSearch } from "../algorithms/beamSearch";
import { bestFirstSearch } from "../algorithms/bestFirstSearch";
import { breadthFirstSearch } from "../algorithms/breadthFirstSearch";
import { depthFirstSearch } from "../algorithms/depthFirstSearch";
import { dijkstra } from "../algorithms/dijkstra";
import { greedyBFS } from "../algorithms/greedyBFS";
import { jumpPointSearch } from "../algorithms/jumpPointSearch";

const aStarAlgorithm: Algorithm = {
  name: "A* Search",
  func: aStar,
};

const beamSearchAlgorithm: Algorithm = {
  name: "Beam Search",
  func: beamSearch,
};

const bestFirstSearchAlgorithm: Algorithm = {
  name: "Best First Search",
  func: bestFirstSearch,
};

const breadthFirstSearchAlgorithm: Algorithm = {
  name: "Breadth First Search",
  func: breadthFirstSearch,
};

const depthFirstSearchAlgorithm: Algorithm = {
  name: "Depth First Search",
  func: depthFirstSearch,
};

const dijkstraAlgorithm: Algorithm = {
  name: "Dijkstra's Algorithm",
  func: dijkstra,
};

const greedyBFSAlgorithm: Algorithm = {
  name: "Greedy Best First Search",
  func: greedyBFS,
};

const jumpPointSearchAlgorithm: Algorithm = {
  name: "Jump Point Search",
  func: jumpPointSearch,
};

export const algorithms: Algorithm[] = [
  aStarAlgorithm,
  beamSearchAlgorithm,
  bestFirstSearchAlgorithm,
  breadthFirstSearchAlgorithm,
  depthFirstSearchAlgorithm,
  dijkstraAlgorithm,
  greedyBFSAlgorithm,
  jumpPointSearchAlgorithm,
];

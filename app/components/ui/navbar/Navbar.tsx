"use client";
import { CaretDownIcon, GitHubLogoIcon } from "@radix-ui/react-icons";
import {
  Box,
  Button,
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
  Flex,
  IconButton,
} from "@radix-ui/themes";
import Link from "next/link";
import { SetStateAction, useState } from "react";
import { Algorithm } from "../../Pathfinding/Pathfinding";
import ToggleButton from "../navbar-buttons/ToggleButton";

type NavbarProps = {
  toggleWeightsWalls: () => void;
  clearBoard: () => void;
  resetGrid: () => void;
  isWeightToggled: boolean;
  runAlgorithm: () => void;
  algorithms: Algorithm[];
  selectedAlgorithm: Algorithm;
  setSelectedAlgorithm: React.Dispatch<SetStateAction<Algorithm>>;
};

const Navbar = ({
  toggleWeightsWalls,
  isWeightToggled,
  clearBoard,
  resetGrid,
  runAlgorithm,
  algorithms,
  selectedAlgorithm,
  setSelectedAlgorithm,
}: NavbarProps) => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <Box
      top={"0"}
      width={"100%"}
      height={"9"}
      className="border-b border-slate-500"
    >
      <Flex
        justify={"between"}
        align={"center"}
        px={"2"}
        gap={"2"}
        width={"100%"}
        height={"100%"}
      >
        {/* Left-aligned items */}
        <Flex justify={"start"} align={"center"} gap={"2"}>
          <Button onClick={runAlgorithm}>
            Visualize {selectedAlgorithm.name}
          </Button>
          <DropdownMenu.Root>
            <DropdownMenuTrigger>
              <Button className="hover:cursor-pointer">
                {selectedAlgorithm.name}
                <CaretDownIcon className="hover:cursor-pointer" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              {algorithms.map((algorithm, idx) => (
                <DropdownMenu.Item
                  key={idx}
                  onSelect={() => setSelectedAlgorithm(algorithm)}
                  className="flex flex-col gap-2 hover:cursor-pointer hover:bg-slate-500 rounded-md p-2"
                >
                  {algorithm.name}
                </DropdownMenu.Item>
              ))}
            </DropdownMenuContent>
          </DropdownMenu.Root>
          <Button onClick={clearBoard} className="hover:cursor-pointer">
            Clear Visualizations
          </Button>
          <Button onClick={resetGrid} className="hover:cursor-pointer">
            Reset Board
          </Button>
          <ToggleButton handleClick={toggleWeightsWalls}>
            {isWeightToggled ? "Toggle Walls" : "Toggle Weights"}
          </ToggleButton>
        </Flex>

        {/* Right-aligned items */}
        <Flex justify={"end"} align={"center"} gap={"2"}>
          <Link
            href={"https://github.com/AjStraight619?tab=repositories"}
            passHref
          >
            <IconButton
              className="hover:cursor-pointer"
              style={{ backgroundColor: "black" }}
              size={"3"}
            >
              <GitHubLogoIcon />
            </IconButton>
          </Link>
        </Flex>
      </Flex>
    </Box>
  );
};

export default Navbar;

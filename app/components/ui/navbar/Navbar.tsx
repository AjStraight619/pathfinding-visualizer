import "./navbar.css";

import { Box, Button, Flex } from "@radix-ui/themes";
import ToggleButton from "../navbar-buttons/ToggleButton";

type NavbarProps = {
  toggleWeightsWalls: () => void;
  clearBoard: () => void;
  resetGrid: () => void;
  isWeightToggled: boolean;
};

const Navbar = ({
  toggleWeightsWalls,
  isWeightToggled,
  clearBoard,
  resetGrid,
}: NavbarProps) => {
  return (
    <Box
      top={"0"}
      width={"100%"}
      height={"6"}
      className="border-b border-indigo-950"
    >
      <Flex
        direction={"row"}
        justify={"center"}
        align={"center"}
        height={"100%"}
        gap={"3"}
      >
        <ToggleButton handleClick={toggleWeightsWalls}>
          {isWeightToggled ? "Toggle Walls" : "Toggle Weights"}
        </ToggleButton>
        <Button onClick={() => clearBoard()} type="button">
          Clear Board
        </Button>
        <Button onClick={() => resetGrid()} type="button">
          Reset Grid
        </Button>
      </Flex>
    </Box>
  );
};

export default Navbar;

import { Flex } from "@radix-ui/themes";
import Pathfinding from "./components/Pathfinding/Pathfinding";
import "./page.css";
export default function Home() {
  return (
    <>
      <Flex direction={"column"} gap={"2"} justify={"center"} align={"center"}>
        <Pathfinding />
      </Flex>
    </>
  );
}

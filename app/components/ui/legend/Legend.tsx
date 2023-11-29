import { ChevronRightIcon } from "@heroicons/react/20/solid";
import { StarIcon } from "@heroicons/react/24/solid";
import { Card, Flex } from "@radix-ui/themes";

type LegendItemProps = {
  icon: React.ReactNode;
  children: React.ReactNode;
  className?: string;
};

const LegendItem = ({ icon, children }: LegendItemProps) => {
  return (
    <div className="flex flex-row items-center gap-2">
      {icon}
      {children}
    </div>
  );
};

const Legend = () => {
  return (
    <Card
      className="p-2"
      style={{ maxWidth: "300px", minWidth: "200px", maxHeight: "500px" }}
    >
      <Flex p={"2"} direction={"column"} gap={"4"} height={"auto"}>
        <LegendItem icon={<ChevronRightIcon className="w-6 h-6" />}>
          Start Node
        </LegendItem>
        <LegendItem icon={<StarIcon className="w-6 h-6" />}>
          Finish Node
        </LegendItem>
        {/* <LegendItem>hello</LegendItem>
          <LegendItem>hello</LegendItem>
          <LegendItem>hello</LegendItem> */}
      </Flex>
    </Card>
  );
};

export default Legend;

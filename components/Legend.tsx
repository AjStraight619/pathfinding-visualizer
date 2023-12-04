import { ChevronRightIcon, StarIcon } from "@heroicons/react/24/solid";
import { FaSquare } from "react-icons/fa";

type LegendItemProps = {
  icon?: React.ReactNode;
  children?: React.ReactNode;
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
    <div
      className="p-2"
      style={{ maxWidth: "300px", minWidth: "200px", maxHeight: "500px" }}
    >
      <div className="flex flex-col p-2 gap-4 h-auto shadow-lg shadow-black">
        <LegendItem icon={<ChevronRightIcon className="w-6 h-6" />}>
          Start Node
        </LegendItem>
        <LegendItem icon={<StarIcon className="w-6 h-6" />}>
          Finish Node
        </LegendItem>
        <LegendItem icon={<FaSquare />} className="w-6 h-6 bg-blue-100">
          Visited Node
        </LegendItem>
        <LegendItem icon={<FaSquare />} className="w-6 h-6 bg-blue-100">
          Shortest Path Node
        </LegendItem>
        <LegendItem icon={<FaSquare />} className="w-6 h-6 bg-blue-100">
          Wall Node
        </LegendItem>
        <LegendItem icon={<FaSquare />} className="w-6 h-6 bg-blue-100">
          Weight Node
        </LegendItem>
      </div>
    </div>
  );
};

export default Legend;

"use client";
import { Button } from "@radix-ui/themes";
import "./togglebutton.css";
type WeightsWallsToggleButtonProps = {
  className?: string;
  handleClick: () => void;
  children: React.ReactNode;
};

const ToggleButton = ({
  className,
  handleClick,
  children,
}: WeightsWallsToggleButtonProps) => {
  return (
    <Button
      type="button"
      className={`hover:cursor-pointer p-10`}
      onClick={handleClick}
    >
      {children}
    </Button>
  );
};

export default ToggleButton;

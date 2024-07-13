import React from "react";
import { Button } from "./styles";

interface CustomButtonProps {
  onClick: () => void;
  color?: string;
  text?: string;
}

const CustomButton: React.FC<CustomButtonProps> = ({ onClick, color, text = "X" }) => {
  return (
    <Button onClick={onClick} buttonColor={color}>
      {text}
    </Button>
  );
};

export default CustomButton;

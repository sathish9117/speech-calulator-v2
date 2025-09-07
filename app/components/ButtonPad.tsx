// src/components/ButtonPad.tsx
import React from "react";
import CalculatorButton from "./CalculatorButton";
import { ButtonConfig } from "../types";

interface Props {
  buttons: ButtonConfig[];
  onClick: (btn: ButtonConfig) => void;
}

const ButtonPad: React.FC<Props> = ({ buttons, onClick }) => {
  return (
    <div className="grid grid-cols-4 gap-2 sm:gap-3">
      {buttons.map((btn, i) => (
        <CalculatorButton key={i} btn={btn} onClick={onClick} />
      ))}
    </div>
  );
};

export default ButtonPad;

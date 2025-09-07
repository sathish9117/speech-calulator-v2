// src/components/CalculatorButton.tsx
import React from "react";
import { ButtonConfig } from "../types";

interface Props {
  btn: ButtonConfig;
  onClick: (btn: ButtonConfig) => void;
}

const getBtnColor = (color?: "purple" | "pink") => {
  switch (color) {
    case "purple":
      return "bg-purple-500/60 hover:bg-purple-500/80";
    case "pink":
      return "bg-pink-500/50 hover:bg-pink-500/70";
    default:
      return "bg-white/10 hover:bg-white/20";
  }
};

const CalculatorButton: React.FC<Props> = ({ btn, onClick }) => {
  const btnBaseClasses =
    "text-white font-semibold text-lg sm:text-xl py-2 sm:py-3 px-0 rounded-xl shadow-md transition-all duration-150 w-full h-14 sm:h-16 flex items-center justify-center select-none focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-400 focus:ring-offset-gray-900 active:scale-95";

  return (
    <button
      className={`${btnBaseClasses} ${getBtnColor(btn.color)} ${
        btn.className || ""
      }`}
      onClick={() => onClick(btn)}
    >
      {btn.label}
    </button>
  );
};

export default CalculatorButton;

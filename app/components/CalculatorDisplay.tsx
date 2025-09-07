// src/components/CalculatorDisplay.tsx
import React from "react";

interface Props {
  expression: string;
  historyDisplay: string;
}

const CalculatorDisplay: React.FC<Props> = ({ expression, historyDisplay }) => {
  const displayFontSize =
    expression.length > 12 ? "text-2xl sm:text-3xl" : "text-3xl sm:text-4xl";

  return (
    <div className="text-white text-right rounded-xl mb-4 p-4 break-words bg-black/20">
      <div className="text-sm sm:text-base text-gray-300 min-h-[1.5rem] mb-1 sm:mb-2">
        {historyDisplay}
      </div>
      <div
        className={`font-bold h-12 overflow-x-auto overflow-y-hidden flex items-end justify-end ${displayFontSize}`}
      >
        {expression}
      </div>
    </div>
  );
};

export default CalculatorDisplay;

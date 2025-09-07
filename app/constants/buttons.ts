// src/constants/buttons.ts
import { ButtonConfig } from "../types";

export const advanceCalBtns: ButtonConfig[] = [
  { value: "Math.sin(", label: "sin" },
  { value: "Math.cos(", label: "cos" },
  { value: "Math.tan(", label: "tan" },
  { value: "Math.PI", label: "π" },
  { value: "Math.log10(", label: "log" },
  { value: "Math.log(", label: "ln" },
  { value: "(", label: "(" },
  { value: ")", label: ")" },
  { value: "Math.sqrt(", label: "√" },
  { value: "**", label: "xʸ" },
];

export const basicOperatorsBtns: ButtonConfig[] = [
  { action: "clear", label: "AC", color: "pink" },
  { action: "backspace", label: "DEL", color: "pink" },
  { action: "percentage", label: "%", color: "purple" },
  { value: "/", label: "÷", color: "purple" },
  { value: "7", label: "7" },
  { value: "8", label: "8" },
  { value: "9", label: "9" },
  { value: "*", label: "×", color: "purple" },
  { value: "4", label: "4" },
  { value: "5", label: "5" },
  { value: "6", label: "6" },
  { value: "-", label: "−", color: "purple" },
  { value: "1", label: "1" },
  { value: "2", label: "2" },
  { value: "3", label: "3" },
  { value: "+", label: "+", color: "purple" },
  { action: "history", label: "H", color: "purple" },
  { value: "0", label: "0" },
  { value: ".", label: "." },
  {
    action: "calculate",
    label: "=",
    color: "purple",
    className: "col-span-4 mt-2 h-16",
  },
];

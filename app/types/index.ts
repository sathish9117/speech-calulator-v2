// src/types/index.ts

export interface ButtonConfig {
  value?: string;
  action?: "clear" | "backspace" | "percentage" | "calculate" | "history";
  label: string;
  color?: "purple" | "pink";
  className?: string;
}

export interface HistoryItem {
  expression: string;
  result: string;
}

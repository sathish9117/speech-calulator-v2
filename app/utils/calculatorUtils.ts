// src/utils/calculatorUtils.ts
export const safeEval = (expr: string): number => {
  if (/[^0-9+\-*/().\sMathPIcosintalqrg]/g.test(expr)) {
    throw new Error("Invalid characters");
  }
  if (/[\+\-\*\/]{2,}/.test(expr)) {
    throw new Error("Consecutive operators");
  }
  if (/[\+\-\*\/]$/.test(expr.trim())) {
    throw new Error("Expression ends with operator");
  }
  return new Function("return " + expr)();
};

export const prepareExpressionForEval = (expr: string): string => {
  return expr
    .replace(/Math\.sin\(/g, "Math.sin((Math.PI/180)*")
    .replace(/Math\.cos\(/g, "Math.cos((Math.PI/180)*")
    .replace(/Math\.tan\(/g, "Math.tan((Math.PI/180)*");
};

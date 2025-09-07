// src/hooks/useCalculator.ts
import { useState, useCallback, useEffect } from "react";
import { prepareExpressionForEval, safeEval } from "../utils/calculatorUtils";
import { ButtonConfig, HistoryItem } from "../types";

export const useCalculator = (speak: (text: string) => void) => {
  const [expression, setExpression] = useState("0");
  const [historyDisplay, setHistoryDisplay] = useState("");
  const [history, setHistory] = useState<HistoryItem[]>([]);
  const [isResultDisplayed, setIsResultDisplayed] = useState(false);
  const [isHistoryOpen, setIsHistoryOpen] = useState(false);

  const handleInput = useCallback(
    (
      input:
        | ButtonConfig
        | {
            value?: string;
            action?: string;
            fromSpeech?: boolean;
            speechExpression?: string;
          }
    ) => {
      const { value, action, fromSpeech, speechExpression } = input;

      if (action) {
        if (action !== "history") setIsResultDisplayed(false);

        switch (action) {
          case "clear":
            setExpression("0");
            setHistoryDisplay("");
            break;
          case "backspace":
            setExpression((prev) =>
              prev.length > 1 && prev !== "Error" ? prev.slice(0, -1) : "0"
            );
            break;
          case "percentage":
            setExpression((prev) => {
              try {
                const match = prev.match(/(\d*\.?\d+)$/);
                if (match) {
                  const result = parseFloat(match[0]) / 100;
                  return prev.substring(0, match.index) + result;
                }
              } catch {
                return "Error";
              }
              return prev;
            });
            break;
          case "calculate": {
            const exprToEval = fromSpeech ? speechExpression : expression;
            if (exprToEval === "Error" || !exprToEval) break;
            try {
              const result = safeEval(prepareExpressionForEval(exprToEval));
              if (Number.isNaN(result) || !Number.isFinite(result))
                throw new Error("Invalid");

              const resultString = String(result);
              setHistory((prev) => [
                ...prev,
                { expression: exprToEval, result: resultString },
              ]);
              setHistoryDisplay(exprToEval + " =");
              setExpression(resultString);
              setIsResultDisplayed(true);
              speak("The result is " + resultString);
            } catch {
              setHistoryDisplay("");
              setExpression("Error");
              speak("Error in calculation");
            }
            break;
          }
          case "history":
            setIsHistoryOpen(true);
            break;
        }
      } else if (value !== undefined) {
        if (isResultDisplayed) {
          setHistoryDisplay("");
          const isOperator = ["+", "-", "*", "/", "**"].includes(value);
          setExpression(isOperator ? expression + value : value);
          setIsResultDisplayed(false);
        } else {
          setExpression((prev) => {
            if ((prev === "0" && value !== ".") || prev === "Error")
              return value;
            if (value === ".") {
              const lastNumMatch = prev.match(/[\d.]+$/);
              if (lastNumMatch?.[0].includes(".")) return prev;
            }
            return prev + value;
          });
        }
      }
    },
    [expression, isResultDisplayed, speak]
  );

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      let input = null;
      if ((event.key >= "0" && event.key <= "9") || ".()".includes(event.key))
        input = { value: event.key };
      else if ("+-*/".includes(event.key)) input = { value: event.key };
      else if (event.key === "Enter" || event.key === "=")
        input = { action: "calculate" };
      else if (event.key === "Backspace") input = { action: "backspace" };
      else if (event.key === "Escape") input = { action: "clear" };
      else if (event.key === "%") input = { action: "percentage" };
      if (input) {
        event.preventDefault();
        handleInput(input);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [handleInput]);

  return {
    expression,
    setExpression,
    historyDisplay,
    setHistoryDisplay,
    history,
    setHistory,
    isHistoryOpen,
    setIsHistoryOpen,
    handleInput,
  };
};

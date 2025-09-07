"use client";
// src/App.tsx
import React, { useState } from "react";
import { useCalculator } from "./hooks/useCalculator";
import { useSpeech } from "./hooks/useSpeech";
import { advanceCalBtns, basicOperatorsBtns } from "./constants/buttons";

import CalculatorDisplay from "./components/CalculatorDisplay";
import ControlPanel from "./components/ControlPanel";
import ButtonPad from "./components/ButtonPad";
import HistoryPanel from "./components/HistoryPanel";

export default function App() {
  const [showAdvanced, setShowAdvanced] = useState(false);

  // Callback to link speech recognition result to calculator input
  const handleSpeechResult = (speechExpression: string) => {
    setExpression(speechExpression);
    handleInput({ action: "calculate", fromSpeech: true, speechExpression });
  };

  const { listening, language, setLanguage, speak, startListening } =
    useSpeech(handleSpeechResult);
  const {
    expression,
    setExpression,
    historyDisplay,
    setHistoryDisplay,
    history,
    setHistory,
    isHistoryOpen,
    setIsHistoryOpen,
    handleInput,
  } = useCalculator(speak);

  return (
    <>
      <div className="flex items-center justify-center min-h-screen p-4 bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-700 animate-gradient">
        <div className="w-full max-w-sm mx-auto bg-black/30 backdrop-blur-xl rounded-3xl p-4 sm:p-6 shadow-2xl border border-white/20">
          <CalculatorDisplay
            expression={expression}
            historyDisplay={historyDisplay}
          />

          <ControlPanel
            language={language}
            onLanguageChange={setLanguage}
            showAdvanced={showAdvanced}
            onToggleAdvanced={() => setShowAdvanced((p) => !p)}
            onStartListening={startListening}
            listening={listening}
          />

          {showAdvanced && (
            <>
              <ButtonPad buttons={advanceCalBtns} onClick={handleInput} />
              <hr className="my-3 border-white/20" />
            </>
          )}

          <ButtonPad buttons={basicOperatorsBtns} onClick={handleInput} />
        </div>
      </div>

      {isHistoryOpen && (
        <HistoryPanel
          history={history}
          onClose={() => setIsHistoryOpen(false)}
          onClear={() => {
            setHistory([]);
            setIsHistoryOpen(false);
          }}
          onSelect={(item) => {
            setExpression(item.expression);
            setHistoryDisplay("");
            setIsHistoryOpen(false);
          }}
        />
      )}

      {/* Global Styles for Animations */}
      <style>{`
                .animate-gradient { background-size: 200% 200%; animation: gradient 15s ease infinite; }
                @keyframes gradient { 0% { background-position: 0% 50%; } 50% { background-position: 100% 50%; } 100% { background-position: 0% 50%; } }
                .animate-fadeIn { animation: fadeIn 0.3s ease-in-out; }
                @keyframes fadeIn { from { opacity: 0; transform: translateY(-10px); } to { opacity: 1; transform: translateY(0); } }
            `}</style>
    </>
  );
}

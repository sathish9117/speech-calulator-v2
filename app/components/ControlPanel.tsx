// src/components/ControlPanel.tsx
import React from "react";

interface Props {
  language: string;
  onLanguageChange: (lang: string) => void;
  showAdvanced: boolean;
  onToggleAdvanced: () => void;
  onStartListening: () => void;
  listening: boolean;
}

const ControlPanel: React.FC<Props> = ({
  language,
  onLanguageChange,
  showAdvanced,
  onToggleAdvanced,
  onStartListening,
  listening,
}) => {
  return (
    <div className="flex justify-between items-center mb-4 space-x-2">
      <select
        value={language}
        onChange={(e) => onLanguageChange(e.target.value)}
        className="bg-purple-700/50 text-white rounded-lg px-2 py-2 text-xs sm:text-sm focus:outline-none"
      >
        <option value="en-US">English</option>
        <option value="hi-IN">हिन्दी</option>
        <option value="ta-IN">தமிழ்</option>
        <option value="te-IN">తెలుగు</option>
      </select>
      <button
        onClick={onToggleAdvanced}
        className="flex-1 bg-purple-600/50 hover:bg-purple-600/70 text-white font-bold py-2 px-4 rounded-lg transition text-xs sm:text-sm"
      >
        {showAdvanced ? "Basic" : "Advanced"}
      </button>
      <button
        onClick={onStartListening}
        className={` flex-3 w-10 h-10 rounded-lg flex items-center justify-center transition ${
          listening
            ? "bg-red-500 animate-pulse"
            : "transition bg-purple-600/50 hover:bg-purple-600/70"
        }`}
        title="Speak an expression"
      >
        <svg
          className="w-6 h-6 text-white"
          fill="currentColor"
          viewBox="0 0 24 24"
        >
          <path d="M12 14c1.66 0 2.99-1.34 2.99-3L15 5c0-1.66-1.34-3-3-3S9 3.34 9 5v6c0 1.66 1.34 3 3 3zm5.3-3c0 3-2.54 5.1-5.3 5.1S6.7 14 6.7 11H5c0 3.41 2.72 6.23 6 6.72V21h2v-3.28c3.28-.48 6-3.3 6-6.72h-1.7z" />
        </svg>
      </button>
    </div>
  );
};

export default ControlPanel;

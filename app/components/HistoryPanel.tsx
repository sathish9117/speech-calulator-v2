// src/components/HistoryPanel.tsx
import React from "react";
import { HistoryItem } from "../types";

interface Props {
  history: HistoryItem[];
  onClose: () => void;
  onClear: () => void;
  onSelect: (item: HistoryItem) => void;
}

const HistoryPanel: React.FC<Props> = ({
  history,
  onClose,
  onClear,
  onSelect,
}) => {
  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex justify-center items-center p-4 animate-fadeIn">
      <div className="bg-gradient-to-br from-purple-900/90 to-indigo-900/90 border border-white/20 rounded-2xl p-6 w-full max-w-sm text-white shadow-2xl">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-bold">History</h2>
          <button
            onClick={onClose}
            className="text-2xl text-white/70 hover:text-white transition"
          >
            &times;
          </button>
        </div>
        <ul className="max-h-64 overflow-y-auto space-y-2 pr-2">
          {history.length > 0 ? (
            [...history].reverse().map((item, index) => (
              <li
                key={index}
                onClick={() => onSelect(item)}
                className="p-2 rounded-lg bg-white/10 hover:bg-white/20 cursor-pointer transition"
              >
                <p className="text-gray-300 text-sm break-all">
                  {item.expression} =
                </p>
                <p className="text-white font-bold text-lg break-all">
                  {item.result}
                </p>
              </li>
            ))
          ) : (
            <p className="text-gray-400">No calculations yet.</p>
          )}
        </ul>
        <div className="flex justify-end mt-4">
          <button
            onClick={onClear}
            className="bg-pink-500/60 hover:bg-pink-500/80 text-white font-bold py-2 px-4 rounded-lg transition"
          >
            Clear History
          </button>
        </div>
      </div>
    </div>
  );
};

export default HistoryPanel;

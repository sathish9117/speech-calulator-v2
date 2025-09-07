// src/hooks/useSpeech.ts

import { useState, useCallback } from "react";
import { translations } from "../constants/translations";

export const useSpeech = (handleSpeechResult: (expression: string) => void) => {
  const [listening, setListening] = useState(false);
  const [language, setLanguage] = useState("en-US");

  const speak = useCallback(
    (text: string) => {
      if ("speechSynthesis" in window) {
        window.speechSynthesis.cancel();
        const utterance = new SpeechSynthesisUtterance(text);
        utterance.lang = language;
        window.speechSynthesis.speak(utterance);
      }
    },
    [language]
  );

  const startListening = () => {
    const SpeechRecognition =
      window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SpeechRecognition) {
      alert("Speech recognition not supported in this browser.");
      return;
    }

    const recognition = new SpeechRecognition();
    recognition.lang = language;
    recognition.interimResults = false;
    recognition.continuous = false;
    recognition.start();
    setListening(true);

    recognition.onresult = (event) => {
      let transcript = event.results[0][0].transcript.toLowerCase().trim();
      const dict = translations[language] || {};

      Object.keys(dict).forEach((word) => {
        const regex = new RegExp(
          word.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"),
          "g"
        );
        transcript = transcript.replace(regex, ` ${dict[word]} `);
      });

      const sanitized = transcript
        .replace(/[^0-9.+\-*/()MathPIsqrt\s]/g, "")
        .replace(/\s+/g, " ")
        .trim();
      handleSpeechResult(sanitized);
      setListening(false);
    };

    recognition.onerror = () => setListening(false);
    recognition.onend = () => setListening(false);
  };

  return { listening, language, setLanguage, speak, startListening };
};

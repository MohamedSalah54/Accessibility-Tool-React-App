import React, { createContext, useState, useEffect, useContext, useRef } from "react";
import VoiceBar from "../components/sidebar/sections/section2/VoiceCommands";
import ReactDOM from "react-dom";

// Creating the VoiceCommandsContext
const VoiceCommandsContext = createContext();

// Custom hook to use the VoiceCommandsContext
export const useVoiceCommandsContext = () => useContext(VoiceCommandsContext);

export const VoiceCommandsProvider = ({ children }) => {
  const [isVoiceCommandsEnabled, setIsVoiceCommandsEnabled] = useState(
    () => JSON.parse(localStorage.getItem("voiceCommandsEnabled")) || false
  );
  const [language, setLanguage] = useState("en");
  const [transcript, setTranscript] = useState("");
  const [commandLog, setCommandLog] = useState([]);
  const [isListening, setIsListening] = useState(false);

  // استخدام useRef لحفظ المرجع لـ recognition
  const recognitionRef = useRef(null);

  useEffect(() => {
    if (!window.SpeechRecognition && !window.webkitSpeechRecognition) {
      console.error("Speech Recognition is not supported in this browser.");
      return;
    }

    const SpeechRecognition =
      window.SpeechRecognition || window.webkitSpeechRecognition;
    recognitionRef.current = new SpeechRecognition();
    recognitionRef.current.lang = language;
    recognitionRef.current.continuous = true;

    recognitionRef.current.onresult = (event) => {
      const current = event.resultIndex;
      const resultTranscript = event.results[current][0].transcript;
      setTranscript(resultTranscript);
      handleCommand(resultTranscript.toLowerCase());
    };

    recognitionRef.current.onerror = (event) => {
      console.error("Speech Recognition Error:", event.error);
      setCommandLog((log) => [...log, "Recognition error occurred."]);
    };

    recognitionRef.current.onend = () => {
      if (isListening) {
        recognitionRef.current.start();
      }
    };
  }, [isListening, language]);

  const handleCommand = (text) => {
    let commandExecuted = false;
    if (language === "en") {
      if (text.includes("scroll down")) {
        window.scrollBy(0, 100);
        setCommandLog((log) => [...log, "Scrolling Down"]);
        commandExecuted = true;
      }
    } else if (language === "ar") {
      if (text.includes("تمرير لأسفل")) {
        window.scrollBy(0, 100);
        setCommandLog((log) => [...log, "تمرير لأسفل"]);
        commandExecuted = true;
      }
    }

    if (!commandExecuted) {
      setCommandLog((log) => [...log, `Unknown command: ${text}`]);
    }
  };

  const toggleVoiceCommands = () => {
    const newState = !isVoiceCommandsEnabled;
    setIsVoiceCommandsEnabled(newState);
    localStorage.setItem("voiceCommandsEnabled", JSON.stringify(newState));

    if (newState) {
      recognitionRef.current?.start(); // استخدام recognition من ref
      setIsListening(true);
      setCommandLog((log) => [...log, "Voice Commands started."]);
    } else {
      recognitionRef.current?.stop(); // استخدام recognition من ref
      setIsListening(false);
      setCommandLog((log) => [...log, "Voice Commands stopped."]);
    }
  };

  return (
    <VoiceCommandsContext.Provider
      value={{
        isVoiceCommandsEnabled,
        setIsVoiceCommandsEnabled,
        language,
        setLanguage,
        transcript,
        commandLog,
        isListening,
        toggleVoiceCommands,
      }}
    >
      {isVoiceCommandsEnabled &&<VoiceBar />}

      
      {children}
    </VoiceCommandsContext.Provider>
  );
};

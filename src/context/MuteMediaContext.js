import React, { createContext, useState, useContext, useEffect } from "react";

const AudioContext = createContext();

export const useAudioContext = () => {
  return useContext(AudioContext);
};

export const AudioProvider = ({ children }) => {
  const [isMuted, setIsMuted] = useState(false);

  const handleMuteClick = () => {
    setIsMuted(prevMuted => !prevMuted);
  };

  useEffect(() => {
    if (isMuted) {
      document.querySelectorAll('audio, video').forEach((el) => {
        el.muted = true;
      });
    } else {
      document.querySelectorAll('audio, video').forEach((el) => {
        el.muted = false;
      });
    }
  }, [isMuted]);

  return (
    <AudioContext.Provider value={{ isMuted, setIsMuted, handleMuteClick }}>
      {children}
    </AudioContext.Provider>
  );
};

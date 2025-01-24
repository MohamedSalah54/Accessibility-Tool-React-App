import React, { createContext, useContext, useEffect, useState } from "react";

const ReadFocusContext = createContext();

export const ReadFocusProvider = ({ children }) => {
  const [readFocusMode, setReadFocusMode] = useState(
    JSON.parse(localStorage.getItem("readFocusMode")) || false
  );

  const toggleReadFocusMode = () => {
    const newMode = !readFocusMode;
    setReadFocusMode(newMode);
    if (newMode) {
      localStorage.setItem("readFocusMode", true);
    } else {
      localStorage.removeItem("readFocusMode");
    }
  };

  useEffect(() => {
    let overlayDiv;

    if (readFocusMode) {
      overlayDiv = document.createElement("div");
      overlayDiv.style.position = "fixed";
      overlayDiv.style.pointerEvents = "none";
      overlayDiv.style.top = "0";
      overlayDiv.style.left = "0";
      overlayDiv.style.width = "100vw";
      overlayDiv.style.height = "100vh";
      overlayDiv.style.backgroundColor = "rgba(0, 0, 0, 0.5)"; 
      overlayDiv.style.zIndex = "1000";
      overlayDiv.style.transition = "clip-path 0.2s ease";
      overlayDiv.style.clipPath = "polygon(0 0, 100% 0, 100% 100%, 0 100%)"; 
      document.body.appendChild(overlayDiv);

      const handleMouseMove = (event) => {
        const focusHeight = 150;
        const y = event.clientY;

        
        overlayDiv.style.clipPath = `
          polygon(
            0 0, 
            100% 0, 
            100% ${y - focusHeight / 2}px, 
            0 ${y - focusHeight / 2}px, 
            0 ${y + focusHeight / 2}px, 
            100% ${y + focusHeight / 2}px, 
            100% 100%, 
            0 100%
          )`;
      };

      document.addEventListener("mousemove", handleMouseMove);

      return () => {
        document.body.removeChild(overlayDiv);
        document.removeEventListener("mousemove", handleMouseMove);
      };
    }
  }, [readFocusMode]);

  return (
    <ReadFocusContext.Provider value={{ readFocusMode, toggleReadFocusMode }}>
      {children}
    </ReadFocusContext.Provider>
  );
};

export const useReadFocus = () => useContext(ReadFocusContext);

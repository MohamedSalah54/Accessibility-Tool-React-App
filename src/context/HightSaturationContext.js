import React, { createContext, useContext, useState, useEffect } from "react";

const HighSaturationContext = createContext();

export const HighSaturationProvider = ({ children }) => {
  const [isHighSaturation, setIsHighSaturation] = useState(() => {
    return localStorage.getItem("highSaturationMode") === "true";
  });

  const toggleHighSaturation = () => {
    if (isHighSaturation) {
      document.documentElement.style.filter = "";
      document.documentElement.style.transition = "";
      localStorage.removeItem("highSaturationMode"); 
    } else {
      document.documentElement.style.filter = "saturate(2)";
      document.documentElement.style.transition = "filter 0.5s ease";
      localStorage.setItem("highSaturationMode", "true"); 
    }

    setIsHighSaturation(!isHighSaturation);
  };

  useEffect(() => {
    if (isHighSaturation) {
      document.documentElement.style.filter = "saturate(2)";
      document.documentElement.style.transition = "filter 0.5s ease";
    }
  }, [isHighSaturation]);

  return (
    <HighSaturationContext.Provider value={{ isHighSaturation, toggleHighSaturation }}>
      {children}
    </HighSaturationContext.Provider>
  );
};

export const useHighSaturation = () => useContext(HighSaturationContext);

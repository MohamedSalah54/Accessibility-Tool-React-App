import React, { createContext, useContext, useState, useEffect } from "react";

const LowSaturationContext = createContext();

export const LowSaturationProvider = ({ children }) => {
  const [isLowSaturation, setIsLowSaturation] = useState(() => {
    return localStorage.getItem("lowSaturationMode") === "true";
  });

  const toggleLowSaturation = () => {
    if (isLowSaturation) {
      document.documentElement.style.filter = "";
      document.documentElement.style.transition = "";
      localStorage.removeItem("lowSaturationMode"); 
    } else {
      document.documentElement.style.filter = "saturate(0.3)";
      document.documentElement.style.transition = "filter 0.5s ease";
      localStorage.setItem("lowSaturationMode", "true");  
    }

    setIsLowSaturation(!isLowSaturation);
  };

  useEffect(() => {
    if (isLowSaturation) {
      document.documentElement.style.filter = "saturate(0.3)";
      document.documentElement.style.transition = "filter 0.5s ease";
    }
  }, [isLowSaturation]);

  return (
    <LowSaturationContext.Provider value={{ isLowSaturation, toggleLowSaturation }}>
      {children}
    </LowSaturationContext.Provider>
  );
};

export const useLowSaturation = () => useContext(LowSaturationContext);

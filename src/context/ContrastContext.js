import React, { createContext, useContext, useState, useEffect } from "react";

const ContrastContext = createContext();

export const ContrastProvider = ({ children }) => {
  const [isContrastMode, setIsContrastMode] = useState(() => {
    return localStorage.getItem("contrastMode") === "true";
  });

  const toggleContrastMode = () => {
    if (isContrastMode) {
      document.documentElement.style.filter = "";
      document.documentElement.style.transition = "";
      localStorage.removeItem("contrastMode"); 
    } else {
      document.documentElement.style.filter = "contrast(2)";
      document.documentElement.style.transition = "filter 0.5s ease";
      localStorage.setItem("contrastMode", "true"); 
    }

    setIsContrastMode(!isContrastMode);
  };

  useEffect(() => {
    if (isContrastMode) {
      document.documentElement.style.filter = "contrast(2)";
      document.documentElement.style.transition = "filter 0.5s ease";
    }
  }, [isContrastMode]);

  return (
    <ContrastContext.Provider value={{ isContrastMode, toggleContrastMode }}>
      {children}
    </ContrastContext.Provider>
  );
};

export const useContrastMode = () => useContext(ContrastContext);

import React, { createContext, useContext, useState, useEffect } from "react";

const MonochromeContext = createContext();

export const MonochromeProvider = ({ children }) => {
  const [isMonochrome, setIsMonochrome] = useState(() => {
    return localStorage.getItem("monochromeMode") === "true";
  });

  const toggleMonochrome = () => {
    if (isMonochrome) {
      document.documentElement.style.filter = "";
      document.documentElement.style.transition = "";
      localStorage.removeItem("monochromeMode"); 
    } else {
      document.documentElement.style.filter = "grayscale(100%)";
      document.documentElement.style.transition = "filter 0.5s ease";
      localStorage.setItem("monochromeMode", "true");
    }

    setIsMonochrome(!isMonochrome);
  };

  useEffect(() => {
    if (isMonochrome) {
      document.documentElement.style.filter = "grayscale(100%)";
      document.documentElement.style.transition = "filter 0.5s ease";
    }
  }, [isMonochrome]);

  return (
    <MonochromeContext.Provider value={{ isMonochrome, toggleMonochrome }}>
      {children}
    </MonochromeContext.Provider>
  );
};

export const useMonochrome = () => useContext(MonochromeContext);

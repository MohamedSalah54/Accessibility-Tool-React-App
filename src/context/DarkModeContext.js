import React, { createContext, useState, useEffect } from "react";
import styles from '../../src/components/sidebar/AccessibilitySidebar.module.css'
export const DarkModeContext = createContext();

export const DarkModeProvider = ({ children }) => {

  const [isDarkMode, setIsDarkMode] = useState(false);

  useEffect(() => {
    const savedMode = localStorage.getItem("darkMode");
    if (savedMode) {
      setIsDarkMode(savedMode === "true");
    }
  }, []);

  const toggleDarkMode = () => {
    const newMode = !isDarkMode;
    setIsDarkMode(newMode);
    localStorage.setItem("darkMode", newMode.toString());
  };

useEffect(() => {
  if (isDarkMode) {
    document.body.style.backgroundColor = "#121212";

    document.querySelectorAll("h1, h2, h3, h4, h5, h6, a").forEach((el) => {
      if (!el.closest(`.${styles.sidebar}`)) {
        el.style.color = "yellow";
        el.style.border = "1px dashed yellow";
        el.style.padding = "5px";
      }
    });

    document.querySelectorAll("span, p").forEach((el) => {
      if (!el.closest(`.${styles.sidebar}`)) {
        el.style.color = "#fff";
        el.style.padding = "5px";
      }
    });
  } else {
    document.body.style.removeProperty("background-color");

    document.querySelectorAll("h1, h2, h3, h4, h5, h6, a").forEach((el) => {
      if (!el.closest(`.${styles.sidebar}`)) {
        el.style.color = "#fff"; 
        el.style.removeProperty("border");
        el.style.removeProperty("padding");
      }
    });

    document.querySelectorAll("span, p").forEach((el) => {
      if (!el.closest(`.${styles.sidebar}`)) {
        el.style.color = "#fff"; 
        el.style.removeProperty("padding");
      }
    });
  }
}, [isDarkMode]);

  
  return (
    <DarkModeContext.Provider value={{ isDarkMode, toggleDarkMode }}>
      {children}
    </DarkModeContext.Provider>
  );
};

export default DarkModeContext;

import React, { createContext, useContext, useState, useEffect } from "react";
import styles from '../../src/components/sidebar/AccessibilitySidebar.module.css'

const ScreenReaderContext = createContext();

export const ScreenReaderProvider = ({ children }) => {
  const [isScreenReaderActive, setIsScreenReaderActive] = useState(false);

  useEffect(() => {
    const storedState = localStorage.getItem("screenReaderActive");
    if (storedState === "true") {
      setIsScreenReaderActive(true);
      activateScreenReader(); 
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("screenReaderActive", isScreenReaderActive);

    if (isScreenReaderActive) {
      activateScreenReader();
    } else {
      deactivateScreenReader();
    }

    return () => {
      deactivateScreenReader(); 
    };
  }, [isScreenReaderActive]);

  const toggleScreenReader = () => {
    setIsScreenReaderActive((prevState) => !prevState);
  };

  const activateScreenReader = () => {
    document.documentElement.addEventListener("mouseover", handleMouseOver);
    document.documentElement.addEventListener("mouseout", handleMouseOut);
  };

  const deactivateScreenReader = () => {
    document.documentElement.removeEventListener("mouseover", handleMouseOver);
    document.documentElement.removeEventListener("mouseout", handleMouseOut);

    document.querySelectorAll("*").forEach((element) => {
      element.style.outline = "none";
      element.style.boxShadow = "none";
    });
  };

  const handleMouseOver = (event) => {
    const target = event.target;
    if (!target.closest(`.${styles.sidebar}`)) { 
      if (target && target.style) {
        target.style.outline = "3px solid rgba(0, 0, 255, 1)";
        target.style.boxShadow = "0 0 8px 2px rgba(0, 0, 255, 0.9)"; 
        target.style.transition = "outline 0.2s ease-in-out, box-shadow 0.2s ease-in-out";
      }
    }
  };

  const handleMouseOut = (event) => {
    const target = event.target;
    if (!target.closest(`.${styles.sidebar}`)) { 
      if (target && target.style) {
        target.style.outline = "none";
        target.style.boxShadow = "none"; 
      }
    }
  };

  return (
    <ScreenReaderContext.Provider value={{ isScreenReaderActive, toggleScreenReader }}>
      {children}
    </ScreenReaderContext.Provider>
  );
};

export const useScreenReader = () => useContext(ScreenReaderContext);

import React, { createContext, useContext, useState, useEffect } from "react";
import styles from '../../src/components/sidebar/AccessibilitySidebar.module.css'

const MagnifierContext = createContext();

export const MagnifierProvider = ({ children }) => {
  const [isMagnifierActive, setIsMagnifierActive] = useState(() => {
    return localStorage.getItem("magnifierMode") === "true";
  });

  const toggleMagnifier = () => {
    const newMode = !isMagnifierActive;
    setIsMagnifierActive(newMode);
    localStorage.setItem("magnifierMode", newMode); 
  };

  useEffect(() => {
    const scaleElements = () => {
      const elements = document.querySelectorAll("h1, h2, h3, h4, h5, h6, p, span, input, button, textarea, a");
      elements.forEach((el) => {
        if (!el.closest(`.${styles.sidebar}`)) { 
          if (isMagnifierActive) {
            el.style.transform = "scale(1.6)"; 
            el.style.transition = "transform 0.3s ease"; 

            if (el.tagName === "A") {
              el.style.display = "inline-block"; 
            }
          } else {
            el.style.transform = ""; 
            el.style.transition = ""; 

            
            if (el.tagName === "A") {
              el.style.display = "";
            }
          }
        }
      });
    };

    scaleElements();

    if (isMagnifierActive) {
      document.body.style.overflowX = "hidden"; 
    } else {
      document.body.style.overflowX = ""; 
    }
  }, [isMagnifierActive]);

  return (
    <MagnifierContext.Provider value={{ isMagnifierActive, toggleMagnifier }}>
      {children}
    </MagnifierContext.Provider>
  );
};

export const useMagnifier = () => useContext(MagnifierContext);

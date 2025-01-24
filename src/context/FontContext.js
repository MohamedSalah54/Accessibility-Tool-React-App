import React, { createContext, useState, useEffect, useContext } from "react";
import styles from '../../src/components/sidebar/AccessibilitySidebar.module.css';

export const FontContext = createContext();

export const useFontContext = () => useContext(FontContext);

export const FontProvider = ({ children }) => {
  const [fontSizeIncrement, setFontSizeIncrement] = useState(5); 
  const [lineSpacing, setLineSpacing] = useState(1.5); 
  const [wordSpacing, setWordSpacing] = useState("normal"); 
  const [letterSpacing, setLetterSpacing] = useState(0); 
  const [defaultFontSizes, setDefaultFontSizes] = useState({}); 

  const updateFont = (type, increment = true) => {
    if (typeof window !== "undefined") {
      const step = 0.5; 
      let newValue;

      switch (type) {
        case "fontSize":
          newValue = increment ? fontSizeIncrement + 2 : fontSizeIncrement - 2;
          setFontSizeIncrement(newValue);
          break;

        case "lineSpacing":
          newValue = increment ? lineSpacing + step : lineSpacing - step;
          newValue = Math.max(1.0, Math.min(2.5, newValue)); 
          setLineSpacing(newValue);
          break;

        case "letterSpacing":
          newValue = increment ? letterSpacing + step : letterSpacing - step;
          newValue = Math.max(0, Math.min(2, newValue)); 
          setLetterSpacing(newValue);
          break;

        case "wordSpacing":
          let currentSpacing = wordSpacing === "normal" ? 0 : parseFloat(wordSpacing);
          newValue = increment ? currentSpacing + step : currentSpacing - step;
          setWordSpacing(`${newValue}em`);
          break;

        default:
          break;
      }
    }
  };

  useEffect(() => {
   
    if (typeof window !== "undefined") {
      const elements = document.querySelectorAll(
        "a, span, p, label, h1, h2, h3, h4, h5, h6, div[contenteditable], li, strong, em, u, button[contenteditable]"
      );

      const defaultSizes = {};
      elements.forEach((el) => {
        const tagName = el.tagName.toLowerCase();
        if (!defaultSizes[tagName]) {
          defaultSizes[tagName] = window.getComputedStyle(el).fontSize; 
        }
      });

      setDefaultFontSizes(defaultSizes);
    }
  }, []);

  useEffect(() => {
    if (Object.keys(defaultFontSizes).length > 0) {
      const elements = document.querySelectorAll(
        "a, span, p, label, h1, h2, h3, h4, h5, h6, div[contenteditable], li, strong, em, u, button"
      );
  
      elements.forEach((el) => {
        if (!el.closest(`.${styles.sidebar}`)) {
          const tagName = el.tagName.toLowerCase();
          const defaultFontSize = parseFloat(defaultFontSizes[tagName]) || 16;
  
          el.style.fontSize = `${defaultFontSize + fontSizeIncrement}px`;
          el.style.lineHeight = lineSpacing;
          el.style.wordSpacing = wordSpacing;
          el.style.letterSpacing = `${letterSpacing}px`;
        }
      });
    }
  }, [fontSizeIncrement, lineSpacing, wordSpacing, letterSpacing, defaultFontSizes]);
  

  return (
    <FontContext.Provider value={{ fontSizeIncrement, lineSpacing, wordSpacing, letterSpacing, updateFont }}>
      {children}
    </FontContext.Provider>
  );
};

import React, { createContext, useState, useEffect, useContext } from 'react';
import styles from '../../src/components/sidebar/AccessibilitySidebar.module.css'

const HighlightHeadersContext = createContext();

export const HighlightHeadersProvider = ({ children }) => {
  const [isHighlighted, setIsHighlighted] = useState(false);

  useEffect(() => {
    const savedState = localStorage.getItem('highlightHeaders');
    if (savedState === 'true') {
      setIsHighlighted(true);
    }
  }, []);

  const toggleHighlightHeaders = () => {
    const newState = !isHighlighted;
    setIsHighlighted(newState);
    localStorage.setItem('highlightHeaders', newState.toString());
  };

  useEffect(() => {
    if (isHighlighted) {
      document.documentElement.style.setProperty('--highlight-color', 'black');
      for (let i = 1; i <= 6; i++) {
        const headers = document.querySelectorAll(`h${i}`);
        headers.forEach(header => {
          if (!header.closest(`.${styles.sidebar}`)) {

          header.style.borderBottom = '2px solid black';}
        });
      }
    } else {
      document.documentElement.style.setProperty('--highlight-color', '');
      for (let i = 1; i <= 6; i++) {
        const headers = document.querySelectorAll(`h${i}`);
        headers.forEach(header => {
          if (!header.closest(`.${styles.sidebar}`)) {

          header.style.borderBottom = '';}
        });
      }
    }
  }, [isHighlighted]);

  return (
    <HighlightHeadersContext.Provider value={{ isHighlighted, toggleHighlightHeaders }}>
      {children}
    </HighlightHeadersContext.Provider>
  );
};

export const useHighlightHeaders = () => useContext(HighlightHeadersContext);

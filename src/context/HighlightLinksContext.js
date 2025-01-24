import React, { createContext, useState, useEffect, useContext } from 'react';
import styles from '../../src/components/sidebar/AccessibilitySidebar.module.css'

const HighlightLinksContext = createContext();

export const HighlightLinksProvider = ({ children }) => {
  const [isHighlighted, setIsHighlighted] = useState(false);

  useEffect(() => {
    const savedState = localStorage.getItem('highlightLinks');
    if (savedState === 'true') {
      setIsHighlighted(true);
    }
  }, []);

  const toggleHighlightLinks = () => {
    const newState = !isHighlighted;
    setIsHighlighted(newState);
    localStorage.setItem('highlightLinks', newState.toString());
  };

  useEffect(() => {
    if (isHighlighted) {
      document.documentElement.style.setProperty('--highlight-color', 'red');
      document.querySelectorAll('a').forEach(link => {
        if (!link.closest(`.${styles.sidebar}`)) {
        link.style.borderBottom = '2px solid red'; 
        link.style.color = "red"}
      });
    } else {
      document.documentElement.style.setProperty('--highlight-color', '');
      document.querySelectorAll('a').forEach(link => {
        if (!link.closest(`.${styles.sidebar}`)) {

        link.style.borderBottom = ''; 
        link.style.color ='white'}
      });
    }
  }, [isHighlighted]);

  return (
    <HighlightLinksContext.Provider value={{ isHighlighted, toggleHighlightLinks }}>
      {children}
    </HighlightLinksContext.Provider>
  );
};

export const useHighlightLinks = () => useContext(HighlightLinksContext);

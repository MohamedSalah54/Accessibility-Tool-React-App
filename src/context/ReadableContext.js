import React, { createContext, useState, useEffect } from 'react';
import styles from '../../src/components/sidebar/AccessibilitySidebar.module.css'

export const ReadableFontContext = createContext();

export const ReadableFontProvider = ({ children }) => {
  const [isReadableFont, setisReadableFont] = useState(() => {
    const savedMode = localStorage.getItem('readableMode');
    return savedMode === 'true'; 
  });

  const applyFontToSection = () => {
    if (!document.body.closest(`.${styles.sidebar}`)) {
      document.body.style.fontFamily = 'sans-serif';
    }
    document.querySelectorAll("h1, h2, h3, h4, h5, h6, p, span, a, li").forEach((el) => {
      if (!el.closest(`.${styles.sidebar}`)) {
      el.style.fontFamily = 'sans-serif';}
    });
  };

  const removeFontFromSection = () => {
    document.body.style.fontFamily = '';
    document.querySelectorAll("h1, h2, h3, h4, h5, h6, p, span, a, li").forEach((el) => {
      if (!el.closest(`.${styles.sidebar}`)) {
      el.style.fontFamily = '';}
    });
  };

  const toggleReadableFont = () => {
    setisReadableFont(prevState => {
      const newMode = !prevState;
      localStorage.setItem('readableMode', newMode.toString()); 
      if (newMode) {
        applyFontToSection(); 
      } else {
        removeFontFromSection(); 
      }
      return newMode;
    });
  };

  return (
    <ReadableFontContext.Provider value={{ isReadableFont, toggleReadableFont }}>
      {children}
    </ReadableFontContext.Provider>
  );
};

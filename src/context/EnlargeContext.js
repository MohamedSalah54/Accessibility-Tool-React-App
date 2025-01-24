import React, { createContext, useContext, useState, useEffect } from 'react';
import styles from '../../src/components/sidebar/AccessibilitySidebar.module.css';

const EnlargeContext = createContext();

export const useEnlargeContext = () => useContext(EnlargeContext);

export const EnlargeProvider = ({ children }) => {
  const [isEnlarged, setIsEnlarged] = useState(false);

  useEffect(() => {
    const savedState = localStorage.getItem('enlargedButtons');
    if (savedState === 'true') {
      setIsEnlarged(true);
      updateButtonSize(true);
    } else {
      updateButtonSize(false); 
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('enlargedButtons', isEnlarged);
    updateButtonSize(isEnlarged);
  }, [isEnlarged]);

  const toggleEnlarge = () => {
    setIsEnlarged((prev) => !prev); 
  };

  const updateButtonSize = (enlarged) => {
    const buttons = document.querySelectorAll('button'); 
    buttons.forEach((button) => {
      if (!button.closest(`.${styles.sidebar}`)) {
        if (enlarged) {
          button.style.transform = 'scale(1.5)'; 
        } else {
          button.style.transform = 'scale(1)'; 
        }
        button.style.transition = 'transform 0.3s ease'; 
      }
    });
  };

  return (
    <EnlargeContext.Provider value={{ isEnlarged, toggleEnlarge }}>
      {children}
    </EnlargeContext.Provider>
  );
};

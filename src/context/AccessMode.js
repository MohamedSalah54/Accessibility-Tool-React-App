import React, { createContext, useState, useContext } from "react";

const AccessibilityContext = createContext();

export const useAccessibility = () => useContext(AccessibilityContext);

export const AccessibilityProvider = ({ children }) => {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [isLightMode, setIsLightMode] = useState(false)
  const [isMonochrome, setIsMonochrome] = useState(false)
  const [isLowSaturation, setIsLowSaturation] = useState(false)
  const [isHighSaturation, setIsHighSaturation] = useState(false)
  const [isContrast, setIsContrast] = useState(false)
  

  const darkMode = () => {
    setIsDarkMode((prev) => !prev);
  };
  
  const lightMode = () =>{
    setIsLightMode((prev) =>!prev)
  }
  const monochrome = () =>{
    setIsMonochrome((prev)=>!prev)
  }

  const LowSaturationHandler = () =>{
    setIsLowSaturation((prev)=>!prev)
  }
  
  const highSaturationHandler = () =>{
    setIsHighSaturation((prev)=>!prev)
  }

  const contrastHandler = () =>{
    setIsContrast((prev) =>!prev)
  }
  return (
    <AccessibilityContext.Provider value={{ isDarkMode, darkMode ,isLightMode, lightMode, isMonochrome, monochrome, isLowSaturation, LowSaturationHandler, isHighSaturation, highSaturationHandler, isContrast, contrastHandler}}>
      {children}
    </AccessibilityContext.Provider>
  );
};

import React, { createContext, useState, useEffect } from "react";
import styles from '../../src/components/sidebar/AccessibilitySidebar.module.css'

export const BrightModeContext = createContext();

export const BrightModeProvider = ({ children }) => {
  const [isBrightMode, setIsBrightMode] = useState(false);

  useEffect(() => {
    const savedMode = localStorage.getItem("brightMode");
    if (savedMode) {
      setIsBrightMode(savedMode === "true");
    }
  }, []);

  const toggleBrightMode = () => {
    const newMode = !isBrightMode;
    setIsBrightMode(newMode);
    localStorage.setItem("brightMode", newMode.toString());
  };

  useEffect(() => {
    if (isBrightMode) {
      document.body.style.backgroundColor = "#ffffff";
      document.querySelectorAll("nav").forEach((el) => {
        if (!el.closest(`.${styles.sidebar}`)) {
        el.style.backgroundColor = "#fff"; }

      });
      document.querySelectorAll("h1,h2,h3,h4,h5,h6,p,span,a").forEach((el)=>{
        if (!el.closest(`.${styles.sidebar}`)) {
        el.style.color = "#191970"}
      })
   
    } else {
      document.body.style.removeProperty("background-color");
      document.querySelectorAll("nav").forEach((el) => {
        if (!el.closest(`.${styles.sidebar}`)) {
        el.style.backgroundColor= "black"}
      });
      document.querySelectorAll("a").forEach((el) => {
        if (!el.closest(`.${styles.sidebar}`)) {
        el.style.color= "white"}
      });
  
      document.querySelectorAll("h1,h2,h3,h4,h5,h6,p,span").forEach((el)=>{
        if (!el.closest(`.${styles.sidebar}`)) {
        el.style.removeProperty("color")}
      })

   
    }
  }, [isBrightMode]);

  return (
    <BrightModeContext.Provider value={{ isBrightMode, toggleBrightMode }}>
      {children}
    </BrightModeContext.Provider>
  );
};

export default BrightModeContext;

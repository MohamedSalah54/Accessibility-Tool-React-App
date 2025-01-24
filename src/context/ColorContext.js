import React, { createContext, useState, useEffect } from "react";
import styles from '../../src/components/sidebar/AccessibilitySidebar.module.css'

export const ColorContext = createContext();

export const ColorProvider = ({ children }) => {
  const [colors, setColors] = useState({});
  const [hue, setHue] = useState(0);
  const [activeSection, setActiveSection] = useState("Backgrounds");

  useEffect(() => {
    const savedColors = JSON.parse(localStorage.getItem("savedColors"));
    const savedSection = localStorage.getItem("selectedSection");

    if (savedColors) {
      setColors(savedColors);
      applyColorToSection(savedColors);
    }

    if (savedSection) {
      setActiveSection(savedSection);
    }
  }, []);

  const handleColorChange = (e) => {
    const newHue = e.target.value;
    setHue(newHue);

    const selectedColor = `hsl(${newHue}, 100%, 50%)`;

    const updatedColors = {
      ...colors,
      [activeSection]: selectedColor,
    };

    setColors(updatedColors);
    localStorage.setItem("savedColors", JSON.stringify(updatedColors));
    localStorage.setItem("selectedSection", activeSection);

    applyColorToSection(updatedColors);
  };
  const applyColorToSection = (colorSet) => {
    document.body.style.backgroundColor = colorSet.Backgrounds || "";
    
    document.querySelectorAll("h1, h2, h3, h4, h5, h6").forEach((el) => {
      if (!el.closest(`.${styles.sidebar}`)) {
      el.style.color = colorSet.Headings || "";}
    });
  
    document.querySelectorAll("p, span, li").forEach((el) => {
      if (!el.closest(`.${styles.sidebar}`)) {
      el.style.color = colorSet.Contents || "";}
    });
  
    document.querySelectorAll("a").forEach((el) => {
      if (colorSet.Contents) {
        if (!el.closest(`.${styles.sidebar}`)) {
        el.style.color = colorSet.Contents;}
      } else {
        if (!el.closest(`.${styles.sidebar}`)) {
        el.style.color = "white";} 
      }
    });
  };
  
  
  

  const resetColors = () => {
    setColors({});
    applyColorToSection({}); 
    localStorage.removeItem("savedColors");
    localStorage.removeItem("selectedSection");
  
    document.querySelectorAll("a").forEach((el) => {
      el.style.removeProperty("color"); 
      el.style.color = "white"; 
    });
  };
  

  return (
    <ColorContext.Provider
      value={{
        colors,
        hue,
        activeSection,
        setActiveSection,
        handleColorChange,
        resetColors,
      }}
    >
      {children}
    </ColorContext.Provider>
  );
};

export default ColorContext;

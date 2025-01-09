import React, { createContext, useState, useEffect } from "react";
import styles from '../../src/components/sidebar/AccessibilitySidebar.module.css'

// إنشاء Context
export const ColorContext = createContext();

// إنشاء Provider
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
    // الخلفية
    document.body.style.backgroundColor = colorSet.Backgrounds || "";
    
    // العناوين
    document.querySelectorAll("h1, h2, h3, h4, h5, h6").forEach((el) => {
      if (!el.closest(`.${styles.sidebar}`)) {
      el.style.color = colorSet.Headings || "";}
    });
  
    // المحتوى
    document.querySelectorAll("p, span, li").forEach((el) => {
      if (!el.closest(`.${styles.sidebar}`)) {
      el.style.color = colorSet.Contents || "";}
    });
  
    // الروابط (a tag)
    document.querySelectorAll("a").forEach((el) => {
      // تعيين اللون إذا تم تحديده في colorSet، وإلا تعيين اللون الافتراضي (الذي هو نفس لون Navbar)
      if (colorSet.Contents) {
        if (!el.closest(`.${styles.sidebar}`)) {
        el.style.color = colorSet.Contents;}
      } else {
        if (!el.closest(`.${styles.sidebar}`)) {
        // تعيين اللون الافتراضي الذي هو نفس اللون في Navbar (white)
        el.style.color = "white";} // اللون الافتراضي هنا هو اللون الأبيض
      }
    });
  };
  
  
  

  const resetColors = () => {
    // إعادة تعيين الألوان
    setColors({});
    applyColorToSection({}); // إزالة التأثير بالكامل
    localStorage.removeItem("savedColors");
    localStorage.removeItem("selectedSection");
  
    // إزالة اللون من جميع الروابط (a tags)
    document.querySelectorAll("a").forEach((el) => {
      el.style.removeProperty("color"); // إزالة خاصية اللون
      // تعيين اللون الافتراضي (white) عند إعادة التعيين
      el.style.color = "white"; // اللون الافتراضي هو نفس لون Navbar
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

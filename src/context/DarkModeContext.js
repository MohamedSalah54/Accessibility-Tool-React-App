import React, { createContext, useState, useEffect } from "react";
import styles from '../../src/components/sidebar/AccessibilitySidebar.module.css'
// إنشاء Context لوضع الـ Dark Mode
export const DarkModeContext = createContext();

// إنشاء Provider لـ Dark Mode
export const DarkModeProvider = ({ children }) => {

  const [isDarkMode, setIsDarkMode] = useState(false);

  // استرجاع الوضع المحفوظ من LocalStorage
  useEffect(() => {
    const savedMode = localStorage.getItem("darkMode");
    if (savedMode) {
      setIsDarkMode(savedMode === "true");
    }
  }, []);

  // التبديل بين وضع الـ Dark Mode و الـ Light Mode
  const toggleDarkMode = () => {
    const newMode = !isDarkMode;
    setIsDarkMode(newMode);
    localStorage.setItem("darkMode", newMode.toString());
  };

  // تطبيق أو إزالة تأثيرات الوضع الداكن
  useEffect(() => {
    if (isDarkMode) {
      document.body.style.backgroundColor = "#121212";
  
      // تطبيق الأنماط على العناصر خارج الـ Sidebar فقط
      document.querySelectorAll("h1, h2, h3, h4, h5, h6, a").forEach((el) => {
        if (!el.closest(`.${styles.sidebar}`)) {
          el.style.color = "yellow";
          el.style.border = "1px dashed yellow";
          el.style.padding = "5px";
        }
      });
  
      document.querySelectorAll("span, p").forEach((el) => {
        if (!el.closest(`.${styles.sidebar}`)) {
          el.style.color = "#fff";
          el.style.padding = "5px";
        }
      });
    } else {
      // إزالة التأثيرات
      document.body.style.removeProperty("background-color");
  
      document.querySelectorAll("h1, h2, h3, h4, h5, h6, a").forEach((el) => {
        if (!el.closest(`.${styles.sidebar}`)) {
          el.style.removeProperty("color");
          el.style.removeProperty("border");
          el.style.removeProperty("padding");
        }
      });
  
      document.querySelectorAll("span, p").forEach((el) => {
        if (!el.closest(`.${styles.sidebar}`)) {
          el.style.removeProperty("color");
          el.style.removeProperty("padding");
        }
      });
    }
  }, [isDarkMode]);
  
  return (
    <DarkModeContext.Provider value={{ isDarkMode, toggleDarkMode }}>
      {children}
    </DarkModeContext.Provider>
  );
};

export default DarkModeContext;

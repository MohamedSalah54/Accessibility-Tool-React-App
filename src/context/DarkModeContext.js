import React, { createContext, useState, useEffect } from "react";

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
      document.querySelectorAll("h1, h2, h3, h4, h5, h6,a").forEach((el) => {
        el.style.color = "yellow";
        el.style.border = "1px dashed yellow";
        el.style.padding = "5px"; // لإضافة مساحة بين النص والحدود
      });
      document.querySelectorAll("span, p").forEach((el) => {
        el.style.color = "#fff";
        el.style.padding = "5px"; // لإضافة مساحة بين النص والحدود
      });
      document.querySelectorAll("nav").forEach((el)=>{
        el.style.backgroundColor = "#121212"
      })
    } else {
      // إزالة التأثيرات المضافة عند تعطيل الوضع الداكن
      document.body.style.removeProperty("background-color");
      document.querySelectorAll("h1, h2, h3, h4, h5, h6,a").forEach((el) => {
        el.style.removeProperty("color");
        el.style.removeProperty("border");
        el.style.removeProperty("padding");
      });
      document.querySelectorAll("span, p").forEach((el)=>{
        el.style.removeProperty("color")
        el.style.removeProperty("border")
      })
     
    }
  }, [isDarkMode]);

  return (
    <DarkModeContext.Provider value={{ isDarkMode, toggleDarkMode }}>
      {children}
    </DarkModeContext.Provider>
  );
};

export default DarkModeContext;

import React, { createContext, useContext, useState, useEffect } from "react";

// إنشاء الـ Context
const ContrastContext = createContext();

export const ContrastProvider = ({ children }) => {
  // حالة الـ Contrast Mode
  const [isContrastMode, setIsContrastMode] = useState(() => {
    // قراءة الحالة من Local Storage عند التحميل
    return localStorage.getItem("contrastMode") === "true";
  });

  // تطبيق أو إزالة التأثير
  const toggleContrastMode = () => {
    if (isContrastMode) {
      // إزالة التأثير
      document.documentElement.style.filter = "";
      document.documentElement.style.transition = "";
      localStorage.removeItem("contrastMode"); // إزالة من Local Storage
    } else {
      // تطبيق التأثير
      document.documentElement.style.filter = "contrast(2)";
      document.documentElement.style.transition = "filter 0.5s ease";
      localStorage.setItem("contrastMode", "true"); // تخزين في Local Storage
    }

    // تحديث الحالة
    setIsContrastMode(!isContrastMode);
  };

  // تطبيق التأثير عند التحميل إذا كانت الحالة مفعلّة
  useEffect(() => {
    if (isContrastMode) {
      document.documentElement.style.filter = "contrast(2)";
      document.documentElement.style.transition = "filter 0.5s ease";
    }
  }, [isContrastMode]);

  return (
    <ContrastContext.Provider value={{ isContrastMode, toggleContrastMode }}>
      {children}
    </ContrastContext.Provider>
  );
};

// Custom Hook لاستخدام الـ Context
export const useContrastMode = () => useContext(ContrastContext);

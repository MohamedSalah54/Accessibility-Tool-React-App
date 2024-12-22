import React, { createContext, useContext, useState, useEffect } from "react";

// إنشاء الـ Context
const MonochromeContext = createContext();

export const MonochromeProvider = ({ children }) => {
  // حالة الـ monochrome
  const [isMonochrome, setIsMonochrome] = useState(() => {
    // قراءة الحالة من Local Storage عند التحميل
    return localStorage.getItem("monochromeMode") === "true";
  });

  // تطبيق أو إزالة التأثير
  const toggleMonochrome = () => {
    if (isMonochrome) {
      // إزالة التأثير
      document.documentElement.style.filter = "";
      document.documentElement.style.transition = "";
      localStorage.removeItem("monochromeMode"); // إزالة من Local Storage
    } else {
      // تطبيق التأثير
      document.documentElement.style.filter = "grayscale(100%)";
      document.documentElement.style.transition = "filter 0.5s ease";
      localStorage.setItem("monochromeMode", "true"); // تخزين في Local Storage
    }

    // تحديث الحالة
    setIsMonochrome(!isMonochrome);
  };

  // تطبيق التأثير عند التحميل إذا كانت الحالة مفعلّة
  useEffect(() => {
    if (isMonochrome) {
      document.documentElement.style.filter = "grayscale(100%)";
      document.documentElement.style.transition = "filter 0.5s ease";
    }
  }, [isMonochrome]);

  return (
    <MonochromeContext.Provider value={{ isMonochrome, toggleMonochrome }}>
      {children}
    </MonochromeContext.Provider>
  );
};

// Custom Hook لاستخدام الـ Context
export const useMonochrome = () => useContext(MonochromeContext);

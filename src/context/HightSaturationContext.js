import React, { createContext, useContext, useState, useEffect } from "react";

// إنشاء الـ Context
const HighSaturationContext = createContext();

export const HighSaturationProvider = ({ children }) => {
  // حالة الـ High Saturation
  const [isHighSaturation, setIsHighSaturation] = useState(() => {
    // قراءة الحالة من Local Storage عند التحميل
    return localStorage.getItem("highSaturationMode") === "true";
  });

  // تطبيق أو إزالة التأثير
  const toggleHighSaturation = () => {
    if (isHighSaturation) {
      // إزالة التأثير
      document.documentElement.style.filter = "";
      document.documentElement.style.transition = "";
      localStorage.removeItem("highSaturationMode"); // إزالة من Local Storage
    } else {
      // تطبيق التأثير
      document.documentElement.style.filter = "saturate(2)";
      document.documentElement.style.transition = "filter 0.5s ease";
      localStorage.setItem("highSaturationMode", "true"); // تخزين في Local Storage
    }

    // تحديث الحالة
    setIsHighSaturation(!isHighSaturation);
  };

  // تطبيق التأثير عند التحميل إذا كانت الحالة مفعلّة
  useEffect(() => {
    if (isHighSaturation) {
      document.documentElement.style.filter = "saturate(2)";
      document.documentElement.style.transition = "filter 0.5s ease";
    }
  }, [isHighSaturation]);

  return (
    <HighSaturationContext.Provider value={{ isHighSaturation, toggleHighSaturation }}>
      {children}
    </HighSaturationContext.Provider>
  );
};

// Custom Hook لاستخدام الـ Context
export const useHighSaturation = () => useContext(HighSaturationContext);

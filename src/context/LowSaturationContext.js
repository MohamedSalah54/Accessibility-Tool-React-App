import React, { createContext, useContext, useState, useEffect } from "react";

// إنشاء الـ Context
const LowSaturationContext = createContext();

export const LowSaturationProvider = ({ children }) => {
  // حالة الـ Low Saturation
  const [isLowSaturation, setIsLowSaturation] = useState(() => {
    // قراءة الحالة من Local Storage عند التحميل
    return localStorage.getItem("lowSaturationMode") === "true";
  });

  // تطبيق أو إزالة التأثير
  const toggleLowSaturation = () => {
    if (isLowSaturation) {
      // إزالة التأثير
      document.documentElement.style.filter = "";
      document.documentElement.style.transition = "";
      localStorage.removeItem("lowSaturationMode"); // إزالة من Local Storage
    } else {
      // تطبيق التأثير
      document.documentElement.style.filter = "saturate(0.3)";
      document.documentElement.style.transition = "filter 0.5s ease";
      localStorage.setItem("lowSaturationMode", "true"); // تخزين في Local Storage
    }

    // تحديث الحالة
    setIsLowSaturation(!isLowSaturation);
  };

  // تطبيق التأثير عند التحميل إذا كانت الحالة مفعلّة
  useEffect(() => {
    if (isLowSaturation) {
      document.documentElement.style.filter = "saturate(0.3)";
      document.documentElement.style.transition = "filter 0.5s ease";
    }
  }, [isLowSaturation]);

  return (
    <LowSaturationContext.Provider value={{ isLowSaturation, toggleLowSaturation }}>
      {children}
    </LowSaturationContext.Provider>
  );
};

// Custom Hook لاستخدام الـ Context
export const useLowSaturation = () => useContext(LowSaturationContext);

import React, { createContext, useContext, useState, useEffect } from "react";

// إنشاء الـ Context
const MagnifierContext = createContext();

export const MagnifierProvider = ({ children }) => {
  // حالة الـ Magnifier
  const [isMagnifierActive, setIsMagnifierActive] = useState(() => {
    // قراءة الحالة من Local Storage عند التحميل
    return localStorage.getItem("magnifierMode") === "true";
  });

  // تطبيق أو إزالة تأثير التكبير
  const toggleMagnifier = () => {
    if (isMagnifierActive) {
      // إزالة التأثير
      document.documentElement.style.transform = "";
      document.documentElement.style.transition = "";
      localStorage.removeItem("magnifierMode"); // إزالة من Local Storage
    } else {
      // تطبيق التأثير
      document.documentElement.style.transform = "scale(1.5)";
      document.documentElement.style.transformOrigin = "center center";
      document.documentElement.style.transition = "transform 0.5s ease";
      localStorage.setItem("magnifierMode", "true"); // تخزين في Local Storage
    }

    // تحديث الحالة
    setIsMagnifierActive(!isMagnifierActive);
  };

  // تطبيق التأثير عند التحميل إذا كانت الحالة مفعلّة
  useEffect(() => {
    if (isMagnifierActive) {
      document.documentElement.style.transform = "scale(1.5)";
      document.documentElement.style.transformOrigin = "center center";
      document.documentElement.style.transition = "transform 0.5s ease";
    } else {
      document.documentElement.style.transform = "";
      document.documentElement.style.transition = "";
    }
  }, [isMagnifierActive]);

  return (
    <MagnifierContext.Provider value={{ isMagnifierActive, toggleMagnifier }}>
      {children}
    </MagnifierContext.Provider>
  );
};

// Custom Hook لاستخدام الـ Context
export const useMagnifier = () => useContext(MagnifierContext);

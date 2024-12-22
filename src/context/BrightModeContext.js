import React, { createContext, useState, useEffect } from "react";

// إنشاء Context لوضع الـ Bright Mode
export const BrightModeContext = createContext();

// إنشاء Provider لـ Bright Mode
export const BrightModeProvider = ({ children }) => {
  const [isBrightMode, setIsBrightMode] = useState(false);

  // استرجاع الوضع المحفوظ من LocalStorage
  useEffect(() => {
    const savedMode = localStorage.getItem("brightMode");
    if (savedMode) {
      setIsBrightMode(savedMode === "true");
    }
  }, []);

  // التبديل بين وضع الـ Bright Mode و الوضع الافتراضي
  const toggleBrightMode = () => {
    const newMode = !isBrightMode;
    setIsBrightMode(newMode);
    localStorage.setItem("brightMode", newMode.toString());
  };

  // تطبيق أو إزالة تأثيرات وضع الـ Bright Mode
  useEffect(() => {
    if (isBrightMode) {
      // تعيين الخلفية باللون الأبيض والنصوص باللون المحدد
      document.body.style.backgroundColor = "#ffffff";
      document.querySelectorAll("nav").forEach((el) => {
        el.style.backgroundColor = "#fff"; // لون النص

      });
      document.querySelectorAll("h1,h2,h3,h4,h5,h6,p,span,a").forEach((el)=>{
        el.style.color = "#191970"
      })
   
    } else {
      // إعادة جميع الأنماط إلى الوضع الافتراضي
      document.body.style.removeProperty("background-color");
      document.querySelectorAll("nav").forEach((el) => {
        el.style.backgroundColor= "black"
      });
      document.querySelectorAll("a").forEach((el) => {
        el.style.color= "white"
      });
  
      document.querySelectorAll("h1,h2,h3,h4,h5,h6,p,span").forEach((el)=>{
        el.style.removeProperty("color")
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

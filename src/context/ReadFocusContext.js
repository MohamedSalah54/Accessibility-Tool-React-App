import React, { createContext, useContext, useEffect, useState } from "react";

const ReadFocusContext = createContext();

export const ReadFocusProvider = ({ children }) => {
  const [readFocusMode, setReadFocusMode] = useState(
    JSON.parse(localStorage.getItem("readFocusMode")) || false
  );

  const toggleReadFocusMode = () => {
    const newMode = !readFocusMode;
    setReadFocusMode(newMode);
    if (newMode) {
      localStorage.setItem("readFocusMode", true);
    } else {
      localStorage.removeItem("readFocusMode");
    }
  };

  useEffect(() => {
    let overlayDiv;

    if (readFocusMode) {
      // إنشاء الطبقة المظللة
      overlayDiv = document.createElement("div");
      overlayDiv.style.position = "fixed";
      overlayDiv.style.pointerEvents = "none";
      overlayDiv.style.top = "0";
      overlayDiv.style.left = "0";
      overlayDiv.style.width = "100vw";
      overlayDiv.style.height = "100vh";
      overlayDiv.style.backgroundColor = "rgba(0, 0, 0, 0.5)"; // تخفيف الظل
      overlayDiv.style.zIndex = "1000";
      overlayDiv.style.transition = "clip-path 0.2s ease";
      overlayDiv.style.clipPath = "polygon(0 0, 100% 0, 100% 100%, 0 100%)"; // مبدئيًا لا يوجد جزء غير مظلل
      document.body.appendChild(overlayDiv);

      // تحديث الإضاءة بناءً على موقع الماوس
      const handleMouseMove = (event) => {
        const focusHeight = 150; // ارتفاع المنطقة المضيئة
        const y = event.clientY;

        // تعيين المنطقة المضيئة كمستطيل بعرض الشاشة وارتفاع معين
        overlayDiv.style.clipPath = `
          polygon(
            0 0, 
            100% 0, 
            100% ${y - focusHeight / 2}px, 
            0 ${y - focusHeight / 2}px, 
            0 ${y + focusHeight / 2}px, 
            100% ${y + focusHeight / 2}px, 
            100% 100%, 
            0 100%
          )`;
      };

      document.addEventListener("mousemove", handleMouseMove);

      // إزالة التأثير عند إلغاء الوضع
      return () => {
        document.body.removeChild(overlayDiv);
        document.removeEventListener("mousemove", handleMouseMove);
      };
    }
  }, [readFocusMode]);

  return (
    <ReadFocusContext.Provider value={{ readFocusMode, toggleReadFocusMode }}>
      {children}
    </ReadFocusContext.Provider>
  );
};

export const useReadFocus = () => useContext(ReadFocusContext);

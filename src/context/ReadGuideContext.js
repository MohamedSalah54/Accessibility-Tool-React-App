import React, { createContext, useContext, useEffect, useState } from "react";

const ReadingGuideContext = createContext();

export const ReadingGuideProvider = ({ children }) => {
  const [readingGuideMode, setReadingGuideMode] = useState(
    JSON.parse(localStorage.getItem("readingGuideMode")) || false
  );

  const toggleReadingGuideMode = () => {
    const newMode = !readingGuideMode;
    setReadingGuideMode(newMode);
    if (newMode) {
      localStorage.setItem("readingGuideMode", true);
    } else {
      localStorage.removeItem("readingGuideMode");
    }
  };

  useEffect(() => {
    let guideBar;

    if (readingGuideMode) {
      // إنشاء الشريط الذي يتبع الماوس
      guideBar = document.createElement("div");
      guideBar.style.position = "fixed";
      guideBar.style.pointerEvents = "none";
      guideBar.style.top = "0";
      guideBar.style.left = "0";
      guideBar.style.width = "100%";
      guideBar.style.height = "4px"; // ارتفاع الشريط
      guideBar.style.backgroundColor = "black"; // لون الشريط
      guideBar.style.zIndex = "1000";
      guideBar.style.transition = "transform 0.1s linear"; // حركة سلسة
      document.body.appendChild(guideBar);

      // تحريك الشريط مع الماوس
      const handleMouseMove = (event) => {
        const y = event.clientY;
        guideBar.style.transform = `translateY(${y}px)`;
      };

      document.addEventListener("mousemove", handleMouseMove);

      // تنظيف عند تعطيل الوضع
      return () => {
        document.body.removeChild(guideBar);
        document.removeEventListener("mousemove", handleMouseMove);
      };
    }
  }, [readingGuideMode]);

  return (
    <ReadingGuideContext.Provider value={{ readingGuideMode, toggleReadingGuideMode }}>
      {children}
    </ReadingGuideContext.Provider>
  );
};

export const useReadingGuide = () => useContext(ReadingGuideContext);

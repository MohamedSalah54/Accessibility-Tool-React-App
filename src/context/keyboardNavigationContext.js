import React, { createContext, useContext, useState, useEffect } from "react";

// إنشاء الـ Context
const KeyboardNavigationContext = createContext();

export const KeyboardNavigationProvider = ({ children }) => {
  const [isKeyboardNavigationActive, setIsKeyboardNavigationActive] = useState(
    () => JSON.parse(localStorage.getItem("keyboardNavigation")) || false
  );

  useEffect(() => {
    const handleTabPress = (e) => {
      if (e.key === "Tab") {
        e.preventDefault(); // منع السلوك الافتراضي للـ Tab
        const focusableElements = document.querySelectorAll("*"); // جميع العناصر
        const focusableArray = Array.from(focusableElements).filter((el) =>
          el.tabIndex >= 0
        );

        // الحصول على العنصر النشط حاليًا
        const currentIndex = focusableArray.indexOf(document.activeElement);

        // إزالة التأثير من العنصر النشط حاليًا (إن وجد)
        if (document.activeElement) {
          document.activeElement.style.outline = "none";
          document.activeElement.style.boxShadow = "none";
        }

        // تحديد العنصر التالي
        const nextIndex =
          e.shiftKey // إذا كان Shift مضغوطًا، ننتقل للخلف
            ? (currentIndex - 1 + focusableArray.length) % focusableArray.length
            : (currentIndex + 1) % focusableArray.length;

        const nextElement = focusableArray[nextIndex];

        // تركيز وإضافة التأثير على العنصر الجديد
        if (nextElement) {
          nextElement.focus();
          nextElement.style.outline = "3px solid yellow";
          nextElement.style.outlineOffset = "2px";
          nextElement.style.boxShadow = "0 0 10px yellow"; // إشعاع أصفر
        }
      }
    };

    if (isKeyboardNavigationActive) {
      document.addEventListener("keydown", handleTabPress);
    } else {
      // إزالة جميع التأثيرات عند تعطيل الوضع
      document.querySelectorAll("*").forEach((el) => {
        el.style.outline = "none";
        el.style.boxShadow = "none";
      });
      document.removeEventListener("keydown", handleTabPress);
    }

    return () => {
      document.removeEventListener("keydown", handleTabPress);
    };
  }, [isKeyboardNavigationActive]);

  useEffect(() => {
    localStorage.setItem(
      "keyboardNavigation",
      JSON.stringify(isKeyboardNavigationActive)
    );
  }, [isKeyboardNavigationActive]);

  const toggleKeyboardNavigation = () => {
    setIsKeyboardNavigationActive((prev) => !prev);
  };

  return (
    <KeyboardNavigationContext.Provider
      value={{ isKeyboardNavigationActive, toggleKeyboardNavigation }}
    >
      {children}
    </KeyboardNavigationContext.Provider>
  );
};

// Hook لاستخدام الـ Context
export const useKeyboardNavigation = () => useContext(KeyboardNavigationContext);

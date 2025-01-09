import React, { createContext, useContext, useState, useEffect } from "react";
import styles from '../../src/components/sidebar/AccessibilitySidebar.module.css'

const ScreenReaderContext = createContext();

export const ScreenReaderProvider = ({ children }) => {
  const [isScreenReaderActive, setIsScreenReaderActive] = useState(false);

  // Load initial state from localStorage
  useEffect(() => {
    const storedState = localStorage.getItem("screenReaderActive");
    if (storedState === "true") {
      setIsScreenReaderActive(true);
      activateScreenReader(); // تفعيل إذا كانت الحالة مخزنة
    }
  }, []);

  // Update localStorage and toggle listeners
  useEffect(() => {
    localStorage.setItem("screenReaderActive", isScreenReaderActive);

    if (isScreenReaderActive) {
      activateScreenReader();
    } else {
      deactivateScreenReader();
    }

    return () => {
      deactivateScreenReader(); // تنظيف المستمعين عند إلغاء التفعيل
    };
  }, [isScreenReaderActive]);

  // Toggle the screen reader mode
  const toggleScreenReader = () => {
    setIsScreenReaderActive((prevState) => !prevState);
  };

  // Activate the screen reader effect
  const activateScreenReader = () => {
    document.documentElement.addEventListener("mouseover", handleMouseOver);
    document.documentElement.addEventListener("mouseout", handleMouseOut);
  };

  // Deactivate the screen reader effect
  const deactivateScreenReader = () => {
    document.documentElement.removeEventListener("mouseover", handleMouseOver);
    document.documentElement.removeEventListener("mouseout", handleMouseOut);

    // تنظيف أي تأثيرات متبقية
    document.querySelectorAll("*").forEach((element) => {
      element.style.outline = "none";
      element.style.boxShadow = "none";
    });
  };

  // Add a border to the hovered element
  const handleMouseOver = (event) => {
    const target = event.target;
    // التحقق إذا كان العنصر داخل عنصر يحمل كلاس sidebar
    if (!target.closest(`.${styles.sidebar}`)) { // شرط الاستثناء
      if (target && target.style) {
        target.style.outline = "3px solid rgba(0, 0, 255, 1)"; // أزرق مشع قوي
        target.style.boxShadow = "0 0 8px 2px rgba(0, 0, 255, 0.9)"; // تأثير مشع إضافي
        target.style.transition = "outline 0.2s ease-in-out, box-shadow 0.2s ease-in-out";
      }
    }
  };

  // Remove the border when the mouse leaves the element
  const handleMouseOut = (event) => {
    const target = event.target;
    // التحقق إذا كان العنصر داخل عنصر يحمل كلاس sidebar
    if (!target.closest(`.${styles.sidebar}`)) { // شرط الاستثناء
      if (target && target.style) {
        target.style.outline = "none";
        target.style.boxShadow = "none"; // إزالة التأثير المشع
      }
    }
  };

  return (
    <ScreenReaderContext.Provider value={{ isScreenReaderActive, toggleScreenReader }}>
      {children}
    </ScreenReaderContext.Provider>
  );
};

export const useScreenReader = () => useContext(ScreenReaderContext);

import React, { createContext, useContext, useState, useEffect } from "react";
import styles from '../../src/components/sidebar/AccessibilitySidebar.module.css'

// إنشاء السياق
const MagnifierContext = createContext();

export const MagnifierProvider = ({ children }) => {
  // حالة تتبع الوضع
  const [isMagnifierActive, setIsMagnifierActive] = useState(() => {
    // قراءة الوضع من localStorage عند التحميل
    return localStorage.getItem("magnifierMode") === "true";
  });

  // وظيفة لتفعيل/إلغاء وضع التكبير
  const toggleMagnifier = () => {
    const newMode = !isMagnifierActive;
    setIsMagnifierActive(newMode);
    localStorage.setItem("magnifierMode", newMode); // تخزين في localStorage
  };

  // تطبيق/إزالة التأثير باستخدام DOM
  useEffect(() => {
    const scaleElements = () => {
      // تحديد العناصر التي نريد تطبيق التكبير عليها
      const elements = document.querySelectorAll("h1, h2, h3, h4, h5, h6, p, span, input, button, textarea, a");
      elements.forEach((el) => {
        // التحقق إذا كان العنصر داخل div يحتوي على كلاس sidebar
        if (!el.closest(`.${styles.sidebar}`)) { // شرط الاستثناء
          if (isMagnifierActive) {
            el.style.transform = "scale(1.6)"; // تكبير بنسبة 60%
            el.style.transition = "transform 0.3s ease"; // تأثير الحركة

            // في حالة كان العنصر <a>، نقوم بتعديل الـ display ليصبح inline-block
            if (el.tagName === "A") {
              el.style.display = "inline-block"; // نغيرها إلى inline-block
            }
          } else {
            el.style.transform = ""; // إعادة القيم الافتراضية
            el.style.transition = ""; // إزالة التأثير

            // إعادة الخاصية display لوضعها الافتراضي
            if (el.tagName === "A") {
              el.style.display = "";
            }
          }
        }
      });
    };

    scaleElements(); // تطبيق التأثير عند تغيير الوضع

    // منع التمرير الأفقي عند تفعيل التكبير
    if (isMagnifierActive) {
      document.body.style.overflowX = "hidden"; // إخفاء التمرير الأفقي
    } else {
      document.body.style.overflowX = ""; // إعادة التمرير الأفقي إلى الوضع الطبيعي
    }
  }, [isMagnifierActive]);

  return (
    <MagnifierContext.Provider value={{ isMagnifierActive, toggleMagnifier }}>
      {children}
    </MagnifierContext.Provider>
  );
};

// استخدام MagnifierContext في المكونات الأخرى
export const useMagnifier = () => useContext(MagnifierContext);

import React, { createContext, useState, useEffect, useContext } from "react";
import styles from '../../src/components/sidebar/AccessibilitySidebar.module.css';

// إنشاء الـ Context
export const FontContext = createContext();

// استخدام الـ Hook لاستخراج الـ Context
export const useFontContext = () => useContext(FontContext);

export const FontProvider = ({ children }) => {
  const [fontSizeIncrement, setFontSizeIncrement] = useState(5); // مقدار الزيادة لكل عنصر
  const [lineSpacing, setLineSpacing] = useState(1.5); // التباعد بين الأسطر
  const [wordSpacing, setWordSpacing] = useState("normal"); // التباعد بين الكلمات
  const [letterSpacing, setLetterSpacing] = useState(0); // التباعد بين الحروف
  const [defaultFontSizes, setDefaultFontSizes] = useState({}); // تخزين القيم الافتراضية

  const updateFont = (type, increment = true) => {
    if (typeof window !== "undefined") {
      const step = 0.5; // مقدار الزيادة أو النقصان
      let newValue;

      switch (type) {
        case "fontSize":
          newValue = increment ? fontSizeIncrement + 2 : fontSizeIncrement - 2;
          setFontSizeIncrement(newValue);
          break;

        case "lineSpacing":
          newValue = increment ? lineSpacing + step : lineSpacing - step;
          newValue = Math.max(1.0, Math.min(2.5, newValue)); // الحد الأدنى والأقصى
          setLineSpacing(newValue);
          break;

        case "letterSpacing":
          newValue = increment ? letterSpacing + step : letterSpacing - step;
          newValue = Math.max(0, Math.min(2, newValue)); // الحد الأدنى والأقصى
          setLetterSpacing(newValue);
          break;

        case "wordSpacing":
          let currentSpacing = wordSpacing === "normal" ? 0 : parseFloat(wordSpacing);
          newValue = increment ? currentSpacing + step : currentSpacing - step;
          setWordSpacing(`${newValue}em`);
          break;

        default:
          break;
      }
    }
  };

  useEffect(() => {
    // حفظ القيم الافتراضية عند تحميل الصفحة لأول مرة
    if (typeof window !== "undefined") {
      const elements = document.querySelectorAll(
        "a, span, p, label, h1, h2, h3, h4, h5, h6, div[contenteditable], li, strong, em, u, button[contenteditable]"
      );

      const defaultSizes = {};
      elements.forEach((el) => {
        const tagName = el.tagName.toLowerCase();
        if (!defaultSizes[tagName]) {
          defaultSizes[tagName] = window.getComputedStyle(el).fontSize; // تخزين حجم الخط الافتراضي
        }
      });

      setDefaultFontSizes(defaultSizes);
    }
  }, []);

  useEffect(() => {
    // تطبيق التعديلات بناءً على الزيادة
    if (Object.keys(defaultFontSizes).length > 0) {
      const elements = document.querySelectorAll(
        "a, span, p, label, h1, h2, h3, h4, h5, h6, div[contenteditable], li, strong, em, u, button"
      );
  
      elements.forEach((el) => {
        if (!el.closest(`.${styles.sidebar}`)) {
          const tagName = el.tagName.toLowerCase();
          const defaultFontSize = parseFloat(defaultFontSizes[tagName]) || 16;
  
          el.style.fontSize = `${defaultFontSize + fontSizeIncrement}px`;
          el.style.lineHeight = lineSpacing;
          el.style.wordSpacing = wordSpacing;
          el.style.letterSpacing = `${letterSpacing}px`;
        }
      });
    }
  }, [fontSizeIncrement, lineSpacing, wordSpacing, letterSpacing, defaultFontSizes]);
  

  return (
    <FontContext.Provider value={{ fontSizeIncrement, lineSpacing, wordSpacing, letterSpacing, updateFont }}>
      {children}
    </FontContext.Provider>
  );
};

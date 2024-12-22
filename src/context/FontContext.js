import React, { createContext, useState, useEffect, useContext } from "react";
import { useTranslation } from "react-i18next";

// إنشاء الـ Context
export const FontContext = createContext();

// استخدام الـ Hook لاستخراج الـ Context
export const useFontContext = () => useContext(FontContext);

export const FontProvider = ({ children }) => {
  const [fontSize, setFontSize] = useState(16);  // حجم الخط
  const [lineSpacing, setLineSpacing] = useState(1.5); // المسافة بين الأسطر
  const [wordSpacing, setWordSpacing] = useState("normal"); // المسافة بين الكلمات
  const [letterSpacing, setLetterSpacing] = useState(0); // المسافة بين الحروف بالـ px

  const updateFont = (type, increment = true) => {
    if (typeof window !== "undefined") {
      const step = 0.5; // مقدار الزيادة أو النقصان للمسافات
      let newValue;

      switch (type) {
        case "fontSize":
          newValue = increment ? fontSize + 2 : fontSize - 2;
          newValue = Math.max(10, Math.min(30, newValue)); // الحد الأدنى والأقصى
          setFontSize(newValue);
          localStorage.setItem("fontSize", newValue);
          break;

        case "lineSpacing":
          newValue = increment ? lineSpacing + step : lineSpacing - step;
          newValue = Math.max(1.0, Math.min(2.5, newValue)); // الحد الأدنى والأقصى
          setLineSpacing(newValue);
          localStorage.setItem("lineSpacing", newValue);
          break;

        case "letterSpacing":
          newValue = increment ? letterSpacing + step : letterSpacing - step;
          newValue = Math.max(0, Math.min(2, newValue)); // الحد الأدنى والأقصى
          setLetterSpacing(newValue);
          localStorage.setItem("letterSpacing", newValue);
          break;

        case "wordSpacing":
          let currentSpacing = wordSpacing === "normal" ? 0 : parseFloat(wordSpacing);  // إذا كانت القيمة "normal"، نعتبرها 0
          newValue = increment ? currentSpacing + step : currentSpacing - step;
          setWordSpacing(`${newValue}em`);  // تحويل القيمة إلى وحدة em
          localStorage.setItem("wordSpacing", `${newValue}em`);
          break;

        default:
          break;
      }
    }
  };

  useEffect(() => {
    if (typeof window !== "undefined") {
      const savedFontSize = localStorage.getItem("fontSize");
      const savedLineSpacing = localStorage.getItem("lineSpacing");
      const savedWordSpacing = localStorage.getItem("wordSpacing");
      const savedLetterSpacing = localStorage.getItem("letterSpacing");

      if (savedFontSize) setFontSize(Number(savedFontSize));
      if (savedLineSpacing) setLineSpacing(Number(savedLineSpacing));
      if (savedWordSpacing) setWordSpacing(savedWordSpacing);
      if (savedLetterSpacing) setLetterSpacing(Number(savedLetterSpacing));
    }
  }, []);

  useEffect(() => {
    document.documentElement.style.fontSize = `${fontSize}px`;
    document.documentElement.style.lineHeight = lineSpacing;
    document.documentElement.style.wordSpacing = wordSpacing;
    document.documentElement.style.letterSpacing = `${letterSpacing}px`;
  }, [fontSize, lineSpacing, wordSpacing, letterSpacing]);

  return (
    <FontContext.Provider value={{ fontSize, lineSpacing, wordSpacing, letterSpacing, updateFont }}>
      {children}
    </FontContext.Provider>
  );
};



import { createContext, useState, useEffect, useContext } from "react";
import cursorWhite from '../icons/assets/images/cursors/bigcursorwhite.svg';
import CursorBlack from "../icons/assets/images/cursors/bigcursorblack.svg";
import CursorHandWhite from "../icons/assets/images/cursors/bighandwhite.svg";
import CursorHandBlack from "../icons/assets/images/cursors/bighandblack.svg";

export const CursorContext = createContext();

export const useCursorContext = () => useContext(CursorContext);

export const CursorProvider = ({ children }) => {
  const [cursorColor, setCursorColor] = useState("default");

  // تحديث المؤشر وتخزينه في localStorage
  const updateCursor = (color, cursorUrl, handCursorUrl) => {
    setCursorColor(color);
    if (typeof window !== "undefined") {
      localStorage.setItem("cursorColor", color); // تخزين اللون في localStorage
    }

    // تعيين المؤشر على مستوى الـ HTML بدلاً من body
    document.documentElement.style.cursor = `url(${cursorUrl}), auto`;

    // تعيين اليد الكبيرة للعناصر القابلة للنقر
    const clickableElements = document.querySelectorAll(
      'button, a, span, label, input[type="button"], input[type="submit"], input[type="checkbox"], input[type="radio"], select'
    );
    clickableElements.forEach((el) => {
      el.style.cursor = `url(${handCursorUrl}), auto`;
    });
  };

  const handleWhiteCursor = () => {
    updateCursor("white", cursorWhite, CursorHandWhite);
  };

  const handleBlackCursor = () => {
    updateCursor("black", CursorBlack, CursorHandBlack);
  };

  const resetCursor = () => {
    setCursorColor("default");
    if (typeof window !== "undefined") {
      localStorage.removeItem("cursorColor");
    }

    // إعادة المؤشر إلى الوضع الافتراضي
    document.documentElement.style.cursor = "auto";

    // إعادة المؤشر اليدوي الافتراضي للعناصر القابلة للنقر
    const clickableElements = document.querySelectorAll(
      'button, a, span, input[type="button"], input[type="submit"]'
    );
    clickableElements.forEach((el) => {
      el.style.cursor = "pointer";
    });
  };

  useEffect(() => {
    if (typeof window !== "undefined") {
      // عند تحميل الصفحة، تحقق من اللون المخزن للمؤشر
      const savedCursorColor = localStorage.getItem("cursorColor");
      if (savedCursorColor === "white") {
        handleWhiteCursor();
      } else if (savedCursorColor === "black") {
        handleBlackCursor();
      }
    }
  }, []); // يتم استدعاءه مرة واحدة عند تحميل الصفحة

  // تأكد من أنه بعد تحميل كل شيء يتم ضبط المؤشر
  useEffect(() => {
    const cursorTimeout = setTimeout(() => {
      if (cursorColor === "default") {
        document.documentElement.style.cursor = "auto"; // وضع المؤشر الافتراضي في حالة عدم تخصيصه
      }
    }, 100); // تأخير بسيط للتأكد من ضبط المؤشر بعد تحميل الصفحة

    return () => clearTimeout(cursorTimeout); // تنظيف timeout عند إلغاء التثبيت
  }, [cursorColor]);

  return (
    <CursorContext.Provider
      value={{
        cursorColor,
        handleWhiteCursor,
        handleBlackCursor,
        resetCursor,
      }}
    >
      {children}
    </CursorContext.Provider>
  );
};

export default CursorContext;

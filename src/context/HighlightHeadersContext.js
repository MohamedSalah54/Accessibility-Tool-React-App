// highlightHeadersContext.js
import React, { createContext, useState, useEffect, useContext } from 'react';

// إنشاء الـ Context
const HighlightHeadersContext = createContext();

// إنشاء الـ Provider الخاص بالـ Context
export const HighlightHeadersProvider = ({ children }) => {
  const [isHighlighted, setIsHighlighted] = useState(false);

  // جلب الحالة المخزنة من localStorage
  useEffect(() => {
    const savedState = localStorage.getItem('highlightHeaders');
    if (savedState === 'true') {
      setIsHighlighted(true);
    }
  }, []);

  // تفعيل أو إلغاء تفعيل التحديد
  const toggleHighlightHeaders = () => {
    const newState = !isHighlighted;
    setIsHighlighted(newState);
    localStorage.setItem('highlightHeaders', newState.toString());
  };

  // التأكد من تطبيق التحديد على جميع العناوين
  useEffect(() => {
    if (isHighlighted) {
      document.documentElement.style.setProperty('--highlight-color', 'black');
      // إضافة خط أسود تحت العناوين من h1 إلى h6
      for (let i = 1; i <= 6; i++) {
        const headers = document.querySelectorAll(`h${i}`);
        headers.forEach(header => {
          header.style.borderBottom = '2px solid black';
        });
      }
    } else {
      document.documentElement.style.setProperty('--highlight-color', '');
      // إزالة الخط من العناوين
      for (let i = 1; i <= 6; i++) {
        const headers = document.querySelectorAll(`h${i}`);
        headers.forEach(header => {
          header.style.borderBottom = '';
        });
      }
    }
  }, [isHighlighted]);

  return (
    <HighlightHeadersContext.Provider value={{ isHighlighted, toggleHighlightHeaders }}>
      {children}
    </HighlightHeadersContext.Provider>
  );
};

// استخدام الـ Context في أي مكان آخر
export const useHighlightHeaders = () => useContext(HighlightHeadersContext);

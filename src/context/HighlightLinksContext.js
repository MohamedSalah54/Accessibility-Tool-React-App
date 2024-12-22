// highlightLinksContext.js
import React, { createContext, useState, useEffect, useContext } from 'react';

// إنشاء الـ Context
const HighlightLinksContext = createContext();

// إنشاء الـ Provider الخاص بالـ Context
export const HighlightLinksProvider = ({ children }) => {
  const [isHighlighted, setIsHighlighted] = useState(false);

  // جلب الحالة المخزنة من localStorage
  useEffect(() => {
    const savedState = localStorage.getItem('highlightLinks');
    if (savedState === 'true') {
      setIsHighlighted(true);
    }
  }, []);

  // تفعيل أو إلغاء تفعيل التحديد
  const toggleHighlightLinks = () => {
    const newState = !isHighlighted;
    setIsHighlighted(newState);
    localStorage.setItem('highlightLinks', newState.toString());
  };

  // التأكد من تطبيق التحديد على جميع الروابط
  useEffect(() => {
    if (isHighlighted) {
      document.documentElement.style.setProperty('--highlight-color', 'red');
      document.querySelectorAll('a').forEach(link => {
        link.style.borderBottom = '2px solid red'; // إضافة خط أسفل الرابط
        link.style.color = "red"
      });
    } else {
      document.documentElement.style.setProperty('--highlight-color', '');
      document.querySelectorAll('a').forEach(link => {
        link.style.borderBottom = ''; // إزالة الخط من الروابط
        link.style.color ='white'
      });
    }
  }, [isHighlighted]);

  return (
    <HighlightLinksContext.Provider value={{ isHighlighted, toggleHighlightLinks }}>
      {children}
    </HighlightLinksContext.Provider>
  );
};

// استخدام الـ Context في أي مكان آخر
export const useHighlightLinks = () => useContext(HighlightLinksContext);

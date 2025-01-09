import React, { createContext, useState, useEffect } from 'react';
import styles from '../../src/components/sidebar/AccessibilitySidebar.module.css'

// إنشاء Context جديد
export const ReadableFontContext = createContext();

export const ReadableFontProvider = ({ children }) => {
  // حالة الوضع وتهيئتها من localStorage
  const [isReadableFont, setisReadableFont] = useState(() => {
    const savedMode = localStorage.getItem('readableMode');
    return savedMode === 'true'; // يعيد القيمة من localStorage إذا كانت موجودة
  });

  // وظيفة لتطبيق الخط sans-serif على العناصر
  const applyFontToSection = () => {
    // تغيير الخط إلى sans-serif لجميع العناصر
    if (!document.body.closest(`.${styles.sidebar}`)) {
      // تغيير الخط إلى sans-serif لجميع العناصر
      document.body.style.fontFamily = 'sans-serif';
    }
    // تغيير الخط للعناوين والنصوص
    document.querySelectorAll("h1, h2, h3, h4, h5, h6, p, span, a, li").forEach((el) => {
      if (!el.closest(`.${styles.sidebar}`)) {
      el.style.fontFamily = 'sans-serif';}
    });
  };

  // وظيفة لإعادة الخط إلى الخط الافتراضي
  const removeFontFromSection = () => {
    document.body.style.fontFamily = '';
    document.querySelectorAll("h1, h2, h3, h4, h5, h6, p, span, a, li").forEach((el) => {
      if (!el.closest(`.${styles.sidebar}`)) {
      el.style.fontFamily = '';}
    });
  };

  // دالة لتبديل وضع القراءة
  const toggleReadableFont = () => {
    setisReadableFont(prevState => {
      const newMode = !prevState;
      localStorage.setItem('readableMode', newMode.toString()); // حفظ الوضع في localStorage
      if (newMode) {
        applyFontToSection(); // تطبيق الخط عند تفعيل الوضع
      } else {
        removeFontFromSection(); // إعادة الخط عند إلغاء الوضع
      }
      return newMode;
    });
  };

  return (
    <ReadableFontContext.Provider value={{ isReadableFont, toggleReadableFont }}>
      {children}
    </ReadableFontContext.Provider>
  );
};

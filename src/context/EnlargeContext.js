import React, { createContext, useContext, useState, useEffect } from 'react';
import styles from '../../src/components/sidebar/AccessibilitySidebar.module.css';

const EnlargeContext = createContext();

export const useEnlargeContext = () => useContext(EnlargeContext);

export const EnlargeProvider = ({ children }) => {
  const [isEnlarged, setIsEnlarged] = useState(false);

  // تحميل الحالة من localStorage عند بداية التحميل
  useEffect(() => {
    const savedState = localStorage.getItem('enlargedButtons');
    if (savedState === 'true') {
      setIsEnlarged(true);
      // تكبير الأزرار عند استرجاع الحالة
      updateButtonSize(true);
    } else {
      updateButtonSize(false); // إعادة الحجم الطبيعي
    }
  }, []);

  // تحديث الحالة في localStorage عند التغيير
  useEffect(() => {
    localStorage.setItem('enlargedButtons', isEnlarged);
    // تحديث حجم الأزرار
    updateButtonSize(isEnlarged);
  }, [isEnlarged]);

  const toggleEnlarge = () => {
    setIsEnlarged((prev) => !prev); // التبديل بين الوضعين
  };

  const updateButtonSize = (enlarged) => {
    const buttons = document.querySelectorAll('button'); // الحصول على جميع الأزرار
    buttons.forEach((button) => {
      // إذا كان الزر ليس داخل sidebar
      if (!button.closest(`.${styles.sidebar}`)) {
        if (enlarged) {
          button.style.transform = 'scale(1.5)'; // تكبير الأزرار
        } else {
          button.style.transform = 'scale(1)'; // الحجم العادي
        }
        button.style.transition = 'transform 0.3s ease'; // تأثير الانتقال
      }
    });
  };

  return (
    <EnlargeContext.Provider value={{ isEnlarged, toggleEnlarge }}>
      {children}
    </EnlargeContext.Provider>
  );
};

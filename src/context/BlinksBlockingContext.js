import React, { createContext, useContext, useEffect, useState } from "react";

const BlinksBlockingContext = createContext();

export const BlinksBlockingProvider = ({ children }) => {
  const [isDisabled, setIsDisabled] = useState(() => {
    return localStorage.getItem("disableEffectsMode") === "true";
  });

  useEffect(() => {
    if (isDisabled) {
      // تعطيل الترانسفورم والانتقال على مستوى الـ document
      document.documentElement.style.transform = "none";
      document.documentElement.style.transition = "none";

      // إلغاء تأثيرات الترانسفورم لجميع العناصر
      const allElements = document.querySelectorAll('*');
      allElements.forEach(element => {
        element.style.transform = "none";
        element.style.transition = "none";
      });
    } else {
      // إعادة الخصائص إلى الوضع الافتراضي
      document.documentElement.style.transform = "";
      document.documentElement.style.transition = "";

      // إعادة التأثيرات لجميع العناصر
      const allElements = document.querySelectorAll('*');
      allElements.forEach(element => {
        element.style.transform = "";
        element.style.transition = "";
      });
    }
  }, [isDisabled]);

  const toggleDisableEffects = () => {
    const newState = !isDisabled;
    setIsDisabled(newState);
    localStorage.setItem("disableEffectsMode", newState);
  };

  return (
    <BlinksBlockingContext.Provider value={{ isDisabled, toggleDisableEffects }}>
      {children}
    </BlinksBlockingContext.Provider>
  );
};

export const useBlinksBlocking = () => {
  return useContext(BlinksBlockingContext);
};

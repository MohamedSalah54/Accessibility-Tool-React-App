import React, { createContext, useState, useContext, useEffect } from 'react';

// إنشاء الـ Context باسم SmartNavigateContext
const SmartNavigateContext = createContext();

// توفير الـ Context للـ Components
export const useSmartNavigateContext = () => useContext(SmartNavigateContext);

export const SmartNavigateProvider = ({ children }) => {
  const [isActive, setIsActive] = useState(false);  // لتفعيل أو إيقاف الوضع
  const [highlightedElement, setHighlightedElement] = useState(null);  // العنصر الذي تم تمييزه
  const [elements, setElements] = useState([]);  // قائمة العناصر في الصفحة
  const [inputNumber, setInputNumber] = useState(''); // الرقم الذي يتم إدخاله
  const [timer, setTimer] = useState(null); // توقيت تأخير إدخال الأرقام

  // تفعيل الوضع أو إيقافه عند الضغط على الزر
  const toggleSmartMode = () => {
    setIsActive(prev => !prev);
    if (!isActive) {
      localStorage.setItem('highlightMode', 'true');
    } else {
      localStorage.removeItem('highlightMode');
    }
  };

  // التأثير الذي يتحقق عند تحميل الصفحة أو تغيير وضع الـ Mode
  useEffect(() => {
    const savedMode = localStorage.getItem('highlightMode');
    if (savedMode === 'true') {
      setIsActive(true);
    }
  }, []);

  // دالة لإضافة الأرقام بجانب العناصر
  const addNumbersToElements = () => {
    if (isActive) {
      const elementsList = Array.from(document.querySelectorAll('h1, h2, h3, p, div, span'));  // تحديد العناصر الهامة
      setElements(elementsList);

      // إضافة الأرقام بجانب العناصر
      elementsList.forEach((el, index) => {
        const numberElement = document.createElement('span');
        numberElement.textContent = index + 1;
        numberElement.style.position = 'absolute';
        numberElement.style.top = '0';
        numberElement.style.left = '0';
        numberElement.style.fontSize = '14px';
        numberElement.style.backgroundColor = 'rgba(0, 0, 0, 0.5)';
        numberElement.style.color = 'white';
        numberElement.style.padding = '2px 5px';
        numberElement.style.borderRadius = '50%';
        numberElement.style.zIndex = '1000';
        el.style.position = 'relative';  // جعل العنصر يحتوي على الأرقام بشكل صحيح

        el.appendChild(numberElement);
      });
    }
  };

  // التأثير لتطبيق الأرقام على العناصر في الصفحة
  useEffect(() => {
    addNumbersToElements();
  }, [isActive]);

  // دالة لتغيير الـ border عند الضغط على رقم من الكيبورد
  const handleKeyPress = (event) => {
    // إضافة الرقم الذي تم إدخاله إلى السلسلة
    if (event.key >= '0' && event.key <= '9') {
      setInputNumber((prev) => prev + event.key);
      
      // إعادة تعيين المؤقت في حالة إدخال رقم جديد
      if (timer) {
        clearTimeout(timer);
      }

      // تعيين مؤقت لإغلاق إدخال الرقم بعد فترة قصيرة (مثلاً 500 مللي ثانية)
      setTimer(setTimeout(() => {
        processInputNumber(inputNumber);
        setInputNumber(''); // إعادة تعيين السلسلة بعد المعالجة
      }, 500));
    }
  };

  // دالة لمعالجة الرقم المدخل
  const processInputNumber = (number) => {
    const elementIndex = parseInt(number) - 1;  // لأن الأرقام تبدأ من 1

    // التأكد من أن الرقم المدخل صحيح (يتراوح بين 1 وعدد العناصر)
    if (elementIndex >= 0 && elementIndex < elements.length) {
      // عند الضغط على رقم أكبر من العدد الإجمالي للعناصر، نقوم بإعادته إلى 0 لإعادة التكرار
      if (elementIndex >= elements.length) {
        elementIndex = elementIndex % elements.length;
      }

      const element = elements[elementIndex];

      // إزالة الـ border من العنصر السابق
      if (highlightedElement) {
        highlightedElement.style.border = '';
      }

      // إضافة الـ border للعنصر الجديد
      element.style.border = '2px dashed white';
      setHighlightedElement(element);  // تحديث العنصر المميز
    }
  };

  // الاستماع لأحداث الكيبورد
  useEffect(() => {
    if (isActive) {
      document.addEventListener('keydown', handleKeyPress);
    } else {
      document.removeEventListener('keydown', handleKeyPress);
    }

    return () => document.removeEventListener('keydown', handleKeyPress);
  }, [isActive, elements, highlightedElement, inputNumber]);

  return (
    <SmartNavigateContext.Provider value={{ toggleSmartMode, isActive, elements, highlightedElement }}>
      {children}
    </SmartNavigateContext.Provider>
  );
};

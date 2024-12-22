import { useState } from "react";

function useLocalStorage(key, initialValue) {
  // استخدام useState مع استرجاع القيمة من localStorage
  const [storedValue, setStoredValue] = useState(() => {
    if (typeof window !== "undefined") {
      try {
        // استرجاع العنصر من localStorage
        const item = window.localStorage.getItem(key);
        // إذا كانت القيمة موجودة يتم إرجاعها وإلا يتم إرجاع القيمة الافتراضية
        return item ? JSON.parse(item) : initialValue;
      } catch (error) {
        console.error(error);
        return initialValue;
      }
    }
    return initialValue;
  });

  // دالة لحفظ القيمة الجديدة في localStorage
  const setValue = (value) => {
    try {
      // إذا كانت القيمة دالة، يتم استدعاؤها
      const valueToStore =
        value instanceof Function ? value(storedValue) : value;
      // حفظ القيمة في state
      setStoredValue(valueToStore);
      // حفظ القيمة في localStorage
      if (typeof window !== "undefined") {
        window.localStorage.setItem(key, JSON.stringify(valueToStore));
      }
    } catch (error) {
      console.error(error);
    }
  };

  return [storedValue, setValue];
}

export default useLocalStorage;

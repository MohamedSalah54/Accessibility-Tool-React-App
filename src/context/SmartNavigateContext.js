import React, { createContext, useState, useContext, useEffect } from 'react';

const SmartNavigateContext = createContext();

export const useSmartNavigateContext = () => useContext(SmartNavigateContext);

export const SmartNavigateProvider = ({ children }) => {
  const [isActive, setIsActive] = useState(false);  
  const [highlightedElement, setHighlightedElement] = useState(null);  
  const [elements, setElements] = useState([]);  
  const [inputNumber, setInputNumber] = useState(''); 
  const [timer, setTimer] = useState(null)

  const toggleSmartMode = () => {
    setIsActive(prev => !prev);
    if (!isActive) {
      localStorage.setItem('highlightMode', 'true');
    } else {
      localStorage.removeItem('highlightMode');
    }
  };

  useEffect(() => {
    const savedMode = localStorage.getItem('highlightMode');
    if (savedMode === 'true') {
      setIsActive(true);
    }
  }, []);

  const addNumbersToElements = () => {
    if (isActive) {
      const elementsList = Array.from(document.querySelectorAll('h1, h2, h3, p, div, span'));  // تحديد العناصر الهامة
      setElements(elementsList)

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
        el.style.position = 'relative';  

        el.appendChild(numberElement);
      });
    }
  };

  useEffect(() => {
    addNumbersToElements();
  }, [isActive]);

  const handleKeyPress = (event) => {
    if (event.key >= '0' && event.key <= '9') {
      setInputNumber((prev) => prev + event.key);
      
      if (timer) {
        clearTimeout(timer);
      }

      setTimer(setTimeout(() => {
        processInputNumber(inputNumber);
        setInputNumber('')
      }, 500));
    }
  };

  const processInputNumber = (number) => {
    const elementIndex = parseInt(number) - 1

    if (elementIndex >= 0 && elementIndex < elements.length) {
      if (elementIndex >= elements.length) {
        elementIndex = elementIndex % elements.length;
      }

      const element = elements[elementIndex];

      if (highlightedElement) {
        highlightedElement.style.border = '';
      }

      element.style.border = '2px dashed white';
      setHighlightedElement(element)
    }
  };

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

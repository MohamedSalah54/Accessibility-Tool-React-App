import React, { createContext, useContext, useState, useEffect } from "react";

const KeyboardNavigationContext = createContext();

export const KeyboardNavigationProvider = ({ children }) => {
  const [isKeyboardNavigationActive, setIsKeyboardNavigationActive] = useState(
    () => JSON.parse(localStorage.getItem("keyboardNavigation")) || false
  );

  useEffect(() => {
    const handleTabPress = (e) => {
      if (e.key === "Tab") {
        e.preventDefault(); 
        const focusableElements = document.querySelectorAll("*"); 
        const focusableArray = Array.from(focusableElements).filter((el) =>
          el.tabIndex >= 0
        );

        const currentIndex = focusableArray.indexOf(document.activeElement);

        if (document.activeElement) {
          document.activeElement.style.outline = "none";
          document.activeElement.style.boxShadow = "none";
        }

        const nextIndex =
          e.shiftKey 
            ? (currentIndex - 1 + focusableArray.length) % focusableArray.length
            : (currentIndex + 1) % focusableArray.length;

        const nextElement = focusableArray[nextIndex];

        if (nextElement) {
          nextElement.focus();
          nextElement.style.outline = "3px solid yellow";
          nextElement.style.outlineOffset = "2px";
          nextElement.style.boxShadow = "0 0 10px yellow"; 
        }
      }
    };

    if (isKeyboardNavigationActive) {
      document.addEventListener("keydown", handleTabPress);
    } else {
      document.querySelectorAll("*").forEach((el) => {
        el.style.outline = "none";
        el.style.boxShadow = "none";
      });
      document.removeEventListener("keydown", handleTabPress);
    }

    return () => {
      document.removeEventListener("keydown", handleTabPress);
    };
  }, [isKeyboardNavigationActive]);

  useEffect(() => {
    localStorage.setItem(
      "keyboardNavigation",
      JSON.stringify(isKeyboardNavigationActive)
    );
  }, [isKeyboardNavigationActive]);

  const toggleKeyboardNavigation = () => {
    setIsKeyboardNavigationActive((prev) => !prev);
  };

  return (
    <KeyboardNavigationContext.Provider
      value={{ isKeyboardNavigationActive, toggleKeyboardNavigation }}
    >
      {children}
    </KeyboardNavigationContext.Provider>
  );
};

export const useKeyboardNavigation = () => useContext(KeyboardNavigationContext);

import { createContext, useState, useEffect, useContext } from "react";
import cursorWhite from '../icons/assets/images/cursors/bigcursorwhite.svg';
import CursorBlack from "../icons/assets/images/cursors/bigcursorblack.svg";
import CursorHandWhite from "../icons/assets/images/cursors/bighandwhite.svg";
import CursorHandBlack from "../icons/assets/images/cursors/bighandblack.svg";

export const CursorContext = createContext();

export const useCursorContext = () => useContext(CursorContext);

export const CursorProvider = ({ children }) => {
  const [cursorColor, setCursorColor] = useState("default");

  const updateCursor = (color, cursorUrl, handCursorUrl) => {
    setCursorColor(color);
    if (typeof window !== "undefined") {
      localStorage.setItem("cursorColor", color); 
    }

    document.documentElement.style.cursor = `url(${cursorUrl}), auto`;

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

    document.documentElement.style.cursor = "auto";

    const clickableElements = document.querySelectorAll(
      'button, a, span, input[type="button"], input[type="submit"]'
    );
    clickableElements.forEach((el) => {
      el.style.cursor = "pointer";
    });
  };

  useEffect(() => {
    if (typeof window !== "undefined") {
      const savedCursorColor = localStorage.getItem("cursorColor");
      if (savedCursorColor === "white") {
        handleWhiteCursor();
      } else if (savedCursorColor === "black") {
        handleBlackCursor();
      }
    }
  }, []); 

  useEffect(() => {
    const cursorTimeout = setTimeout(() => {
      if (cursorColor === "default") {
        document.documentElement.style.cursor = "auto"; 
      }
    }, 100); 

    return () => clearTimeout(cursorTimeout); 
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

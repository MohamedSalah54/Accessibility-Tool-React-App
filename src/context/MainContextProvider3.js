// MainContextProvider3.js
import React from "react";
import { MonochromeProvider } from "./MonochromeContext";
import { DarkModeProvider } from "./DarkModeContext";
import { BrightModeProvider } from "./BrightModeContext";
import { LowSaturationProvider } from "./LowSaturationContext";
import { HighSaturationProvider } from "./HightSaturationContext";
import { ContrastProvider } from "./ContrastContext";

// دمج جميع الـ Contexts في `MainContextProvider3`
export const MainContextProvider3 = ({ children }) => {
  return (
    
                {children}
 
  );
};

export default MainContextProvider3;

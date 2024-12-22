import { createContext, useEffect, useContext } from "react";
import useLocalStorage from "../hook/useLocalStorage"; // Custom hook for localStorage

// Creating the FeatureContext
export const FeatureContext = createContext();

export const useFeatureContext = () => useContext(FeatureContext);

export const FeatureProvider = ({ children }) => {
  // ** New State for Font Size using LocalStorage
  const [fontSize, setFontSize] = useLocalStorage("fontSize", 16);
  // ** New State for Line Height using LocalStorage
  const [lineHeight, setLineHeight] = useLocalStorage("lineHeight", 1.5);
  // ** New State for Word Spacing using LocalStorage
  const [wordSpacing, setWordSpacing] = useLocalStorage("wordSpacing", 0);
  // ** New State for Letter Spacing using LocalStorage
  const [letterSpacing, setLetterSpacing] = useLocalStorage("letterSpacing", 0);

  // ** New State for Theme using LocalStorage
  const [theme, setTheme] = useLocalStorage("theme", "light");

  // ** New State for Bright High Contrast using LocalStorage
  const [brightHighContrast, setBrightHighContrast] = useLocalStorage(
    "brightHighContrast",
    false
  );

  // ** New State for Monochrome using LocalStorage
  const [monochrome, setMonochrome] = useLocalStorage("monochrome", false);

  // ** New State for Contrast Mode using LocalStorage
  const [contrastMode, setContrastMode] = useLocalStorage(
    "contrastMode",
    false
  );

  // ** New State for High Saturation **
  const [highSaturation, setHighSaturation] = useLocalStorage(
    "highSaturation",
    false
  );

  // ** State for Low Saturation using LocalStorage
  const [lowSaturation, setLowSaturation] = useLocalStorage(
    "lowSaturation",
    false
  );

  // ** State for Screen Reader using LocalStorage
  const [screenReaderEnabled, setScreenReaderEnabled] = useLocalStorage(
    "screenReaderEnabled",
    false
  );

  // ** State for Animations using LocalStorage
  const [animationsDisabled, setAnimationsDisabled] = useLocalStorage(
    "animationsDisabled",
    false
  );

  // ** State for Reading Guide using LocalStorage
  const [readingGuide, setReadingGuide] = useLocalStorage(
    "readingGuide",
    false
  );

  //* State for Large Buttons using LocalStorage
  const [buttonsLarge, setButtonsLarge] = useLocalStorage(
    "buttonsLarge",
    false
  );

  // State to store page landmarks, links, and headers
  const [landmarks, setLandmarks] = useLocalStorage([]);
  const [links, setLinks] = useLocalStorage([]);
  const [headings, setHeadings] = useLocalStorage([]);

  // Function to collect landmarks
  const collectPageLandmarks = () => {
    const landmarks = Array.from(
      document.querySelectorAll("main, nav, footer")
    );
    setLandmarks(landmarks.map((landmark) => landmark.tagName));
  };

  // Function to collect links
  const collectPageLinks = () => {
    const links = Array.from(document.querySelectorAll("a")).map((link) => ({
      href: link.href,
      text: link.textContent,
    }));
    setLinks(links);
  };

  // Function to collect headers
  const collectPageHeaders = () => {
    const headings = Array.from(
      document.querySelectorAll("h1, h2, h3, h4, h5, h6")
    ).map((header) => ({
      level: header.tagName,
      text: header.textContent,
    }));
    setHeadings(headings);
  };

  useEffect(() => {
    collectPageLandmarks();
    collectPageLinks();
    collectPageHeaders();
  }, []);

  // ** تفعيل التنقل باستخدام لوحة المفاتيح **

  const [keyboardNavigationEnabled, setKeyboardNavigationEnabled] =
    useLocalStorage("keyboardNavigationEnabled", false);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (!keyboardNavigationEnabled) return;

      // التعامل مع مفتاح "Tab" للتنقل
      if (e.key === "Tab") {
        const focusableElements =
          'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])';
        const focusable = Array.from(
          document.querySelectorAll(focusableElements)
        );

        // إضافة أحداث التركيز والتحويم لكل عنصر في القائمة
        focusable.forEach((element) => {
          // إضافة تأثير التركيز (focus) باستخدام لوحة المفاتيح (إطار أصفر)
          element.addEventListener("focus", (e) => {
            e.target.style.boxShadow =
              "0 0 6px 3px #ffff00, 0 0 2px #333 inset"; // تأثير تركيز أصفر
          });

          // إزالة التأثير عند فقدان التركيز
          element.addEventListener("blur", (e) => {
            e.target.style.boxShadow = "none";
          });

          // إضافة تأثير التحويم (hover) باستخدام الفأرة (إطار أزرق)
          element.addEventListener("mouseover", (e) => {
            e.target.style.boxShadow =
              "0 0 6px 3px #0000ff, 0 0 2px #333 inset"; // تأثير تحويم أزرق
          });

          // إزالة تأثير التحويم عند الخروج من العنصر
          element.addEventListener("mouseout", (e) => {
            e.target.style.boxShadow = "none";
          });
        });

        const index = focusable.indexOf(document.activeElement);
        if (e.shiftKey) {
          // التنقل إلى الخلف عند الضغط على Shift + Tab
          const nextIndex = index > 0 ? index - 1 : focusable.length - 1;
          focusable[nextIndex].focus();
          e.preventDefault();
        } else {
          // التنقل إلى الأمام عند الضغط على Tab
          const nextIndex = index + 1 < focusable.length ? index + 1 : 0;
          focusable[nextIndex].focus();
          e.preventDefault();
        }
      }

      // التعامل مع مفتاح "Enter" لتنفيذ نقر على العنصر المحدد
      if (e.key === "Enter" && document.activeElement) {
        document.activeElement.click();
        e.preventDefault();
      }
    };

    if (keyboardNavigationEnabled) {
      window.addEventListener("keydown", handleKeyDown);
    } else {
      window.removeEventListener("keydown", handleKeyDown);
    }

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [keyboardNavigationEnabled]);

  const toggleKeyboardNavigation = () => {
    setKeyboardNavigationEnabled((prev) => !prev);
  };

  // ** State for Smart Navigation using LocalStorage
  const [smartNavigationEnabled, setSmartNavigationEnabled] = useLocalStorage(
    "smartNavigation",
    false
  );

  // ** Handle Smart Navigation using number keys (1-9)
  useEffect(() => {
    if (smartNavigationEnabled) {
      const handleSmartNavigation = (event) => {
        const numberKey = parseInt(event.key);
        if (numberKey >= 1 && numberKey <= 9) {
          const focusableElements = document.querySelectorAll(
            'a, button, input, select, textarea, [tabindex]:not([tabindex="-1"])'
          );

          // إضافة أحداث التركيز والBlur لكل عنصر
          focusableElements.forEach((element) => {
            // إضافة تأثير عند التركيز باستخدام لوحة المفاتيح
            element.addEventListener("focus", (e) => {
              e.target.style.boxShadow =
                "0 0 6px 3px #ffff00, 0 0 2px #333 inset"; // تأثير تركيز أصفر
            });

            // إزالة التأثير عند فقدان التركيز
            element.addEventListener("blur", (e) => {
              e.target.style.boxShadow = "none";
            });

            // إضافة تأثير عند التحويم (hover)
            element.addEventListener("mouseover", (e) => {
              e.target.style.boxShadow =
                "0 0 6px 3px #0000ff, 0 0 2px #333 inset"; // تأثير تحويم أزرق
            });

            // إزالة تأثير التحويم عند الخروج
            element.addEventListener("mouseout", (e) => {
              e.target.style.boxShadow = "none";
            });
          });

          const elementToFocus = focusableElements[numberKey - 1];
          elementToFocus?.focus();
        }
      };

      document.addEventListener("keydown", handleSmartNavigation);

      return () => {
        document.removeEventListener("keydown", handleSmartNavigation);
      };
    }
  }, [smartNavigationEnabled]);

  // ** Toggle Smart Navigation
  const toggleSmartNavigation = () => {
    setSmartNavigationEnabled((prev) => !prev);
  };

  // ** New State for Language
  const [language, setLanguage] = useLocalStorage("language", "en");

  // ** New State for Voice Commands using LocalStorage
  const [isVoiceCommandsEnabled, setVoiceCommandsEnabled] = useLocalStorage(
    "isVoiceCommandsEnabled",
    false
  );

  const toggleVoiceCommands = () => setVoiceCommandsEnabled((prev) => !prev);

  // ** 1. Apply font size to the HTML element
  useEffect(() => {
    document.documentElement.style.fontSize = `${fontSize}px`;
  }, [fontSize]);

  //** 2. Apply line height
  useEffect(() => {
    document.documentElement.style.lineHeight = `${lineHeight}`;
  }, [lineHeight]);

  //** 3. Apply word spacing
  useEffect(() => {
    document.documentElement.style.wordSpacing = `${wordSpacing}px`;
  }, [wordSpacing]);

  //** 4. Apply letter spacing
  useEffect(() => {
    document.documentElement.style.letterSpacing = `${letterSpacing}px`;
  }, [letterSpacing]);

  //** 5. Apply theme
  useEffect(() => {
    if (theme === "dark") {
      // Apply dark theme
      document.body.style.backgroundColor = "#000000";
      document.querySelectorAll("h1, h2, h3, h4, h5, h6").forEach((el) => {
        el.style.color = "#FFFF00"; // Yellow on black background
        el.style.padding = "5px";
      });
      document.querySelectorAll("p, span").forEach((el) => {
        el.style.color = "#FFFFFF"; // White text
        el.style.padding = "5px";
        el.style.borderRadius = "5px";
        el.style.backgroundColor = "#000000"; // Black background
      });
      document.querySelectorAll("a").forEach((el) => {
        el.style.color = "#00FFFF"; // Cyan links
      });
    } else {
      // Remove dark theme properties
      document.body.style.removeProperty("background-color");
      document
        .querySelectorAll("h1, h2, h3, h4, h5, h6, p, span, a")
        .forEach((el) => {
          el.style.removeProperty("color");
          el.style.removeProperty("background-color");
          el.style.removeProperty("padding");
          el.style.removeProperty("border-radius");
        });
    }
  }, [theme]);

  //** 6. Apply bright high-contrast mode
  useEffect(() => {
    if (brightHighContrast) {
      // document.body.style.backgroundColor = "#FFFFFF"; // White background
      document.body.style.color = "#000000"; // Black text
      document.querySelectorAll("h1, h2, h3, h4, h5, h6").forEach((el) => {
        el.style.color = "#191970"; // Midnight blue for headings
        el.style.padding = "5px";
      });
      document.querySelectorAll("p, span").forEach((el) => {
        el.style.color = "#191970";
        el.style.padding = "5px";
        el.style.borderRadius = "5px";
        // el.style.backgroundColor = "#fff"; // White background for text
      });
      document.querySelectorAll("a").forEach((el) => {
        el.style.color = "#0000FF"; // Blue for links
      });
      // document.querySelectorAll("button").forEach((el) => {
      //   // el.style.color = "white";
      //   // el.style.backgroundColor = "black";
      //   el.style.padding = "5px";
      //   el.style.borderRadius = "5px";
      // });
    } else {
      // Remove bright high-contrast properties
      document.body.style.removeProperty("background-color");
      document.body.style.removeProperty("color");
      document.querySelectorAll("h1, h2, h3, h4, h5, h6").forEach((el) => {
        el.style.removeProperty("color");
        el.style.removeProperty("background-color");
        el.style.removeProperty("padding");
      });
      document.querySelectorAll("p, span").forEach((el) => {
        el.style.removeProperty("color");
        el.style.removeProperty("background-color");
        el.style.removeProperty("padding");
        el.style.removeProperty("border-radius");
      });
      document.querySelectorAll("a").forEach((el) => {
        el.style.removeProperty("color");
      });
      // document.querySelectorAll("button").forEach((el) => {
      //   el.style.removeProperty("color");
      //   // el.style.removeProperty("background-color");
      //   el.style.removeProperty("padding");
      //   el.style.removeProperty("border-radius");
      // });
    }
  }, [brightHighContrast]);

  //** 7. Apply monochrome effect
  useEffect(() => {
    if (monochrome) {
      document.body.style.filter = "grayscale(100%)"; // Apply grayscale
    } else {
      document.body.style.filter = "none"; // Remove grayscale
    }
    localStorage.setItem("monochrome", JSON.stringify(monochrome));
  }, [monochrome]);

  //** 8. Apply contrast mode
  useEffect(() => {
    if (contrastMode) {
      document.body.style.backgroundColor = "#000000"; // Black background
      document.body.style.color = "#FFFFFF"; // White text
      document.querySelectorAll("h1, h2, h3, h4, h5, h6").forEach((el) => {
        el.style.color = "#FFFF00"; // Yellow for headings
      });
      document.querySelectorAll("a").forEach((el) => {
        el.style.color = "#00FFFF"; // Cyan for links
      });

      document.querySelectorAll("p, span").forEach((el) => {
        el.style.backgroundColor = "#FFFFFF"; // Black background for text
        el.style.color = "#444444"; // White text
        el.style.padding = "5px";
        el.style.borderRadius = "5px";
      });
      document
        .querySelectorAll("button, input, select, textarea")
        .forEach((el) => {
          el.style.backgroundColor = "#444444"; // Dark gray background
          el.style.color = "#FFFFFF"; // White text for interactive elements
        });
    } else {
      document.body.style.backgroundColor = "";
      document.body.style.color = "";
      document.querySelectorAll("h1, h2, h3, h4, h5, h6").forEach((el) => {
        el.style.color = "";
      });
      document.querySelectorAll("a").forEach((el) => {
        el.style.color = "";
      });
      document
        .querySelectorAll("button, input, select, textarea")
        .forEach((el) => {
          el.style.backgroundColor = "";
          el.style.color = "";
        });
    }
    localStorage.setItem("contrastMode", JSON.stringify(contrastMode));
  }, [contrastMode]);

  //** Apply High Saturation **
  useEffect(() => {
    if (highSaturation) {
      document.body.style.filter = "saturate(200%)"; // Increase saturation by 200%
    } else {
      document.body.style.filter = "saturate(100%)"; // Reset saturation to normal
    }
    localStorage.setItem("highSaturation", JSON.stringify(highSaturation)); // Store in localStorage
  }, [highSaturation]);

  //** Apply Low Saturation **
  useEffect(() => {
    if (lowSaturation) {
      document.body.style.filter = "saturate(0.5)"; // Reduce saturation to 50%
    } else {
      document.body.style.filter = "none"; // Reset to normal saturation
    }

    // Save the Low Saturation state in localStorage
    localStorage.setItem("lowSaturation", JSON.stringify(lowSaturation));
  }, [lowSaturation]);

  //* 9. Disable animations
  useEffect(() => {
    if (animationsDisabled) {
      document.documentElement.style.setProperty(
        "--tw-transition-property",
        "none"
      );
    } else {
      document.documentElement.style.removeProperty("--tw-transition-property");
    }
  }, [animationsDisabled]);

  // ** 10. Apply reading guide
  useEffect(() => {
    if (readingGuide) {
      document.body.classList.add("reading-guide-active");
    } else {
      document.body.classList.remove("reading-guide-active");
    }
  }, [readingGuide]);

  // ** 11. Apply large buttons
  useEffect(() => {
    if (buttonsLarge) {
      document.documentElement.classList.add("large-buttons");
    } else {
      document.documentElement.classList.remove("large-buttons");
    }
  }, [buttonsLarge]);

  // ** 12. Apply screen reader

  useEffect(() => {
    if (screenReaderEnabled) {
      const elements = document.querySelectorAll(
        "button, a, input, select, textarea, h1, h2, h3, h4, h5, h6"
      );

      // Define mouseover and mouseout handlers
      const handleMouseOver = (el) => {
        el.style.boxShadow = "0 0 6px 3px #00f, 0 0 2px #333 inset";
      };

      const handleMouseOut = (el) => {
        el.style.boxShadow = "0 0 6px 3px #ffff00, 0 0 2px #333 inset"; // Remove shadow when mouse is out
      };

      // Apply ARIA attributes and add event listeners
      elements.forEach((el) => {
        el.setAttribute("aria-live", "polite");
        el.setAttribute("role", "button");
        el.setAttribute("tabindex", "0");

        // Add mouseover and mouseout events
        el.addEventListener("mouseover", () => handleMouseOver(el));
        el.addEventListener("mouseout", () => handleMouseOut(el));
      });

      // Add skip link for screen reader users
      const skipLink = document.createElement("a");
      skipLink.href = "#main-content";
      skipLink.textContent = "Skip to content";
      skipLink.style.position = "absolute";
      skipLink.style.top = "0";
      skipLink.style.left = "-9999px";
      skipLink.style.background = "#000";
      skipLink.style.color = "#fff";
      skipLink.style.padding = "10px";
      skipLink.style.zIndex = "1000";
      skipLink.classList.add("skip-link");
      document.body.prepend(skipLink);

      return () => {
        // Cleanup when screenReaderEnabled is turned off
        elements.forEach((el) => {
          el.removeAttribute("aria-live");
          el.removeAttribute("role");
          el.removeAttribute("tabindex");
          el.style.removeProperty("box-shadow");

          // Remove event listeners
          el.removeEventListener("mouseover", () => handleMouseOver(el));
          el.removeEventListener("mouseout", () => handleMouseOut(el));
        });

        // Remove skip link
        const skipLink = document.querySelector(".skip-link");
        if (skipLink) {
          skipLink.remove();
        }
      };
    }
  }, [screenReaderEnabled]);

  // ** New function to increase font size **
  const increaseFontSize = () => setFontSize((prev) => prev + 2);
  // ** New function to decrease font size **
  const decreaseFontSize = () => setFontSize((prev) => Math.max(10, prev - 2));

  // ** New function to increase line height **
  const increaseLineHeight = () => setLineHeight((prev) => prev + 0.1);
  // ** New function to decrease line height **
  const decreaseLineHeight = () =>
    setLineHeight((prev) => Math.max(1, prev - 0.1));

  // ** New function to increase word spacing **
  const increaseWordSpacing = () => setWordSpacing((prev) => prev + 1);
  // ** New function to decrease word spacing **
  const decreaseWordSpacing = () =>
    setWordSpacing((prev) => Math.max(0, prev - 1));

  // ** New function to increase letter spacing **
  const increaseLetterSpacing = () => setLetterSpacing((prev) => prev + 1);
  // ** New function to decrease letter spacing **
  const decreaseLetterSpacing = () =>
    setLetterSpacing((prev) => Math.max(0, prev - 1));

  // ** Toggle function for Theme **
  const toggleTheme = () =>
    setTheme((prev) => (prev === "dark" ? "light" : "dark"));

  // ** Toggle function for Animations **
  const toggleAnimations = () => setAnimationsDisabled((prev) => !prev);

  // ** Toggle function for Reading Guide **
  const toggleReadingGuide = () => setReadingGuide((prev) => !prev);

  // ** Toggle function for Button Size **
  const toggleButtonSize = () => setButtonsLarge((prev) => !prev);

  // ** Toggle function for Bright High Contrast **
  const toggleBrightHighContrast = () => setBrightHighContrast((prev) => !prev);

  // ** Toggle function for Monochrome **
  const toggleMonochrome = () => setMonochrome((prev) => !prev);

  // ** Toggle function for Contrast Mode **
  const toggleContrastMode = () => setContrastMode((prev) => !prev);

  //* Toggle function for High Saturation
  const toggleHighSaturation = () => setHighSaturation((prev) => !prev);

  //** */ Toggle function for Low Saturation
  const toggleLowSaturation = () => setLowSaturation((prev) => !prev);

  // ** Toggle function for Screen Reader
  const toggleScreenReader = () => setScreenReaderEnabled((prev) => !prev);
  // Return the provider with all values and helper functions
  return (
    <FeatureContext.Provider
      value={{
        fontSize,
        increaseFontSize,
        decreaseFontSize,
        lineHeight,
        increaseLineHeight,
        decreaseLineHeight,
        wordSpacing,
        increaseWordSpacing,
        decreaseWordSpacing,
        letterSpacing,
        increaseLetterSpacing,
        decreaseLetterSpacing,
        theme,
        toggleTheme,
        monochrome,
        toggleMonochrome,
        animationsDisabled,
        toggleAnimations,
        readingGuide,
        toggleReadingGuide,
        buttonsLarge,
        toggleButtonSize,
        brightHighContrast,
        toggleBrightHighContrast,
        toggleContrastMode,
        toggleHighSaturation,
        toggleLowSaturation,
        toggleScreenReader,
        keyboardNavigationEnabled,
        toggleKeyboardNavigation,
        smartNavigationEnabled,
        toggleSmartNavigation,
        landmarks,
        links,
        headings,
        language,
        setLanguage,
        isVoiceCommandsEnabled,
        toggleVoiceCommands,
        
      }}
    >
      {children}
    </FeatureContext.Provider>
  );
};

export default FeatureContext;

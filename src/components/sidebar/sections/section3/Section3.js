import { useState, useContext, useEffect } from "react";
import { AiFillPlusSquare, AiFillMinusSquare } from "react-icons/ai";
import { ReactComponent as CustomColor } from '../../../../icons/assets/icons-svg/CustomColor.svg';
import ColorBar from "../section3/ColorBar";
import { ReactComponent as Monochrome } from "../../../../icons/assets/icons-svg/Monochrome.svg";
import { ReactComponent as Dark } from "../../../../icons/assets/icons-svg/DarkHigh-Contrast.svg";
import { ReactComponent as Light } from "../../../../icons/assets/icons-svg/Bright-High-Contrast.svg";
import { ReactComponent as LowSaturation } from "../../../../icons/assets/icons-svg/Low-Saturation.svg";
import { ReactComponent as HighSaturation } from "../../../../icons/assets/icons-svg/High-Saturation.svg";
import { ReactComponent as Contrast } from "../../../../icons/assets/icons-svg/Contrast-Mode.svg";
import DarkModeContext from "../../../../context/DarkModeContext";
import BrightModeContext from "../../../../context/BrightModeContext";
import styles from './Section3.module.css';
import ColorContext from "../../../../context/ColorContext";
import { useMonochrome } from "../../../../context/MonochromeContext";
import { useLowSaturation } from "../../../../context/LowSaturationContext";
import { useHighSaturation } from "../../../../context/HightSaturationContext";
import { useContrastMode } from "../../../../context/ContrastContext";
import { useTranslation } from "react-i18next";

const Section3 = () => {
  const [language, setLanguage] = useState(localStorage.getItem("language") || "en");
  const { t } = useTranslation();
  const { toggleContrastMode } = useContrastMode();
  const { toggleHighSaturation } = useHighSaturation();
  const { toggleLowSaturation } = useLowSaturation();
  const { toggleMonochrome } = useMonochrome();
  const { toggleBrightMode } = useContext(BrightModeContext);
  const { setActiveSection } = useContext(ColorContext);
  const { toggleDarkMode } = useContext(DarkModeContext);

  const [isOpen, setIsOpen] = useState(true);
  const [activeCard, setActiveCard] = useState(null);
  const [activeButton, setActiveButton] = useState("Backgrounds");

  const options = [
    { id: "monochrome", label: t("monochrome"), icon: <Monochrome />, description: t("monochromeDescription"), toggleFunction: toggleMonochrome },
    { id: "dark", label: t("dark"), icon: <Dark />, description: t("darkDescription"), toggleFunction: toggleDarkMode },
    { id: "light", label: t("light"), icon: <Light />, description: t("lightDescription"), toggleFunction: toggleBrightMode },
    { id: "low-saturation", label: t("lowSaturation"), icon: <LowSaturation />, description: t("lowSaturationDescription"), toggleFunction: toggleLowSaturation },
    { id: "high-saturation", label: t("highSaturation"), icon: <HighSaturation />, description: t("highSaturationDescription"), toggleFunction: toggleHighSaturation },
    { id: "contrast", label: t("contrast"), icon: <Contrast />, description: t("contrastDescription"), toggleFunction: toggleContrastMode },
  ];

  const toggleDropdown = () => setIsOpen(!isOpen);

  const handleCardClick = (id, toggleFunction) => {
    setActiveCard((prevActiveCard) => {
      if (prevActiveCard === id) {
        // إذا كان المود الحالي هو النشط، قم بإلغائه فقط
        toggleFunction();
        return null;
      }

      // إلغاء تفعيل المود النشط السابق إذا كان موجودًا
      if (prevActiveCard) {
        const previousOption = options.find((option) => option.id === prevActiveCard);
        if (previousOption) {
          previousOption.toggleFunction();
        }
      }

      // تفعيل المود الجديد
      toggleFunction();
      return id; // تحديث المود النشط
    });
  };

  const handleButtonClick = (section) => {
    setActiveButton(section);
    setActiveSection(section);
  };

  useEffect(() => {
    const storedActiveCard = localStorage.getItem("activeCard");
    if (storedActiveCard) setActiveCard(storedActiveCard);
  }, []);

  useEffect(() => {
    if (activeCard) {
      localStorage.setItem("activeCard", activeCard);
    } else {
      localStorage.removeItem("activeCard");
    }
  }, [activeCard]);

  return (
    <div className={styles.dropdown_container}>
    <button className={`${styles.drop_btn1} ${language === "ar" ? styles.arabic : ""}`} onClick={toggleDropdown}>
      {language === "ar" ? (
          <>
      <span className={styles.dropdown}>{t("colorAdjustment")}</span>
      {isOpen ? (
              <AiFillMinusSquare className={`${styles.drop_icon} ${language === "ar" ? styles.arabic : ""}`} />
            ) : (
              <AiFillPlusSquare className={`${styles.drop_icon} ${language === "ar" ? styles.arabic : ""}`} />
            )}
          </>
        ) : (
          <>
            {isOpen ? (
              <AiFillMinusSquare className={`${styles.drop_icon} ${language === "ar" ? styles.arabic : ""}`} />
            ) : (
              <AiFillPlusSquare className={`${styles.drop_icon} ${language === "ar" ? styles.arabic : ""}`} />
            )}
      <span className={styles.dropdown}>{t("colorAdjustment")}</span>
      </>
        )}    
        </button>
    {isOpen && (
      <div className={styles.color_container}>
        <div className={styles.wide_card}>
          <div className={styles.custom_color_container}>
            <CustomColor className={styles.custom_color_icon} />
            <div className={styles.custom_color_title}>
              <h4>{t("customColor")}</h4>
              <p className={styles.p_color}>{t("customColorDescription")}</p>
            </div>
          </div>
          <div className={styles.color_btn}>
            {["Backgrounds", "Headings", "Contents"].map((section) => (
              <button
                key={section}
                onClick={() => handleButtonClick(section)}
                className={activeButton === section ? styles.activeButton : ""}
              >
                {t(section.toLowerCase())}
              </button>
            ))}
          </div>
        </div>
        <ColorBar />
      </div>
    )}
    {isOpen && (
      <div className={styles.card_container_sec_line}>
        {options.map(({ id, label, icon, description, toggleFunction }) => (
          <div
            key={id}
            className={`${styles.card_sec_line} ${activeCard === id ? styles.active : ""}`}
            onClick={() => handleCardClick(id, toggleFunction)}
          >
            {icon}
            <p className={styles.sec_line_p}>{label}</p>
            <p className={styles.hover_text}>{description}</p>
            {activeCard === id && <div className={styles.checkmark}>✔</div>}
          </div>
        ))}
      </div>
    )}
  </div>
  );
};

export default Section3;

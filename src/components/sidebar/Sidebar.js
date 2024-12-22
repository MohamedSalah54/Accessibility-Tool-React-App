import { useContext, useState,useEffect } from "react";
import { FaArrowsAlt } from "react-icons/fa";
import { ReactComponent as Navside } from "../../icons/assets/svg-export/svgexport-3.svg";
import { ReactComponent as Logo } from "../../icons/assets/icons-svg/logo.svg";
import { ReactComponent as LogoSide } from "../../icons/assets/icons-svg/logoSide.svg";
import { FaArrowsAltH } from "react-icons/fa";
import { FiEyeOff } from "react-icons/fi";
import Section0 from "../sidebar/sections/section0/Section0";
import Section1 from "../sidebar/sections/section1/Section1";
import Section2 from "../sidebar/sections/section2/Section2";
import Section3 from "../sidebar/sections/section3/Section3";
import Section4 from "../sidebar/sections/section4/Section4";
import { Link } from "react-router-dom";
import AccessabilityState from "../footer/AccessabilityState";
import Sendfeedback from "../footer/Sendfeedback";
import AccessabilityWidget from "../footer/AccessibilityWidget";
import styles from './AccessibilitySidebar.module.css'
import DarkModeContext from "../../context/DarkModeContext";
import i18n from '../../context/i18n'; // استيراد i18n من الملف الذي يحتوي على الإعدادات
import { useTranslation } from "react-i18next";


const AccessibilitySidebar = () => {
  const{t} = useTranslation()
  const {toggleDarkMode} = useContext(DarkModeContext)
  // القيم الافتراضية
  const defaultState = {
    isOpen: false,
    iconVisible: false,
    expanded: false,
  };
  const [language, setLanguage] = useState(localStorage.getItem("language") || "en");

  useEffect(() => {
    // إذا كانت اللغة في localStorage موجودة، نقوم بتغيير اللغة في i18n
    if (language) {
      i18n.changeLanguage(language);
      localStorage.setItem("language", language);
    }
  }, [language]);

  // إدارة الحالة
  const [isOpen, setIsOpen] = useState(defaultState.isOpen);
  const [iconVisible, setIconVisible] = useState(defaultState.iconVisible);
  const [expanded, setExpanded] = useState(defaultState.expanded);
  const [isCardVisible, setIsCardVisible] = useState(false);
  const [isFeedbackVisable, setIsFeedbackVisable] = useState(false);
  const [isWidgetVisable, setIsWidgetVisable] = useState(false);


  // تبديل التوسيع
  const toggleExpand = () => setExpanded(!expanded);

  // تبديل الشريط الجانبي
  const toggleSidebar = () => setIsOpen(!isOpen);

  // إعادة الضبط للقيم الافتراضية
  const resetToDefault = () => {
    // مسح جميع البيانات من localStorage
    localStorage.clear();
  
    // عمل رفريش للصفحة
    window.location.reload();
  };

  // إظهار البطاقة
  const showCard = () => {
    setIsCardVisible(true);
    setIsOpen(false); // إغلاق الشريط الجانبي عند ظهور البطاقة
  };

  // إغلاق البطاقة
  const closeCard = () => {
    setIsCardVisible(false); // إخفاء البطاقة عند الضغط على "Close"
  };

  const showFeedback = () =>{
    setIsFeedbackVisable(true)
    setIsOpen(false)
  }

  const closeFeedback = () =>{
    setIsFeedbackVisable(false)
  }

  /** Accessibility Wedget */

  const showWidget = () =>{
    setIsWidgetVisable(true)
    setIsOpen(false)
  }

  const closeWidget = () =>{
    setIsWidgetVisable(false)
  }



  return (
    <div >

      {isCardVisible && <AccessabilityState closeCard={closeCard} />}
      {isFeedbackVisable && <Sendfeedback closeFeedback={closeFeedback} />}
      {isWidgetVisable && <AccessabilityWidget closeWidget={closeWidget} />}


      {!isOpen && !isCardVisible &&!isFeedbackVisable && (
        <button
        onClick={toggleSidebar}
        className={`${styles.toggleBtn} ${language === "ar" ? styles.arabic : ""}`}  // إضافة الكلاس حسب اللغة
        onMouseEnter={() => setIconVisible(true)}
        onMouseLeave={() => setIconVisible(false)}
      >
        <Logo />
        {iconVisible && <FaArrowsAlt className={styles.selector} />}
      </button>
      )}

      {/* الشريط الجانبي */}
      <div className={`${styles.sidebar} ${isOpen ? styles.open : ""} ${expanded ? styles.expanded : ""} ${language === "ar" ? styles.arabic : ""} `}>
        <div className={styles.header}>
          <Navside className={`${styles.INDmenuHeader_bg} ${expanded ? styles.INDmenuHeader_bg_expanded : ""}`} />
          <button onClick={toggleSidebar} className={`${styles.closeBtn} ${language === "ar" ? styles.arabic : ""} ${expanded ? styles.closeBtn_expanded : ""}`}>
            X
          </button>

          <h2 className={`${styles.txt} ${expanded ? styles.expandedTxt : ""} ${language === "ar" ? styles.arabicTxt : ""}`}>{t("Accessibility")}</h2>
          <div className={styles.languageSelector}>
          <select
              className={`${styles.opt} ${expanded ? styles.expandedOpt : ""} ${language === "ar" ? styles.arabicOpt : ""}`}
              value={language}
              onChange={(e) => setLanguage(e.target.value)} // تغيير اللغة
            >
              <option value="ar">اللغة العربية</option>
              <option value="en">English</option>
            </select>
          </div>
            <LogoSide className={`${styles.logoSide} ${language === "ar" ? styles.arabic : ""}`} onClick={toggleDarkMode} />
            <FaArrowsAltH className={`${styles.arr} ${expanded ? styles.expanded : ""} ${language === "ar" ? styles.arabic : ""}`} data-tooltip="Arrow icon" onClick={toggleExpand} />
            <FiEyeOff className={`${styles.eyeOff } ${language === "ar" ? styles.arabic : ""}`} data-tooltip="Eye off icon"onClick={showWidget} />
        </div>

        <div className={styles.sidebarBody}>
          <Section0/>
          <Section1 />
          <Section2 />
          <Section3 />
          <Section4 />
        </div>
        <div className={`${styles.sidebarFooter} ${expanded ? styles.expanded : ""}`}>
        <div className={`${styles.accessFotter} ${language === "ar" ? styles.arabic : ""}`}>
          <button data-tooltip="Click to turn off accessibility" onClick={resetToDefault}>
            {t("TurnOff")}
          </button>
          <button data-tooltip="View the accessibility statement" onClick={showCard}>
            {t("AccessibilityStatement")}
          </button>
          <button data-tooltip="Send us your feedback" onClick={showFeedback}>
            {t("SendFeedback")}
          </button>
        </div>

          <div className={styles.copyrightFooter}>
            <span>
             {t("PoweredBy")} <Link to="/" className={styles.equal}>EqualWeb</Link>
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AccessibilitySidebar;





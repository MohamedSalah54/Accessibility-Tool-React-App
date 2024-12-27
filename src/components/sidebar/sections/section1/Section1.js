import { useState } from "react";
import { AiFillPlusSquare, AiFillMinusSquare } from "react-icons/ai";
import styles from './Section1.module.css';
import CardSection1 from "../../../../utils/CardSection1";
import { useTranslation } from "react-i18next";

const Section1 = () => {
  const [language, setLanguage] = useState(localStorage.getItem("language") || "en");
  const { t } = useTranslation();
  const [isOpen, setIsOpen] = useState(false);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className={`${styles.dropdown_container} ${language === "ar" ? styles.arabic : ""}`}>
      <button className={`${styles.drop_btn1} ${language === "ar" ? styles.arabic : ""}`} onClick={toggleDropdown}>
      
            <span className={styles.dropdown}>{t("AccessibilityProfiles")}</span>
            {isOpen ? (
              <AiFillMinusSquare className={`${styles.drop_icon} ${language === "ar" ? styles.arabic : ""}`} />
            ) : (
              <AiFillPlusSquare className={`${styles.drop_icon} ${language === "ar" ? styles.arabic : ""}`} />
            )}
         
      </button>

      {isOpen && <CardSection1 />}
    </div>
  );
};

export default Section1;

import { useState, useEffect } from "react";
import { AiFillPlusSquare, AiFillMinusSquare } from "react-icons/ai";
import { useVoiceCommandsContext } from "../../../../context/VoiceCommandsContext";
import { useScreenReader } from "../../../../context/ScreenReaderContext";
import { useKeyboardNavigation } from "../../../../context/keyboardNavigationContext";
import { useSmartNavigateContext } from "../../../../context/SmartNavigateContext";
import { useTextReader } from "../../../../context/TextReaderContext";
import styles from "./Section2.module.css";
import OptionCard from "../../../../utils/OptionCard "; 
import { options } from '../../../../utils/CardSection2';
import { useTranslation } from 'react-i18next'; 

const Section2 = () => {
  const [language, setLanguage] = useState(localStorage.getItem("language") || "en");
  const { t } = useTranslation(); 
  const { toggleMode } = useTextReader();
  const { toggleSmartMode } = useSmartNavigateContext();
  const { toggleKeyboardNavigation } = useKeyboardNavigation();
  const { toggleScreenReader } = useScreenReader();
  const { toggleVoiceCommands } = useVoiceCommandsContext();

  const [isOpen, setIsOpen] = useState(true);
  const [selectedCards, setSelectedCards] = useState(() => {
    return JSON.parse(localStorage.getItem("selectedCards")) || {};
  });

  useEffect(() => {
    localStorage.setItem("selectedCards", JSON.stringify(selectedCards));
  }, [selectedCards]);

  const toggleDropdown = () => setIsOpen((prev) => !prev);

  const handleCardClick = (key, toggleFunction) => {
    if (["keyboardNavigation", "smartNavigation", "screenReader"].includes(key)) {
      setSelectedCards((prev) => ({
        ...prev,
        keyboardNavigation: false,
        smartNavigation: false,
        screenReader: false,
        [key]: !prev[key],
      }));
    } else {
      setSelectedCards((prev) => ({
        ...prev,
        [key]: !prev[key],
      }));
    }
    toggleFunction(); 
  };

  return (
    <div className={styles.dropdown_container}>
      <button className={`${styles.drop_btn1} ${language === "ar" ? styles.arabic : ""}`} onClick={toggleDropdown}>
       
            <span className={styles.dropdown}>{t("NavigationAdjustment")}</span>
            {isOpen ? (
              <AiFillMinusSquare className={`${styles.drop_icon} ${language === "ar" ? styles.arabic : ""}`} />
            ) : (
              <AiFillPlusSquare className={`${styles.drop_icon} ${language === "ar" ? styles.arabic : ""}`} />
            )}
         
      </button>
      {isOpen && (
        <div className={styles.card_container_sec_line}>
          {options.map(({ key, icon, titleKey, descriptionKey }) => (
            <OptionCard
              key={key}
              icon={icon}
              title={t(titleKey)} 
              description={t(descriptionKey)} 
              isSelected={selectedCards[key]}
              onClick={() => {
                switch (key) {
                  case "screenReader":
                    handleCardClick(key, toggleScreenReader);
                    break;
                  case "keyboardNavigation":
                    handleCardClick(key, toggleKeyboardNavigation);
                    break;
                  case "smartNavigation":
                    handleCardClick(key, toggleSmartMode);
                    break;
                  case "textReader":
                    handleCardClick(key, toggleMode);
                    break;
                  case "voiceCommands":
                    handleCardClick(key, toggleVoiceCommands);
                    break;
                  default:
                    break;
                }
              }}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default Section2;

import { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { AiFillPlusSquare, AiFillMinusSquare } from "react-icons/ai";
import { IoMdInformationCircleOutline } from "react-icons/io";
import { FaLanguage } from "react-icons/fa";
import { FaRegKeyboard } from "react-icons/fa";
import { TbGeometry } from "react-icons/tb";
import { ReactComponent as LogoIcon } from "./logo.svg";
import { BsPencilSquare } from "react-icons/bs";
import { TbBrandOpenai } from "react-icons/tb";
import { IoVolumeMuteOutline } from "react-icons/io5";
import styles from "./Section0.module.css";

const Section0 = () => {
  const [language, setLanguage] = useState(localStorage.getItem("language") || "en");
  const { t } = useTranslation();
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    localStorage.setItem("language", language);
  }, [language]);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div
      className={styles.dropdown_container}
      style={{ direction: language === "ar" ? "rtl" : "ltr" }} 
    >
      <button
        className={`${styles.drop_btn1} ${language === "ar" ? styles.arabic : ""}`}
        onClick={toggleDropdown}
      >
        <span className={`${styles.dropdown}`}>{t("aiWidgetAssistant")}</span>
        {isOpen ? (
          <AiFillMinusSquare className={styles.drop_icon} />
        ) : (
          <AiFillPlusSquare className={styles.drop_icon} />
        )}
      </button>
      {isOpen && (
        <div className={styles.Ai_Container}>
          <div>
            <BsPencilSquare className={styles.icon_Ai} />
          </div>

          <div className={styles.title_Ai}>
            <h2>
              E<LogoIcon className={styles.icon_logo_side} />
              UAL WEB
            </h2>
            <h3>{t("aiWidgetAssistant")}</h3>
          </div>
          <div className={styles.container_Four_Cards}>
            <div className={styles.help_Me}>
              <IoMdInformationCircleOutline className={styles.help_Me_Icon} />
              <p className={styles.help_Me_P}>{t("howChatHelps")}</p>
            </div>
            <div className={styles.difficulty}>
              <FaLanguage className={styles.difficulty_Icon} />
              <p className={styles.difficulty_P}>{t("difficultySeeing")}</p>
            </div>
            <div className={styles.needs}>
              <FaRegKeyboard className={styles.needs_Icon} />
              <p className={styles.needs_P}>{t("cognitiveSupport")}</p>
            </div>
            <div className={styles.challenges}>
              <TbGeometry className={styles.challenges_Icon} />
              <p className={styles.challenges_P}>{t("motorChallenges")}</p>
            </div>
          </div>
          <div className={styles.chat_Ai}>
            <TbBrandOpenai className={styles.ai_gpt} />
            <input
              className={styles.input_Chat}
              placeholder={t("messageAssistant")}
            />
            <IoVolumeMuteOutline className={styles.ai_Mute} />
          </div>
        </div>
      )}
    </div>
  );
};

export default Section0;

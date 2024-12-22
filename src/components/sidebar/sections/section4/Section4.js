import { useState, useContext } from "react";
import { AiFillPlusSquare, AiFillMinusSquare } from "react-icons/ai";
import { ReactComponent as FontSizing } from '../../../../icons/assets/svg-export/FontSizing.svg';
import { ReactComponent as Cursor } from '../../../../icons/assets/svg-export/svgexport-38.svg';
import FontSizeControl from "./../section4/FontSizeControl";
import CursorContext from "../../../../context/CursorContext";
import styles from './Section4.module.css';
import CardSection4 from "../../../../utils/CardSection4.js";
import { useTranslation } from "react-i18next";
const Section4 = () => {
  const [language, setLanguage] = useState(localStorage.getItem("language") || "en");
  const {t} = useTranslation()
  const { handleWhiteCursor, handleBlackCursor, resetCursor } = useContext(CursorContext);
  const [isOpen, setIsOpen] = useState(true); // تتبع القائمة الرئيسية
  const [selectedProperty, setSelectedProperty] = useState("fontSize"); // الخاصية المحددة (افتراضيًا هي fontSize)
  const [activePropertyButton, setActivePropertyButton] = useState(""); // حفظ الزر النشط في قائمة الخصائص
  const [activeCursorButton, setActiveCursorButton] = useState(""); // حفظ الزر النشط في قائمة المؤشرات

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const handlePropertyButtonClick = (property) => {
    setSelectedProperty(property);
    setActivePropertyButton(property); // تعيين الزر النشط في الخصائص
  };

  const handleCursorButtonClick = (cursorType) => {
    setActiveCursorButton(cursorType); // تعيين الزر النشط في المؤشرات
  };

  return (
    <div className={styles.dropdown_container}>
      <button className={`${styles.drop_btn1} ${language === "ar" ? styles.arabic : ""}`} onClick={toggleDropdown}>
        {language === "ar" ? (
          <>
        <span className={styles.dropdown}>{t("ContentAdjustment")}</span>
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
        <span className={styles.dropdown}>{t("ContentAdjustment")}</span>
        </>
        )}  
      </button>
      {isOpen && (
        <div className={styles.font_container}>
          <div className={styles.wide_card}>
            <div className={styles.custom_font_container}>
              <FontSizing className={styles.custom_font_icon} />
              <div className={styles.custom_font_title}>
                <h4>{t("FontSizing")}</h4>
                <p className={styles.p_font}>{t("increaseDecreaseFont")}</p>
              </div>
            </div>
            <div className={styles.font_btn}>
              {/* تحديد نوع الخاصية وتغيير اللون الخلفي باستخدام CSS */}
              <button
                onClick={() => handlePropertyButtonClick("fontSize")}
                className={activePropertyButton === "fontSize" ? styles.activeButton : ""}
              >
                {t("FontSize")}
              </button>
              <button
                onClick={() => handlePropertyButtonClick("lineSpacing")}
                className={activePropertyButton === "lineSpacing" ? styles.activeButton : ""}
              >
               {t("LineSpacing")}
              </button>
              <button
                onClick={() => handlePropertyButtonClick("wordSpacing")}
                className={activePropertyButton === "wordSpacing" ? styles.activeButton : ""}
              >
                {t("WordSpacing")}
              </button>
              <button
                onClick={() => handlePropertyButtonClick("letterSpacing")}
                className={activePropertyButton === "letterSpacing" ? styles.activeButton : ""}
              >
                {t("LetterSpacing")}
              </button>
            </div>
            {/* تمرير الخاصية المحددة لـ FontSizeControl */}
            <FontSizeControl selectedProperty={selectedProperty} />
          </div>
        </div>
      )}

      {isOpen && (
        <div className={styles.cursor_container}>
          <div className={styles.wide_card}>
            <div className={styles.custom_cursor_container}>
              <Cursor className={styles.custom_cursor_icon} />
              <div className={styles.custom_cursor_title}>
                <h4>{t("Cursor")}</h4>
                <p className={styles.p_cursor}>{t("cursorIcon")}</p>
              </div>
            </div>
            <div className={styles.cursor_btn}>
              {/* الأزرار الخاصة بتغيير المؤشر */}
              <button
                onClick={() => {
                  handleWhiteCursor();
                  handleCursorButtonClick("white");
                }}
                className={activeCursorButton === "white" ? styles.activeButton : ""}
              >
                {t("WHITE")}
              </button>
              <button
                onClick={() => {
                  handleBlackCursor();
                  handleCursorButtonClick("black");
                }}
                className={activeCursorButton === "black" ? styles.activeButton : ""}
              >
                {t("BLACK")}
              </button>
            </div>
            <button
              onClick={() => {
                resetCursor();
              }}
              className={styles.reset_btn}
            >
              {t("ResetCursor")}
            </button>
          </div>
        </div>
      )}

      {isOpen && (
        <CardSection4/>
      )}
    </div>
  );
};

export default Section4;

import { useContext, useState, useEffect } from "react";
import { ReactComponent as Ear } from "../../src/icons/assets/icons-svg/Screen-Reader-Adjustment.svg";
import { ReactComponent as Newspaper } from "../../src/icons/assets/icons-svg/Page-Structure.svg";
import { ReactComponent as Keyboard } from "../../src/icons/assets/icons-svg/keyboard.svg";
import { ReactComponent as Smart } from "../../src/icons/assets/icons-svg/Smart-Navigation.svg";
import { ReactComponent as Voice } from "../../src/icons/assets/svg-export/svgexport-14.svg";
import { ReactComponent as Enlargment } from "../../src/icons/assets/svg-export/svgexport-15.svg";
import { ReactComponent as Dark } from "../../src/icons/assets/icons-svg/DarkHigh-Contrast.svg";
import { ReactComponent as Light } from "../../src/icons/assets/icons-svg/Bright-High-Contrast.svg";
import { ReactComponent as Contrast } from "../../src/icons/assets/icons-svg/Contrast-Mode.svg";
import { ReactComponent as LowSaturation } from "../../src/icons/assets/icons-svg/Low-Saturation.svg";
import { ReactComponent as Monochrome } from "../../src/icons/assets/icons-svg/Monochrome.svg";
import { ReactComponent as HighSaturation } from "../../src/icons/assets/icons-svg/High-Saturation.svg";
import { ReactComponent as Img } from "../../src/icons/assets/icons-svg/Image-Description.svg";
import { ReactComponent as MagnifierTxt } from "../../src/icons/assets/icons-svg/Magnifier.svg";
import { ReactComponent as Magnifier } from "../../src/icons/assets/icons-svg/Magnifier.svg";
import { ReactComponent as ReadableFont } from "../../src/icons/assets/icons-svg/Readable-Font.svg";
import { ReactComponent as HighlightLinks } from "../../src/icons/assets/svg-export/svgexport-25.svg";
import { ReactComponent as HighlightHeaders } from "../../src/icons/assets/svg-export/svgexport-26.svg";
import { ReactComponent as Blinks } from "../../src/icons/assets/icons-svg/Blinks-Blocking.svg";
import { ReactComponent as Mute } from "../../src/icons/assets/icons-svg/Mute-Media.svg";
import { ReactComponent as ReadFocus } from "../../src/icons/assets/svg-export/svgexport-29.svg";
import { ReactComponent as ReadGuide } from "../../src/icons/assets/icons-svg/Read-Guide.svg";
import { ReactComponent as Dictionary } from "../../src/icons/assets/icons-svg/Dictionary.svg";
import { ReactComponent as TxtReader } from "../../src/icons/assets/icons-svg/Text-Reader.svg";
import { ReactComponent as ReadableMode } from "../../src/icons/assets/svg-export/svgexport-33.svg";
import styles from '../components/sidebar/sections/section1/Section1.module.css'
import { FaCirclePlus, FaCircleMinus } from "react-icons/fa6";
import { SidebarContext } from "../context/PageStructureContext";
import { useEnlargeContext } from "../context/EnlargeContext";
import DarkModeContext from "../context/DarkModeContext";
import BrightModeContext from "../context/BrightModeContext";
import { useContrastMode } from "../context/ContrastContext";
import { useLowSaturation } from "../context/LowSaturationContext";
import { useHighSaturation } from "../context/HightSaturationContext";
import { useMonochrome } from "../context/MonochromeContext";
import { useMagnifier } from "../context/MagnifierContext";
import { ReadableFontContext } from "../context/ReadableContext";
import { useHighlightLinks } from "../context/HighlightLinksContext";
import { useHighlightHeaders } from "../context/HighlightHeadersContext";
import { useMagnifierText } from "../context/MagnifierText";
import { useAudioContext } from "../context/MuteMediaContext";
import { useReadFocus } from "../context/ReadFocusContext";
import { useReadingGuide } from "../context/ReadGuideContext";
import { useKeyboardNavigation } from "../context/keyboardNavigationContext";
import { useScreenReader } from "../context/ScreenReaderContext";
import { useSmartNavigateContext } from "../context/SmartNavigateContext";
import { useVoiceCommandsContext } from "../context/VoiceCommandsContext";
import { useImageDescription } from "../context/ImageDescriptionContext";
import { useTextReader } from "../context/TextReaderContext";
import { FaCheck } from "react-icons/fa";
import { useTranslation } from "react-i18next";
import { useBlinksBlocking } from "../context/BlinksBlockingContext";

const CardSection1 = () => {
    const {t} = useTranslation()
    const { toggleReadingGuideMode } = useReadingGuide()
    const { toggleReadFocusMode } = useReadFocus()
    const { handleMuteClick } = useAudioContext()
    const { toggleTextMagnifier } = useMagnifierText()
    const { toggleHighlightHeaders } = useHighlightHeaders()
    const { toggleHighlightLinks } = useHighlightLinks()
    const { toggleReadableFont } = useContext(ReadableFontContext)
    const { toggleMagnifier } = useMagnifier()
    const { toggleMonochrome } = useMonochrome()
    const { toggleHighSaturation } = useHighSaturation()
    const { toggleLowSaturation } = useLowSaturation()
    const { toggleContrastMode } = useContrastMode()
    const { toggleBrightMode } = useContext(BrightModeContext)
    const { toggleDarkMode } = useContext(DarkModeContext)
    const { toggleEnlarge } = useEnlargeContext()
    const {toggleKeyboardNavigation} = useKeyboardNavigation()
    const { toggleSidebarMode } = useContext(SidebarContext)
    const {toggleSmartMode} = useSmartNavigateContext()
    const {toggleVoiceCommands} = useVoiceCommandsContext()
    const {toggleTooltipMode} = useImageDescription()
    const {toggleScreenReader} = useScreenReader()
    const {toggleDisableEffects} = useBlinksBlocking()
    const {toggleMode} = useTextReader()
    const [isOpen, setIsOpen] = useState(true);
    const [openItems, setOpenItems] = useState({});
    const [activeButtons, setActiveButtons] = useState({});
    const [activeState, setActiveState] = useState({});
    const [selectedCards, setSelectedCards] = useState(() => {
        // استرجاع الحالة المبدئية من localStorage
        const savedCards = localStorage.getItem("selectedCards");
        return savedCards ? JSON.parse(savedCards) : {};
    });




    const sections = [
        {
          id: 0,
          title: t("Blindness"),
          options: [
            { icon: <Ear />, label: t("ScreenReaderAdjustment"), description: t("ScreenReaderAdjustmentDes"), onClick: toggleScreenReader },
            { icon: <Newspaper />, label: t("PageStructure"), description: t("PageStructureDes"), onClick: toggleSidebarMode },
          ],
        },
        {
          id: 1,
          title: t("MotorSkillsDisorders"),
          options: [
            { icon: <Keyboard />, label: t("KeyboardNavigation"), description: t("KeyboardNavigationDes"), onClick: toggleKeyboardNavigation },
            { icon: <Smart />, label: t("SmartNavigation"), description: t("SmartNavigationDes"), onClick: toggleSmartMode },
            { icon: <Voice />, label: t("VoiceCommands"), description: t("VoiceCommandsDes"), onClick: toggleVoiceCommands },
            { icon: <Enlargment />, label: t("EnlargeButtons"), description: t("EnlargeButtonsDes"), onClick: toggleEnlarge },
            { icon: <Newspaper />, label: t("PageStructure"), description: t("PageStructureDes"), onClick: toggleSidebarMode },
          ],
        },
        {
          id: 2,
          title: t("ColorBar"),
          options: [
            { icon: <Dark />, label: t("DarkHighContrast"), description: t("DarkHighContrastDes"), onClick: toggleDarkMode },
            { icon: <Light />, label: t("BrightHighContrast"), description: t("BrightHighContrastDes"), onClick: toggleBrightMode },
            { icon: <Contrast />, label: t("ContrastMode"), description: t("ContrastModeDes"), onClick: toggleContrastMode },
            { icon: <LowSaturation />, label: t("LowSaturation"), description: t("LowSaturationDes"), onClick: toggleLowSaturation },
            { icon: <Monochrome />, label: t("Monochrome"), description: t("MonochromeDes"), onClick: toggleMonochrome },
            { icon: <HighSaturation />, label: t("HighSaturation"), description: t("HighSaturationDes"), onClick: toggleHighSaturation },
          ],
        },
        {
          id: 3,
          title: t("VisuallyImpaired"),
          options: [
            { icon: <Ear />, label: t("ScreenReaderAdjustment"), description: t("ScreenReaderAdjustmentDes"), onClick: toggleScreenReader },
            { icon: <Dark />, label: t("DarkHighContrast"), description: t("DarkHighContrastDes"), onClick: toggleDarkMode },
            { icon: <Light />, label: t("BrightHighContrast"), description: t("BrightHighContrastDes"), onClick: toggleBrightMode },
            { icon: <Enlargment />, label: t("EnlargeButtons"), description: t("EnlargeButtonsDes"), onClick: toggleEnlarge },
            { icon: <Newspaper />, label: t("PageStructure"), description: t("PageStructureDes"), onClick: toggleSidebarMode },
            { icon: <HighSaturation />, label: t("HighSaturation"), description: t("HighSaturationDes"), onClick: toggleHighSaturation },
            { icon: <LowSaturation />, label: t("LowSaturation"), description: t("LowSaturationDes"), onClick: toggleLowSaturation },
            { icon: <Contrast />, label: t("ContrastMode"), description: t("ContrastModeDes"), onClick: toggleContrastMode },
            { icon: <Img />, label: t("ImageDescriptions"), description: t("ImageDescriptionsDes"), onClick: toggleTooltipMode },
            { icon: <Magnifier />, label: t("Magnifier"), description: t("MagnifierDes"), onClick: toggleMagnifier },
            { icon: <ReadableFont />, label: t("ReadableFont"), description: t("ReadableFontDes"), onClick: toggleReadableFont },
            { icon: <HighlightLinks />, label: t("HighlightLinks"), description: t("HighlightLinksDes"), onClick: toggleHighlightLinks },
            { icon: <HighlightHeaders />, label: t("HighlightHeaders"), description: t("HighlightHeadersDes"), onClick: toggleHighlightHeaders },
            { icon: <MagnifierTxt />, label: t("TextMagnifier"), description: t("TextMagnifierDes"), onClick: toggleTextMagnifier },
          ],
        },
        {
          id: 4,
          title: t("Epilepsy"),
          options: [
            { icon: <Blinks />, label: t("BlinksBlocking"), description: t("BlinksBlockingDes"), onClick: toggleDisableEffects },
            { icon: <LowSaturation />, label: t("LowSaturation"), description: t("LowSaturationDes"), onClick: toggleLowSaturation },
            { icon: <Mute />, label: t("MuteMedia"), description: t("MuteMediaDes"), onClick: handleMuteClick },
          ],
        },
        {
          id: 5,
          title: t("ADHD"),
          options: [
            { icon: <ReadFocus />, label: t("ReadFocus"), description: t("ReadFocusDes"), onClick: toggleReadFocusMode },
            { icon: <Img />, label: t("ImageDescriptions"), description: t("ImageDescriptionsDes"), onClick: toggleTooltipMode },
            { icon: <ReadGuide />, label: t("ReadingGuide"), description: t("ReadingGuideDes"), onClick: toggleReadingGuideMode },
            { icon: <Dictionary />, label: t("Dictionary"), description: t("DictionaryDes"), onClick: () => { } },
            { icon: <Mute />, label: t("MuteMedia"), description: t("MuteMediaDes"), onClick: handleMuteClick },
          ],
        },
        {
          id: 6,
          title: t("Learning"),
          options: [
            { icon: <ReadGuide />, label: t("ReadingGuide"), description: t("ReadingGuideDes"), onClick: toggleReadingGuideMode },
            { icon: <HighlightLinks />, label: t("HighlightLinks"), description: t("HighlightLinksDes"), onClick: toggleHighlightLinks },
            { icon: <HighlightHeaders />, label: t("HighlightHeaders"), description: t("HighlightHeadersDes"), onClick: toggleHighlightHeaders },
          ],
        },
        {
          id: 7,
          title: t("Elder"),
          options: [
            { icon: <TxtReader />, label: t("TextReader"), description: t("TextReaderDes"), onClick: toggleMode },
            { icon: <Enlargment />, label: t("EnlargeButtons"), description: t("EnlargeButtonsDes"), onClick: toggleEnlarge },
            { icon: <Dictionary />, label: t("Dictionary"), description: t("DictionaryDes"), onClick: () => { } },
            { icon: <MagnifierTxt />, label: t("TextMagnifier"), description: t("TextMagnifierDes"), onClick: toggleTextMagnifier },
            { icon: <Magnifier />, label: t("Magnifier"), description: t("MagnifierDes"), onClick: toggleMagnifier },
            { icon: <ReadFocus />, label: t("ReadFocus"), description: t("ReadFocusDes"), onClick: toggleReadFocusMode },
            { icon: <ReadGuide />, label: t("ReadingGuide"), description: t("ReadingGuideDes"), onClick: toggleReadingGuideMode },
            { icon: <ReadableMode />, label: t("ReadableMode"), description: t("ReadableModeDes"), onClick: toggleReadableFont },
          ],
        },
        {
          id: 8,
          title: t("Dyslexia"),
          options: [
            { icon: <Dictionary />, label: t("Dictionary"), description: t("DictionaryDes"), onClick: () => { } },
            { icon: <Img />, label: t("ImageDescriptions"), description: t("ImageDescriptionsDes"), onClick: toggleTooltipMode },
            { icon: <ReadGuide />, label: t("ReadingGuide"), description: t("ReadingGuideDes"), onClick: toggleReadingGuideMode },
          ],
        },
      ];
      

      const toggleItem = (index) => {
        setOpenItems((prev) => ({
            ...prev,
            [index]: !prev[index],
        }));
    };

    const handleCardClick = (sectionId, cardIndex) => {
        setSelectedCards((prev) => {
            const updatedCards = {
                ...prev,
                [sectionId]: prev[sectionId] === cardIndex ? null : cardIndex,
            };
            localStorage.setItem("selectedCards", JSON.stringify(updatedCards));
            return updatedCards;
        });
    };

    const handleToggle = (sectionId, state) => {
        const section = sections.find(s => s.id === sectionId);
        const onButton = document.getElementById(`${sectionId}-on`); // زر ON
        const offButton = document.getElementById(`${sectionId}-off`); // زر OFF
        const sectionCard = document.getElementById(`${sectionId}-card`); // الكارت الذي يحتوي على المود
        
        // حفظ الحالة في localStorage
        localStorage.setItem(sectionId, state);
      
        // تعيين الخلفية واللون للزر بناءً على الحالة
        let onButtonStyle = {
          backgroundColor: state === 'ON' ? 'gray' : 'white',
          color: 'black',
        };
        let offButtonStyle = {
          backgroundColor: state === 'OFF' ? 'gray' : 'white',
          color: 'black',
        };
      
        // تحديث أنماط الأزرار
        if (onButton) {
          onButton.style.backgroundColor = onButtonStyle.backgroundColor;
          onButton.style.color = onButtonStyle.color;
        }
        if (offButton) {
          offButton.style.backgroundColor = offButtonStyle.backgroundColor;
          offButton.style.color = offButtonStyle.color;
        }
      
        // إضافة أو إزالة علامة صح داخل الكارت
        if (sectionCard) {
          if (state === 'ON') {
            sectionCard.classList.add('checked');
          } else {
            sectionCard.classList.remove('checked');
          }
        }
      
        // تنفيذ التأثيرات بناءً على المود
        if (state === 'ON') {
          // إضافة المودات عند تفعيل "ON"
          if (section.title === t("Blindness")) {
            toggleScreenReader(true);
          }
      
          if (section.title === t("MotorSkillsDisorders")) {
            toggleVoiceCommands(true);
            toggleKeyboardNavigation(true);
          }
      
          if (section.title === t("ColorBar")) {
            toggleDarkMode(true);
          }
      
          if (section.title === t("VisuallyImpaired")) {
            toggleScreenReader(true);
            toggleDarkMode(true);
            toggleTooltipMode(true);
            toggleMagnifier(true);
            toggleReadableFont(true);
            toggleHighlightHeaders(true);
            toggleHighlightLinks(true);
            toggleTextMagnifier(true);
          }
      
          if (section.title === t("Epilepsy")) {
            toggleDisableEffects(true);
            toggleLowSaturation(true);
            handleMuteClick(true);
          }
      
          if (section.title === t("ADHD")) {
            toggleReadFocusMode(true);
            toggleTooltipMode(true);
            toggleReadingGuideMode(true);
            handleMuteClick(true);
          }
      
          if (section.title === t("Learning")) {
            toggleReadingGuideMode(true);
            toggleHighlightHeaders(true);
            toggleHighlightLinks(true);
          }
      
          if (section.title === t("Elder")) {
            toggleMode(true);
            toggleTextMagnifier(true);
            toggleMagnifier(true);
            toggleReadFocusMode(true);
            toggleReadingGuideMode(true);
          }
      
          if (section.title === t("Dyslexia")) {
            toggleTooltipMode(true);
            toggleReadingGuideMode(true);
          }
        } else if (state === 'OFF') {
          // إلغاء المودات عند تفعيل "OFF"
          if (section.title === t("Blindness")) {
            toggleScreenReader(false);
          }
      
          if (section.title === t("MotorSkillsDisorders")) {
            toggleVoiceCommands(false);
            toggleKeyboardNavigation(false);
          }
      
          if (section.title === t("ColorBar")) {
            toggleDarkMode(false);
          }
      
          if (section.title === t("VisuallyImpaired")) {
            toggleScreenReader(false);
            toggleDarkMode(false);
            toggleTooltipMode(false);
            toggleMagnifier(false);
            toggleReadableFont(false);
            toggleHighlightHeaders(false);
            toggleHighlightLinks(false);
            toggleTextMagnifier(false);
          }
      
          if (section.title === t("Epilepsy")) {
            toggleDisableEffects(false);
            toggleLowSaturation(false);
            handleMuteClick(false);
          }
      
          if (section.title === t("ADHD")) {
            toggleReadFocusMode(false);
            toggleTooltipMode(false);
            toggleReadingGuideMode(false);
            handleMuteClick(false);
          }
      
          if (section.title === t("Learning")) {
            toggleReadingGuideMode(false);
            toggleHighlightHeaders(false);
            toggleHighlightLinks(false);
          }
      
          if (section.title === t("Elder")) {
            toggleMode(false);
            toggleTextMagnifier(false);
            toggleMagnifier(false);
            toggleReadFocusMode(false);
            toggleReadingGuideMode(false);
          }
      
          if (section.title === t("Dyslexia")) {
            toggleTooltipMode(false);
            toggleReadingGuideMode(false);
          }
        }
      };
      

      
  
  
  return (
      <>
          <ul className={styles.dropdown_menu}>
              {sections.map(({ id, title, options }) => (
                  <div key={id} className={styles.first_section}>
                      <div className={styles.body_container}>
                          <div className={styles.first_line}>
                              <button className={styles.bar} onClick={() => toggleItem(id)}>
                                  {openItems[id] ? (
                                      <FaCircleMinus className={styles.icon_list} />
                                  ) : (
                                      <FaCirclePlus className={styles.icon_list} />
                                  )}
                                  <span>{title}</span>
                              </button>
                              <span className={styles.on_off}>
                                  {["ON", "OFF"].map((state) => (
                                      <span
                                          key={state}
                                          id={`${id}-${state.toLowerCase()}`} // إضافة ID لتمييز الأزرار
                                          className={`${styles.toggle_button} ${openItems[id] ? styles.active : ""}`}
                                          onClick={() => handleToggle(id, state)}
                                      >
                                          {state}
                                      </span>
                                  ))}
                              </span>
                          </div>
                          <div className={styles.second_line}>
                              {openItems[id] && (
                                  <div className={styles.card_container_sec_line}>
                                      {options.map(({ icon, label, description, onClick }, idx) => (
                                    <div
                                    key={idx}
                                    className={`${styles.card_section4} ${selectedCards[id] === idx ? styles.selectedCard : ''}`}
                                    onClick={() => { 
                                        onClick(); 
                                        handleCardClick(id, idx);
                                    }}
                                  >
                                    <div className={styles.section4_icon}>{icon}</div>
                                    <p className={styles.section4_p}>{label}</p>
                                    <p className={styles.hover_text}>{description}</p>
                                    {selectedCards[id] === idx && <FaCheck className={styles.checkIcon} />}
                                  </div>
                                  
                                      ))}
                                  </div>
                              )}
                          </div>
                      </div>
                  </div>
              ))}
          </ul>
      </>
  );
  
};

export default CardSection1;
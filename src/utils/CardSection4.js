import React, { useContext, useState, useEffect } from "react";
import { ReactComponent as Virtual } from "../../src/icons/assets/svg-export/svgexport-41.svg";
import { ReactComponent as Newspaper } from "../../src/icons/assets/icons-svg/Page-Structure.svg";
import { ReactComponent as Captions } from "../../src/icons/assets/svg-export/svgexport-39.svg";
import { ReactComponent as Enlargment } from "../../src/icons/assets/svg-export/svgexport-15.svg";
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
import { ReactComponent as ReadableMode } from "../../src/icons/assets/svg-export/svgexport-33.svg";
import styles from "../components/sidebar/sections/section4/Section4.module.css";
import { useAudioContext } from "../context/MuteMediaContext";
import { useMagnifier } from "../context/MagnifierContext";
import { ReadableFontContext } from "../context/ReadableContext";
import { useHighlightLinks } from "../context/HighlightLinksContext";
import { useHighlightHeaders } from "../context/HighlightHeadersContext";
import { useEnlargeContext } from "../context/EnlargeContext";
import { useMagnifierText } from "../context/MagnifierText";
import { useReadFocus } from "../context/ReadFocusContext";
import { useReadingGuide } from "../context/ReadGuideContext";
import { KeyboardContext } from "../context/VertualKeyboardContext";
import { SidebarContext } from "../context/PageStructureContext";
import { useBlinksBlocking } from "../context/BlinksBlockingContext";
import { useAddCaption } from "../context/AddCaptionContext";
import { useImageDescription } from "../context/ImageDescriptionContext";
import { usePagePreview } from "../context/PageViewContext";
import { useTranslation } from 'react-i18next';



const CardSection4 = () => {
  const { t } = useTranslation();
  const { toggleSidebarMode } = useContext(SidebarContext);
  const { toggleKeyboardMode } = useContext(KeyboardContext);
  const { toggleReadingGuideMode } = useReadingGuide();
  const { toggleReadFocusMode } = useReadFocus();
  const { toggleTextMagnifier } = useMagnifierText();
  const { toggleEnlarge } = useEnlargeContext();
  const { toggleHighlightHeaders } = useHighlightHeaders();
  const { toggleHighlightLinks } = useHighlightLinks();
  const { toggleReadableFont } = useContext(ReadableFontContext);
  const { toggleMagnifier } = useMagnifier();
  const { handleMuteClick } = useAudioContext();
  const { toggleDisableEffects } = useBlinksBlocking();
  const { toggleCaption } = useAddCaption();
  const { toggleTooltipMode } = useImageDescription();

  const [isOpen, setIsOpen] = useState(true);
  const [selectedCards, setSelectedCards] = useState([]); 
  const [showPageStructure, setShowPageStructure] = useState(false);
  const { isPreviewMode, togglePreviewMode, openPreviewInNewWindow } = usePagePreview();

  useEffect(() => {
    if (isPreviewMode) {
      openPreviewInNewWindow();
    }
  }, [isPreviewMode, openPreviewInNewWindow]);

  useEffect(() => {
    const storedCards = localStorage.getItem('selectedCards');
    if (storedCards) {
      const parsedCards = JSON.parse(storedCards);
      if (Array.isArray(parsedCards)) {
        setSelectedCards(parsedCards);
      } else {
        setSelectedCards([]);
      }
    }
  }, []);

  useEffect(() => {
    if (Array.isArray(selectedCards)) {  
      localStorage.setItem('selectedCards', JSON.stringify(selectedCards));
    }
  }, [selectedCards]);

  const handleCardClick = (card) => {
    console.log(`Card ${card} clicked`);
    if (card === 10) {
      setShowPageStructure((prevState) => {
        console.log(`Toggling showPageStructure: ${!prevState}`);
        return !prevState;
      });
    } else {
      setSelectedCards((prevSelectedCards) => {
        if (prevSelectedCards.includes(card)) {
          return prevSelectedCards.filter((selectedCard) => selectedCard !== card);
        } else {
          return [...prevSelectedCards, card];
        }
      });
    }
  };

  const cards = [
    { id: 0, icon: <Blinks />, label: t("BlinksBlocking"), description: t("BlinksBlockingDescription"), action: toggleDisableEffects },
    { id: 1, icon: <Captions />, label: t("AddCaptions"), description: t("AddCaptionsDescription"), action: toggleCaption },
    { id: 2, icon: <Magnifier />, label: t("Magnifier"), description: t("MagnifierDescription"), action: toggleMagnifier },
    { id: 3, icon: <ReadableFont />, label: t("ReadableFont"), description: t("ReadableFontDescription"), action: toggleReadableFont },
    { id: 4, icon: <Img />, label: t("ImageDescriptions"), description: t("ImageDescriptionsDescription"), action: toggleTooltipMode },
    { id: 5, icon: <HighlightLinks />, label: t("HighlightLinks"), description: t("HighlightLinksDescription"), action: toggleHighlightLinks },
    { id: 6, icon: <HighlightHeaders />, label: t("HighlightHeaders"), description: t("HighlightHeadersDescription"), action: toggleHighlightHeaders },
    { id: 7, icon: <Enlargment />, label: t("EnlargeButtons"), description: t("EnlargeButtonsDescription"), action: toggleEnlarge },
    { id: 8, icon: <ReadableMode />, label: t("ReadableMode"), description: t("ReadableModeDescription"), action: togglePreviewMode },
    { id: 9, icon: <MagnifierTxt />, label: t("TextMagnifier"), description: t("TextMagnifierDescription"), action: toggleTextMagnifier },
    { id: 10, icon: <Newspaper />, label: t("PageStructure"), description: t("PageStructureDescription"), action: toggleSidebarMode },
    { id: 11, icon: <Mute />, label: t("MuteMedia"), description: t("MuteMediaDescription"), action: handleMuteClick },
    { id: 12, icon: <ReadFocus />, label: t("ReadFocus"), description: t("ReadFocusDescription"), action: toggleReadFocusMode },
    { id: 13, icon: <ReadGuide />, label: t("ReadingGuide"), description: t("ReadingGuideDescription"), action: toggleReadingGuideMode },
    { id: 14, icon: <Dictionary />, label: t("Dictionary"), description: t("DictionaryDescription"), action: () => { } },
    { id: 15, icon: <Virtual />, label: t("VirtualKeyboard"), description: t("VirtualKeyboardDescription"), action: toggleKeyboardMode }
  ];


  return (
    <>
      {isOpen && (
        <div className={styles.card_container_section4}>
          {cards.map((card) => (
            <div
              key={card.id}
              className={`${styles.card_section4} ${selectedCards.includes(card.id) ? styles.selected_card : ""}`}
              onClick={() => {
                handleCardClick(card.id);
                card.action();
              }}
            >
              <div className={styles.section4_icon}>{card.icon}</div>
              <p className={styles.section4_p}>{card.label}</p>
              <p className={styles.hover_text}>{card.description}</p>
              {selectedCards.includes(card.id) && <div className={styles.check_mark}>✔</div>}
            </div>
          ))}
        </div>
      )}
    </>
  );
};

export default CardSection4;


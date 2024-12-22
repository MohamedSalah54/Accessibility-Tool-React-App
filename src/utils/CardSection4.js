// import React, { useContext, useState,useEffect } from "react"; 
// import { ReactComponent as Virtual } from "../../src/icons/assets/svg-export/svgexport-41.svg";
// import { ReactComponent as Newspaper } from "../../src/icons/assets/icons-svg/Page-Structure.svg";
// import { ReactComponent as Captions } from "../../src/icons/assets/svg-export/svgexport-39.svg";
// import { ReactComponent as Enlargment } from "../../src/icons/assets/svg-export/svgexport-15.svg";
// import { ReactComponent as Img } from "../../src/icons/assets/icons-svg/Image-Description.svg";
// import { ReactComponent as MagnifierTxt } from "../../src/icons/assets/icons-svg/Magnifier.svg";
// import { ReactComponent as Magnifier } from "../../src/icons/assets/icons-svg/Magnifier.svg";
// import { ReactComponent as ReadableFont } from "../../src/icons/assets/icons-svg/Readable-Font.svg";
// import { ReactComponent as HighlightLinks } from "../../src/icons/assets/svg-export/svgexport-25.svg";
// import { ReactComponent as HighlightHeaders } from "../../src/icons/assets/svg-export/svgexport-26.svg";
// import { ReactComponent as Blinks } from "../../src/icons/assets/icons-svg/Blinks-Blocking.svg";
// import { ReactComponent as Mute } from "../../src/icons/assets/icons-svg/Mute-Media.svg";
// import { ReactComponent as ReadFocus } from "../../src/icons/assets/svg-export/svgexport-29.svg";
// import { ReactComponent as ReadGuide } from "../../src/icons/assets/icons-svg/Read-Guide.svg";
// import { ReactComponent as Dictionary } from "../../src/icons/assets/icons-svg/Dictionary.svg";
// import { ReactComponent as ReadableMode } from "../../src/icons/assets/svg-export/svgexport-33.svg";
// import styles from "../components/sidebar/sections/section4/Section4.module.css";
// import { useAudioContext } from "../context/MuteMediaContext";
// import { useMagnifier } from "../context/MagnifierContext";
// import { ReadableFontContext } from "../context/ReadableContext";
// import { useHighlightLinks } from "../context/HighlightLinksContext";
// import { useHighlightHeaders } from "../context/HighlightHeadersContext";
// import { useEnlargeContext } from "../context/EnlargeContext";
// import { useMagnifierText } from "../context/MagnifierText";
// import { useReadFocus } from "../context/ReadFocusContext";
// import { useReadingGuide } from "../context/ReadGuideContext";
// import { KeyboardContext } from "../context/VertualKeyboardContext";
// import { SidebarContext } from "../context/PageStructureContext";
// import { usePagePreview } from "../context/PageViewContext";
// import { useImageDescription } from "../context/ImageDescriptionContext";
// import { useAddCaption } from "../context/AddCaptionContext";
// import { useBlinksBlocking } from "../context/BlinksBlockingContext";
// const CardSection4 = () => {
//   const { isPreviewMode, togglePreviewMode, openPreviewInNewWindow } = usePagePreview();
//   useEffect(() => {
//     if (isPreviewMode) {
//       openPreviewInNewWindow();
//     }
//   }, [isPreviewMode, openPreviewInNewWindow]);
//   const {toggleDisableEffects} = useBlinksBlocking()
//   const {toggleCaption} = useAddCaption()
//   const { toggleTooltipMode} = useImageDescription()
//   const {toggleSidebarMode} = useContext(SidebarContext)
//   const {toggleKeyboardMode} = useContext(KeyboardContext)
//   const{toggleReadingGuideMode} = useReadingGuide()
//   const {toggleReadFocusMode} = useReadFocus()
//   const {toggleTextMagnifier} = useMagnifierText()
//   const{toggleEnlarge} = useEnlargeContext()
//   const {toggleHighlightHeaders} = useHighlightHeaders()
//   const {toggleHighlightLinks} = useHighlightLinks()
//   const {toggleReadableFont} = useContext(ReadableFontContext)
//   const{toggleMagnifier} = useMagnifier()

//   const { handleMuteClick  } = useAudioContext();
//   const [isOpen, setIsOpen] = useState(true); // Track if the main menu is open
//   const [selectedCard, setSelectedCard] = useState(null); // Track the selected card

//   const [showPageStructure, setShowPageStructure] = useState(false); // State to show/hide PageStructure
//   useEffect(() => {
//     const storedSelectedCard = localStorage.getItem("selectedCard");
//     if (storedSelectedCard) {
//       setSelectedCard(Number(storedSelectedCard)); // استعادة الكارت المحدد
//     }
//   }, []);
//   const handleCardClick = (card) => {
//     setSelectedCard((prevActiveCard) => {
//       const newSelectedCard = prevActiveCard === card ? null : card;
//       localStorage.setItem("selectedCard", newSelectedCard !== null ? newSelectedCard : ""); // تخزين أو إزالة الحالة
//       return newSelectedCard;
//     });
//   };

  // Handle the card click logic
//  const handleCardClick = (card) => {
//     console.log(`Card ${card} clicked`); // Add a log here to check if the card click is working
//     if (card === 10) {
//       setShowPageStructure((prevState) => {
//         console.log(`Toggling showPageStructure: ${!prevState}`); // Add a log to check toggle state
//         return !prevState; // Toggle the visibility of PageStructure
//       });
//     } else {
//       setSelectedCard((prevActiveCard) => (prevActiveCard === card ? null : card));
//     }
//   };


//   return (
//     <>
//       {isOpen && (
//         <div className={styles.card_container_section4}>
//           <div
//             className={`${styles.card_section4} ${selectedCard === 0 ? styles.selected_card : ""}`}
//             onClick={() =>{ 
//               handleCardClick(0)
//               toggleDisableEffects()
//             }}
//           >
//             <div className={styles.section4_icon}><Blinks /></div>
//             <p className={styles.section4_p}>Blinks Blocking</p>
//             <p className={styles.hover_text}>Stops blinking and flashing of moving elements.</p>
//             {selectedCard === 0 && <div className={styles.check_mark}>✔</div>}
//           </div>
          
//           <div
//             className={`${styles.card_section4} ${selectedCard === 1 ? styles.selected_card : ""}`}
//             onClick={() => {
//               handleCardClick(1)
//               toggleCaption()
//             }}
//           >
//             <div className={styles.section4_icon}><Captions /></div>
//             <p className={styles.section4_p}>Add Captions (Beta)</p>
//             <p className={styles.hover_text}>Add captions to videos and audio.</p>
//             {selectedCard === 1 && <div className={styles.check_mark}>✔</div>}
//           </div>

//           <div
//             className={`${styles.card_section4} ${selectedCard === 2 ? styles.selected_card : ""}`}
//             onClick={() => {handleCardClick(2)
//               toggleMagnifier()
//             }
              
//             }
//           >
//             <div className={styles.section4_icon}><Magnifier /></div>
//             <p className={styles.section4_p}>Magnifier</p>
//             <p className={styles.hover_text}>Zooms the screen display.</p>
//             {selectedCard === 2 && <div className={styles.check_mark}>✔</div>}
//           </div>

//           <div
//             className={`${styles.card_section4} ${selectedCard === 3 ? styles.selected_card : ""}`}
//             onClick={() =>{
//                handleCardClick(3);
//                toggleReadableFont()
//             }}
//           >
//             <div className={styles.section4_icon}><ReadableFont /></div>
//             <p className={styles.section4_p}>Readable Font</p>
//             <p className={styles.hover_text}>Convert the site's fonts to [sans-serif] and readable ones.</p>
//             {selectedCard === 3 && <div className={styles.check_mark}>✔</div>}
//           </div>

//           <div
//             className={`${styles.card_section4} ${selectedCard === 4 ? styles.selected_card : ""}`}
//             onClick={() => {
//               handleCardClick(4)
//               toggleTooltipMode()
              
//             }}
//           >
//             <div className={styles.section4_icon}><Img /></div>
//             <p className={styles.section4_p}>Image Descriptions</p>
//             <p className={styles.hover_text}>Displays image descriptions in a floating window.</p>
//             {selectedCard === 4 && <div className={styles.check_mark}>✔</div>}
//           </div>

//           <div
//             className={`${styles.card_section4} ${selectedCard === 5 ? styles.selected_card : ""}`}
//             onClick={() => {
//               handleCardClick(5)
//               toggleHighlightLinks()
//             }}
//           >
//             <div className={styles.section4_icon}><HighlightLinks /></div>
//             <p className={styles.section4_p}>Highlight Links</p>
//             <p className={styles.hover_text}>Highlights the site links.</p>
//             {selectedCard === 5 && <div className={styles.check_mark}>✔</div>}
//           </div>

//           <div
//             className={`${styles.card_section4} ${selectedCard === 6 ? styles.selected_card : ""}`}
//             onClick={() =>{ 
//               handleCardClick(6)
//               toggleHighlightHeaders()
//             }}
//           >
//             <div className={styles.section4_icon}><HighlightHeaders /></div>
//             <p className={styles.section4_p}>Highlight Headers</p>
//             <p className={styles.hover_text}>Highlights the site headers.</p>
//             {selectedCard === 6 && <div className={styles.check_mark}>✔</div>}
//           </div>

//           <div
//             className={`${styles.card_section4} ${selectedCard === 7 ? styles.selected_card : ""}`}
//             onClick={() => {
//               handleCardClick(7)
//               toggleEnlarge()
//             }}
//           >
//             <div className={styles.section4_icon}><Enlargment /></div>
//             <p className={styles.section4_p}>Enlarge Buttons</p>
//             <p className={styles.hover_text}>Enlarges buttons to meet WCAG accessibility regulations.</p>
//             {selectedCard === 7 && <div className={styles.check_mark}>✔</div>}
//           </div>

//           <div
//             className={`${styles.card_section4} ${selectedCard === 8 ? styles.selected_card : ""}`}
//             onClick={() =>{ handleCardClick(8)
//                togglePreviewMode()
//             }}
//           >
//             <div className={styles.section4_icon}><ReadableMode /></div>
//             <p className={styles.section4_p}>Readable Mode</p>
//             <p className={styles.hover_text}>Displays the site's contents in a new window clearly and readable.</p>
//             {selectedCard === 8 && <div className={styles.check_mark}>✔</div>}
//           </div>

//           <div
//             className={`${styles.card_section4} ${selectedCard === 9 ? styles.selected_card : ""}`}
//             onClick={() => {
//               handleCardClick(9)
//               toggleTextMagnifier()

//             }}
//           >
//             <div className={styles.section4_icon}><MagnifierTxt /></div>
//             <p className={styles.section4_p}>Text Magnifier</p>
//             <p className={styles.hover_text}>Increase the content chosen by the cursor, shown in a tooltip.</p>
//             {selectedCard === 9 && <div className={styles.check_mark}>✔</div>}
//           </div>

         
//           <div
//           className={`${styles.card_section4} ${selectedCard === 10 ? styles.selected_card : ""}`}
//           onClick={() =>{
//              handleCardClick(10)
//              toggleSidebarMode()
//             }}
//         >
//           <div className={styles.section4_icon}><Newspaper /></div>
//           <p className={styles.section4_p}>Page Structure</p>
//           <p className={styles.hover_text}>Generate a list of page landmarks, headers, and links.</p>
//           {selectedCard === 10 && <div className={styles.check_mark}>✔</div>}
//         </div>

          
   


//           <div
//             className={`${styles.card_section4} ${selectedCard === 11 ? styles.selected_card : ""}`}
//             onClick={() => {
//               handleCardClick(11);
//               handleMuteClick(); 
//             }}
//           >
//             <div className={styles.section4_icon}><Mute /></div>
//             <p className={styles.section4_p}>Mute Media</p>
//             <p className={styles.hover_text}>Mutes all sounds and vocal elements.</p>
//             {selectedCard === 11 && <div className={styles.check_mark}>✔</div>}
//           </div>

//           <div
//             className={`${styles.card_section4} ${selectedCard === 12 ? styles.selected_card : ""}`}
//             onClick={() => {
//               handleCardClick(12)
//               toggleReadFocusMode()
//             }}
//           >
//             <div className={styles.section4_icon}><ReadFocus /></div>
//             <p className={styles.section4_p}>Read focus</p>
//             <p className={styles.hover_text}>Light up a selected paragraph on the page by hovering with the mouse across the page.</p>
//             {selectedCard === 12 && <div className={styles.check_mark}>✔</div>}
//           </div>
//           <div
//             className={`${styles.card_section4} ${selectedCard === 13 ? styles.selected_card : ""}`}
//             onClick={() => {
//               handleCardClick(13)
//               toggleReadingGuideMode()
//             }}
//           >
//             <div className={styles.section4_icon}><ReadGuide /></div>
//             <p className={styles.section4_p}>Reading guide</p>
//             <p className={styles.hover_text}>Create a virtual bar that follows the cursor to improve the reader's focus.</p>
//             {selectedCard === 13 && <div className={styles.check_mark}>✔</div>}
//           </div>
//           <div
//             className={`${styles.card_section4} ${selectedCard === 14 ? styles.selected_card : ""}`}
//             onClick={() => handleCardClick(14)}
//           >
//             <div className={styles.section4_icon}><Dictionary /></div>
//             <p className={styles.section4_p}>Dictionary</p>
//             <p className={styles.hover_text}>Describe words by mose.</p>
//             {selectedCard === 14 && <div className={styles.check_mark}>✔</div>}
//           </div>

//           <div
//             className={`${styles.card_section4} ${selectedCard === 15 ? styles.selected_card : ""}`}
//             onClick={() => {
//               handleCardClick(15)
//               toggleKeyboardMode()
//             }}
//           >
//             <div className={styles.section4_icon}><Virtual /></div>
//             <p className={styles.section4_p}>Virtual Keyboard</p>
//             <p className={styles.hover_text}>Enables users to type contents using the mouse.</p>
//             {selectedCard === 15 && <div className={styles.check_mark}>✔</div>}
//           </div>

          
//         </div>
//       )}
//     </>
//   );
// };

// export default CardSection4;


import React, { useContext, useState,useEffect } from "react";
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
  const [selectedCards, setSelectedCards] = useState([]); // تأكيد أن القيمة هي مصفوفة فارغة في البداية
  const [showPageStructure, setShowPageStructure] = useState(false);
  const { isPreviewMode, togglePreviewMode, openPreviewInNewWindow } = usePagePreview();

  useEffect(() => {
    if (isPreviewMode) {
      openPreviewInNewWindow();
    }
  }, [isPreviewMode, openPreviewInNewWindow]);

  // تحميل البيانات من localStorage عند بدء التشغيل
  useEffect(() => {
    const storedCards = localStorage.getItem('selectedCards');
    if (storedCards) {
      const parsedCards = JSON.parse(storedCards);
      // التأكد من أن parsedCards هو مصفوفة
      if (Array.isArray(parsedCards)) {
        setSelectedCards(parsedCards);
      } else {
        setSelectedCards([]);
      }
    }
  }, []);

  // حفظ التحديدات في localStorage عند تغييره
  useEffect(() => {
    if (Array.isArray(selectedCards)) {  // تأكد من أن selectedCards هو مصفوفة
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
          // إذا كان الكارت محدد بالفعل، قم بإزالته من المصفوفة
          return prevSelectedCards.filter((selectedCard) => selectedCard !== card);
        } else {
          // إذا لم يكن الكارت محدد، أضفه إلى المصفوفة
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
    { id: 14, icon: <Dictionary />, label: t("Dictionary"), description: t("DictionaryDescription"), action: () => {} },
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


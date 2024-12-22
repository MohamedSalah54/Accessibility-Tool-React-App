import React, { createContext, useState } from "react";
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

export const GlobalStateContext4 = createContext();

// مكون Provider
export const GlobalStateProvider4 = ({ children }) => {
  const [openItems, setOpenItems] = useState({});
  const [activeButtons, setActiveButtons] = useState({});



  const cardsSection4 = [
    { icon: <Blinks  />, text: "Blinks Blocking", hoverText:"Stops blinking and flashing of moving elements.", },
    { icon: <Captions />, text: "Add Captions (Beta)", hoverText:"Add captions to videos and audio." },
    { icon: <Magnifier />, text: "Magnifier" , hoverText:"Zooms the screen display."},
    { icon: <ReadableFont />, text: "Readable Font", hoverText:"Convert the sites's fonts to [sans-serif] and readable ones."},
    { icon: <Img />, text: "Image Descriptions" , hoverText:"Displays image descriptions in a floating window."},
    { icon: <HighlightLinks />, text: "Highlight Links" , hoverText:"Highlights the site links."},
    { icon: <HighlightHeaders />, text: "Highlight Headers", hoverText:"Highlights the site headers."  },
    { icon: <Enlargment />, text: "Enlarge Buttons" , hoverText:"Enlarges buttons to meet WCAG accessibility regulations." },
    { icon: <ReadableMode />, text: "Readable Mode" , hoverText:"Displays the site's contents in a new window clearly and readable."},
    { icon: <MagnifierTxt />, text: "Text Magnifier" , hoverText:"Increase the content chosen by the cursor,shown in a tooltip." },
    { icon: <Newspaper />, text: "Page Structure", hoverText:"Generate a list of page landmarks, headers, and links." },
    { icon: <Mute />, text: "Mute Media" , hoverText:"Mutes all sounds and vocal element." },
    { icon: <ReadFocus />, text: "Read focus" , hoverText:"Light up a selected paragraph on the page by hovering with the mouse across the page." },
    { icon: <ReadGuide />, text: "Reading guide", hoverText:"Create a virtual bar that follows the cursor to improve the reader's focus."  },
    { icon: <Dictionary />, text: "Dictionary", hoverText:"Describe words by mose."  },
    { icon: <Virtual />, text: "Virtual Keyboard", hoverText:"Enables users to type contents using the mouse." },
   
]

  return (
    <GlobalStateContext4.Provider
      value={{
        cardsSection4,
        openItems,
        setOpenItems,
        activeButtons,
        setActiveButtons,
      }}
    >
      {children}
    </GlobalStateContext4.Provider>
  );
};

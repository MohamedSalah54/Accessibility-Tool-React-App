import ScreenReaderAdjustmentIcon from "../assets/icons-svg/Screen-Reader-Adjustment.svg";
import PageStructureIcon from "../assets/icons-svg/Page-Structure.svg";
import KeyboardIcon from "../assets/icons-svg/keyboard.svg";
import SmartNavigationIcon from "../assets/icons-svg/Smart-Navigation.svg";
import VoiceCommandsIcon from "../assets/icons-svg/Voice-Commands.svg";
import EnlargeButtonsIcon from "../assets/icons-svg/Enlarge-Buttons.svg";
import ImageDescriptionsIcon from "../assets/icons-svg/Image-Description.svg";
import ReadableFontIcon from "../assets/icons-svg/Readable-Font.svg";
import HighlightLinksIcon from "../assets/icons-svg/Highlight-Links.svg";
import HighlightHeadersIcon from "../assets/icons-svg/Highlight-Headers.svg";
import BlinksBlockingIcon from "../assets/icons-svg/Blinks-Blocking.svg";
import MuteMediaIcon from "../assets/icons-svg/Mute-Media.svg";
import ReadguideIcon from "../assets/icons-svg/Read-Guide.svg";
import DictionaryIcon from "../assets/icons-svg/Dictionary.svg";
import ReadfocusIcon from "../assets/icons-svg/Read-focus.svg";
import MagnifierIcon from "../assets/icons-svg/Magnifier.svg";
import ReadableModeIcon from "../assets/icons-svg/Readable-Mode.svg";
import TextReaderIcon from "../assets/icons-svg/Text-Reader.svg";
import AddCaptionsIcon from "../assets/icons-svg/AddCaptions.svg";
import VirtualKeyboardIcon from "../assets/icons-svg/VirtualKeyboard.svg";



const dataNavigationAdjustment = [
  {
    id: 1,
    title: "Screen Reader Adjustment",
    desc: "Makes the site compatible for screen reader users",
    icon: ScreenReaderAdjustmentIcon
  },

  {
    id: 2,
    title: "Keyboard Navigation",
    desc: "Enables users to navigate by keyboard, without using the mouse",
    icon: KeyboardIcon
  },
  {
    id: 3,
    title: "Smart Navigation",
    desc: "Enables users to navigate the site by numeric keys",
    icon: SmartNavigationIcon
  },
  {
    id: 5,
    title: "Text Reader",
    desc: "Reading the site's text aloud, in supported browsers",
    icon: TextReaderIcon
  },
  {
    id: 6,
    title: "Voice Commands",
    desc: "Executing Commands with a microphone, in supported browsers",
    icon: VoiceCommandsIcon
  },

];



const dataContentAdjustment = [
  {
    id: 1,
    title: "Blinks Blocking",
    desc: "Stops blinking and flashing of moving elements",
    icon: BlinksBlockingIcon
  },
  {
    id: 2,
    title: "Add captions (beta)",
    desc: "Adds captions to videos and audio",
    icon: AddCaptionsIcon
  },
  {
    id: 3,
    title: "Magnifier",
    desc: "Zooms the screen display",
    icon: MagnifierIcon
  },
  {
    id: 4,
    title: "Readable Font",
    desc: "Convert the site's fonts to (sans-serif) and readable ones",
    icon: ReadableFontIcon
  },

  {
    id: 5,
    title: "Image Descriptions",
    desc: "Displays image descriptions in a floating window",
    icon: ImageDescriptionsIcon
  },
  {
    id: 6,
    title: "Highlight Links",
    desc: "Highlights the site links",
    icon: HighlightLinksIcon
  },

  {
    id: 7,
    title: "Highlight Headers",
    desc: "Highlights the site headers",
    icon: HighlightHeadersIcon
  },

  {
    id: 8,
    title: "Enlarge Buttons",
    desc: "Enlarges buttons to meet WCAG accessibility regulations.",
    icon: EnlargeButtonsIcon
  },

  {
    id: 9,
    title: "Readable Mode",
    desc: "Displays the site's contents in a new window clearly and readable",
    icon: ReadableModeIcon
  },

  {
    id: 10,
    title: "Text Magnifier",
    desc: "Increase the content chosen by the cursor, shown in a tooltip",
    icon: MagnifierIcon
  },

  {
    id: 11,
    title: "Page Structure",
    desc: "Generate a list of page landmarks, headers, and links.",
    icon: PageStructureIcon
  },

  {
    id: 12,
    title: "Mute Media",
    desc: "Mutes all sounds and vocal element",
    icon: MuteMediaIcon
  },
  {
    id: 13,
    title: "Read focus",
    desc: "Light up a selected paragraph on the page by hovering with the mouse across the page.",
    icon: ReadfocusIcon
  },
  {
    id: 14,
    title: "Reading guide",
    desc: "Create a virtual bar that follows the cursor to improve the reader's focus.",
    icon: ReadguideIcon
  },
  {
    id: 15,
    title: "Dictionary",
    desc: "Describe words by mouse",
    icon: DictionaryIcon
  },

  {
    title: "Virtual Keyboard",
    desc: "Displays a virtual keyboard on the screen",
    icon: VirtualKeyboardIcon
  }

];


export {
  dataNavigationAdjustment,
  dataContentAdjustment
};

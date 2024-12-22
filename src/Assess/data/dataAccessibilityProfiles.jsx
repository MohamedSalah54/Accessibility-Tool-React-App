import ScreenReaderAdjustmentIcon from "../assets/icons-svg/Screen-Reader-Adjustment.svg";
import PageStructureIcon from "../assets/icons-svg/Page-Structure.svg";
import KeyboardIcon from "../assets/icons-svg/keyboard.svg";
import SmartNavigationIcon from "../assets/icons-svg/Smart-Navigation.svg";
import VoiceCommandsIcon from "../assets/icons-svg/Voice-Commands.svg";
import EnlargeButtonsIcon from "../assets/icons-svg/Enlarge-Buttons.svg";
import DarkHighContrastIcon from "../assets/icons-svg/DarkHigh-Contrast.svg";
import BrightHighContrastIcon from "../assets/icons-svg/Bright-High-Contrast.svg";
import ContrastModeIcon from "../assets/icons-svg/Contrast-Mode.svg";
import LowSaturationIcon from "../assets/icons-svg/Low-Saturation.svg";
import MonochromeIcon from "../assets/icons-svg/Monochrome.svg";
import HighSaturationIcon from "../assets/icons-svg/High-Saturation.svg";
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

export const getAccessibilityProfiles = (
  toggleScreenReader,
  toggleKeyboardNavigation,
  toggleSmartNavigation
) => {
  return [
    {
      id: 1,
      title: "Blindness",
      items: [
        {
          title: "Screen Reader Adjustment",
          desc: "Makes the site compatible for screen reader users.",
          icon: ScreenReaderAdjustmentIcon,
          onClick: toggleScreenReader,
        },
        {
          title: "Page Structure",
          desc: "Generates a list of page landmarks, headers, and links.",
          icon: PageStructureIcon,
        },
      ],
    },

    {
      id: 2,
      title: "Motor Skills Disorders",
      items: [
        {
          title: "Keyboard Navigation",
          desc: "Enables users to navigate by keyboard, without using the mouse",
          icon: KeyboardIcon,
          onClick: toggleKeyboardNavigation,
        },
        {
          title: "Smart Navigation",
          desc: "Enables users to navigate the site by numeric keys",
          icon: SmartNavigationIcon,
          onClick: toggleSmartNavigation,
        },
        {
          title: "Voice Commands",
          desc: "Executing Commands with a microphone, in supported browsers",
          icon: VoiceCommandsIcon,
        },

        {
          title: "Enlarge Buttons",
          desc: "Enlarges buttons to meet WCAG accessibility regulations.",
          icon: EnlargeButtonsIcon,
        },
        {
          title: "Page Structure",
          desc: "Generates a list of page landmarks, headers, and links.",
          icon: PageStructureIcon,
        },
      ],
    },

    {
      id: 3,
      title: "Color Blindness",
      items: [
        {
          title: "Dark High-Contrast",
          desc: "Changes the site's background to black, with bright fonts",
          icon: DarkHighContrastIcon,
        },
        {
          title: "Bright High-Contrast",
          desc: "Changes the site's background to white, with dark fonts",
          icon: BrightHighContrastIcon,
        },
        {
          title: "Contrast Mode",
          desc: "Executing Commands with a microphone, in supported browsers",
          icon: ContrastModeIcon,
        },

        {
          title: "Low Saturation",
          desc: "Enlarges buttons to meet WCAG accessibility regulations.",
          icon: LowSaturationIcon,
        },
        {
          title: "Monochrome",
          desc: "Generates a list of page landmarks, headers, and links.",
          icon: MonochromeIcon,
        },

        {
          title: "High saturation",
          desc: "Increase the intensity of colors for emphasized content.",
          icon: HighSaturationIcon,
        },
      ],
    },
    {
      id: 4,
      title: "Visually Impaired",
      items: [
        {
          title: "Screen Reader Adjustment",
          desc: "Makes the site compatible for screen reader users",
          icon: ScreenReaderAdjustmentIcon,
        },

        {
          title: "Dark High-Contrast",
          desc: "Changes the site's background to black, with bright fonts",
          icon: DarkHighContrastIcon,
        },

        {
          title: "Bright High-Contrast",
          desc: "Changes the site's background to white, with dark fonts",
          icon: BrightHighContrastIcon,
        },

        {
          title: "Enlarge Buttons",
          desc: "Enlarges buttons to meet WCAG accessibility regulations.",
          icon: EnlargeButtonsIcon,
        },

        {
          title: "Page Structure",
          desc: "Generates a list of page landmarks, headers, and links.",
          icon: PageStructureIcon,
        },

        {
          title: "High saturation",
          desc: "Increase the intensity of colors for emphasized content.",
          icon: HighSaturationIcon,
        },

        {
          title: "Low Saturation",
          desc: "Enlarges buttons to meet WCAG accessibility regulations.",
          icon: LowSaturationIcon,
        },

        {
          title: "Contrast Mode",
          desc: "Executing Commands with a microphone, in supported browsers",
          icon: ContrastModeIcon,
        },

        {
          title: "Image Descriptions",
          desc: "Displays image descriptions in a floating window",
          icon: ImageDescriptionsIcon,
        },

        {
          title: "Magnifier",
          desc: "Zooms the screen display",
          icon: MagnifierIcon,
        },

        {
          title: "Readable Font",
          desc: "Convert the site's fonts to sans-serif and readable ones",
          icon: ReadableFontIcon,
        },

        {
          title: "Highlight Links",
          desc: "Highlights the site links",
          icon: HighlightLinksIcon,
        },
        {
          title: "Highlight Headers",
          desc: "Highlights the site headers",
          icon: HighlightHeadersIcon,
        },
        {
          title: "Text Magnifier",
          desc: "Increase the content chosen by the cursor, shown in a tooltip",
          icon: MagnifierIcon,
        },
      ],
    },

    {
      id: 5,
      title: "Elderly",
      items: [
        {
          title: "Blinks Blocking",
          desc: "Stops blinking and flashing of moving elements",
          icon: BlinksBlockingIcon,
        },

        {
          title: "Low Saturation",
          desc: "Decrease the intensity of colors for less emphasized content.",
          icon: LowSaturationIcon,
        },
        {
          title: "Mute Media",
          desc: "Mutes all sounds and vocal element",
          icon: MuteMediaIcon,
        },
      ],
    },

    {
      id: 6,
      title: "ADHD",
      items: [
        {
          title: "Read focus",
          desc: "Light up a selected paragraph on the page by hovering with the mouse across the page.",
          icon: ReadfocusIcon,
        },

        {
          title: "Image Descriptions",
          desc: "Displays image descriptions in a floating window",
          icon: ImageDescriptionsIcon,
        },
        {
          title: "Reading guide",
          desc: "Create a virtual bar that follows the cursor to improve the reader's focus.",
          icon: ReadguideIcon,
        },

        {
          title: "Dictionary",
          desc: "Describe words by mouse",
          icon: DictionaryIcon,
        },

        {
          title: "Mute Media",
          desc: "Mutes all sounds and vocal element",
          icon: MuteMediaIcon,
        },
      ],
    },

    {
      id: 7,
      title: "Learning",
      items: [
        {
          title: "Reading guide",
          desc: "Create a virtual bar that follows the cursor to improve the reader's focus.",
          icon: ReadguideIcon,
        },

        {
          title: "Highlight Links",
          desc: "Highlights the site links",
          icon: HighlightLinksIcon,
        },
        {
          title: "Highlight Headers",
          desc: "Highlights the site headers",
          icon: HighlightHeadersIcon,
        },
      ],
    },

    {
      id: 8,
      title: "Elder",
      items: [
        {
          title: "Text Reader",
          desc: "Create a virtual bar that follows the cursor to improve the reader's focus.",
          icon: TextReaderIcon,
        },

        {
          title: "Enlarge Buttons",
          desc: "Enlarges buttons to meet WCAG accessibility regulations.",
          icon: EnlargeButtonsIcon,
        },
        {
          title: "Dictionary",
          desc: "Describe words by mouse",
          icon: DictionaryIcon,
        },

        {
          title: "Text Magnifier",
          desc: "Increase the content chosen by the cursor, shown in a tooltip",
          icon: MagnifierIcon,
        },

        {
          title: "Magnifier",
          desc: "Zooms the screen display",
          icon: MagnifierIcon,
        },

        {
          title: "Read focus",
          desc: "Light up a selected paragraph on the page by hovering with the mouse across the page.",
          icon: ReadfocusIcon,
        },

        {
          title: "Reading guide",
          desc: "Create a virtual bar that follows the cursor to improve the reader's focus.",
          icon: ReadguideIcon,
        },

        {
          title: "Readable Mode",
          desc: "Displays the site's contents in a new window clearly and readable",
          icon: ReadableModeIcon,
        },
      ],
    },

    {
      id: 9,
      title: "Dyslexia",
      items: [
        {
          title: "Dictionary",
          desc: "Describe words by mouse",
          icon: DictionaryIcon,
        },

        {
          title: "Image Descriptions",
          desc: "Displays image descriptions in a floating window",
          icon: ImageDescriptionsIcon,
        },
        {
          title: "Reading guide",
          desc: "Create a virtual bar that follows the cursor to improve the reader's focus.",
          icon: ReadguideIcon,
        },
      ],
    },
  ];
};

export default getAccessibilityProfiles;
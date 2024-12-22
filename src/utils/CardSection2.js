// src/data/options.js
import { ReactComponent as Ear } from "../icons/assets/svg-export/svgexport-10.svg";
import { ReactComponent as Keyboard } from "../icons/assets/svg-export/svgexport-12.svg";
import { ReactComponent as Smart } from "../icons/assets/icons-svg/Smart-Navigation.svg";
import { ReactComponent as Voice } from "../icons/assets/svg-export/svgexport-14.svg";
import { ReactComponent as Reader } from "../icons/assets/icons-svg/Text-Reader.svg";

export const options = [
  {
    key: "screenReader",
    icon: Ear,
    titleKey: "screenReader.title", // استخدام المفتاح بدل النص المترجم
    descriptionKey: "screenReader.description",
  },
  {
    key: "keyboardNavigation",
    icon: Keyboard,
    titleKey: "keyboardNavigation.title",
    descriptionKey: "keyboardNavigation.description",
  },
  {
    key: "smartNavigation",
    icon: Smart,
    titleKey: "smartNavigation.title",
    descriptionKey: "smartNavigation.description",
  },
  {
    key: "textReader",
    icon: Reader,
    titleKey: "textReader.title",
    descriptionKey: "textReader.description",
  },
  {
    key: "voiceCommands",
    icon: Voice,
    titleKey: "voiceCommands.title",
    descriptionKey: "voiceCommands.description",
  },
];

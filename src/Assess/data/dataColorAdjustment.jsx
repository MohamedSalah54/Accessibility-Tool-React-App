
import DarkHighContrastIcon from "../assets/icons-svg/DarkHigh-Contrast.svg";
import BrightHighContrastIcon from "../assets/icons-svg/Bright-High-Contrast.svg";
import ContrastModeIcon from "../assets/icons-svg/Contrast-Mode.svg";
import LowSaturationIcon from "../assets/icons-svg/Low-Saturation.svg";
import MonochromeIcon from "../assets/icons-svg/Monochrome.svg";
import HighSaturationIcon from "../assets/icons-svg/High-Saturation.svg";

const getColorAdjustmentData = (
  toggleTheme,
  toggleBrightHighContrast,
  toggleMonochrome,
  toggleContrastMode,
  toggleHighSaturation,
  toggleLowSaturation
) => {
  return [
    {
      id: 1,
      title: "Dark High-Contrast",
      desc: "Changes the site's background to black, with bright fonts",
      icon: DarkHighContrastIcon, 
      onClick: toggleTheme,
    },
    {
      id: 2,
      title: "Bright High-Contrast",
      desc: "Changes the site's background to white, with dark fonts",
      icon: BrightHighContrastIcon ,
      onClick: toggleBrightHighContrast,
    },
    {
      id: 3,
      title: "Contrast Mode",
      desc: "Changes the site's colors to contrast colors",
      icon: ContrastModeIcon ,
      onClick: toggleContrastMode,
    },
    {
      id: 4,
      title: "Low Saturation",
      desc: "Decrease the intensity of colors for less emphasized content.",
      icon: LowSaturationIcon,
      onClick: toggleLowSaturation,
    },
    {
      id: 5,
      title: "Monochrome",
      desc: "Converts the site's colors to grayscale",
      icon: MonochromeIcon ,
      onClick: toggleMonochrome,
    },
    {
      id: 6,
      title: "High Saturation",
      desc: "Increase the intensity of colors for emphasized content.",
      icon: HighSaturationIcon ,
      onClick: toggleHighSaturation,
    },
  ];
};

export default getColorAdjustmentData;
import { ReactComponent as ResetColor } from "../../../../icons/assets/icons-svg/ColorReset.svg";
import { useContext } from "react";
import ColorContext from "../../../../context/ColorContext";
import { useTranslation } from "react-i18next";

const ColorBar = () => {
  const {t} = useTranslation()

  const { hue, handleColorChange, resetColors } = useContext(ColorContext);



  return (
    <div style={{ margin: "20px", textAlign: "center" }}>
      <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
        <input
          type="range"
          min="0"
          max="360"
          value={hue} 
          onChange={handleColorChange}
          style={{
            width: "350px",
            appearance: "none", 
            background: "none", 
            cursor: "pointer",
            outline: "none",
            border: "none", 
          }}
        />

        
          
<style>
  {`
    input[type="range"]::-webkit-slider-runnable-track {
      height: 15px; 
      background: linear-gradient(to right, 
        black, 
        orange, 
        yellow, 
        green, 
        cyan, 
        blue, 
        violet, 
        red); 
      border-radius: 50px; 
      border: none; 
    }

    input[type="range"]::-webkit-slider-thumb {
      -webkit-appearance: none;
      appearance: none;
      width: 20px; 
      height: 20px; 
      background: #000; 
      border: 2px solid #fff;
      border-radius: 50%; 
      cursor: pointer;
      transition: transform 0.2s ease;
      transform: translateY(-4px); 
    }

    input[type="range"]:hover::-webkit-slider-thumb,
    input[type="range"]:active::-webkit-slider-thumb {
      transform: translateY(-5px) scale(1.3); 
    }

    input[type="range"]::-moz-range-thumb {
      width: 20px; 
      height: 20px;
      background: #000; 
      border: 2px solid #fff;
      border-radius: 50%; /
      cursor: pointer;
      transition: transform 0.2s ease;
      transform: translateY(-5px); 
    }
  `}
</style>
      </div>

      <button
      onClick={resetColors}
        style={{
          marginTop: "10px",
          paddingLeft: "18em",
          background: "none",
          border: "none",
          borderRadius: "5px",
          cursor: "pointer",
          display: "flex",
          alignItems: "center",
          gap: "5px",
        }}
      >
          <ResetColor />
        {t("ResetColors")}
      </button>
    </div>
  );
};

export default ColorBar;

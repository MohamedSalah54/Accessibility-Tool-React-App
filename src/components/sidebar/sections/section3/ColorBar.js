import { ReactComponent as ResetColor } from "../../../../icons/assets/icons-svg/ColorReset.svg";
import { useContext } from "react";
import ColorContext from "../../../../context/ColorContext";
import { useTranslation } from "react-i18next";

const ColorBar = () => {
  const {t} = useTranslation()

  const { hue, handleColorChange, resetColors } = useContext(ColorContext);



  return (
    <div style={{ margin: "20px", textAlign: "center" }}>
      {/* شريط تمرير الألوان */}
      <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
        <input
          type="range"
          min="0"
          max="360"
          value={hue} 
          onChange={handleColorChange}
          style={{
            width: "350px",
            appearance: "none", // تعطيل الأنماط الافتراضية
            background: "none", // استخدام الخلفية المخصصة من الشريط نفسه
            cursor: "pointer",
            outline: "none",
            border: "none", // إزالة أي إطار داخلي
          }}
        />

        
          
<style>
  {`
    /* تخصيص الشريط الأساسي */
    input[type="range"]::-webkit-slider-runnable-track {
      height: 15px; /* التحكم بارتفاع الشريط */
      background: linear-gradient(to right, 
        black, 
        orange, 
        yellow, 
        green, 
        cyan, 
        blue, 
        violet, 
        red); /* الخلفية الملونة */
      border-radius: 50px; /* الحواف الدائرية */
      border: none; /* إزالة أي إطار */
    }

    /* تخصيص الكرة */
    input[type="range"]::-webkit-slider-thumb {
      -webkit-appearance: none;
      appearance: none;
      width: 20px; /* عرض الكرة */
      height: 20px; /* ارتفاع الكرة */
      background: #000; /* لون الكرة */
      border: 2px solid #fff;
      border-radius: 50%; /* جعل الكرة دائرية */
      cursor: pointer;
      transition: transform 0.2s ease;
      transform: translateY(-4px); /* رفع الكرة للأعلى */
    }

    input[type="range"]:hover::-webkit-slider-thumb,
    input[type="range"]:active::-webkit-slider-thumb {
      transform: translateY(-5px) scale(1.3); /* تكبير الكرة عند التفاعل مع الحفاظ على الرفع */
    }

    /* تخصيص الكرة لمتصفحات فايرفوكس */
    input[type="range"]::-moz-range-thumb {
      width: 20px; /* عرض الكرة */
      height: 20px; /* ارتفاع الكرة */
      background: #000; /* لون الكرة */
      border: 2px solid #fff;
      border-radius: 50%; /* جعل الكرة دائرية */
      cursor: pointer;
      transition: transform 0.2s ease;
      transform: translateY(-5px); /* رفع الكرة للأعلى */
    }
  `}
</style>
      </div>

      {/* زر لإعادة ضبط الألوان */}
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

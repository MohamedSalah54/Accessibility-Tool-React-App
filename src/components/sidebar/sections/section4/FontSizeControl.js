import { useFontContext } from "../../../../context/FontContext";
import styles from './Section4.module.css';
import { FaCirclePlus, FaCircleMinus } from 'react-icons/fa6';
import { useState } from 'react'; // استيراد useState
import { BiFontColor } from "react-icons/bi";
import { useTranslation } from "react-i18next";


const FontSizeControl = ({ selectedProperty }) => {
  const { updateFont } = useFontContext();
  
  // حالة لتحديد عرض CustomFont
  const [showCustomFont, setShowCustomFont] = useState(false);

  // دالة لزيادة أو تقليل القيمة المحددة
  const handleIncrease = () => {
    updateFont(selectedProperty, true);
    setShowCustomFont(true); // عند الضغط على FaCirclePlus تظهر الـ CustomFont
  };

  const handleDecrease = () => {
    updateFont(selectedProperty, false);
    setShowCustomFont(true); // عند الضغط على FaCircleMinus تظهر الـ CustomFont
  };

  return (
    <div className={styles.slider_container}>
      <div className={styles.slider}>
        {/* تعديل حجم الخط */}
        <FaCircleMinus 
          className={`${styles.slider_icon} ${styles.left}`} 
          onClick={handleDecrease} // تقليل حجم الخط
        />
        <FaCirclePlus 
          className={`${styles.slider_icon} ${styles.right}`} 
          onClick={handleIncrease} // زيادة حجم الخط
        />
      </div>

      {/* عرض الـ CustomFont فقط إذا كانت showCustomFont true */}
      {showCustomFont && <CustomFont />}
    </div>
  );
};

const CustomFont = () => {
  const [showCustomFont, setShowCustomFont] = useState(false);
  const { updateFont } = useFontContext();
  const [selectedProperty, setSelectedProperty] = useState("fontSize"); // الخاصية المحددة (افتراضيًا هي fontSize)

  // دالة لزيادة أو تقليل القيمة المحددة
  const handleIncrease = () => {
    updateFont(selectedProperty, true);
    setShowCustomFont(true); // عند الضغط على FaCirclePlus تظهر الـ CustomFont
  };

  const handleDecrease = () => {
    updateFont(selectedProperty, false);
    setShowCustomFont(true); // عند الضغط على FaCircleMinus تظهر الـ CustomFont
  };
  
      const [isNavigateIcon, setisNavigateIcon] = useState(true)
      const clickIcon = () =>{
        setisNavigateIcon((prev) =>!prev)
      }
  const {t} = useTranslation()
  const handlePropertyButtonClick = (property) => {
    setSelectedProperty(property);
    setActivePropertyButton(property); // تعيين الزر النشط في الخصائص
  };
  const [activePropertyButton, setActivePropertyButton] = useState(""); // حفظ الزر النشط في قائمة الخصائص

  const customFontContainer = {
    backgroundColor: "#fff",
    height: "10em",
    width: "50em",
    position: "fixed",
    left: "35em",
    bottom: "8em",
    borderRadius:"10px"
  };
  
  const btnContainer = {
    position: "absolute",
    top: "1.5em",
    left: "7em",
    display: "flex",  // استخدام flex layout
    gap: "1em", // تحديد المسافة بين الأزرار
  };
  
  const btn = {
    padding: "0.5em 1em",  // إضافة بعض الحشو لتحديد حجم الأزرار
    border: "none",  // إضافة حدود بسيطة
    backgroundColor: "#f0f0f0",  // اللون الخلفي للأزرار
    cursor: "pointer",  // تغيير شكل المؤشر عند التمرير على الزر
    borderRadius:"10PX"
  };
  const containerSlider = {
    position:"absolute",
    top:"5em",
    left:"5em"
  }
  const slider ={
    position: "relative",
    width: "40em",
    height: "20px",
    backgroundColor: "#ddd",
    borderRadius: "5px",
  }
  const btnNavigate = {
    position: "fixed",
    bottom: "1em",
    left: "55em",
    width: "5em",
    height: "5em",
    backgroundColor: "rgba(85, 83, 83, 0.5)", 
    borderRadius:"20px"
  };
  
  const navigateAction ={
    width:"3.5em",
    height:"3.5em",
    borderRadius:"40px",
    margin:"1em",
    cursor:"pointer",
    border:"none",
    backgroundColor:isNavigateIcon ? "#2278ca" : "#fff"
  }
  const iconNavigate ={
    width:"2em",
    height:"2em",
    color: isNavigateIcon ? "#fff" : "#2278ca",
  }
  
  return (
    <>
     <div style={btnNavigate}>
          <button style={navigateAction} onClick={clickIcon}><BiFontColor   style={iconNavigate} /> </button>
      </div>
      {isNavigateIcon && 
         <div style={customFontContainer}>
         <div style={btnContainer}>
         <button
  onClick={() => handlePropertyButtonClick("fontSize")}
  style={{
    ...btn, // الأنماط الافتراضية
    backgroundColor: activePropertyButton === "fontSize" ? "#28a745" : btn.backgroundColor,
    color: activePropertyButton === "fontSize" ? "#fff" : "#000",
  }}
>
  {t("FontSize")}
</button>

<button
  onClick={() => handlePropertyButtonClick("lineSpacing")}
  style={{
    ...btn,
    backgroundColor: activePropertyButton === "lineSpacing" ? "#28a745" : btn.backgroundColor,
    color: activePropertyButton === "lineSpacing" ? "#fff" : "#000",
  }}
>
  {t("LineSpacing")}
</button>

<button
  onClick={() => handlePropertyButtonClick("wordSpacing")}
  style={{
    ...btn,
    backgroundColor: activePropertyButton === "wordSpacing" ? "#28a745" : btn.backgroundColor,
    color: activePropertyButton === "wordSpacing" ? "#fff" : "#000",
  }}
>
  {t("WordSpacing")}
</button>

<button
  onClick={() => handlePropertyButtonClick("letterSpacing")}
  style={{
    ...btn,
    backgroundColor: activePropertyButton === "letterSpacing" ? "#28a745" : btn.backgroundColor,
    color: activePropertyButton === "letterSpacing" ? "#fff" : "#000",
  }}
>
  {t("LetterSpacing")}
</button>

         </div>
         <div style={containerSlider}>
           <div style={slider}>
             {/* تعديل حجم الخط */}
             <FaCircleMinus 
               className={`${styles.slider_icon} ${styles.left}`} 
               onClick={handleDecrease} // تقليل حجم الخط
             />
             <FaCirclePlus 
               className={`${styles.slider_icon} ${styles.right}`} 
               onClick={handleIncrease} // زيادة حجم الخط
             />
           </div>
         </div>
       </div>
      }
    </>
  );
  
};

export default FontSizeControl;

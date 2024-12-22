import React, { createContext, useState, useEffect } from 'react';
import { FaRegKeyboard } from "react-icons/fa";

// إنشاء context
export const KeyboardContext = createContext();

export const KeyboardProvider = ({ children }) => {
  // حالة وضع لوحة المفاتيح الافتراضية
  const [isKeyboardMode, setIsKeyboardMode] = useState(false);

  // استرجاع الوضع من localStorage عند تحميل الصفحة
  useEffect(() => {
    const savedMode = localStorage.getItem('keyboardMode');
    if (savedMode === 'true') {
      setIsKeyboardMode(true);
    }
  }, []);

  // تغيير الحالة وتخزينها في localStorage
  const toggleKeyboardMode = () => {
    setIsKeyboardMode(prevState => {
      const newState = !prevState;
      localStorage.setItem('keyboardMode', newState.toString());
      return newState;
    });
  };

  // مكونات Context
  return (
    <KeyboardContext.Provider value={{ isKeyboardMode, toggleKeyboardMode }}>
      {children}
      {isKeyboardMode && <VirtualKeyboard />}
    </KeyboardContext.Provider>
  );
};


const VirtualKeyboard = () => {
    const [isNavigateIcon, setisNavigateIcon] = useState(true)
    const clickIcon = () =>{
      setisNavigateIcon((prev) =>!prev)
    }
    const [input, setInput] = useState('');
    
    // دالة لإضافة النص عند الضغط على الأزرار
    const handleKeyPress = (key) => {
      if (key === 'del') {
        setInput(input.slice(0, -1)); // حذف آخر حرف
      } else {
        setInput(input + key);
      }
    };
  
    // دالة لتبديل حالة الأحرف (Caps Lock)
    const [capsLock, setCapsLock] = useState(false);
    const toggleCapsLock = () => {
      setCapsLock(!capsLock);
    };
  
    // الأزرار في لوحة المفاتيح
    const keys = [
      ['`', '1', '2', '3', '4', '5', '6', '7', '8', '9', '0', '-', '=', 'del'],
      ['tab', 'Q', 'W', 'E', 'R', 'T', 'Y', 'U', 'I', 'O', 'P', '[', ']', ';'],
      ['caps lock', 'A', 'S', 'D', 'F', 'G', 'H', 'J', 'K', 'L', ':', '"', 'return'],
      ['shift', 'Z', 'X', 'C', 'V', 'B', 'N', 'M', ',', '.', '/', 'shift'],
      ['space']
    ];
    const btnNavigate = {
      position: "fixed",
      bottom: "-0.5em",
      left: "45em",
      width: "4.5em",
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
              <button style={navigateAction} onClick={clickIcon}><FaRegKeyboard  style={iconNavigate} /> </button>
          </div>
        {isNavigateIcon && 
               <div style={styles.keyboardContainer}>
               <div style={styles.header}>Virtual Keyboard</div>
               <div style={styles.inputContainer}>
                 <input type="text" value={input} readOnly style={styles.input} />
               </div>
               <div style={styles.keysContainer}>
                 {keys.map((row, rowIndex) => (
                   <div key={rowIndex} style={styles.row}>
                     {row.map((key, index) => (
                       <button
                         key={index}
                         onClick={() => key === 'caps lock' ? toggleCapsLock() : handleKeyPress(key)}
                         style={styles.key}
                       >
                         {capsLock && /^[a-zA-Z]$/.test(key) ? key.toUpperCase() : key}
                       </button>
                     ))}
                   </div>
                 ))}
               </div>
             </div>
        }
      </>
    );
  };
  
  const styles = {
    keyboardContainer: {
      position: "fixed",
      bottom: "5em",
      left: "25em",
      width: "50%",
      height: "350px",
      margin: "0 auto",
      backgroundColor: "#2d2d2d",
      padding: "10px",
      borderRadius: "8px",
      boxShadow: "0 0 8px rgba(0, 0, 0, 0.3)",
      color: "white",
      boxSizing: "border-box",
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",  // موازنة الكيبورد عموديًا
      zIndex: 9999,  // تحديد القيمة العالية لكي يظهر العنصر فوق أي شيء آخر
    },
    header: {
      textAlign: 'center',
      fontSize: '14px',  // تصغير حجم الخط
      marginBottom: '8px',
    },
    inputContainer: {
      marginBottom: '5px',  // تقليل المسافة بين المدخل وبقية الأزرار
    },
    input: {
      width: '100%',
      padding: '5px',  // تقليل padding
      fontSize: '20px',  // تقليل حجم الخط
      backgroundColor: '#555',
      color: 'white',
      border: 'none',
      borderRadius: '5px',
    },
    keysContainer: {
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      height: '100%',  // التأكد من أن الأزرار تتوزع بشكل مناسب داخل الكيبورد
    },
    row: {
      display: 'flex',
      justifyContent: 'center',
      marginBottom: '3px',
      flexWrap: 'wrap',
    },
    key: {
      padding: '10px 20px',  // تقليل الـ padding
      margin: '2px',  // تقليل الـ margin
      backgroundColor: '#444',
      border: 'none',
      borderRadius: '5px',
      cursor: 'pointer',
      fontSize: '12px',  // تصغير حجم الخط
      color: 'white',
      transition: 'background-color 0.3s',
    },
    keyHover: {
      backgroundColor: '#666',
    },

  };
  
  
  export default VirtualKeyboard;
  
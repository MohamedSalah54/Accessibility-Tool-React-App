import React, { createContext, useState, useEffect } from 'react';
import { FaRegKeyboard } from "react-icons/fa";

export const KeyboardContext = createContext();

export const KeyboardProvider = ({ children }) => {
  const [isKeyboardMode, setIsKeyboardMode] = useState(false);

  useEffect(() => {
    const savedMode = localStorage.getItem('keyboardMode');
    if (savedMode === 'true') {
      setIsKeyboardMode(true);
    }
  }, []);

  const toggleKeyboardMode = () => {
    setIsKeyboardMode(prevState => {
      const newState = !prevState;
      localStorage.setItem('keyboardMode', newState.toString());
      return newState;
    });
  };

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
    
    const handleKeyPress = (key) => {
      if (key === 'del') {
        setInput(input.slice(0, -1))
      } else {
        setInput(input + key);
      }
    };
  
    const [capsLock, setCapsLock] = useState(false);
    const toggleCapsLock = () => {
      setCapsLock(!capsLock);
    };
  
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
      justifyContent: "center",  
      zIndex: 9999,  
    },
    header: {
      textAlign: 'center',
      fontSize: '14px', 
      marginBottom: '8px',
    },
    inputContainer: {
      marginBottom: '5px',  
    },
    input: {
      width: '100%',
      padding: '5px',  
      fontSize: '20px',  
      backgroundColor: '#555',
      color: 'white',
      border: 'none',
      borderRadius: '5px',
    },
    keysContainer: {
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      height: '100%', 
    },
    row: {
      display: 'flex',
      justifyContent: 'center',
      marginBottom: '3px',
      flexWrap: 'wrap',
    },
    key: {
      padding: '10px 20px',
      margin: '2px',  
      backgroundColor: '#444',
      border: 'none',
      borderRadius: '5px',
      cursor: 'pointer',
      fontSize: '12px',  
      color: 'white',
      transition: 'background-color 0.3s',
    },
    keyHover: {
      backgroundColor: '#666',
    },

  };
  
  
  export default VirtualKeyboard;
  
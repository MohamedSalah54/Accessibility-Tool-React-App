import React, { createContext, useContext, useState, useEffect, useRef } from "react";
import { IoVolumeHighSharp } from "react-icons/io5";
import { TbMinusVertical } from "react-icons/tb";
import { GrPlayFill } from "react-icons/gr";
import { MdKeyboardDoubleArrowLeft, MdKeyboardDoubleArrowRight } from "react-icons/md";
import { AiOutlineReload } from "react-icons/ai";
import { RxReader } from "react-icons/rx";
import { RiSettings2Line } from "react-icons/ri";
import { FaVolumeXmark, FaPause } from "react-icons/fa6";
import { AiOutlineSound } from "react-icons/ai";


const TextReaderContext = createContext();

export const TextReaderProvider = ({ children }) => {
  const [isEnabled, setIsEnabled] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [pitch, setPitch] = useState(1);  
  const [rate, setRate] = useState(1);    
  const [lastReadText, setLastReadText] = useState(""); 

  useEffect(() => {
    const storedState = localStorage.getItem("textReaderMode");
    if (storedState === "enabled") setIsEnabled(true);

    const handleClick = (event) => {
      if (isEnabled && !isMuted) {
        const text = event.target.innerText;
        if (text) {
          setLastReadText(text);  
          const utterance = new SpeechSynthesisUtterance(text);
          utterance.pitch = pitch;  
          utterance.rate = rate;    

          utterance.onstart = () => {
            if (isPaused) speechSynthesis.pause();
          };

          speechSynthesis.speak(utterance);
        }
      }
    };

    document.body.addEventListener("click", handleClick);

    return () => {
      document.body.removeEventListener("click", handleClick);
    };
  }, [isEnabled, isMuted, isPaused, pitch, rate]);

  const toggleMode = () => {
    const newState = !isEnabled;
    setIsEnabled(newState);
    if (newState) {
      localStorage.setItem("textReaderMode", "enabled");
    } else {
      localStorage.removeItem("textReaderMode");
    }
  };

  const toggleMute = () => {
    setIsMuted((prev) => !prev);
    speechSynthesis.cancel();
  };

  const togglePause = () => {
    setIsPaused((prev) => {
      if (!prev) {
        speechSynthesis.pause();
      } else {
        speechSynthesis.resume();
      }
      return !prev;
    });
  };

  const reloadText = () => {
    if (lastReadText) {  
      const utterance = new SpeechSynthesisUtterance(lastReadText);
      utterance.pitch = pitch;
      utterance.rate = rate;
      speechSynthesis.speak(utterance);
    }
  };

  return (
    <TextReaderContext.Provider
      value={{
        toggleMode,
        isEnabled,
        toggleMute,
        togglePause,
        isMuted,
        isPaused,
        pitch,     
        setPitch,  
        rate,     
        setRate,   
        reloadText,  
      }}
    >
      {children}
      {isEnabled && <IconBar />}
    </TextReaderContext.Provider>
  );
};

export const useTextReader = () => useContext(TextReaderContext);

const IconBar = () => {
  const { toggleMute, togglePause, isMuted, isPaused, pitch, setPitch, rate, setRate, reloadText } = useTextReader();
  const [showControls, setShowControls] = useState(false);
  const [isNavigateIcon, setisNavigateIcon] = useState(true)
  const clickIcon = () =>{
    setisNavigateIcon((prev) =>!prev)
  }
  const elementsRef = useRef([]);

  const handlePitchChange = (value) => {
    setPitch((prev) => Math.max(0.5, +(prev + value).toFixed(1)));
  };

  const handleRateChange = (value) => {
    setRate((prev) => Math.max(0.5, +(prev + value).toFixed(1)));
  };

  const toggleControls = () => {
    setShowControls((prev) => !prev);
  };

  const handleArrowClick = (direction) => {
    const currentIndex = elementsRef.current.findIndex((el) => el === document.activeElement);
    let nextIndex = currentIndex;
    
    if (direction === "next") {
      nextIndex = currentIndex + 1 < elementsRef.current.length ? currentIndex + 1 : 0
    } else if (direction === "prev") {
      nextIndex = currentIndex - 1 >= 0 ? currentIndex - 1 : elementsRef.current.length - 1
    }

    const nextElement = elementsRef.current[nextIndex];
    if (nextElement) {
      nextElement.focus()
      nextElement.style.border = "2px dashed white"; 

      const text = nextElement.innerText;
      if (text) {
        const utterance = new SpeechSynthesisUtterance(text);
        utterance.pitch = pitch;
        utterance.rate = rate;
        speechSynthesis.speak(utterance);
      }
    }
  };

  const iconBarStyle = {
    position: "fixed",
    bottom: "5em",
    left: "50%",
    transform: "translateX(-50%)",
    backgroundColor: "#fff",
    padding: "10px",
    display: "flex",
    gap: "10px",
    alignItems: "center",
    justifyContent: "center",
    zIndex: "1000",
    height: "3em",
    width: "36em",
  };

  const iconButtonStyle = {
    background: "none",
    border: "none",
    color: "black",
    fontSize: "18px",
    cursor: "pointer",
  };

  const barIcons = { width: "25px", height: "25px", };
  const volumeContainer = {
    display: "flex",
    gap: "20px",
    alignItems: "center",
    backgroundColor: "#fff",
    position: "fixed",
    bottom: "4em",
    height: "7em",
    width: "37.2em",
    right: "0em",
  };

  const pitchContainer = {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    position: "relative",
    left: "8em",
  };

  const spanTitle = { color: "black" };
  const btnStyle = {
    width: "3em",
    height: "3em",
    borderRadius: "50%",
    border: "none",
    cursor: "pointer",
    backgroundColor: "#17384c",
    color: "#fff",
    margin: "0 1em",
  };
  const verticalBar = {
    color: "#A9A9A9",
    width: "40px",
    height: "40px",
  };

  const btnNavigate = {
    position: "fixed",
    bottom: "-0.5em",
    left: "45em",
    width: "7em",
    height: "5em",
    backgroundColor: "rgba(85, 83, 83, 0.5)", 
    borderRadius:"20px"
  };
  
  const navigateAction ={
    width:"6em",
    height:"4em",
    borderRadius:"40px",
    margin:"1em",
    cursor:"pointer",
    border:"none",
    backgroundColor:isNavigateIcon ? "#2278ca" : "#fff"
  }
  const iconNavigate ={
    width:"2em",
    height:"2em",
    color: isNavigateIcon ? "#fff" : "#2278ca"
  }

  return (
    <>
    <div style={btnNavigate}>
        <button style={navigateAction} onClick={clickIcon}><AiOutlineSound style={iconNavigate} /> </button>
    </div>

    {isNavigateIcon && 
      <div style={iconBarStyle}>
      <button style={iconButtonStyle} onClick={toggleMute}>
        {isMuted ? (
          <FaVolumeXmark style={barIcons} />
        ) : (
          <IoVolumeHighSharp style={barIcons} />
        )}
      </button>
      <TbMinusVertical style={verticalBar} />
      <button style={iconButtonStyle} onClick={togglePause}>
        {isPaused ? (
          <GrPlayFill style={barIcons} />
        ) : (
          <FaPause style={barIcons} />
        )}
      </button>

      <button
        style={iconButtonStyle}
        onClick={() => handleArrowClick("prev")} 
      >
        <MdKeyboardDoubleArrowLeft style={barIcons} />
      </button>

      <button
        style={iconButtonStyle}
        onClick={() => handleArrowClick("next")} 
      >
        <MdKeyboardDoubleArrowRight style={barIcons} />
      </button>
      <TbMinusVertical style={verticalBar} />

      <button style={iconButtonStyle} onClick={reloadText}>
        <AiOutlineReload style={barIcons} />
      </button>

      <TbMinusVertical style={verticalBar} />

      <button style={iconButtonStyle}>
        <RxReader style={barIcons} />
      </button>
      <TbMinusVertical style={verticalBar} />
      <button style={iconButtonStyle} onClick={toggleControls}>
        <RiSettings2Line style={barIcons} />
      </button>
      {showControls && (
        <div style={volumeContainer}>
          <div style={pitchContainer}>
            <span style={spanTitle}>PITCH</span>
            <div>
              <button style={btnStyle} onClick={() => handlePitchChange(-0.1)}>-</button>
              <span>{pitch}X</span>
              <button style={btnStyle} onClick={() => handlePitchChange(0.1)}>+</button>
            </div>
          </div>
          <div style={pitchContainer}>
            <span style={spanTitle}>PLAY RATE</span>
            <div>
              <button style={btnStyle} onClick={() => handleRateChange(-0.1)}>-</button>
              <span>{rate}X</span>
              <button style={btnStyle} onClick={() => handleRateChange(0.1)}>+</button>
            </div>
          </div>
        </div>
      )}
    </div>
    }
    </>
  );
};

export default IconBar





import { FiMic } from "react-icons/fi";
import { FiMicOff } from "react-icons/fi";
import { FaInfoCircle } from "react-icons/fa";
import { useState } from "react";
import { RiUserVoiceLine } from "react-icons/ri";

const VoiceBar = () => {
    const [isVisible, setIsVisible] = useState(false);
    const handleVisability = () =>{
      setIsVisible((prev)=>!prev)
    }
    const [isMiceOn,setisMicOn] = useState(true)
    const toggleMic = () =>{
      setisMicOn((prev) =>!prev)
    }
  
    const [activeButton, setActiveButton] = useState("General");
    const handleButtonClick = (buttonLabel) => {
      setActiveButton(buttonLabel);
    };
    const [isNavigateIcon, setisNavigateIcon] = useState(true)
    const clickIcon = () =>{
      setisNavigateIcon((prev) =>!prev)
    }
    
    const voiceContainerStyle = {
      position: "fixed",
      bottom: "5em",
      left: "50%", 
      marginLeft: "-18em", 
      backgroundColor: "#fff",
      padding: "10px",
      display: "flex",
      gap: "10px",
      alignItems: "center",
      justifyContent: "center",
      zIndex: "1000",
      height: "3em",
      width: "36em",
      borderRadius: "20px"
    };
    
    
    const micIcon ={
      width:"50px",
      height:"100%",
      position:"absolute",
      left:"1em",
      top:"0.3em"
    }
    const btnMic ={
      border:"none",
      borderRadius:"50%",
      backgroundColor:"#171d2d",
      cursor:"pointer",
      padding:"6px"
    }
    const mic ={
      width:"3em",
      height:"3em",
      color:"white",
    }
    const listenBar ={
      position:"absolute",
      left:"5em",
      height:"100%",
      width:"27em"
    }
    const spanListenBar ={
      fontFamily:"sans",
      color:"#000",
      position:"absolute",
      left:"4em",
      top:"0.2em"
    }
    const divListenBar ={
      backgroundColor:"#171d2d",
      width:"100%",
      height:"40%",
      borderRadius:"20px",
      position:"absolute",
      top:"2em"
    }
    const infoIcon = {
      width:"50px",
      height:"100%",
      position:"absolute",
      right:"1em",
      top:"0.3em"
    }
    const btnInfo ={
      border:"none",
      borderRadius:"50%",
      cursor:"pointer",
      padding:"6px"
    }
    const info ={
      width:"3em",
      height:"3em",
    }
    const infoContainer = {
      position: "fixed",
      bottom: "9.2em",
      left: "50.6%", // تم تعديل هذه القيمة لتكون 50% بدلاً من 18.5em
      transform: "translateX(-50%)", // سيتم تحريك العنصر بمقدار -50% من عرضه
      backgroundColor: "#fff",
      padding: "10px",
      display: "flex",
      gap: "10px",
      alignItems: "center",
      justifyContent: "center",
      zIndex: "1000",
      height: "22em",
      width: "36em",
      borderRadius: "10px",
    }
    
    const infoHeader = {
      position:"absolute",
      width:"100%",
      height:"2em",
      top:"0.5em",
      
    }
    const infoSpan ={
      color:"black",
      position:"absolute",
      left:"2em",
      fontWeight:"bold"
    }
    const btnClose ={
      border:"none",
      fontWeight:"bold",
      position:"absolute",
      right:"1em",
      cursor:"pointer",
      backgroundColor:"white",
      fontSize:"1em"
    }
    const btnTargetContainer ={
      position:"absolute",
      top:"2.2em",
      width:"90%",
      height:"5em",
      display:"flex",
      justifyContent: "space-between",  
  
    }
    const btnTarget = (isActive) =>({
     border:"none",
     backgroundColor:"#fff",
     marginBottom:"2em",
     fontSize:"1em",
     fontFamily:"sans",
     cursor:"pointer",
     backgroundColor: isActive ? "#171d2d" : "white",
     color: isActive ? "white" : "black",
     borderRadius:"20px",
     padding:"0 1em"
  
    })
    const bodyInfo ={
      width:"100%",
      height:"15em",
      position:"absolute",
      top:"6em",
      overflowY: "scroll " ,
      display:"flex",
      flexDirection:"column"   ,
      scrollbarColor: "#171d2d #f1f1f1", // لمتصفحات Firefox 
  
    }
  const line={
    display:"flex",
    flexDirection:"row",
  
  }
  const titleLine = {
    height: "1em",  // تقليل الارتفاع
    width: "10em",
    marginLeft: "3em",
    fontFamily: "sans",
  };
  
  const desLine = {
    width: "21em",
    wordWrap: "break-word",
    whiteSpace: "normal",
    fontFamily: "sans",
    marginTop: "0.1em",  // إضافة هامش صغير بين العنوان والوصف
  };
  
  
  


  const commandsData = {
    General: [
      { title: "Next", description: 'Say "next" to move the focus to the next element.' },
      { title: "Previous", description: 'Say "previous" to move the focus to the previous element.' },
      { title: "Go", description: 'Say "focus" and then the name of the text of the desired element (e.g.: "focus about us").' },
      { title: "Scroll", description: 'Say "scroll" and then "down" or "up" (e.g.: "Scroll down").' },
      { title: "Click", description: 'Say "click" to activate link or button that is focused.' },
      { title: "Input", description: 'Say "input" and then the name of the form element to get the focus to (e.g.: "input first name").' },
      { title: "Pause", description: 'Say "pause" to pause the voice recognition ("Muted" state).' },
      { title: "Stop", description: 'Say "stop" to turn off the Voice Commands function.' },
      { title: "Number", description: 'Say "number" and the number\'s value to focus on it, in "Smart Navigation" mode (e.g.: "number one").' },
    ],
    Accessibility: [
      { title: "Text Reader", description: 'Say "turn / run / set text reader" to run the function.' },
      { title: "Mouse Grid", description: 'Say "turn / run / set mouse grid" to run the function.' },
      { title: "Keyboard Navigation", description: 'Say "turn / run / set keyboard navigation" to run the function.' },
      { title: "Smart Navigation", description: 'Say "turn / run / set smart navigation" to run the function.' },
      { title: "Screen Reader Adjustment", description: 'Say "turn / run / set screen reader adjustment" to run the function.' },
      { title: "Contrast Mode", description: 'Say "turn / run / set contrast mode" to run the function.' },
      { title: "Bright High-Contrast", description: 'Say "turn / run / set bright high-contrast" to run the function.' },
      { title: "Dark High-Contrast", description: 'Say "turn / run / set dark high-contrast" to run the function.' },
      { title: "Blinks Blocking", description: 'Say "turn / run / set blinks blocking" to run the function.' },
      { title: "Increase Font Size", description: 'Say "turn / run / set increase font size" to run the function.' },
      { title: "Decrease Font Size", description: 'Say "turn / run / set decrease font size" to run the function.' },
      { title: "Increase Space Between Letters", description: 'Say "turn / run / set increase space between letters." to run the function.' },
      { title: "Decrease Space Between Letters", description: 'Say "turn / run / set decrease space between letters." to run the function.' },
      { title: "Readable Font", description: 'Say "turn / run / set readable font" to run the function.' },
      { title: "Large White Cursor", description: 'Say "turn / run / set large white cursor" to run the function.' },
      { title: "Large Black Cursor", description: 'Say "turn / run / set large black cursor" to run the function.' },
      { title: "Magnifier", description: 'Say "turn / run / set magnifier" to run the function.' },
      { title: "Highlights Links", description: 'Say "turn / run / set highlights links" to run the function.' },
      { title: "Highlights Headers", description: 'Say "turn / run / set highlights headers" to run the function.' },
      { title: "Image Descriptions", description: 'Say "turn / run / set image descriptions" to run the function.' },
    ],
    "Dictation Commands" :[
      {title:"Delete", description:"Delete the last written word or the whole field content;"},
      {title:"New line", description:"Insert a new line (useful in textarea)."},
      {title:"Move the cursor position", description:"Move the focus to the start of the text element."},      

    ],
    "Punctuation marks": [
      {title:"Space ( )", description:"Say space"},
      {title:"Tab ( )", description:"Say tab"},
      {title:"New line ( )", description:"Say new line"},
      {title:"And sign (&)", description:"Say ampersand;and sign"},
      {title:"Period (.)", description:"Say period;point sign"},
      {title:"Ellipsis (…)", description:"Say ellipsis;dot dot dot"},
      {title:"Comma (,)", description:"Say comma;coma"},
      {title:"Colon (:)", description:"Say colon"},
      {title:"Semi colon (;)", description:"Say semi colon;semicolon"},
      {title:"Question mark (?)", description:"Say question mark"},
      {title:"Exclamation mark (!)", description:"Say exclamation point"},
      {title:"Equal sign (=)", description:"Say equal sign"},
      {title:"At sign (@)", description:"Say at sign"},
      {title:"Pipe sign (|)", description:"Say pipe sign"},
      {title:"Slash (/)", description:"Say forward slash"},
      {title:"Backslash (\)", description:"Say backslash"},
      {title:"Hyphen (-)", description:"Say minus sign;hyphen"},
      {title:"Dash (—)", description:"Say dash;Dash"},
      {title:"Plus sign (+)", description:"Say plus sign"},
      {title:"Single quote (')", description:"Say single quote"},
      {title:"Quotation mark (\")", description:"Say Quotation mark;quotes"},
      {title:"Left parenthesis (()", description:"Say left parenthesis;open parenthesis"},
      {title:"Right parenthesis ())", description:"Say right parenthesis;close parenthesis"},
      {title:"Left bracket ([)", description:"Say left bracket;open bracket"},
      {title:"Right bracket (])", description:"Say right bracket;close bracket"},
      {title:"Left curly bracket ({)", description:"Say left curly bracket;open curly bracket"},
      {title:"Right curly bracket (})", description:"Say right curly bracket;close curly bracket"},
      {title:"Percent sign (%)", description:"Say percent sign"},
      {title:"Dollar sign ($)", description:"Say dollar sign"},
      {title:"Pound sign (#)", description:"Say pound sign;hash tag;number sign"},
      {title:"Apostrophe (`)", description:"Say apostrophe"},
      {title:"Degree sign (°)", description:"Say degree sign"},
      {title:"Tilde (~)", description:"Say tilde;tilda"},
      {title:"Caret (^)", description:"Say caret"},
      {title:"Asterisk (*)", description:"Say asterisk;star sign"},
      {title:"Smiling Face (😃)", description:"Say smiling Face"},
    ]

    // Add more sections as needed
  };
  const getContent = (button) => {
    const data = commandsData[button];
    if (!data) return <div>Section not available</div>;
  
    return (
      <div style={bodyInfo}>
        <div style={line}>
          <div style={titleLine}><h5>Command</h5></div>
          <div style={desLine}><p>Explanation</p></div>
        </div>
        <div><hr style={{width:"90%"}} /></div>
        {data.map((command, index) => (
          <div key={index}>
            <div style={line}>
              <div style={titleLine}><h5>{command.title}</h5></div>
              <div style={desLine}><p>{command.description}</p></div>
            </div>
            <div><hr style={{width:"90%"}}/></div>
          </div>
        ))}
      </div>
    );
  };
  const btnNavigate = {
    position: "fixed",
    bottom: "-0.5em",
    left: "45em",
    width: "7em",
    height: "5em",
    backgroundColor: "rgba(85, 83, 83, 0.5)", 
    borderRadius:"20px",
    zIndex: 1000 // تأكد أن العنصر فوق العناصر الأخرى
  };
  
  const navigateAction ={
    width:"6em",
    height:"4em",
    borderRadius:"40px",
    margin:"1em",
    border:"none",
    backgroundColor:isNavigateIcon ? "#2278ca" : "#fff",
    cursor:"pointer"
    
  }
  const iconNavigate ={
    width:"2em",
    height:"2em",
    color: isNavigateIcon ? "#fff" : "#2278ca"
  }
 
  
    return (
      <>
        <div style={btnNavigate}>
              <button style={navigateAction} onClick={clickIcon}><RiUserVoiceLine  style={iconNavigate} /> </button>
          </div>
        { isNavigateIcon &&
            <div style={voiceContainerStyle}>
            <div style={micIcon}>
              <button style={btnMic} onClick={toggleMic}>
                {isMiceOn ?  <FiMic style={mic}/> : <FiMicOff style={mic}/>}
              </button>
            </div>
            <div style={listenBar}>
              <span style={spanListenBar}>Your commands will be listed here..</span>
              <div style={divListenBar}></div>
      
            </div>
            <div style={infoIcon}>
              <button style={btnInfo}>
                <FaInfoCircle onClick={handleVisability} style={info}/>
              </button>
            </div> 
            {
              isVisible ? (
                <div style={infoContainer}>
              <div style={infoHeader}>
                <span style={infoSpan}>Command Legend</span>
                <button style={btnClose} onClick={handleVisability}>X</button>
                <hr style={{position:"relative",top:"1.1em"}}/>
              </div>
              <div style={btnTargetContainer}>
            
                    {["General", "Accessibility", "Dictation Commands", "Punctuation marks"].map((label, index) => (
                      <button
                        key={index}
                        style={btnTarget(activeButton === label)}
                        onClick={() => handleButtonClick(label)}
                      >
                        {label}
                      </button>
              ))}
              </div>
            
                    {getContent(activeButton)}
      
          
              </div>
              ):""
            }
      
            </div>   
        }
        </>
    );
  };
  
  export default VoiceBar;
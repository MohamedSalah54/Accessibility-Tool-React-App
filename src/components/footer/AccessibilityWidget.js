import { useState } from "react";
import styles from './Footer.module.css'

const AccessabilityWidget = ({ closeWidget }) => {
    const [selectedOption, setSelectedOption] = useState(""); // لتتبع الاختيار الحالي

    const options = ["For the current session at this tab only", "For the next 24 hours", "For a week", "For a month"]; // الخيارات المتاحة
  
    const handleOptionChange = (option) => {
      setSelectedOption(option);
    };
    return (
      <div className={styles.overlay}>
        <div className={styles.card_container}>
          <div className={styles.card}>
            <div style={{border:"1px solid black",width:"70%",height:"70%",marginLeft:"5em",marginTop:"1em"}}>
            <div style={{ padding: "20px", fontFamily: "Arial, sans-serif" }}>
                    <h2>Select an Option:</h2>
                      {options.map((option) => (
                    <div
                    key={option}
                    style={{
                        display: "flex",
                        alignItems: "center",
                        margin: "10px 0",
                        cursor: "pointer",
                    }}
                    onClick={() => handleOptionChange(option)} // لتحديث الاختيار
                    >
                    <div
                        style={{
                        width: "20px",
                        height: "20px",
                        borderRadius: "50%",
                        border: "2px solid #000",
                        marginRight: "10px",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        }}
                    >
                        {selectedOption === option && (
                        <div
                            style={{
                            width: "12px",
                            height: "12px",
                            borderRadius: "50%",
                            backgroundColor: "#000",
                            }}
                        ></div>
                        )}
                    </div>
                    <label>{option}</label>
                    </div>
                ))}
            
            </div>
            <button style={{margin:"3em",width:"80%",border:"none",padding:"10px",backgroundColor:"#1a1a2e",color:"white",cursor:"pointer"}}>Confirm and remove the accessability widget</button>
            </div>
         
          </div>
          <div className={styles.h2_acc_card}>
            <h3 style={{paddingRight:"8em"}}>This website offers an accessibility widget. You have asked to remove it:</h3>
          </div>
          <button onClick={closeWidget} className={styles.close_btn}>
            Close
          </button>
        </div>
      </div>
    );
  };
  
  export default AccessabilityWidget;
  
import React, { useEffect, useRef } from "react";
import audio from "../audio/videoplayback.mp3"; 
import video from '../audio/nature.mp4'
const Home = () => {
  const audioRef = useRef(null);
  const videoRef = useRef(null);

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.muted = false; 
      audioRef.current.play().catch((error) => {
        console.log("Error playing audio: ", error); 
      });
    }

    if (videoRef.current) {
      videoRef.current.play().catch((error) => {
        console.log("Error playing video: ", error); 
      });
    }
  }, []);

  const styles = {
    container: {
      textAlign: "center",
      marginTop: "50px",
      fontFamily: "'Roboto'", 
    },
    heading: {
      fontSize: "2rem",
      color: "#333",
    },
    paragraph: {
      fontSize: "1rem",
      color: "#555",
      lineHeight: "1.5",
      maxWidth: "600px",
      margin: "20px auto",
    },
    button: {
      padding: "10px 20px",
      backgroundColor: "#007bff",
      color: "#fff",
      border: "none",
      borderRadius: "5px",
      cursor: "pointer",
      fontSize: "1rem",
    },
    mediaContainer: {
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      gap: "20px",
      marginTop: "30px",
      flexWrap: "wrap", 
    },
    audio: {
      marginTop: "20px",
    },
    video: {
      width: "400px",
      height: "auto",
      borderRadius: "10px",
      boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)",
    },
  };

  return (
    <div style={styles.container}>
      <h1 style={styles.heading}>Welcome to My Home Page</h1>
      <p style={styles.paragraph}>
        This is a simple home page component with inline styles. Explore and enjoy the design!
      </p>
      <button style={styles.button} onClick={() => alert("Button Clicked!")}>
        Click Me
      </button>

      {/* إضافة عنصر الصوت والفيديو */}
      <div style={styles.mediaContainer}>
        <div style={styles.audio}>
          <audio ref={audioRef} autoPlay controls>
            <source src={audio} type="audio/mp3" />
            Your browser does not support the audio element.
          </audio>
        </div>

        <div>
          <video ref={videoRef} style={styles.video} controls muted>
            <source src={video} type="video/mp4" />
            Your browser does not support the video element.
          </video>
        </div>
      </div>
    </div>
  );
};

export default Home;

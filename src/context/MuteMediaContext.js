import React, { createContext, useState, useContext, useEffect } from "react";

// 1. تعريف الـ Context
const AudioContext = createContext();

// 2. دالة `useAudioContext` لاستخدام الـ Context
export const useAudioContext = () => {
  return useContext(AudioContext);
};

// تحديث الـ AudioProvider ليشمل handleMuteClick
export const AudioProvider = ({ children }) => {
  const [isMuted, setIsMuted] = useState(false);

  // الدالة الخاصة بكتم الصوت
  const handleMuteClick = () => {
    setIsMuted(prevMuted => !prevMuted);
  };

  // التأكد من أنه عند وجود أي صوت يتم كتمه
  useEffect(() => {
    if (isMuted) {
      document.querySelectorAll('audio, video').forEach((el) => {
        el.muted = true;
      });
    } else {
      document.querySelectorAll('audio, video').forEach((el) => {
        el.muted = false;
      });
    }
  }, [isMuted]);

  // 3. استخدام الـ Context.Provider هنا
  return (
    <AudioContext.Provider value={{ isMuted, setIsMuted, handleMuteClick }}>
      {children}
    </AudioContext.Provider>
  );
};

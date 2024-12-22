// import React, { createContext, useContext, useState, useEffect } from 'react';

// const VoiceCommandsContext = createContext();

// export const useVoiceCommands = () => useContext(VoiceCommandsContext);

// export const VoiceCommandsProvider = ({ children }) => {
//   const [isVoiceEnabled, setIsVoiceEnabled] = useState(false);

//   // دالة لتفعيل / إيقاف الأوامر الصوتية
//   const toggleVoiceCommands = () => {
//     setIsVoiceEnabled(prev => {
//       const newState = !prev;
//       localStorage.setItem('voiceCommandsEnabled', newState.toString());
//       return newState;
//     });
//   };

//   // دالة لتنفيذ الأوامر الصوتية باستخدام SpeechRecognition
//   const handleVoiceCommand = (command) => {
//     if (command.includes('next')) {
//       document.querySelector('button.next')?.click();
//     } else if (command.includes('click')) {
//       document.querySelector('button')?.click();
//     } else if (command.includes('scroll')) {
//       window.scrollBy(0, 100);
//     }
//   };

//   // استماع الأوامر الصوتية عندما يكون الوضع مفعلًا
//   useEffect(() => {
//     if (!isVoiceEnabled) return;

//     const recognition = new (window.SpeechRecognition || window.webkitSpeechRecognition)();
//     recognition.lang = 'en-US';
//     recognition.interimResults = true;

//     recognition.onresult = event => {
//       const command = event.results[0][0].transcript.toLowerCase();
//       handleVoiceCommand(command);
//     };

//     recognition.start();

//     return () => recognition.stop();
//   }, [isVoiceEnabled]);

//   // استرجاع الإعداد من localStorage عند تحميل الصفحة
//   useEffect(() => {
//     const storedSetting = localStorage.getItem('voiceCommandsEnabled');
//     if (storedSetting === 'true') {
//       setIsVoiceEnabled(true);
//     }
//   }, []);

//   return (
//     <VoiceCommandsContext.Provider value={{ isVoiceEnabled, toggleVoiceCommands }}>
//       {children}
//     </VoiceCommandsContext.Provider>
//   );
// };

import React, { useState } from 'react';

const TextToSpeech = () => {
  const [text, setText] = useState('');
  const [isSpeaking, setIsSpeaking] = useState(false);

  const handleSpeak = () => {
    if (text.trim() === '') return;

    const utterance = new SpeechSynthesisUtterance(text);
    utterance.onstart = () => setIsSpeaking(true);
    utterance.onend = () => setIsSpeaking(false);

    // Set voice and other properties if desired
    utterance.pitch = 1;    // Default is 1 (range: 0-2)
    utterance.rate = 1;     // Default is 1 (range: 0.1-10)

    window.speechSynthesis.speak(utterance);
  };

  const handleStop = () => {
    window.speechSynthesis.cancel(); // Stop all speech
    setIsSpeaking(false);
  };

  return (
    <div style={{ padding: '20px', maxWidth: '600px', margin: 'auto' }}>
      <h1>Text-to-Speech in React</h1>
      <textarea
        value={text}
        onChange={(e) => setText(e.target.value)}
        rows="4"
        style={{ width: '100%', marginBottom: '10px' }}
        placeholder="Enter text to convert to speech"
      />
      <button onClick={handleSpeak} disabled={isSpeaking}>
        {isSpeaking ? 'Speaking...' : 'Speak'}
      </button>
      <button onClick={handleStop} style={{ marginLeft: '10px' }}>
        Stop
      </button>
    </div>
  );
};

export default TextToSpeech;

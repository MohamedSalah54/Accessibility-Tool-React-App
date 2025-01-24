import { createContext, useContext, useState, useEffect } from 'react';
import styles from '../../src/components/sidebar/AccessibilitySidebar.module.css'

const MagnifierTextContext = createContext();

export const useMagnifierText = () => {
  return useContext(MagnifierTextContext);
};

export const MagnifierTextProvider = ({ children }) => {
  const [isMagnifierActive, setMagnifierActive] = useState(false);

  useEffect(() => {
    const storedState = localStorage.getItem('magnifier');
    if (storedState === 'active') {
      setMagnifierActive(true);
    }
  }, []);

  useEffect(() => {
    let tooltip;
    let mouseMoveTimeout;

    const handleMouseOver = (e) => {
      const text = e.target.innerText?.trim();
      if (!text) return;

      if (e.target.closest(`.${styles.sidebar}`)) return; 

      tooltip = document.createElement('div');
      tooltip.style.position = 'fixed'; 
      tooltip.style.backgroundColor = 'black';
      tooltip.style.color = 'white';
      tooltip.style.padding = '10px';
      tooltip.style.borderRadius = '5px';
      tooltip.style.zIndex = '1000';
      tooltip.style.transform = 'scale(1.5)';
      tooltip.style.whiteSpace = 'normal';
      tooltip.style.wordWrap = 'break-word';
      tooltip.style.maxWidth = '200px';
      tooltip.style.minWidth = '100px';
      tooltip.style.wordBreak = 'break-word';
      tooltip.style.lineHeight = '1.4';
      tooltip.style.overflowWrap = 'break-word';
      tooltip.style.pointerEvents = 'none'; 

      tooltip.innerText = text;

      document.body.appendChild(tooltip);

      const { clientX, clientY } = e;
      tooltip.style.left = `${clientX + 10}px`;
      tooltip.style.top = `${clientY + 10}px`;

      const handleMouseMove = (moveEvent) => {
        if (mouseMoveTimeout) clearTimeout(mouseMoveTimeout);

        mouseMoveTimeout = setTimeout(() => {
          tooltip.style.left = `${moveEvent.clientX + 10}px`;
          tooltip.style.top = `${moveEvent.clientY + 10}px`;
        }, 10); 
      };

      const handleMouseLeave = () => {
        tooltip.remove();
        clearTimeout(mouseMoveTimeout);
        e.target.removeEventListener('mousemove', handleMouseMove);
        e.target.removeEventListener('mouseleave', handleMouseLeave);
      };

      e.target.addEventListener('mousemove', handleMouseMove);
      e.target.addEventListener('mouseleave', handleMouseLeave);
    };

    if (isMagnifierActive) {
      const elements = document.querySelectorAll('p, span, h1, h2, h3, h4, h5, h6, label, a, button');

      elements.forEach((element) => {
        element.addEventListener('mouseover', handleMouseOver);
      });
    }

    return () => {
      const elements = document.querySelectorAll('p, span, h1, h2, h3, h4, h5, h6, label, a, button');
      elements.forEach((element) => {
        element.removeEventListener('mouseover', handleMouseOver);
      });
    };
  }, [isMagnifierActive]);

  const toggleTextMagnifier = () => {
    setMagnifierActive((prev) => !prev);
    if (!isMagnifierActive) {
      localStorage.setItem('magnifier', 'active');
    } else {
      localStorage.removeItem('magnifier');
    }
  };

  return (
    <MagnifierTextContext.Provider value={{ isMagnifierActive, toggleTextMagnifier }}>
      {children}
    </MagnifierTextContext.Provider>
  );
};

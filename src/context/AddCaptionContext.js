import React, { createContext, useContext, useEffect, useState } from "react";
const AddCaptionContext = createContext();

export const AddCaptionProvider = ({ children }) => {
  const [isTooltipMode, setIsTooltipMode] = useState(
    JSON.parse(localStorage.getItem("tooltipMode")) || false
  );

  useEffect(() => {
    if (isTooltipMode) {
      localStorage.setItem("tooltipMode", true);
    } else {
      localStorage.removeItem("tooltipMode");
    }
  }, [isTooltipMode]);

  const toggleCaption = () => {
    setIsTooltipMode((prev) => !prev);
  };

  useEffect(() => {
    if (!isTooltipMode) return;

    const mediaElements = document.querySelectorAll("video, audio");

    const handleMouseOver = (e) => {
      const title = e.target.getAttribute("data-description") || "No description available";
      const tooltip = document.createElement("div");
      tooltip.textContent = title;
      tooltip.style.position = "absolute";
      tooltip.style.backgroundColor = "rgba(0, 0, 0, 0.7)";
      tooltip.style.color = "white";
      tooltip.style.padding = "5px";
      tooltip.style.borderRadius = "5px";
      tooltip.style.pointerEvents = "none";
      tooltip.style.zIndex = "1000";
      tooltip.className = "custom-tooltip";

      document.documentElement.appendChild(tooltip);

      const moveTooltip = (event) => {
        tooltip.style.top = `${event.clientY + 10}px`;
        tooltip.style.left = `${event.clientX + 10}px`;
      };

      document.addEventListener("mousemove", moveTooltip);

      e.target.addEventListener("mouseout", () => {
        tooltip.remove();
        document.removeEventListener("mousemove", moveTooltip);
      });
    };

    mediaElements.forEach((media) =>
      media.addEventListener("mouseover", handleMouseOver)
    );

    return () => {
      mediaElements.forEach((media) =>
        media.removeEventListener("mouseover", handleMouseOver)
      );
    };
  }, [isTooltipMode]);

  return (
    <AddCaptionContext.Provider value={{ isTooltipMode, toggleCaption }}>
      {children}
    </AddCaptionContext.Provider>
  );
};

export const useAddCaption = () => useContext(AddCaptionContext);

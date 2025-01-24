import React, { createContext, useContext, useEffect, useState } from "react";

const ImageDescriptionContext = createContext();

export const ImageDescriptionProvider = ({ children }) => {
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

  const toggleTooltipMode = () => {
    setIsTooltipMode((prev) => !prev);
  };

  useEffect(() => {
    if (!isTooltipMode) return;

    const images = document.querySelectorAll("img");

    const handleMouseOver = (e) => {
      const altText = e.target.alt || "No description available";
      const tooltip = document.createElement("div");
      tooltip.textContent = altText;
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

    images.forEach((img) => img.addEventListener("mouseover", handleMouseOver));

    return () => {
      images.forEach((img) => img.removeEventListener("mouseover", handleMouseOver));
    };
  }, [isTooltipMode]);

  return (
    <ImageDescriptionContext.Provider value={{ isTooltipMode, toggleTooltipMode }}>
      {children}
    </ImageDescriptionContext.Provider>
  );
};

export const useImageDescription = () => useContext(ImageDescriptionContext);

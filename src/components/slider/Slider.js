import React, { useState, useEffect } from "react";
import pic1 from "../../Images/pic1.png";
import pic2 from "../../Images/pic2.png";
import pic3 from "../../Images/pic3.png";
import pic4 from "../../Images/pic4.png";
import pic5 from "../../Images/pic5.png";
import pic6 from "../../Images/pic6.jpg";

const Slider = () => {
  // Images array with alt descriptions
  const images = [
    { src: pic1, alt: "Beautiful landscape with mountains" },
    { src: pic2, alt: "A stunning sunset over the ocean" },
    { src: pic3, alt: "A vibrant city skyline at night" },
    { src: pic4, alt: "A peaceful forest in the morning" },
    { src: pic5, alt: "A snowy mountain peak under clear skies" },
    { src: pic6, alt: "A colorful garden in full bloom" },
  ];

  const [currentIndex, setCurrentIndex] = useState(0);

  // Function to go to the next slide
  const nextSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length); // Move to the next image
  };

  // Auto-slide every 3 seconds
  useEffect(() => {
    const interval = setInterval(nextSlide, 3000); // Change image every 3 seconds
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="slider-container">
      <div className={`slider slide-${currentIndex}`}>
        {images.map((image, index) => (
          <img
            className="slide"
            key={index}
            src={image.src}
            alt={image.alt} // Alt description from the object
          />
        ))}
      </div>
    </div>
  );
};

export default Slider;
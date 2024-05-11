import React, { useState, useEffect } from "react";
import "./Login.css";

const Slider = ({ images, interval }) => {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, interval);

    return () => clearInterval(intervalId);
  }, [images, interval]);

  return (
    <div className="slider-container">
      {images.map((image, idx) => (
        <img
          key={idx}
          src={image}
          alt={`Slide ${idx + 1}`}
          className={idx === index ? "active" : ""}
        />
      ))}
    </div>
  );
};

export default Slider;

import React, { useState, useEffect } from "react";
import "./ScrollButton.css";

const ScrollButton = ({ onPageUp, onPageDown }) => {
  const [isAtPageTop, setIsAtPageTop] = useState(true);

  useEffect(() => {
    const checkScrollPosition = () => {
      if (window.pageYOffset > 0) {
        setIsAtPageTop(false);
      } else {
        setIsAtPageTop(true);
      }
    };

    window.addEventListener("scroll", checkScrollPosition);
    return () => window.removeEventListener("scroll", checkScrollPosition);
  }, []);

  return (
    <div className="scroll-button-container">
      {!isAtPageTop && (
        <button className="scroll-button up" onClick={onPageUp}>
          Вгору
        </button>
      )}
      {isAtPageTop && (
        <button className="scroll-button down" onClick={onPageDown}>
          Вниз
        </button>
      )}
    </div>
  );
};

export default ScrollButton;

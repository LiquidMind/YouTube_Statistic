import React, { useEffect, useRef } from "react";
import "./BouncingBall.css";

const BouncingBall = () => {
  const ballRef = useRef(null);

  useEffect(() => {
    const ball = ballRef.current;
    if (!ball) return;

    let x = 0;
    let y = 0;
    let xDirection = 5;
    let yDirection = 5;

    const animate = () => {
      if (!ball) return;

      const ballRect = ball.getBoundingClientRect();
      if (x + ballRect.width >= window.innerWidth || x <= 0) {
        xDirection = -xDirection;
      }

      if (y + ballRect.height >= window.innerHeight || y <= 0) {
        yDirection = -yDirection;
      }

      x += xDirection;
      y += yDirection;

      ball.style.left = x + "px";
      ball.style.top = y + "px";

      requestAnimationFrame(animate);
    };

    animate();
  }, []);

  return <div className="bouncing-ball" ref={ballRef} />;
};

export default BouncingBall;

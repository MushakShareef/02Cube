



import React, { useState, useEffect, useRef } from 'react';
import './Cube.css';

const Cube = ({ images }) => {
  const [rotateX, setRotateX] = useState(0);
  const [rotateY, setRotateY] = useState(0);
  const [autoRotate, setAutoRotate] = useState(true);
  const idleTimeout = useRef(null);
  const animationRef = useRef(null);
  const sensitivity = 0.2;

  // Auto-rotation logic
  useEffect(() => {
    if (autoRotate) {
      animationRef.current = setInterval(() => {
        setRotateY((prev) => prev + 1);
        setRotateX((prev) => prev + 0.5);
      }, 30);
    }
    return () => clearInterval(animationRef.current);
  }, [autoRotate]);

  // Reset idle timer
  const resetIdleTimer = () => {
    clearTimeout(idleTimeout.current);
    setAutoRotate(false);
    idleTimeout.current = setTimeout(() => {
      setAutoRotate(true);
    }, 5000); // Resume after 5 seconds
  };

  const handleMouseMove = (e) => {
    resetIdleTimer();
    setRotateY((prev) => prev + e.movementX * sensitivity);
    setRotateX((prev) => prev - e.movementY * sensitivity);
  };

  const handleTouchMove = (e) => {
    resetIdleTimer();
    const touch = e.touches[0];
    if (touch) {
      const x = touch.clientX;
      const y = touch.clientY;
      setRotateY((prev) => prev + (x - window.innerWidth / 2) * 0.002);
      setRotateX((prev) => prev - (y - window.innerHeight / 2) * 0.002);
    }
  };

  return (
    <div className="scene"
         onMouseMove={handleMouseMove}
         onTouchMove={handleTouchMove}>
      <div
        className="cube"
        style={{
          transform: `rotateX(${rotateX}deg) rotateY(${rotateY}deg)`,
        }}
      >
        {['front', 'back', 'right', 'left', 'top', 'bottom'].map((side, i) => (
          <div
            key={side}
            className={`face ${side}`}
            style={{ backgroundImage: `url(${images[i]})` }}
          />
        ))}
      </div>
    </div>
  );
};

export default Cube;

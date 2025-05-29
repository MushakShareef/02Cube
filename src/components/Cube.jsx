



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

  const lastTouch = useRef({ x: 0, y: 0 });

  const handleTouchStart = (e) => {
    e.preventDefault();
    resetIdleTimer();
    const touch = e.touches[0];
    lastTouch.current = { x: touch.clientX, y: touch.clientY };
  };

  const handleTouchMove = (e) => {
    e.preventDefault();
    resetIdleTimer();
    const touch = e.touches[0];
    if (touch) {
      const deltaX = touch.clientX - lastTouch.current.x;
      const deltaY = touch.clientY - lastTouch.current.y;

      setRotateY((prev) => prev + deltaX * sensitivity);
      setRotateX((prev) => prev - deltaY * sensitivity);

      lastTouch.current = { x: touch.clientX, y: touch.clientY };
    }
  };

  return (
    <div className="scene"
         onMouseMove={handleMouseMove}
         onTouchStart={handleTouchStart}
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

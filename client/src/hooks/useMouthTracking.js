// src/hooks/useMouseTracking.js
import { useState, useEffect } from 'react';

export const useMouseTracking = (containerRef) => {
  // State to store mouse position coordinates
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    // Function to handle mouse movement
    const handleMouseMove = (e) => {
      if (containerRef.current) {
        // Get container boundaries to calculate relative position
        const rect = containerRef.current.getBoundingClientRect();
        setMousePosition({
          x: e.clientX - rect.left, // Mouse X relative to container
          y: e.clientY - rect.top   // Mouse Y relative to container
        });
      }
    };

    const container = containerRef.current;
    if (container) {
      // Add event listener for mouse movement
      container.addEventListener('mousemove', handleMouseMove);
      
      // Cleanup function to remove event listener
      return () => container.removeEventListener('mousemove', handleMouseMove);
    }
  }, [containerRef]);

  return mousePosition;
};
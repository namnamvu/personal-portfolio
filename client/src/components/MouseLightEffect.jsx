import React, { useRef } from 'react';
import { useMouseTracking } from '../hooks/useMouthTracking';


const MouseLightEffect = ({ children }) => {
    const containerRef = useRef(null);
    const mousePosition = useMouseTracking(containerRef);
  
    return (
      <div
        ref={containerRef}
        style={{
          minHeight: '100vh',  
          position: 'relative', 
          overflow: 'hidden',   
          background: `
            radial-gradient(circle at ${mousePosition.x}px ${mousePosition.y}px, 
              rgba(255,255,255,0.14) 0%, 
              rgba(255,255,255,0.05) 200px, 
              transparent 1500px
            )
          `
        }}
      >
        {children}
      </div>
    );
  };

  export default MouseLightEffect;
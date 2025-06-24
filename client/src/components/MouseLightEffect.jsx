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
              rgba(255,255,255,0.1) 0%, 
              rgba(255,255,255,0.05) 200px, 
              transparent 600px
            )
          `
        }}
      >
        {children}
      </div>
    );
  };

  export default MouseLightEffect;
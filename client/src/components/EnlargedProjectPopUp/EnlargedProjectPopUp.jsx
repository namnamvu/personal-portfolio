// src/components/EnlargedProjectPopup/EnlargedProjectPopup.jsx
import React, { useEffect, useCallback, useRef } from 'react'; // Import useRef
import { motion, AnimatePresence } from 'framer-motion'; // Import AnimatePresence
import styles from './EnlargedProjectPopUp.module.css';

const EnlargedProjectPopup = ({ project, onClose, onNavigate, hasNext, hasPrev }) => {
  // Use a ref to manage throttling for wheel events
  const isWheelThrottled = useRef(false);

  // Keyboard navigation (no change)
  const handleKeyDown = useCallback((event) => {
    if (event.key === 'ArrowRight' && hasNext) {
      onNavigate(1);
    } else if (event.key === 'ArrowLeft' && hasPrev) {
      onNavigate(-1);
    } else if (event.key === 'Escape') {
      onClose();
    }
  }, [hasNext, hasPrev, onNavigate, onClose]);

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [handleKeyDown]);


  // Mouse Wheel Navigation - Refined for one-scroll-one-project and background prevention
  const handleWheelNavigation = useCallback((e) => {
    e.preventDefault(); // Crucial: Prevent default page/popup scroll
    e.stopPropagation(); // Crucial: Stop event from bubbling up to any other listeners (like snap-scroll)

    if (isWheelThrottled.current) return; // If currently throttled, ignore
    isWheelThrottled.current = true; // Set throttle flag

    // Determine navigation direction
    if (e.deltaY > 0) { // Scrolling down/forward
      if (hasNext) {
        onNavigate(1);
      }
    } else if (e.deltaY < 0) { // Scrolling up/backward
      if (hasPrev) {
        onNavigate(-1);
      }
    }

    // Release throttle after a short delay to allow next navigation
    setTimeout(() => {
      isWheelThrottled.current = false;
    }, 500); // Adjust this delay (milliseconds) as needed for desired responsiveness
              // 500ms (0.5s) is a good starting point for "one scroll = one project" feeling
  }, [hasNext, hasPrev, onNavigate]);

  useEffect(() => {
    window.addEventListener('wheel', handleWheelNavigation, { passive: false });
    
    // Ensure body overflow is hidden to prevent background scrolling
    document.body.style.overflow = 'hidden';
    // Add touch-action none for better mobile experience with custom scroll handling
    document.body.style.touchAction = 'none';

    // Cleanup: Remove listener and restore body overflow when popup unmounts
    return () => {
      window.removeEventListener('wheel', handleWheelNavigation);
      document.body.style.overflow = ''; // Restore to default or previous state
      document.body.style.touchAction = '';
    };
  }, [handleWheelNavigation]);


  // Framer Motion animation variants for slide-in/out
  const contentVariants = {
    initial: (direction) => ({
      x: direction > 0 ? '100%' : '-100%', // Slide in from right for next, left for prev
      opacity: 0,
    }),
    animate: {
      x: '0%',
      opacity: 1,
      transition: {
        x: { type: "spring", stiffness: 300, damping: 30 },
        opacity: { duration: 0.2 }
      }
    },
    exit: (direction) => ({
      x: direction > 0 ? '-100%' : '100%', // Slide out to left for next, right for prev
      opacity: 0,
      transition: {
        x: { type: "spring", stiffness: 300, damping: 30 },
        opacity: { duration: 0.2 }
      }
    })
  };

  // Determine animation direction based on whether we navigate forward or backward
  // For the initial mount, direction doesn't matter much, default to 1.
  // This assumes onNavigate is only ever called with 1 or -1.
  const animationDirection = project ? (onNavigate === 1 ? 1 : -1) : 1; 

  return (
    <motion.div
      className={styles.popupOverlay}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={onClose} 
    >
      <AnimatePresence initial={false} mode='wait'> {/* Add AnimatePresence */}
        {/* Key is crucial for AnimatePresence to detect content change and trigger animation */}
        <motion.div
          key={project.id} // <-- CRUCIAL: Change key when project changes
          className={styles.popupContent}
          variants={contentVariants} // Apply variants
          initial="initial"
          animate="animate"
          exit="exit"
          custom={animationDirection} // Pass custom prop for direction
          // onClick={(e) => e.stopPropagation()} // Keep this to prevent closing when clicking content
          // Override default onClick so that the overlay onClick takes precedence
          onClick={(e) => e.stopPropagation()}
        >
          <button className={styles.closeButton} onClick={onClose}>&times;</button>

          {hasPrev && (
            <motion.button 
              className={`${styles.navButton} ${styles.navButtonLeft}`}
              whileHover={{ backgroundColor: 'rgba(0, 0, 0, 0.7)', transform: 'translateY(-50%) scale(1.1)' }}
              onClick={() => onNavigate(-1)}
              disabled={!hasPrev} 
            >
              &#x2190; {/* Left arrow */}
            </motion.button>
          )}

          <img src={project.image} alt={project.title} className={styles.popupImage} />
          <h2 className={styles.popupTitle}>{project.title}</h2>
          <p className={styles.popupDescription}>{project.description}</p>
          <a href={project.githubLink || "#"} target="_blank" rel="noopener noreferrer" className={styles.githubLink}>
            View on GitHub ↗
          </a>

          {hasNext && (
            <motion.button 
              className={`${styles.navButton} ${styles.navButtonRight}`}
              whileHover={{ backgroundColor: 'rgba(0, 0, 0, 0.7)', transform: 'translateY(-50%) scale(1.1)' }}
              onClick={() => onNavigate(1)}
              disabled={!hasNext}
            >
              &#x2192; {/* Right arrow */}
            </motion.button>
          )}
        </motion.div>
      </AnimatePresence>
    </motion.div>
  );
};

export default EnlargedProjectPopup;
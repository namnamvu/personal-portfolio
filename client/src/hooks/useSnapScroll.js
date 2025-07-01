// ScrollController.js
import { useEffect, useRef } from 'react';

const useSnapScroll = (enableSnapScroll = true) => {
  const containerRef = useRef(null);
  const isThrottled = useRef(false);

  useEffect(() => {
    const container = containerRef.current;
    if (!container || !enableSnapScroll) return;

    const sections = container.querySelectorAll('.scroll-section');
    let current = 0;

    // Optional: Initialize current section based on scroll position
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting && entry.target.classList.contains('scroll-section')) {
          current = Array.from(sections).indexOf(entry.target);
        }
      });
    }, { threshold: 0.5 });

    sections.forEach(section => observer.observe(section));

    const scrollToSection = idx => {
      if (sections[idx]) {
        sections[idx].scrollIntoView({ behavior: 'smooth' });
      }
    };

    const handleWheel = e => {
      // If we reach here, it means the event did NOT originate within the horizontal gallery
      // and was NOT stopped by it. So, we handle vertical snap scrolling.
      e.preventDefault(); // Prevent default vertical scroll of the body
      if (isThrottled.current) return;
      isThrottled.current = true;

      if (e.deltaY > 0) { // Scrolling down
        if (current < sections.length - 1) {
          current++;
        }
      } else if (e.deltaY < 0) { // Scrolling up
        if (current > 0) {
          current--;
        }
      }

      scrollToSection(current);
      setTimeout(() => (isThrottled.current = false), 700);
    };

    // Attach listener to the window or document for global vertical scroll control
    // If your App.js wraps the sections in `snapContainerRef`, attach it there.
    container.addEventListener('wheel', handleWheel, { passive: false });
    
    return () => {
      container.removeEventListener('wheel', handleWheel);
      observer.disconnect();
    };
  }, [enableSnapScroll]);

  return containerRef;
};

export default useSnapScroll;
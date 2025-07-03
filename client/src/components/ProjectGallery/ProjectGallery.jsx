// src/components/ProjectGallery/ProjectGallery.jsx
import React, { useRef, useEffect, useState, useCallback } from 'react';
import { motion, useScroll, AnimatePresence } from 'framer-motion';
import ProjectCard from '../ProjectCard/ProjectCard';
import EnlargedProjectPopup from '../EnlargedProjectPopUp/EnlargedProjectPopUp';
import projectsData from '../../data/projectsData';
import styles from './ProjectGallery.module.css';

// Receive onPopupToggle prop
const ProjectGallery = ({ onPopupToggle }) => { 
  const containerRef = useRef(null);
  const { scrollXProgress } = useScroll({
    container: containerRef,
    axis: "x"
  });

  const [selectedProject, setSelectedProject] = useState(null);
  const [selectedIndex, setSelectedIndex] = useState(null);
  const [isActivelyScrollingHorizontally, setIsActivelyScrollingHorizontally] = useState(false); 

  // Handle wheel for horizontal scrolling (no change here from previous iteration)
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    let scrollTimeout;

    const handleWheel = (e) => {
      e.preventDefault(); 
      e.stopPropagation(); 

      container.scrollBy({
        left: e.deltaY * 10, 
        behavior: 'smooth'
      });

      setIsActivelyScrollingHorizontally(true); 

      clearTimeout(scrollTimeout);
      scrollTimeout = setTimeout(() => {
        setIsActivelyScrollingHorizontally(false);
      }, 150); 
    };
  
    container.addEventListener('wheel', handleWheel, { passive: false });
    return () => {
      container.removeEventListener('wheel', handleWheel);
      clearTimeout(scrollTimeout);
    };
  }, []); 

  // Effect to manage body overflow when horizontal scrolling is active (no change here)
  useEffect(() => {
    if (isActivelyScrollingHorizontally) {
      document.body.style.overflowY = 'hidden';
      document.body.style.touchAction = 'none'; 
    } else {
      document.body.style.overflowY = ''; 
      document.body.style.touchAction = ''; 
    }
    return () => {
      document.body.style.overflowY = '';
      document.body.style.touchAction = '';
    };
  }, [isActivelyScrollingHorizontally]);


  // Handle card click to open popup
  const handleCardClick = (project) => {
    const index = projectsData.findIndex(p => p.id === project.id);
    setSelectedProject(project);
    setSelectedIndex(index);
    onPopupToggle(true); // <-- Notify App.js that popup is open
  };

  // Handle popup navigation (next/previous)
  const handleNavigate = useCallback((direction) => {
    let newIndex = selectedIndex + direction;
    if (newIndex >= 0 && newIndex < projectsData.length) {
      setSelectedProject(projectsData[newIndex]);
      setSelectedIndex(newIndex);
    }
  }, [selectedIndex, projectsData]); 

  // Close the popup
  const handleClosePopup = useCallback(() => {
    setSelectedProject(null);
    setSelectedIndex(null);
    onPopupToggle(false); // <-- Notify App.js that popup is closed
  }, [onPopupToggle]); // Add onPopupToggle to dependencies

  const hasNextProject = selectedIndex !== null && selectedIndex < projectsData.length - 1;
  const hasPrevProject = selectedIndex !== null && selectedIndex > 0;

  return (
    <div className={styles.container} id='project-section'>
      {/* Header */}
      <div className={styles.header}>
        <motion.h1 
          className={styles.title}
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          Featured Projects
        </motion.h1>
        <motion.p 
          className={styles.subtitle}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          Hover on the project to scroll || Scroll in blue area to move to next page
        </motion.p>
      </div>

      {/* Scrollable Project Container */}
      <div 
        className={styles.scrollContainer}    
        ref={containerRef}
      >
        <div 
          className={styles.projectsContainer} 
          style={{ width: `${projectsData.length * 340}px` }}
        >
          {projectsData.map((project, index) => (
            <ProjectCard
              key={project.id}
              project={project}
              index={index}
              scrollXProgress={scrollXProgress}
              onClick={handleCardClick}
            />
          ))}
        </div>
      </div>

      {/* Scroll Indicator */}
      <motion.div 
        className={styles.scrollIndicator}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1 }}
      >
        <div className={styles.indicatorText}>
          <span className={styles.indicatorSpan}></span>
          <motion.div
            className={styles.arrow}
            animate={{ x: [0, 10, 0] }}
            transition={{ repeat: Infinity, duration: 1.5 }}
          >
            →
          </motion.div>
        </div>
      </motion.div>

      {/* Enlarged Project Popup */}
      <AnimatePresence>
        {selectedProject && (
          <EnlargedProjectPopup
            project={selectedProject}
            onClose={handleClosePopup}
            onNavigate={handleNavigate}
            hasNext={hasNextProject}
            hasPrev={hasPrevProject}
          />
        )}
      </AnimatePresence>
    </div>
  );
};

export default ProjectGallery;
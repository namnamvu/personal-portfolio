import React from 'react';
import { motion, useTransform } from 'framer-motion';
import styles from './ProjectCard.module.css'; // Import CSS module

const ProjectCard = ({ project, index, scrollXProgress, onClick }) => {
  const floatFromBelow = index % 3 === 0 || index % 3 === 2;
  
  const imageY = useTransform(scrollXProgress, [0, 1], [0, floatFromBelow ? -20 : 20]);
  
  return (
    <motion.div
      className={styles.card}
      initial={{ opacity: 0, y: floatFromBelow ? 100 : -100 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ 
        duration: 0.8, 
        delay: index * 0.1,
        type: "spring",
        stiffness: 100,
        damping: 20
      }}
      onClick={() => onClick(project)}
    >
      <div className={styles.cardInner}>
        <motion.div 
          className={styles.imageContainer}
          animate={{ y: imageY }}
        >
          <div className={styles.imageOverlay} />
          <motion.img
            src={project.image}
            alt={project.title}
            className={styles.image}
            whileHover={{ scale: 1.1 }}
            transition={{ duration: 0.7 }}
          />
          <div className={styles.gradientOverlay} />
        </motion.div>
        
        <div className={styles.content}>
          <h3 className={styles.title}>
            {project.title}
          </h3>
        </div>
      </div>
    </motion.div>
  );
};

export default ProjectCard;
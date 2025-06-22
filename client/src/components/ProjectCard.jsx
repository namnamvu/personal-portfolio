import React from 'react';

const ProjectCard = ({ image, title, description, link }) => (
  <div className="card">
    <img src={image} alt={title} />
    <h5>{title}</h5>
    <div className="project-content">
      <p>{description}</p>
      <p><a href={link} target="_blank" rel="noreferrer">View code</a></p>
    </div>
  </div>
);

export default ProjectCard;

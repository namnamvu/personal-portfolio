import React from 'react';
import face1 from '../images/future.jpeg'; // Make sure this path is correct!

const About = () => (
  <section className="About">
    <div className="content-box" id='about-me'>
      <img src={face1} alt="A thoughtful future-facing portrait" />
      <div className="about-text">
        <h2>🚀 Who I Am</h2>
        <p>
          I'm currently a Computer Science student at Franklin &amp; Marshall College.
          My passion lies in building meaningful software and exploring how technology can empower people. I also love reading fantasy books and solving rubik cubes.
        </p>
        <ul className="about-list">
          <li>💻 I love building full-stack apps from scratch</li>
          <li>🧠 Curious about AI, algorithms, and software architecture</li>
          <li>🌱 Constantly learning new tools, frameworks, and best practices</li>
          <li>☕ Fueled by coffee and late-night coding sessions</li>
        </ul>
      </div>
    </div>
  </section>
);

export default About;

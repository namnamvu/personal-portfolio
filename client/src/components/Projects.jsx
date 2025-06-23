import React from 'react';
import ProjectCard from './ProjectCard';
import flyworld from "../images/FLyWorld.png"
import mealplan from "../images/MealPlanApp.png"
import testfw from "../images/TestResult.png"

const Projects = () => (
  <section className="project" id = "project">
    <div className="section-title">
      <h2>MY PROJECTS</h2>
    </div>
    <div className="box">
      <ProjectCard
        image={flyworld}
        title="Fly-World Game"
        description="A Java game where users can control the fly to reach home while dodging frogs and spiders."
        link="https://github.com/namnamvu/FlyWorld"
      />
      <ProjectCard
        image={mealplan}
        title="MealPlan App"
        description="Full-stack app that gives F&M students control and visibility over their meal plan data."
        link="https://github.com/namnamvu/MealPlanApp"
      />
      <ProjectCard
        image={testfw}
        title="Testing Framework"
        description="A test framework that outputs HTML. Define, execute and report unit tests easily."
        link="https://github.com/namnamvu/Test-Framework"
      />
    </div>
  </section>
);

export default Projects;

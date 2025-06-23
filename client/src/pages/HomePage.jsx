import React from 'react';
import Navbar from '../components/Navbar';
import Intro from '../components/Intro';
import About from '../components/About';
import Projects from '../components/Projects';
import Contact from '../components/Contact';

const HomePage = () => (
  <>
    <div className='hero-wrapper'>
        <Navbar />
        <Intro />
    </div>
    <About />
    <Projects />
    <Contact></Contact>
  </>
);

export default HomePage;

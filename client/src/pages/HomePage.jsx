import React from 'react';
import Navbar from '../components/Navbar';
import Intro from '../components/Intro';
import About from '../components/About';
import Projects from '../components/Projects';
import ContactForm from '../components/ContactForm';
import SocialLinks from '../components/SocialLinks';

const HomePage = () => (
  <>
    <div className='hero-wrapper'>
        <Navbar />
        <Intro />
    </div>
    <About />
    <Projects />
    <ContactForm />
    <SocialLinks />
  </>
);

export default HomePage;

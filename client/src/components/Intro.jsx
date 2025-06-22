import React from 'react';
import face from '../images/face.jpg'

const Intro = () => (
  <div className="Intro first-page">
    <div className='Intro-text'>
        <h1>NAM VU</h1>
        <h2 style={{ color: 'white' }}>Software Engineer</h2>  
        <a 
  href="#about-me"
  onClick={(e) => {
    e.preventDefault();
    document.getElementById('about-me').scrollIntoView({ 
      behavior: 'smooth', block: 'nearest' 
    });
  }}
  className="about-link"
>
  About me ↓
</a></div>
<div className="image-wrapper">
    <img src={face} alt="Me in New York" />
</div>
  </div>
);

export default Intro;

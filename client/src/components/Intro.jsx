import React from 'react';
import face from '../images/face.jpg'
import { useSmoothScroll } from '../hooks/useSmoothScroll';

const Intro = () => {
    const scrollTo = useSmoothScroll();
    return (
        <div className="Intro first-page">
            <div className='Intro-text'>
                <h1>NATHANIEL VU</h1>
                <h2 style={{ color: 'white' }}>Software Engineer</h2>  
                <a href="#about-me" onClick={scrollTo('about-me')} className="about-link">
                    About me
                </a>
            </div>
            <div className="image-wrapper">
                <img src={face} alt="Me in New York" />
            </div>
        </div>
    );
};

export default Intro;

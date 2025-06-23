import React, { useEffect, useState } from 'react';
import { useSmoothScroll } from '../hooks/useSmoothScroll';

const Navbar = () => {
    const scrollTo = useSmoothScroll();

    const [scrolled, setScrolled] = useState(false);

    useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
    }, []);
    return (
        <nav className={`navbar ${scrolled ? 'navbar-scrolled' : ''}`}>
            <div className='navbar-inner'>
                <h2 className="logo"><span className="aqua flip-bounce">Port</span>folio</h2>
                <ul className="nav-links">
                    <li><a href="https://github.com/namnamvu" target="_blank">GitHub</a></li>
                    <li><a href="images/me1.jpg" target="_blank">Gallery</a></li>
                    <li><a href="#project" onClick={scrollTo('project')} >Projects</a></li>
                    <li><a href="#link-to-contact" onClick={scrollTo('link-to-contact')}>Contact</a></li>
                </ul>
            </div>
        </nav>
    );
};

export default Navbar;

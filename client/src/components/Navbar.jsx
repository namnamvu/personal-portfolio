import React, { useEffect, useState } from 'react';
import { useSmoothScroll } from '../hooks/useSmoothScroll';

// Accept scrollContainerRef as a prop from HomePage
const Navbar = ({ scrollContainerRef }) => {
    const scrollTo = useSmoothScroll();

    // State to determine if the navbar should be transparent (true) or black (false)
    // It should be transparent ONLY when the scroll position is exactly 0.
    const [isAtTopSection, setIsAtTopSection] = useState(true);

    useEffect(() => {
        // Get the actual DOM element from the passed ref
        const scrollableElement = scrollContainerRef.current;

        const handleScroll = () => {
            // If the scrollable element isn't available yet, exit
            if (!scrollableElement) {
                // You can add a console.log here for debugging if needed
                // console.warn("Navbar: scrollableElement is null in handleScroll.");
                return;
            }

            const currentScrollPos = scrollableElement.scrollTop;

            // The navbar should be transparent ONLY when the scroll position is exactly 0.
            // Any scroll (even a tiny bit) means we're no longer at the very top.
            if (currentScrollPos === 0) {
                setIsAtTopSection(true); // Keep navbar transparent
            } else {
                setIsAtTopSection(false); // Make navbar black
            }
        };

        // Add event listener to the scrollable element when the ref is available
        if (scrollableElement) {
            scrollableElement.addEventListener('scroll', handleScroll);
        } else {
            console.warn("Navbar: scrollContainerRef.current is null on mount. Scroll tracking might not work.");
        }

        // Cleanup: remove event listener when the component unmounts
        return () => {
            if (scrollableElement) {
                scrollableElement.removeEventListener('scroll', handleScroll);
            }
        };
    }, [scrollContainerRef]); // Re-run effect if scrollContainerRef changes (which it won't after initial mount)

    return (
        // Apply 'navbar-scrolled' class when not at the top section (i.e., scroll position > 0)
        <nav className={`navbar ${!isAtTopSection ? 'navbar-scrolled' : ''}`}>
            <div className='navbar-inner'>
                <h2 className="logo">
                    <span className="aqua flip-bounce">
                        Port
                    </span> 
                        folio
                </h2>
                <ul className="nav-links">
                    <li>
                        <a href="https://github.com/namnamvu" target="_blank" rel="noopener noreferrer">GitHub</a>
                    </li>
                    <li>
                        <a 
                            href="https://drive.google.com/file/d/1ooUGQFBf8JklOvoMzRC00_5aPg9MRxNq/view?usp=sharing" 
                            target="_blank" 
                            rel="noopener noreferrer"
                        >
                            Resume
                        </a>
                    </li>
                    {/* <li><a href="images/me1.jpg" target="_blank" rel="noopener noreferrer">Gallery</a></li>
                    <li><a href="#project-section" onClick={scrollTo('project-section')} >Projects</a></li>
                    <li><a href="#link-to-contact" onClick={scrollTo('link-to-contact')}>Contact</a></li> */}
                </ul>
            </div>
        </nav>
    );
};

export default Navbar;
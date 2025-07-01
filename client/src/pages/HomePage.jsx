import React, {useState} from 'react';
import Navbar from '../components/Navbar';
import Intro from '../components/Intro';
import About from '../components/About';
import ProjectGallary from '../components/ProjectGallery/ProjectGallery';
import Contact from '../components/Contact';
import useSnapScroll from '../hooks/useSnapScroll';

const HomePage = () => {
  // Check state of popup and allow snap scroll only when popup is false
  const [isPopupOpen, setIsPopupOpen] = useState(false); 
  const SnapcontainerRef = useSnapScroll(!isPopupOpen);

   // Function to toggle popup status
   const handlePopupToggle = (isOpen) => {
    setIsPopupOpen(isOpen);
  };

  return  (
    <>
    <div className="scroll-container" ref={SnapcontainerRef}>
      <div className='hero-wrapper scroll-section'>
          <Navbar scrollContainerRef = {SnapcontainerRef} />
          <Intro />
      </div>
      <div className="scroll-section">
        <About/>
      </div>
      <div className="scroll-section">
        <ProjectGallary onPopupToggle={handlePopupToggle} />
      </div>
      <div className="scroll-section">
        <Contact />
      </div>
    </div>
    </>
  );
}
export default HomePage;

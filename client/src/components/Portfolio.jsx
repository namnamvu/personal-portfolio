import React, { useState } from 'react';

const Portfolio = () => {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitMessage, setSubmitMessage] = useState('');

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitMessage('');

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData)
      });

      if (response.ok) {
        setSubmitMessage('Message sent successfully!');
        setFormData({ name: '', phone: '', message: '' });
      } else {
        setSubmitMessage('Failed to send message. Please try again.');
      }
    } catch (error) {
      setSubmitMessage('Error sending message. Please try again.' + error);
    } finally {
      setIsSubmitting(false);
    }
  };
  return (
    <div className="portfolio-container">
      {/* First Page */}
      <div className="first-page">
        <nav className="nav">
          <h2 className="logo">
            <span style={{ color: 'aqua' }}>Port</span>folio
          </h2>
          <ul className="nav-list">
            <li><a href="https://github.com/namnamvu" target="_blank" rel="noopener noreferrer">GitHub</a></li>
            <li><a href="#gallery">Gallery</a></li>
            <li><a href="#project">Projects</a></li>
            <li><a href="#link-to-contact">Contact</a></li>
          </ul>
        </nav>

        <div className="intro">
          <div className="intro-image">
            <div className="profile-placeholder"></div>
          </div>
          <h1 className="name">NAM VU</h1>
          <h2 className="title">Software engineer</h2>
          <a href="#about-me" className="about-link">About me →</a>
        </div>
      </div>

      {/* About Section */}
      <section className="about" id="about-me">
        <div className="content-box">
          <div className="about-image">
            <div className="coffee-placeholder"></div>
          </div>
          <div className="about-text">
            <h2>Me in a nut-shell ?</h2>
            <p>
              I am a computer science student at Franklin & Marshall College. 
              I have a passion for coding and I love the infinite possibilities 
              that technology provides us.
            </p>
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <section className="project">
        <div className="section-title">
          <h2 id="project">MY PROJECTS</h2>
        </div>

        <div className="box">
          <div className="card">
            <div className="project-placeholder fly-world"></div>
            <h5>Fly-World Game</h5>
            <div className="project-content">
              <p>A java games where users can control the fly to reach home destination while dodging the frogs and spiders</p>
              <a href="https://github.com/namnamvu/FlyWorld" target="_blank" rel="noopener noreferrer">View code</a>
            </div>
          </div>

          <div className="card">
            <div className="project-placeholder meal-plan"></div>
            <h5>MealPlan App</h5>
            <div className="project-content">
              <p>Full-stack MealPlan App that offers F&M students more control and visibility over their meal plan data</p>
              <a href="https://github.com/namnamvu/MealPlanApp" target="_blank" rel="noopener noreferrer">View code</a>
            </div>
          </div>

          <div className="card">
            <div className="project-placeholder testing-framework"></div>
            <h5>Testing Framework</h5>
            <div className="project-content">
              <p>A framework for unit test that has html output. Allow users to define, execute and report tests for any piece of software</p>
              <a href="https://github.com/namnamvu/Test-Framework" target="_blank" rel="noopener noreferrer">View code</a>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="contact-me" id="link-to-contact">
        <div className="section-title">
          <h2>CONTACT ME</h2>
        </div>

        <div className="content-box">
          <div className="contact-card">
            <div className="contact-heading">
              <h3>By Form</h3>
            </div>

            <div className="contact-form">
              <div className="form-container">
                <input
                  type="text"
                  name="name"
                  className="contact-input"
                  placeholder="Name"
                  value={formData.name}
                  onChange={handleInputChange}
                />
                <input
                  type="text"
                  name="phone"
                  className="contact-input"
                  placeholder="Phone number"
                  value={formData.phone}
                  onChange={handleInputChange}
                />
                <textarea
                  name="message"
                  className="contact-input message-input"
                  placeholder="Your message"
                  value={formData.message}
                  onChange={handleInputChange}
                />
                <div className="send">
                  <button
                    onClick={handleSubmit}
                    disabled={isSubmitting || !formData.name || !formData.message}
                    className="send-button"
                  >
                    {isSubmitting ? "SENDING..." : "SEND"}
                  </button>
                </div>
                {submitMessage && (
                  <div className="submit-message">{submitMessage}</div>
                )}
              </div>
            </div>
          </div>

          <div className="contact-card">
            <div className="contact-heading">
              <h3>By other media</h3>
            </div>

            <div className="social-menu">
              <ul>
                <li>
                  <a href="https://www.instagram.com/vptnamnam/" target="_blank" rel="noopener noreferrer">
                    <i className="fab fa-instagram"></i>
                  </a>
                </li>
                <li>
                  <a href="https://www.linkedin.com/in/nam-vu-07a2a3234/" target="_blank" rel="noopener noreferrer">
                    <i className="fab fa-linkedin"></i>
                  </a>
                </li>
                <li>
                  <a href="mailto:vptnam7@gmail.com">
                    <i className="fas fa-envelope"></i>
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      <style jsx>{`
        * {
          padding: 0;
          margin: 0;
          box-sizing: border-box;
          font-family: 'Poppins', sans-serif;
        }

        .portfolio-container {
          overflow-x: hidden;
        }

        .first-page {
          background: linear-gradient(rgba(24, 24, 24, 0.9), rgba(22, 22, 22, 0.4)),
                      linear-gradient(135deg, #1e3c72 0%, #2a5298 100%);
          height: 100vh;
          width: 100vw;
          background-size: cover;
          position: relative;
        }

        .nav {
          display: flex;
          align-items: center;
          justify-content: space-between;
          font-size: 21px;
          padding: 30px 60px 30px 60px;
          font-weight: bold;
        }

        .logo {
          color: white;
          font-size: 38px;
          letter-spacing: 1px;
          font-style: italic;
        }

        .nav-list {
          display: flex;
          list-style: none;
          gap: 25px;
        }

        .nav-list li a {
          color: white;
          text-decoration: none;
          padding: 10px 25px;
          transition: 0.3s;
        }

        .nav-list li a:hover {
          color: aqua;
          border-bottom: 2px solid aqua;
        }

        .intro {
          position: relative;
          height: calc(100vh - 140px);
        }

        .name {
          position: absolute;
          left: 8%;
          top: 50%;
          transform: translateY(-50%);
          letter-spacing: 0.1em;
          color: aqua;
          font-size: 110px;
          font-weight: 600;
        }

        .title {
          position: absolute;
          left: 8%;
          top: 61%;
          transform: translateY(-50%);
          letter-spacing: 0.1em;
          font-size: 32px;
          font-weight: lighter;
          color: white;
        }

        .about-link {
          text-decoration: none;
          color: #15f4ee;
          position: absolute;
          top: 75%;
          left: 8%;
          font-size: 20px;
          border: 2px solid #00e8eb;
          padding: 20px 50px;
          border-radius: 30px;
          transition: 0.4s;
          letter-spacing: 5px;
        }

        .about-link:hover {
          transform: scale(1.1);
          box-shadow: 0 5px 50px 0 #15f4ee inset, 0 5px 50px 0 #15f4ee;
          text-shadow: 0 0 5px 0 #15f4ee;
        }

        .intro-image {
          position: absolute;
          top: 20%;
          left: 59%;
        }

        .profile-placeholder {
          width: 530px;
          height: 530px;
          border-radius: 50%;
          padding: 8px;
          background: linear-gradient(45deg, lightblue, aqua);
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .profile-placeholder::after {
          content: "👨‍💻";
          font-size: 200px;
        }

        .about {
          width: 100%;
          padding: 140px 0;
          background-color: black;
          color: white;
        }

        .about-image {
          flex-shrink: 0;
        }

        .coffee-placeholder {
          width: 500px;
          height: 300px;
          background: linear-gradient(45deg, #8B4513, #D2691E);
          border-radius: 10px;
          filter: brightness(80%);
          box-shadow: 0 0 100px 0 rgb(0, 179, 179);
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .coffee-placeholder::after {
          content: "☕";
          font-size: 80px;
        }

        .about-text {
          width: 600px;
        }

        .content-box {
          width: 1400px;
          max-width: 90%;
          margin: 0 auto;
          display: flex;
          align-items: center;
          justify-content: space-around;
        }

        .content-box h2 {
          font-size: 60px;
          margin-bottom: 20px;
        }

        .content-box p {
          letter-spacing: 1px;
          line-height: 38px;
          font-size: 20px;
          font-weight: lighter;
        }

        .project {
          background-color: black;
          width: 100%;
          padding: 30px 0;
          color: white;
        }

        .section-title h2 {
          color: white;
          font-size: 60px;
          width: 1200px;
          margin: 20px auto;
          text-align: center;
        }

        .box {
          display: flex;
          justify-content: center;
          align-items: center;
          min-height: 400px;
          flex-wrap: wrap;
          gap: 45px;
        }

        .card {
          height: 580px;
          width: 335px;
          background: #191919;
          border-radius: 20px;
          position: relative;
          overflow: hidden;
          box-shadow: 0 0 10px 0 aqua;
        }

        .project-placeholder {
          width: 315px;
          height: 210px;
          border-radius: 20px;
          border: 10px solid white;
          margin: 10px;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 60px;
        }

        .fly-world {
          background: linear-gradient(45deg, #32CD32, #228B22);
        }

        .fly-world::after {
          content: "🪰";
        }

        .meal-plan {
          background: linear-gradient(45deg, #FF6347, #FF4500);
        }

        .meal-plan::after {
          content: "🍽️";
        }

        .testing-framework {
          background: linear-gradient(45deg, #4169E1, #0000CD);
        }

        .testing-framework::after {
          content: "🧪";
        }

        .card h5 {
          font-size: 25px;
          padding-top: 10px;
          margin-bottom: 12px;
          color: aqua;
          text-align: center;
        }

        .project-content p {
          text-align: center;
          padding: 25px 32px;
          font-size: 17px;
          line-height: 30px;
        }

        .project-content a {
          text-decoration: none;
          background-color: #191919;
          color: white;
          border: 2px solid #42FBF2;
          position: absolute;
          border-radius: 20px;
          font-weight: bold;
          transition: 0.4s;
          left: 17%;
          padding: 13px 65px;
          bottom: 30px;
        }

        .project-content a:hover {
          background-color: #42FBF2;
          transform: scale(1.2);
        }

        .contact-me {
          background-color: black;
          width: 100%;
          padding: 60px 0;
          color: white;
        }

        .contact-card {
          margin-top: 10px;
        }

        .contact-heading {
          text-align: center;
          font-size: 30px;
          color: aqua;
          margin-bottom: 50px;
        }

        .contact-form {
          height: 500px;
          width: 505px;
          background: #191919;
          border-radius: 20px;
          margin: 20px;
          position: relative;
          overflow: hidden;
          box-shadow: 0 0 20px 0 rgb(138, 137, 137);
          padding: 50px;
        }

        .form-container {
          padding: 50px;
        }

        .contact-input {
          width: 400px;
          height: 50px;
          margin-bottom: 30px;
          padding: 10px;
          border-radius: 14px;
          font-size: 15px;
          border: 1px solid #ccc;
        }

        .message-input {
          height: 150px;
          resize: vertical;
        }

        .send {
          text-align: center;
          margin-top: 20px;
        }

        .send-button {
          font-size: 20px;
          border: 2px solid #00e8eb;
          padding: 15px 50px;
          border-radius: 30px;
          transition: 0.4s;
          background-color: #191919;
          color: #15f4ee;
          letter-spacing: 5px;
          cursor: pointer;
        }

        .send-button:hover:not(:disabled) {
          transform: scale(1.1);
          box-shadow: 0 0 10px 0 #15f4ee;
        }

        .send-button:disabled {
          opacity: 0.6;
          cursor: not-allowed;
        }

        .submit-message {
          text-align: center;
          margin-top: 20px;
          padding: 10px;
          border-radius: 5px;
          background-color: #15f4ee;
          color: black;
        }

        .social-menu {
          height: 510px;
          width: 555px;
          margin: 20px;
          margin-left: 58px;
          display: flex;
          justify-content: center;
          align-items: center;
        }

        .social-menu ul {
          display: flex;
          list-style: none;
          gap: 30px;
        }

        .social-menu ul li a {
          display: block;
          width: 80px;
          height: 80px;
          background-color: white;
          text-align: center;
          border-radius: 10px;
          box-shadow: 0 0 10px 5px #15f4ee;
          transition: 0.4s;
          text-decoration: none;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .social-menu ul li a:hover {
          transform: scale(1.1);
          box-shadow: 0 0 20px 10px #15f4ee;
        }

        .social-menu ul li i {
          font-size: 40px;
          color: black;
        }

        @media (max-width: 1200px) {
          .name {
            font-size: 80px;
          }
          
          .intro-image {
            left: 55%;
          }
          
          .profile-placeholder {
            width: 400px;
            height: 400px;
          }
        }

        @media (max-width: 768px) {
          .nav {
            flex-direction: column;
            gap: 20px;
          }
          
          .nav-list {
            flex-wrap: wrap;
            justify-content: center;
          }
          
          .name {
            font-size: 60px;
            left: 5%;
          }
          
          .title {
            left: 5%;
          }
          
          .about-link {
            left: 5%;
          }
          
          .intro-image {
            position: relative;
            left: 50%;
            transform: translateX(-50%);
            top: 10%;
          }
          
          .box {
            flex-direction: column;
          }
          
          .content-box {
            flex-direction: column;
            gap: 50px;
          }
        }
      `}</style>

      {/* Font Awesome for icons */}
      <link
        rel="stylesheet"
        href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.1.1/css/all.min.css"
        integrity="sha512-KfkfwYDsLkIlwQp6LFnl8zNdLGxu9YAA1QvwINks4PhcElQSvqcyVLLD9aMhXd13uQjoXtEKNosOWaZqXgel0g=="
        crossOrigin="anonymous"
        referrerPolicy="no-referrer"
      />
      
      {/* Google Fonts */}
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="true" />
      <link
        href="https://fonts.googleapis.com/css2?family=Poppins:wght@400;700&display=swap"
        rel="stylesheet"
      />
      <link
        href="https://fonts.googleapis.com/css2?family=Arima:wght@200;600&display=swap"
        rel="stylesheet"
      />
    </div>
  );
};

export default Portfolio;
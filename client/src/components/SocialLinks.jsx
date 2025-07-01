import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faInstagram,
  faLinkedin
} from '@fortawesome/free-brands-svg-icons';
import { faEnvelope } from '@fortawesome/free-solid-svg-icons';

const SocialLinks = () => (
  <div className="social-holder">
    <div className="social-column">
        <div className="contact-heading">
        <h3>Other media</h3>
        </div>
        <div className="social-menu">
        <ul>
            <li>
            <a
                href="https://www.instagram.com/vptnamnam/"
                target="_blank"
                rel="noopener noreferrer"
            >
                <FontAwesomeIcon icon={faInstagram} />
            </a>
            </li>
            <li>
            <a
                href="https://www.linkedin.com/in/nam-vu-07a2a3234/"
                target="_blank"
                rel="noopener noreferrer"
            >
                <FontAwesomeIcon icon={faLinkedin} />
            </a>
            </li>
            <li>
            <a href="mailto:vptnam7@gmail.com">
                <FontAwesomeIcon icon={faEnvelope} />
            </a>
            </li>
        </ul>
        </div>
    </div>
  </div>
);

export default SocialLinks;

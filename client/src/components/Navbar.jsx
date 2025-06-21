import React from 'react';

const Navbar = () => (
  <nav className="navbar">
    <h2 className="logo"><span className="aqua">Port</span>folio</h2>
    <ul className="nav-links">
      <li><a href="https://github.com/namnamvu" target="_blank">GitHub</a></li>
      <li><a href="images/me1.jpg" target="_blank">Gallery</a></li>
      <li><a href="#project">Projects</a></li>
      <li><a href="#link-to-contact">Contact</a></li>
    </ul>
  </nav>
);

export default Navbar;

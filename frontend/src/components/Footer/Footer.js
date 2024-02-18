import React from 'react';
import './footer.css';

const Footer = () => {
  return (
    <footer className="footer">
      <ul>
        <li><a href="/">Home</a></li>
        <li><a href="/about">About</a></li>
        <li><a href="/contact">Contact</a></li>
      </ul>
      <p>&copy; {new Date().getFullYear()} My Website. All rights reserved.</p>
    </footer>
  );
};

export default Footer;

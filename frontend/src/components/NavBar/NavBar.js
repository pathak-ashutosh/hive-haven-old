import React from 'react';
import { Link } from 'react-router-dom'; // Import Link from react-router-dom
import './navbar.css';

const Navbar = () => {
  return (
    <nav className="navbar">
      <Link to="/" className="navbar__logo">Logo</Link> {/* Use Link component instead of anchor tag */}
      <ul className="navbar__menu">
        <li className="navbar__item"><Link to="/signup" className="navbar__link">Sign up</Link></li> {/* Use Link component */}
        <li className="navbar__item"><Link to="/login" className="navbar__link">Log in</Link></li> {/* Use Link component */}
      </ul>
    </nav>
  );
};

export default Navbar;

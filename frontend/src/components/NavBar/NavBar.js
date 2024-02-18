import React from 'react';
import { Link } from 'react-router-dom'; 
import './navbar.css';

const Navbar = () => {
  return (
    <nav className="navbar">
      <Link to="/" className="navbar__logo">SA</Link> 
      <ul className="navbar__menu">
        <li className="navbar__item"><Link to="/register" className="navbar__link">Register</Link></li>
        <li className="navbar__item"><Link to="/login" className="navbar__link">Log In</Link></li>
      </ul>
    </nav>
  );
};

export default Navbar;

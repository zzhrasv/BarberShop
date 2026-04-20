import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, Scissors, User } from 'lucide-react';
import './Navbar.css';
import logo from '../assets/logo.png';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  const toggleMenu = () => setIsOpen(!isOpen);

  return (
    <nav className="navbar">
      <div className="container navbar-container">
        <Link to="/" className="navbar-logo">
          <div className="logo-wrapper">
            <img src={logo} alt="EG'NIN Logo" className="navbar-logo-img" />
          </div>
          <span>EG'NIN <span className="text-accent">BARBERSHOP</span></span>
        </Link>

        <div className={`navbar-links ${isOpen ? 'active' : ''}`}>
          <Link to="/" className={`nav-link ${location.pathname === '/' ? 'active' : ''}`} onClick={toggleMenu}>HOME</Link>
          <Link to="/services" className={`nav-link ${location.pathname === '/services' ? 'active' : ''}`} onClick={toggleMenu}>SERVICES & PRICE</Link>
          <Link to="/catalog" className={`nav-link ${location.pathname === '/catalog' ? 'active' : ''}`} onClick={toggleMenu}>CATALOG</Link>
          <Link to="/membership" className={`nav-link ${location.pathname === '/membership' ? 'active' : ''}`} onClick={toggleMenu}>MEMBERSHIP</Link>
          <Link to="/booking" className={`nav-link ${location.pathname === '/booking' ? 'active' : ''}`} onClick={toggleMenu}>BOOK NOW</Link>
          <Link to="/admin" className={`nav-link admin-link ${location.pathname.startsWith('/admin') ? 'active' : ''}`} onClick={toggleMenu}>
            <User size={18} />
            <span>ADMIN</span>
          </Link>
        </div>

        <button className="navbar-toggle" onClick={toggleMenu}>
          {isOpen ? <X /> : <Menu />}
        </button>
      </div>
    </nav>
  );
};

export default Navbar;

import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Menu, X, Scissors } from 'lucide-react';
import './Navbar.css';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => setIsOpen(!isOpen);

  return (
    <nav className="navbar">
      <div className="container navbar-container">
        <Link to="/" className="navbar-logo">
          <Scissors className="logo-icon" />
          <span>EG'NIN <span className="text-accent">BARBERSHOP</span></span>
        </Link>
        
        <div className={`navbar-links ${isOpen ? 'active' : ''}`}>
          <Link to="/" onClick={toggleMenu}>Home</Link>
          <Link to="/services" onClick={toggleMenu}>Services & Price</Link>
          <Link to="/catalog" onClick={toggleMenu}>Catalog</Link>
          <Link to="/membership" onClick={toggleMenu}>Membership</Link>
          <Link to="/booking" className="btn btn-primary" onClick={toggleMenu}>Book Now</Link>
        </div>

        <button className="navbar-toggle" onClick={toggleMenu}>
          {isOpen ? <X /> : <Menu />}
        </button>
      </div>
    </nav>
  );
};

export default Navbar;

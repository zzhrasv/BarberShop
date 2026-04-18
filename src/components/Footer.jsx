import React from 'react';
import { MapPin, Phone, Camera, Clock } from 'lucide-react';
import './Footer.css';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-grid">
          <div className="footer-brand">
            <h3 className="footer-logo">EG'NIN <span className="text-accent">BARBERSHOP</span></h3>
            <p className="footer-est">Premium Grooming Experience<br/>Sejak 2020</p>
          </div>
          
          <div className="footer-contact">
            <h4>Contact Us</h4>
            <div className="contact-item">
              <Phone className="contact-icon" size={18} />
              <span>0858 9470 0706</span>
            </div>
            <div className="contact-item">
              <Camera className="contact-icon" size={18} />
              <span>@egninbarber.ind2</span>
            </div>
          </div>

          <div className="footer-hours">
            <h4>Opening Hours</h4>
            <div className="hours-item">
              <Clock className="contact-icon" size={18} />
              <span>Senin - Minggu<br/>10.00 - 21.00 WIB</span>
            </div>
          </div>
        </div>
        
        <div className="footer-bottom">
          <p>&copy; {new Date().getFullYear()} EG'NIN Barbershop. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

import { MapPin, Phone, Camera, Clock } from 'lucide-react';
import { Link } from 'react-router-dom';
import './Footer.css';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-grid">
          <div className="footer-brand">
            <div className="footer-logo-container">
              <img src="/src/assets/logo.png" alt="Logo" className="footer-logo-img" />
              <h3 className="footer-logo">EG'NIN <span className="text-accent">BARBERSHOP</span></h3>
            </div>
            <p className="footer-est">Premium Grooming Experience<br/>Sejak 2021</p>
            <div className="contact-item" style={{ marginTop: '0.5rem' }}>
              <MapPin className="contact-icon" size={18} />
              <span style={{ fontSize: '0.85rem', lineHeight: '1.5' }}>
                Jl. KH. Ahmad Dahlan, Dusun III, Dukuhwaluh, Kec. Kembaran, Kabupaten Banyumas, Jawa Tengah 53182
              </span>
            </div>
          </div>

          <div className="footer-links">
            <h4>Quick Links</h4>
            <ul>
              <li><Link to="/">Home</Link></li>
              <li><Link to="/services">Services & Price</Link></li>
              <li><Link to="/catalog">Catalog</Link></li>
              <li><Link to="/membership">Membership</Link></li>
              <li><Link to="/admin">Dashboard Admin</Link></li>
              <li><Link to="/booking">Book Now</Link></li>
            </ul>
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

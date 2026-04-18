import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Star, Shield, Clock } from 'lucide-react';
import './Home.css';

const Home = () => {
  return (
    <div className="home">
      {/* Hero Section */}
      <section className="hero">
        <div className="hero-overlay"></div>
        <div className="container hero-content animate-fade-in">
          <span className="hero-subtitle">SEJAK 2020</span>
          <h1 className="hero-title">Experience <span className="text-accent">Premium</span> Grooming</h1>
          <p className="hero-description">
            Lebih dari sekadar potong rambut. EG'NIN Barbershop memberikan pengalaman grooming terbaik dengan standar kualitas tinggi untuk gaya hidup Anda.
          </p>
          <div className="hero-actions">
            <Link to="/booking" className="btn btn-primary">Book Appointment</Link>
            <Link to="/services" className="btn btn-outline">View Services</Link>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="features section">
        <div className="container">
          <div className="grid grid-cols-3">
            <div className="feature-card">
              <div className="feature-icon-wrapper">
                <Star className="feature-icon" />
              </div>
              <h3>Premium Quality</h3>
              <p>Layanan berkualitas dengan kapster profesional dan berpengalaman.</p>
            </div>
            <div className="feature-card">
              <div className="feature-icon-wrapper">
                <Shield className="feature-icon" />
              </div>
              <h3>Exclusive Member</h3>
              <p>Dapatkan berbagai keuntungan dengan bergabung menjadi member eksklusif kami.</p>
            </div>
            <div className="feature-card">
              <div className="feature-icon-wrapper">
                <Clock className="feature-icon" />
              </div>
              <h3>Easy Booking</h3>
              <p>Sistem booking online yang memudahkan Anda mengatur jadwal kunjungan.</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;

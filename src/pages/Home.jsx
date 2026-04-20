import React, { useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowRight, Star, Shield, Clock, Quote } from 'lucide-react';
import bgPage from '../assets/bg-page.png';
import './Home.css';

const Home = () => {
  const navigate = useNavigate();

  const handleRipple = useCallback((e, path) => {
    const btn = e.currentTarget;
    const circle = document.createElement('span');
    const diameter = Math.max(btn.clientWidth, btn.clientHeight);
    const rect = btn.getBoundingClientRect();
    circle.style.cssText = `
      width: ${diameter}px;
      height: ${diameter}px;
      left: ${e.clientX - rect.left - diameter / 2}px;
      top: ${e.clientY - rect.top - diameter / 2}px;
    `;
    circle.classList.add('ripple');
    btn.querySelector('.ripple')?.remove();
    btn.appendChild(circle);
    setTimeout(() => navigate(path), 300);
  }, [navigate]);

  const testimonials = [
    {
      id: 1,
      name: "Budi Santoso",
      role: "Member Reguler",
      review: "Pelayanan sangat memuaskan, potongannya rapi dan kapster sangat ramah. Bakal jadi langganan terus di EG'NIN!",
      rating: 5
    },
    {
      id: 2,
      name: "Andi Wijaya",
      role: "VIP Member",
      review: "Tempatnya nyaman, bersih, dan premium. Hasil potongan sangat sesuai dengan ekspektasi. Sangat direkomendasikan.",
      rating: 5
    },
    {
      id: 3,
      name: "Reza Pahlevi",
      role: "Customer",
      review: "Suka banget sama Reborn Package. Pijat kepalanya bikin relaksasi maksimal setelah capek kerja seharian.",
      rating: 5
    }
  ];

  return (
    <div className="home">
      {/* Hero Section */}
      <section className="hero" style={{ backgroundImage: `url(${bgPage})` }}>
        <div className="hero-overlay"></div>
        <div className="container hero-content animate-fade-in">
          <span className="hero-subtitle">SEJAK 2021</span>
          <h1 className="hero-title">Experience <span className="text-accent">Premium</span> Grooming</h1>
          <p className="hero-description">
            Lebih dari sekadar potong rambut. EG'NIN Barbershop memberikan pengalaman grooming terbaik dengan standar kualitas tinggi untuk gaya hidup Anda.
          </p>
          <div className="hero-actions">
            <button
              id="btn-book-appointment"
              className="btn btn-outline btn-ripple"
              onClick={(e) => handleRipple(e, '/booking')}
            >
              Book Appointment
            </button>
            <button
              id="btn-view-services"
              className="btn btn-outline btn-ripple"
              onClick={(e) => handleRipple(e, '/services')}
            >
              View Services
            </button>
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

      {/* Testimonials Section */}
      <section className="testimonials section">
        <div className="container">
          <div className="text-center" style={{ marginBottom: '3rem' }}>
            <h2 style={{ fontSize: '2.5rem', marginBottom: '1rem' }}>
              Apa Kata <span className="text-accent">Mereka?</span>
            </h2>
            <p className="text-secondary">Testimoni dari pelanggan setia EG'NIN Barbershop</p>
          </div>

          <div className="grid grid-cols-3">
            {testimonials.map((testimonial) => (
              <div key={testimonial.id} className="testimonial-card">
                <Quote className="quote-icon" size={40} />
                <div className="rating-stars">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} size={16} className="star-icon" fill="currentColor" />
                  ))}
                </div>
                <p className="testimonial-review">"{testimonial.review}"</p>
                <div className="testimonial-author">
                  <div className="author-avatar">
                    {testimonial.name.charAt(0)}
                  </div>
                  <div className="author-info">
                    <h4>{testimonial.name}</h4>
                    <span>{testimonial.role}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;

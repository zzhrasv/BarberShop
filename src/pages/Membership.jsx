import React from 'react';
import { Crown, CheckCircle } from 'lucide-react';
import './Membership.css';
import { Link } from 'react-router-dom';

const Membership = () => {
  const benefits = [
    "Prioritas Booking (Bebas antri)",
    "Diskon khusus untuk semua layanan",
    "Minuman gratis saat kunjungan",
    "Update gaya rambut terbaru",
    "Promo eksklusif di hari ulang tahun"
  ];

  return (
    <div className="membership-page section">
      <div className="container">
        <div className="text-center" style={{ marginBottom: '4rem' }}>
          <h1 className="animate-fade-in">Exclusive <span className="text-accent">Membership</span></h1>
          <p className="text-secondary">Tingkatkan pengalaman grooming Anda dengan bergabung menjadi member eksklusif.</p>
        </div>

        <div className="membership-card-container animate-fade-in">
          <div className="membership-card">
            <div className="membership-header">
              <Crown className="membership-icon" size={48} />
              <h2>VIP Member</h2>
              <div className="membership-price">
                <span className="currency">Rp</span>
                <span className="amount">285.000</span>
                <span className="period">/ 1 Tahun</span>
              </div>
            </div>
            
            <div className="membership-body">
              <ul className="benefits-list">
                {benefits.map((benefit, index) => (
                  <li key={index}>
                    <CheckCircle className="benefit-icon" size={20} />
                    <span>{benefit}</span>
                  </li>
                ))}
              </ul>
              
              <div className="membership-action">
                <Link to="/booking" className="btn btn-primary" style={{ width: '100%' }}>
                  Daftar Sekarang
                </Link>
                <p className="membership-note">*Pendaftaran juga dapat dilakukan langsung di barbershop kami.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Membership;

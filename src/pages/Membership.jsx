import React, { useState } from 'react';
import { Crown, CheckCircle, Check, Loader2 } from 'lucide-react';
import './Membership.css';
import axios from 'axios';

const Membership = () => {
  const benefits = [
    "Prioritas Booking (Bebas antri)",
    "Diskon khusus untuk semua layanan",
    "Minuman gratis saat kunjungan",
    "Update gaya rambut terbaru",
    "Promo eksklusif di hari ulang tahun"
  ];

  const [formData, setFormData] = useState({
    name: '',
    phoneNumber: '',
    email: '',
    packageType: 'VIP Member'
  });
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // Create member via API
      await axios.post('/api/memberships', formData);
      setShowSuccess(true);
      setTimeout(() => setShowSuccess(false), 5000);
      setFormData({ ...formData, name: '', phoneNumber: '', email: '' });
    } catch (error) {
      console.error('Failed to submit membership:', error);
      alert('Terjadi kesalahan saat mendaftar. Silakan coba lagi.');
    } finally {
      setIsSubmitting(false);
    }
  };

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
              
              <div className="membership-form-container">
                <h3 style={{ marginBottom: '1rem', textAlign: 'center' }}>Form Pendaftaran</h3>
                <form className="booking-form" onSubmit={handleSubmit}>
                  <div className="form-group">
                    <label className="form-label">Nama Lengkap</label>
                    <input 
                      type="text" 
                      name="name" 
                      className="form-control"
                      value={formData.name} 
                      onChange={handleInputChange} 
                      placeholder="Masukkan nama lengkap" 
                      required 
                    />
                  </div>
                  
                  <div className="form-group">
                    <label className="form-label">Nomor WhatsApp</label>
                    <input 
                      type="tel" 
                      name="phoneNumber"
                      className="form-control" 
                      value={formData.phoneNumber} 
                      onChange={handleInputChange} 
                      placeholder="Contoh: 081234567890" 
                      required 
                    />
                  </div>

                  <div className="form-group">
                    <label className="form-label">Email</label>
                    <input 
                      type="email" 
                      name="email" 
                      className="form-control"
                      value={formData.email} 
                      onChange={handleInputChange} 
                      placeholder="Contoh: nama@email.com" 
                      required 
                    />
                  </div>
                  
                  <button type="submit" className="btn btn-primary" style={{ width: '100%', marginTop: '1rem' }} disabled={isSubmitting}>
                    {isSubmitting ? (
                      <span style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem' }}>
                        <Loader2 className="animate-spin" size={20} />
                        Memproses...
                      </span>
                    ) : (
                      'Daftar Sekarang'
                    )}
                  </button>
                </form>
              </div>

              {/* Success Notification matching Booking style */}
              {showSuccess && (
                <div className="success-notification animate-fade-in" style={{ marginTop: '2rem' }}>
                  <div className="success-icon-wrapper">
                    <Check className="success-icon" />
                  </div>
                  <h3>Pendaftaran Berhasil!</h3>
                  <p>Terima kasih telah bergabung. Tim kami akan segera menghubungi Anda melalui WhatsApp untuk proses verifikasi dan pembayaran.</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Membership;

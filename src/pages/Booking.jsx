import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Calendar, Clock, User, Phone, CheckCircle } from 'lucide-react';
import './Booking.css';

const Booking = () => {
  const [services, setServices] = useState([]);
  const [formData, setFormData] = useState({
    customerName: '',
    phoneNumber: '',
    bookingDate: '',
    bookingTime: '',
    serviceId: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchServices = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/services');
        setServices(response.data);
      } catch (error) {
        console.error('Error fetching services:', error);
      }
    };
    fetchServices();
  }, []);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError('');

    try {
      await axios.post('http://localhost:5000/api/bookings', formData);
      setIsSuccess(true);
      setFormData({
        customerName: '',
        phoneNumber: '',
        bookingDate: '',
        bookingTime: '',
        serviceId: ''
      });
    } catch (err) {
      setError('Terjadi kesalahan saat memproses booking Anda. Silakan coba lagi.');
      console.error(err);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isSuccess) {
    return (
      <div className="booking-page section">
        <div className="container text-center animate-fade-in">
          <CheckCircle size={80} className="text-accent" style={{ margin: '0 auto 2rem' }} />
          <h1>Booking <span className="text-accent">Berhasil!</span></h1>
          <p className="text-secondary" style={{ maxWidth: '600px', margin: '0 auto 2rem' }}>
            Terima kasih telah melakukan booking. Kami akan segera menghubungi Anda melalui nomor telepon yang terdaftar untuk konfirmasi lebih lanjut.
          </p>
          <button className="btn btn-primary" onClick={() => setIsSuccess(false)}>
            Buat Booking Baru
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="booking-page section">
      <div className="container">
        <div className="text-center" style={{ marginBottom: '3rem' }}>
          <h1 className="animate-fade-in">Book Your <span className="text-accent">Appointment</span></h1>
          <p className="text-secondary">Pesan jadwal Anda sekarang untuk pengalaman grooming terbaik.</p>
        </div>

        <div className="booking-form-container animate-fade-in">
          {error && <div className="error-message">{error}</div>}
          
          <form className="booking-form" onSubmit={handleSubmit}>
            <div className="form-group">
              <label className="form-label" htmlFor="customerName">
                <User size={16} /> Nama Lengkap
              </label>
              <input
                type="text"
                id="customerName"
                name="customerName"
                className="form-control"
                placeholder="Masukkan nama lengkap Anda"
                value={formData.customerName}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-group">
              <label className="form-label" htmlFor="phoneNumber">
                <Phone size={16} /> Nomor Telepon / WA
              </label>
              <input
                type="tel"
                id="phoneNumber"
                name="phoneNumber"
                className="form-control"
                placeholder="08xxxxxxxxxx"
                value={formData.phoneNumber}
                onChange={handleChange}
                required
              />
            </div>

            <div className="grid grid-cols-2">
              <div className="form-group">
                <label className="form-label" htmlFor="bookingDate">
                  <Calendar size={16} /> Tanggal Booking
                </label>
                <input
                  type="date"
                  id="bookingDate"
                  name="bookingDate"
                  className="form-control"
                  value={formData.bookingDate}
                  onChange={handleChange}
                  min={new Date().toISOString().split('T')[0]}
                  required
                />
              </div>

              <div className="form-group">
                <label className="form-label" htmlFor="bookingTime">
                  <Clock size={16} /> Jam (10:00 - 21:00)
                </label>
                <input
                  type="time"
                  id="bookingTime"
                  name="bookingTime"
                  className="form-control"
                  value={formData.bookingTime}
                  onChange={handleChange}
                  min="10:00"
                  max="21:00"
                  required
                />
              </div>
            </div>

            <div className="form-group">
              <label className="form-label" htmlFor="serviceId">
                Layanan
              </label>
              <select
                id="serviceId"
                name="serviceId"
                className="form-control"
                value={formData.serviceId}
                onChange={handleChange}
                required
              >
                <option value="" disabled>Pilih layanan...</option>
                {services.map((service) => (
                  <option key={service.id} value={service.id}>
                    {service.name} - Rp {service.price.toLocaleString('id-ID')}
                  </option>
                ))}
              </select>
            </div>

            <button type="submit" className="btn btn-primary" style={{ width: '100%', marginTop: '1rem' }} disabled={isSubmitting}>
              {isSubmitting ? 'Memproses...' : 'Konfirmasi Booking'}
            </button>
            <p className="text-secondary text-center" style={{ fontSize: '0.85rem', marginTop: '1.5rem' }}>
              *Pembayaran dilakukan di tempat (Kasir). Tambahan +1K untuk pembayaran via QRIS.
            </p>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Booking;

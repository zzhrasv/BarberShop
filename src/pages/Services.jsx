import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Check } from 'lucide-react';
import './Services.css';

const Services = () => {
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchServices = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/services');
        setServices(response.data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching services:', error);
        setLoading(false);
      }
    };

    fetchServices();
  }, []);

  const formatPrice = (price) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0
    }).format(price);
  };

  return (
    <div className="services-page section">
      <div className="container">
        <div className="text-center" style={{ marginBottom: '3rem' }}>
          <h1 className="animate-fade-in">Service <span className="text-accent">&</span> Price List</h1>
          <p className="text-secondary">*Pricelist +1K untuk payment via QRIS</p>
        </div>

        {loading ? (
          <div className="text-center"><p>Loading services...</p></div>
        ) : (
          <div className="services-grid">
            {services.map((service) => (
              <div key={service.id} className="service-card animate-fade-in">
                <div className="service-header">
                  <h3>{service.name}</h3>
                  <div className="service-price">{formatPrice(service.price)}</div>
                </div>
                {service.description && (
                  <ul className="service-details">
                    {service.description.split(',').map((detail, index) => (
                      <li key={index}>
                        <Check size={16} className="text-accent" />
                        <span>{detail.trim()}</span>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Services;

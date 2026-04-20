import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Check } from 'lucide-react';
import './Services.css';

const STATIC_SERVICES = [
  {
    id: 1,
    name: 'Reguler Haircut',
    price: 30000,
    description: 'Haircut,Wash,Hairtonic,Styling tanpa produk',
  },
  {
    id: 2,
    name: 'Premium Haircut',
    price: 40000,
    description: 'Haircut,Wash,Hairtonic,Head massage,Vitamin rambut,Styling produk',
  },
  {
    id: 3,
    name: 'Reborn Package',
    price: 55000,
    description: 'Haircut,Wash,Hairtonic,Hot towel,Head massage,Vitamin,Styling produk',
  },
  {
    id: 4,
    name: 'Colouring Basic',
    price: 80000,
    description: 'Basic Hair Colouring',
  },
  {
    id: 5,
    name: 'Colouring Fashion',
    price: 165000,
    description: 'Fashion Hair Colouring (Start from)',
  },
  {
    id: 6,
    name: 'Creambath',
    price: 40000,
    description: 'Creambath Treatment',
  },
  {
    id: 7,
    name: 'Shaving',
    price: 10000,
    description: 'Beard / Mustache Shaving',
  },
  {
    id: 8,
    name: 'Perming',
    price: 100000,
    description: 'Hair Perming (Est. Price)',
  },
  {
    id: 9,
    name: 'Kids Haircut',
    price: 25000,
    description: 'Haircut,Wash,Hairtonic',
  },
];

const Services = () => {
  const [services, setServices] = useState(STATIC_SERVICES);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchServices = async () => {
      try {
        const response = await axios.get('/api/services');
        if (response.data && response.data.length > 0) {
          setServices(response.data);
        }
      } catch (error) {
        // Gunakan data statis jika API gagal
        console.warn('API tidak tersedia, menggunakan data lokal.');
      } finally {
        setLoading(false);
      }
    };

    fetchServices();
  }, []);

  const formatPrice = (price) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0,
    }).format(price);
  };

  return (
    <div className="services-page section">
      <div className="container">
        <div className="text-center" style={{ marginBottom: '3rem' }}>
          <h1 className="animate-fade-in">
            Service <span className="text-accent">&</span> Price List
          </h1>
          <p className="text-secondary">*Pricelist +1K untuk payment via QRIS</p>
        </div>

        {loading ? (
          <div className="text-center">
            <p>Loading services...</p>
          </div>
        ) : (
          <div className="services-grid">
            {services.map((service, idx) => (
              <div
                key={service.id}
                className="service-card animate-fade-in"
                style={{ animationDelay: `${idx * 0.08}s` }}
              >
                <div className="service-header">
                  <h3>{service.name}</h3>
                  <div className="service-price">{formatPrice(service.price)}</div>
                </div>
                {service.description && (
                  <ul className="service-details">
                    {service.description.split(',').map((detail, index) => (
                      <li key={index}>
                        <Check size={15} className="text-accent" />
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

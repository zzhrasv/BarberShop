import React from 'react';
import './Catalog.css';

const Catalog = () => {
  // Generate 12 placeholders
  const models = Array.from({ length: 12 }, (_, i) => ({
    id: i + 1,
    title: `Model Style ${i + 1}`,
    image: `https://via.placeholder.com/400x500/1a1a1a/f5b915?text=Style+${i + 1}`
  }));

  return (
    <div className="catalog-page section">
      <div className="container">
        <div className="text-center" style={{ marginBottom: '3rem' }}>
          <h1 className="animate-fade-in">Haircut <span className="text-accent">Catalog</span></h1>
          <p className="text-secondary">Temukan gaya rambut terbaik yang sesuai dengan karakter Anda.</p>
        </div>

        <div className="catalog-grid">
          {models.map((model) => (
            <div key={model.id} className="catalog-card animate-fade-in">
              <div className="catalog-image-wrapper">
                <img src={model.image} alt={model.title} className="catalog-image" />
                <div className="catalog-overlay">
                  <span className="catalog-title">{model.title}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Catalog;

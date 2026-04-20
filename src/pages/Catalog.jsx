import React from 'react';
import './Catalog.css';
import buzzCut from '../assets/buzz-cut.png';
import commaHair from '../assets/comma-hair.png';
import crewcut from '../assets/crewcut.png';
import dropFade from '../assets/drop-fade.png';
import lowFade from '../assets/low-fade.png';
import messyWaves from '../assets/messywaves.png';
import midFade from '../assets/mid-fade.png';
import modernMullet from '../assets/modern-mullet.png';
import slickBack from '../assets/slickback.png';
import taperFade from '../assets/taperfade.png';
import twoBlock from '../assets/two-block.png';
import underCut from '../assets/under-cut.png';

const Catalog = () => {
  const models = [
    { id: 1,  title: 'Buzz Cut',       image: buzzCut },
    { id: 2,  title: 'Comma Hair',     image: commaHair },
    { id: 3,  title: 'Crew Cut',       image: crewcut },
    { id: 4,  title: 'Drop Fade',      image: dropFade },
    { id: 5,  title: 'Low Fade',       image: lowFade },
    { id: 6,  title: 'Messy Waves',    image: messyWaves },
    { id: 7,  title: 'Mid Fade',       image: midFade },
    { id: 8,  title: 'Modern Mullet',  image: modernMullet },
    { id: 9,  title: 'Slick Back',     image: slickBack },
    { id: 10, title: 'Taper Fade',     image: taperFade },
    { id: 11, title: 'Two Block',      image: twoBlock },
    { id: 12, title: 'Under Cut',      image: underCut },
  ];

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

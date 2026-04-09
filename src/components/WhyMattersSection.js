import React from 'react';
import { Checkmark } from '@carbon/icons-react';
import './WhyMattersSection.scss';

const WhyMattersSection = ({ whyThisMatters }) => {
  const lenses = [
    { key: 'architecture', icon: '🏗️' },
    { key: 'offer', icon: '📦' },
    { key: 'business', icon: '💼' }
  ];

  return (
    <section className="why-matters-section">
      <div className="why-matters-container">
        <div className="why-matters-header">
          <h2>Why this matters</h2>
          <p className="why-matters-subtitle">
            Three practical lenses for understanding impact and relevance
          </p>
        </div>

        <div className="why-matters-grid">
          {lenses.map((lens) => {
            const data = whyThisMatters[lens.key];
            return (
              <div key={lens.key} className="matters-card">
                <div className="matters-icon">{lens.icon}</div>
                <h3 className="matters-title">{data.title}</h3>
                <ul className="matters-list">
                  {data.points.map((point, index) => (
                    <li key={index} className="matters-item">
                      <Checkmark className="matters-check" />
                      <span>{point}</span>
                    </li>
                  ))}
                </ul>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default WhyMattersSection;

// Made with Bob

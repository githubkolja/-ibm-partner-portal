import React from 'react';
import { Tile } from '@carbon/react';
import { ArrowRight } from '@carbon/icons-react';
import './ActivateSection.scss';

const ActivateSection = ({ activationPaths }) => {
  const getIcon = (title) => {
    switch (title) {
      case 'Sales plays':
        return '🎯';
      case 'Technical enablement':
        return '🔧';
      case 'Training':
        return '📚';
      case 'Partner programs':
        return '🤝';
      default:
        return '📋';
    }
  };

  return (
    <section className="activate-section">
      <div className="activate-container">
        <div className="activate-header">
          <h2>Activate now</h2>
          <p className="activate-subtitle">
            Four pathways to turn insights into action
          </p>
          <p className="activate-note">
            Use this brief to find the right next step quickly; detailed assets remain in the corresponding IBM partner platforms.
          </p>
        </div>

        <div className="activate-grid">
          {activationPaths.map((path, index) => (
            <Tile
              key={index}
              className="activate-tile"
              onClick={() => path.url && window.open(path.url, '_blank')}
              style={{ cursor: path.url ? 'pointer' : 'default' }}
            >
              <div className="tile-icon">{getIcon(path.title)}</div>
              <h3 className="tile-title">{path.title}</h3>
              <p className="tile-description">{path.description}</p>
              <div className="tile-audience">
                <span className="audience-label">For:</span>
                <span className="audience-value">{path.audience}</span>
              </div>
              <div className="tile-cta">
                <span className="cta-text">{path.cta}</span>
                <ArrowRight className="cta-icon" />
              </div>
            </Tile>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ActivateSection;

// Made with Bob

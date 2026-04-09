import React from 'react';
import { Button } from '@carbon/react';
import { ArrowRight } from '@carbon/icons-react';
import './StrategicThemesSection.scss';

const StrategicThemesSection = ({ strategicThemes }) => {
  return (
    <section className="strategic-themes-section">
      <div className="themes-container">
        <div className="themes-header">
          <h2>Strategic themes</h2>
          <p className="themes-subtitle">
            Key focus areas across IBM Automation and Data & AI portfolios
          </p>
        </div>

        <div className="themes-columns">
          <div className="themes-column automation">
            <div className="column-header">
              <h3>IBM Automation</h3>
              <div className="column-icon">⚙️</div>
            </div>
            <div className="themes-list">
              {strategicThemes.automation.map((theme, index) => (
                <div key={index} className="theme-card">
                  <h4 className="theme-title">{theme.title}</h4>
                  
                  <div className="theme-section">
                    <div className="theme-label">IBM POV</div>
                    <p className="theme-text">{theme.ibmPov}</p>
                  </div>

                  <div className="theme-section">
                    <div className="theme-label">Partner value</div>
                    <p className="theme-text">{theme.partnerValue}</p>
                  </div>

                  <div className="theme-cta">
                    <Button
                      kind="ghost"
                      size="sm"
                      renderIcon={ArrowRight}
                    >
                      {theme.cta}
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="themes-column data-ai">
            <div className="column-header">
              <h3>IBM Data & AI</h3>
              <div className="column-icon">🤖</div>
            </div>
            <div className="themes-list">
              {strategicThemes.dataAI.map((theme, index) => (
                <div key={index} className="theme-card">
                  <h4 className="theme-title">{theme.title}</h4>
                  
                  <div className="theme-section">
                    <div className="theme-label">IBM POV</div>
                    <p className="theme-text">{theme.ibmPov}</p>
                  </div>

                  <div className="theme-section">
                    <div className="theme-label">Partner value</div>
                    <p className="theme-text">{theme.partnerValue}</p>
                  </div>

                  <div className="theme-cta">
                    <Button
                      kind="ghost"
                      size="sm"
                      renderIcon={ArrowRight}
                    >
                      {theme.cta}
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default StrategicThemesSection;

// Made with Bob

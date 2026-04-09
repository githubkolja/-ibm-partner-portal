import React from 'react';
import { Tag, Button } from '@carbon/react';
import { ArrowRight } from '@carbon/icons-react';
import './HeroSection.scss';

const HeroSection = ({ data }) => {
  const { monthlyContext } = data;

  return (
    <section className="hero-section">
      <div className="hero-content">
        <div className="hero-main">
          <div className="hero-eyebrow">{monthlyContext.eyebrow}</div>
          <h1 className="hero-title">{monthlyContext.title}</h1>
          <p className="hero-intro">{monthlyContext.intro}</p>
          
          <div className="hero-chips">
            {monthlyContext.impactChips.map((chip, index) => (
              <Tag key={index} type="blue" size="md">
                {chip}
              </Tag>
            ))}
          </div>
        </div>

        <div className="hero-glance">
          <div className="glance-header">
            <h3>This month at a glance</h3>
          </div>
          <div className="glance-content">
            <div className="glance-item">
              <div className="glance-label">Featured theme</div>
              <div className="glance-value">{monthlyContext.glancePanel.featuredTheme}</div>
            </div>
            <div className="glance-item">
              <div className="glance-label">Key event</div>
              <div className="glance-value">{monthlyContext.glancePanel.keyEvent}</div>
            </div>
            <div className="glance-item">
              <div className="glance-label">Recommended action</div>
              <div className="glance-value">
                {monthlyContext.glancePanel.recommendedAction}
                <Button
                  kind="ghost"
                  size="sm"
                  renderIcon={ArrowRight}
                  iconDescription="Go"
                  hasIconOnly
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;

// Made with Bob

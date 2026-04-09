import React from 'react';
import { Button, Tag } from '@carbon/react';
import { Calendar, ArrowRight, ChartLine } from '@carbon/icons-react';
import './EventsAndSignalsSection.scss';

const EventsAndSignalsSection = ({ events, marketSignals }) => {
  const getSignalIcon = (type) => {
    switch (type) {
      case 'adoption':
        return '📈';
      case 'ecosystem':
        return '🌐';
      case 'convergence':
        return '🔄';
      default:
        return '💡';
    }
  };

  return (
    <section className="events-signals-section">
      <div className="events-signals-container">
        {/* Events Section */}
        <div className="events-block">
          <div className="section-header">
            <div className="header-content">
              <Calendar className="header-icon" />
              <h2>Events worth attention</h2>
            </div>
            <p className="section-subtitle">
              Curated sessions for partner enablement and strategic alignment
            </p>
          </div>

          <div className="events-list">
            {events.map((event, index) => (
              <div key={index} className="event-card">
                <div className="event-header">
                  <h3 className="event-name">{event.name}</h3>
                  <Tag type="blue" size="sm">{event.date}</Tag>
                </div>

                <div className="event-why">
                  <div className="event-label">Why attend</div>
                  <p>{event.whyAttend}</p>
                </div>

                <div className="event-audience">
                  <div className="event-label">Best for</div>
                  <p>{event.bestAudience}</p>
                </div>

                <div className="event-cta">
                  <Button
                    kind="tertiary"
                    size="sm"
                    renderIcon={ArrowRight}
                  >
                    {event.cta}
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Market Signals Section */}
        <div className="signals-block">
        <div className="section-header">
          <div className="header-content">
            <ChartLine className="header-icon" />
            <h2>Signals from the market</h2>
          </div>
            <p className="section-subtitle">
              Proof points and trends shaping partner conversations
            </p>
          </div>

          <div className="signals-list">
            {marketSignals.map((signal, index) => (
              <div key={index} className="signal-card">
                <div className="signal-icon">{getSignalIcon(signal.type)}</div>
                <div className="signal-content">
                  <h3 className="signal-title">{signal.title}</h3>
                  <div className="signal-data">
                    <div className="signal-label">The signal</div>
                    <p className="signal-text">{signal.signal}</p>
                  </div>
                  <div className="signal-implication">
                    <div className="signal-label">What it means</div>
                    <p className="signal-text">{signal.implication}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default EventsAndSignalsSection;

// Made with Bob

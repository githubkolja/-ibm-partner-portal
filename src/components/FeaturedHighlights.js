import React from 'react';
import { 
  Grid, 
  Column, 
  Tile,
  Button,
  Tag
} from '@carbon/react';
import { 
  ArrowRight, 
  Calendar, 
  Trophy,
  Video,
  Location,
  Time
} from '@carbon/icons-react';
import highlightsData from '../data/highlightsData.json';
import './FeaturedHighlights.scss';

function FeaturedHighlights() {
  const { featuredEvent, videos, recentWins, upcomingEvents, stats } = highlightsData;

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    });
  };

  return (
    <section className="featured-highlights">
      <div className="section-container">
        {/* Stats Bar */}
        <div className="stats-bar">
          <div className="stat-item">
            <div className="stat-value">{stats.partners}</div>
            <div className="stat-label">Global Partners</div>
          </div>
          <div className="stat-item">
            <div className="stat-value">{stats.deployments}</div>
            <div className="stat-label">Active Deployments</div>
          </div>
          <div className="stat-item">
            <div className="stat-value">{stats.countries}</div>
            <div className="stat-label">Countries</div>
          </div>
          <div className="stat-item">
            <div className="stat-value">{stats.certifications}</div>
            <div className="stat-label">Certifications Issued</div>
          </div>
        </div>

        {/* Featured Event */}
        <div className="featured-event-section">
          <h2 className="section-title">
            <Calendar size={32} className="title-icon" />
            Featured Event
          </h2>
          <Tile className="featured-event-card">
            <Grid>
              <Column sm={4} md={8} lg={10}>
                <div className="event-content">
                  <Tag type="blue" size="md" className="event-tag">Upcoming Event</Tag>
                  <h3 className="event-title">{featuredEvent.title}</h3>
                  <div className="event-meta">
                    <div className="meta-item">
                      <Calendar size={20} />
                      <span>{formatDate(featuredEvent.date)}</span>
                    </div>
                    <div className="meta-item">
                      <Location size={20} />
                      <span>{featuredEvent.location}</span>
                    </div>
                  </div>
                  <p className="event-description">{featuredEvent.description}</p>
                  <ul className="event-highlights">
                    {featuredEvent.highlights.map((highlight, index) => (
                      <li key={index}>{highlight}</li>
                    ))}
                  </ul>
                  <Button 
                    kind="primary" 
                    size="lg"
                    renderIcon={ArrowRight}
                    href={featuredEvent.link}
                    target="_blank"
                  >
                    {featuredEvent.cta}
                  </Button>
                </div>
              </Column>
              <Column sm={0} md={0} lg={6}>
                <div className="event-image">
                  <img src={featuredEvent.image} alt={featuredEvent.title} />
                </div>
              </Column>
            </Grid>
          </Tile>
        </div>

        {/* Videos Section */}
        <div className="videos-section">
          <h2 className="section-title">
            <Video size={32} className="title-icon" />
            Featured Videos
          </h2>
          <Grid className="videos-grid">
            {videos.map((video) => (
              <Column key={video.id} sm={4} md={4} lg={4}>
                <Tile className="video-card">
                  <div className="video-thumbnail">
                    <img src={video.thumbnail} alt={video.title} />
                    <div className="video-duration">{video.duration}</div>
                    <div className="play-overlay">
                      <Video size={48} />
                    </div>
                  </div>
                  <div className="video-content">
                    <Tag type="purple" size="sm">{video.brand}</Tag>
                    <h4 className="video-title">{video.title}</h4>
                    <p className="video-description">{video.description}</p>
                    <div className="video-meta">
                      <span>{video.views} views</span>
                      <span>•</span>
                      <span>{formatDate(video.date)}</span>
                    </div>
                    <a 
                      href={video.link} 
                      className="video-link"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      Watch now <ArrowRight size={16} />
                    </a>
                  </div>
                </Tile>
              </Column>
            ))}
          </Grid>
        </div>

        {/* Recent Wins Section */}
        <div className="wins-section">
          <h2 className="section-title">
            <Trophy size={32} className="title-icon" />
            Recent Customer Wins
          </h2>
          <Grid className="wins-grid">
            {recentWins.map((win) => (
              <Column key={win.id} sm={4} md={4} lg={8}>
                <Tile className="win-card">
                  <div className="win-header">
                    <span className="win-icon">{win.icon}</span>
                    <div className="win-meta">
                      <Tag type="green" size="sm">{win.industry}</Tag>
                      <span className="win-date">{formatDate(win.date)}</span>
                    </div>
                  </div>
                  <h4 className="win-title">{win.title}</h4>
                  <div className="win-solution">
                    <strong>Solution:</strong> {win.solution}
                  </div>
                  <p className="win-description">{win.description}</p>
                  <div className="win-metrics">
                    {win.metrics.map((metric, index) => (
                      <div key={index} className="metric-badge">
                        {metric}
                      </div>
                    ))}
                  </div>
                </Tile>
              </Column>
            ))}
          </Grid>
        </div>

        {/* Upcoming Events */}
        <div className="upcoming-events-section">
          <h2 className="section-title">Upcoming Events & Webinars</h2>
          <Grid className="upcoming-events-grid">
            {upcomingEvents.map((event) => (
              <Column key={event.id} sm={4} md={4} lg={4}>
                <Tile className="upcoming-event-card">
                  <Tag type="cyan" size="sm">{event.type}</Tag>
                  <h4 className="upcoming-event-title">{event.title}</h4>
                  <div className="upcoming-event-meta">
                    <div className="meta-item">
                      <Calendar size={16} />
                      <span>{formatDate(event.date)}</span>
                    </div>
                    <div className="meta-item">
                      <Time size={16} />
                      <span>{event.time}</span>
                    </div>
                  </div>
                  <Button 
                    kind="tertiary" 
                    size="sm"
                    renderIcon={ArrowRight}
                    href={event.link}
                    target="_blank"
                  >
                    Learn more
                  </Button>
                </Tile>
              </Column>
            ))}
          </Grid>
        </div>
      </div>
    </section>
  );
}

export default FeaturedHighlights;

// Made with Bob

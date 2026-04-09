import React, { useState, useEffect } from 'react';
import { 
  Grid, 
  Column, 
  Tile,
  Tag,
  Button
} from '@carbon/react';
import { ArrowRight, Calendar } from '@carbon/icons-react';
import newsData from '../data/newsData.json';
import './NewsSection.scss';

function NewsSection({ searchQuery, activeCategory }) {
  const [filteredNews, setFilteredNews] = useState(newsData);
  const [displayCount, setDisplayCount] = useState(6);

  useEffect(() => {
    let filtered = newsData;

    // Filter by category
    if (activeCategory !== 'All') {
      filtered = filtered.filter(item => item.category === activeCategory);
    }

    // Filter by search query
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(item =>
        item.title.toLowerCase().includes(query) ||
        item.summary.toLowerCase().includes(query) ||
        item.tags.some(tag => tag.toLowerCase().includes(query))
      );
    }

    setFilteredNews(filtered);
    setDisplayCount(6); // Reset display count when filters change
  }, [searchQuery, activeCategory]);

  const handleLoadMore = () => {
    setDisplayCount(prev => prev + 6);
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    });
  };

  const displayedNews = filteredNews.slice(0, displayCount);
  const hasMore = displayCount < filteredNews.length;

  return (
    <section className="news-section">
      <div className="section-container">
        <div className="section-header">
          <h2 className="section-title">Latest Partner News</h2>
          <p className="section-description">
            Stay updated with the latest developments in IBM automation and AI technologies
          </p>
        </div>

        {filteredNews.length === 0 ? (
          <div className="no-results">
            <p>No news articles found matching your criteria.</p>
          </div>
        ) : (
          <>
            <Grid className="news-grid">
              {displayedNews.map((news) => (
                <Column key={news.id} sm={4} md={4} lg={5} xlg={5}>
                  <Tile className="news-card">
                    <div className="news-card-header">
                      <Tag type={news.category === 'Automation' ? 'blue' : 'purple'}>
                        {news.category}
                      </Tag>
                      <div className="news-date">
                        <Calendar size={16} />
                        <span>{formatDate(news.date)}</span>
                      </div>
                    </div>
                    
                    <h3 className="news-title">{news.title}</h3>
                    <p className="news-summary">{news.summary}</p>
                    
                    <div className="news-tags">
                      {news.tags.map((tag, index) => (
                        <Tag key={index} type="outline" size="sm">
                          {tag}
                        </Tag>
                      ))}
                    </div>
                    
                    <a 
                      href={news.link} 
                      className="news-link"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      Read more <ArrowRight size={16} />
                    </a>
                  </Tile>
                </Column>
              ))}
            </Grid>

            {hasMore && (
              <div className="load-more-container">
                <Button 
                  kind="tertiary" 
                  size="lg"
                  onClick={handleLoadMore}
                >
                  Load more news
                </Button>
              </div>
            )}
          </>
        )}
      </div>
    </section>
  );
}

export default NewsSection;

// Made with Bob

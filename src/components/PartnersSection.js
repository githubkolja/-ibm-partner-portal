import React, { useState, useEffect } from 'react';
import { 
  Grid, 
  Column,
  Accordion,
  AccordionItem,
  StructuredListWrapper,
  StructuredListHead,
  StructuredListBody,
  StructuredListRow,
  StructuredListCell,
  Tag
} from '@carbon/react';
import { Launch } from '@carbon/icons-react';
import partnersData from '../data/partnersData.json';
import './PartnersSection.scss';

function PartnersSection({ searchQuery, activeCategory }) {
  const [filteredPartners, setFilteredPartners] = useState(partnersData);

  useEffect(() => {
    let filtered = partnersData;

    // Filter by search query
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      filtered = partnersData.map(category => {
        const filteredPartnersList = category.partners.filter(partner =>
          partner.name.toLowerCase().includes(query) ||
          partner.description.toLowerCase().includes(query) ||
          partner.type.toLowerCase().includes(query)
        );
        
        return {
          ...category,
          partners: filteredPartnersList
        };
      }).filter(category => category.partners.length > 0);
    }

    // Filter by category (Automation or Data & AI)
    if (activeCategory !== 'All') {
      if (activeCategory === 'Automation') {
        filtered = filtered.filter(cat => 
          cat.category.includes('Automation') || 
          cat.category.includes('RPA') ||
          cat.category.includes('Process')
        );
      } else if (activeCategory === 'Data & AI') {
        filtered = filtered.filter(cat => 
          cat.category.includes('watsonx') || 
          cat.category.includes('Data') ||
          cat.category.includes('AI') ||
          cat.category.includes('Watson')
        );
      }
    }

    setFilteredPartners(filtered);
  }, [searchQuery, activeCategory]);

  const getCategoryIcon = (categoryName) => {
    if (categoryName.includes('watsonx')) return '🤖';
    if (categoryName.includes('Automation')) return '⚙️';
    if (categoryName.includes('Data')) return '📊';
    if (categoryName.includes('Partner')) return '🤝';
    if (categoryName.includes('Learning')) return '📚';
    return '🔗';
  };

  const getTagType = (type) => {
    switch (type) {
      case 'Product':
        return 'blue';
      case 'Solution':
        return 'cyan';
      case 'Service':
        return 'teal';
      case 'Technology Partner':
        return 'purple';
      case 'Resource':
        return 'magenta';
      default:
        return 'gray';
    }
  };

  return (
    <section className="partners-section">
      <div className="section-container">
        <div className="section-header">
          <h2 className="section-title">Partner Resources & Links</h2>
          <p className="section-description">
            Explore IBM's comprehensive ecosystem of automation and AI solutions
          </p>
        </div>

        {filteredPartners.length === 0 ? (
          <div className="no-results">
            <p>No partner resources found matching your criteria.</p>
          </div>
        ) : (
          <Grid>
            <Column sm={4} md={8} lg={16}>
              <Accordion align="start" size="lg">
                {filteredPartners.map((category) => (
                  <AccordionItem 
                    key={category.id}
                    title={
                      <div className="accordion-title">
                        <span className="category-icon">{getCategoryIcon(category.category)}</span>
                        <span>{category.category}</span>
                        <Tag type="outline" size="sm" className="partner-count">
                          {category.partners.length} {category.partners.length === 1 ? 'item' : 'items'}
                        </Tag>
                      </div>
                    }
                  >
                    <StructuredListWrapper>
                      <StructuredListHead>
                        <StructuredListRow head>
                          <StructuredListCell head>Name</StructuredListCell>
                          <StructuredListCell head>Description</StructuredListCell>
                          <StructuredListCell head>Type</StructuredListCell>
                          <StructuredListCell head>Link</StructuredListCell>
                        </StructuredListRow>
                      </StructuredListHead>
                      <StructuredListBody>
                        {category.partners.map((partner, index) => (
                          <StructuredListRow key={index}>
                            <StructuredListCell className="partner-name">
                              {partner.name}
                            </StructuredListCell>
                            <StructuredListCell className="partner-description">
                              {partner.description}
                            </StructuredListCell>
                            <StructuredListCell>
                              <Tag type={getTagType(partner.type)} size="sm">
                                {partner.type}
                              </Tag>
                            </StructuredListCell>
                            <StructuredListCell>
                              <a 
                                href={partner.url}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="partner-link"
                              >
                                Visit <Launch size={16} />
                              </a>
                            </StructuredListCell>
                          </StructuredListRow>
                        ))}
                      </StructuredListBody>
                    </StructuredListWrapper>
                  </AccordionItem>
                ))}
              </Accordion>
            </Column>
          </Grid>
        )}
      </div>
    </section>
  );
}

export default PartnersSection;

// Made with Bob

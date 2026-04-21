import React from 'react';
import { Tag, Button } from '@carbon/react';
import { ArrowRight } from '@carbon/icons-react';
import ResourceModal from './ResourceModal';
import useResourceModal from '../hooks/useResourceModal';
import './PrioritiesSection.scss';

const PrioritiesSection = ({ priorities }) => {
  const { isOpen, selectedResource, closeModal, openResourceWithPreview } = useResourceModal();

  const getThemeColor = (theme) => {
    switch (theme) {
      case 'Automation':
        return 'purple';
      case 'Data & AI':
        return 'cyan';
      case 'Both':
        return 'blue';
      default:
        return 'gray';
    }
  };

  const handleCtaClick = (priority) => {
    if (priority.resources && priority.resources.length > 0) {
      const resourceData = {
        title: priority.title,
        url: priority.cta.url,
        type: priority.theme,
        preview: priority.whyMatters,
        metadata: {
          author: 'IBM',
          date: new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })
        },
        relatedResources: priority.resources
      };
      openResourceWithPreview(resourceData);
    } else {
      window.open(priority.cta.url, '_blank');
    }
  };

  return (
    <section className="priorities-section">
      <div className="priorities-container">
        <div className="priorities-header">
          <h2>3 priorities this month</h2>
          <p className="priorities-subtitle">
            Curated themes connecting IBM direction with partner conversations and activation
          </p>
        </div>

        <div className="priorities-grid">
          {priorities.map((priority) => (
            <div key={priority.id} className="priority-card">
              <div className="priority-header">
                <Tag type={getThemeColor(priority.theme)} size="sm">
                  {priority.theme}
                </Tag>
                <div className="priority-tags">
                  {priority.tags.map((tag, index) => (
                    <Tag key={index} type="outline" size="sm">
                      {tag}
                    </Tag>
                  ))}
                </div>
              </div>

              <h3 className="priority-title">{priority.title}</h3>

              <div className="priority-why">
                <div className="why-label">Why it matters</div>
                <p className="why-text">{priority.whyMatters}</p>
              </div>

              <div className="priority-audience">
                <div className="audience-label">Best for</div>
                <div className="audience-tags">
                  {priority.audience.map((role, index) => (
                    <span key={index} className="audience-tag">
                      {role}
                    </span>
                  ))}
                </div>
              </div>

              <div className="priority-cta">
                <Button
                  kind="tertiary"
                  size="md"
                  renderIcon={ArrowRight}
                  onClick={() => handleCtaClick(priority)}
                >
                  {priority.cta.label}
                </Button>
              </div>
            </div>
          ))}
        </div>
      </div>

      <ResourceModal
        isOpen={isOpen}
        onClose={closeModal}
        resource={selectedResource}
      />
    </section>
  );
};

export default PrioritiesSection;

// Made with Bob

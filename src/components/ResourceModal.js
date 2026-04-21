import React from 'react';
import { Modal } from '@carbon/react';
import { Launch } from '@carbon/icons-react';
import './ResourceModal.scss';

const ResourceModal = ({ isOpen, onClose, resource }) => {
  if (!resource) return null;

  const handleOpenExternal = () => {
    if (resource.url) {
      window.open(resource.url, '_blank');
      onClose();
    }
  };

  return (
    <Modal
      open={isOpen}
      onRequestClose={onClose}
      modalHeading={resource.title || 'IBM Resource'}
      primaryButtonText="Open full article"
      secondaryButtonText="Close"
      onRequestSubmit={handleOpenExternal}
      size="lg"
    >
      <div className="resource-modal-content">
        {resource.type && (
          <div className="resource-type">
            <span className="type-badge">{resource.type}</span>
          </div>
        )}

        {resource.preview && (
          <div className="resource-preview">
            <h4>Overview</h4>
            <p>{resource.preview}</p>
          </div>
        )}

        {resource.metadata && (
          <div className="resource-metadata">
            {resource.metadata.author && (
              <div className="metadata-item">
                <span className="metadata-label">Author:</span>
                <span className="metadata-value">{resource.metadata.author}</span>
              </div>
            )}
            {resource.metadata.date && (
              <div className="metadata-item">
                <span className="metadata-label">Published:</span>
                <span className="metadata-value">{resource.metadata.date}</span>
              </div>
            )}
            {resource.metadata.readingTime && (
              <div className="metadata-item">
                <span className="metadata-label">Reading time:</span>
                <span className="metadata-value">{resource.metadata.readingTime}</span>
              </div>
            )}
          </div>
        )}

        <div className="resource-link">
          <Launch className="link-icon" />
          <span className="link-text">{resource.url}</span>
        </div>

        {resource.relatedResources && resource.relatedResources.length > 0 && (
          <div className="related-resources">
            <h4>Related resources</h4>
            <ul>
              {resource.relatedResources.map((related, index) => (
                <li key={index}>
                  <a href={related.url} target="_blank" rel="noopener noreferrer">
                    {related.title}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </Modal>
  );
};

export default ResourceModal;

// Made with Bob
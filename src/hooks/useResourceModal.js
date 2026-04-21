import { useState, useCallback } from 'react';

const useResourceModal = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedResource, setSelectedResource] = useState(null);

  const openModal = useCallback((resource) => {
    setSelectedResource(resource);
    setIsOpen(true);
  }, []);

  const closeModal = useCallback(() => {
    setIsOpen(false);
    // Delay clearing the resource to allow modal close animation
    setTimeout(() => setSelectedResource(null), 300);
  }, []);

  const openResourceWithPreview = useCallback((resource) => {
    // If resource has preview data, show modal
    if (resource.preview || resource.metadata || resource.relatedResources) {
      openModal(resource);
    } else {
      // Otherwise, open directly in new tab
      if (resource.url) {
        window.open(resource.url, '_blank');
      }
    }
  }, [openModal]);

  return {
    isOpen,
    selectedResource,
    openModal,
    closeModal,
    openResourceWithPreview
  };
};

export default useResourceModal;

// Made with Bob
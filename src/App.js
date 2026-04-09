import React, { useState } from 'react';
import {
  Header,
  HeaderName,
  HeaderNavigation,
  HeaderMenuItem,
  HeaderGlobalBar,
  HeaderGlobalAction,
  SkipToContent,
  Content,
  Theme
} from '@carbon/react';
import { Search, Notification, UserAvatar } from '@carbon/icons-react';
import FeaturedHighlights from './components/FeaturedHighlights';
import NewsSection from './components/NewsSection';
import PartnersSection from './components/PartnersSection';
import SearchBar from './components/SearchBar';
import './App.scss';

function App() {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState('All');

  const handleSearch = (query) => {
    setSearchQuery(query);
  };

  const handleCategoryChange = (category) => {
    setActiveCategory(category);
    setSearchQuery(''); // Clear search when changing category
  };

  return (
    <Theme theme="g100">
      <div className="app-container">
        <Header aria-label="IBM Partner Portal">
          <SkipToContent />
          <HeaderName href="#" prefix="IBM">
            Partner Portal
          </HeaderName>
          <HeaderNavigation aria-label="IBM Partner Portal">
            <HeaderMenuItem 
              href="#" 
              isActive={activeCategory === 'All'}
              onClick={() => handleCategoryChange('All')}
            >
              All
            </HeaderMenuItem>
            <HeaderMenuItem 
              href="#"
              isActive={activeCategory === 'Automation'}
              onClick={() => handleCategoryChange('Automation')}
            >
              Automation
            </HeaderMenuItem>
            <HeaderMenuItem 
              href="#"
              isActive={activeCategory === 'Data & AI'}
              onClick={() => handleCategoryChange('Data & AI')}
            >
              Data & AI
            </HeaderMenuItem>
          </HeaderNavigation>
          <HeaderGlobalBar>
            <HeaderGlobalAction 
              aria-label="Search"
              tooltipAlignment="end"
            >
              <Search size={20} />
            </HeaderGlobalAction>
            <HeaderGlobalAction 
              aria-label="Notifications"
              tooltipAlignment="end"
            >
              <Notification size={20} />
            </HeaderGlobalAction>
            <HeaderGlobalAction 
              aria-label="User Avatar"
              tooltipAlignment="end"
            >
              <UserAvatar size={20} />
            </HeaderGlobalAction>
          </HeaderGlobalBar>
        </Header>

        <Content className="main-content">
          <div className="hero-section">
            <h1 className="hero-title">IBM Automation & Data AI Partner Portal</h1>
            <p className="hero-subtitle">
              Discover the latest news, resources, and partner solutions for IBM's 
              automation and artificial intelligence technologies
            </p>
          </div>

          <SearchBar onSearch={handleSearch} />

          <FeaturedHighlights />

          <NewsSection
            searchQuery={searchQuery}
            activeCategory={activeCategory}
          />

          <PartnersSection
            searchQuery={searchQuery}
            activeCategory={activeCategory}
          />
        </Content>

        <footer className="portal-footer">
          <div className="footer-content">
            <p>&copy; 2026 IBM Corporation. All rights reserved.</p>
            <div className="footer-links">
              <a href="https://www.ibm.com/privacy">Privacy</a>
              <a href="https://www.ibm.com/legal">Terms of Use</a>
              <a href="https://www.ibm.com/accessibility">Accessibility</a>
              <a href="https://www.ibm.com/contact">Contact</a>
            </div>
          </div>
        </footer>
      </div>
    </Theme>
  );
}

export default App;

// Made with Bob

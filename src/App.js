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
import { Notification, UserAvatar } from '@carbon/icons-react';
import HeroSection from './components/HeroSection';
import PrioritiesSection from './components/PrioritiesSection';
import WhyMattersSection from './components/WhyMattersSection';
import ByRoleSection from './components/ByRoleSection';
import StrategicThemesSection from './components/StrategicThemesSection';
import EventsAndSignalsSection from './components/EventsAndSignalsSection';
import ActivateSection from './components/ActivateSection';
import influenceBriefData from './data/influenceBriefData.json';
import './App.scss';

function App() {
  const [activeSection, setActiveSection] = useState('priorities');

  const scrollToSection = (sectionId) => {
    setActiveSection(sectionId);
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <Theme theme="g100">
      <div className="app-container">
        <Header aria-label="IBM Partner Influence Brief Hub">
          <SkipToContent />
          <HeaderName href="#" prefix="IBM">
            Partner Influence Brief
          </HeaderName>
          <HeaderNavigation aria-label="Navigation">
            <HeaderMenuItem 
              href="#priorities" 
              isActive={activeSection === 'priorities'}
              onClick={(e) => {
                e.preventDefault();
                scrollToSection('priorities');
              }}
            >
              Priorities
            </HeaderMenuItem>
            <HeaderMenuItem 
              href="#by-role"
              isActive={activeSection === 'by-role'}
              onClick={(e) => {
                e.preventDefault();
                scrollToSection('by-role');
              }}
            >
              By Role
            </HeaderMenuItem>
            <HeaderMenuItem 
              href="#themes"
              isActive={activeSection === 'themes'}
              onClick={(e) => {
                e.preventDefault();
                scrollToSection('themes');
              }}
            >
              Themes
            </HeaderMenuItem>
            <HeaderMenuItem 
              href="#events"
              isActive={activeSection === 'events'}
              onClick={(e) => {
                e.preventDefault();
                scrollToSection('events');
              }}
            >
              Events
            </HeaderMenuItem>
            <HeaderMenuItem 
              href="#activate"
              isActive={activeSection === 'activate'}
              onClick={(e) => {
                e.preventDefault();
                scrollToSection('activate');
              }}
            >
              Activate
            </HeaderMenuItem>
          </HeaderNavigation>
          <HeaderGlobalBar>
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
          <HeroSection data={influenceBriefData} />

          <div id="priorities">
            <PrioritiesSection priorities={influenceBriefData.priorities} />
          </div>

          <WhyMattersSection whyThisMatters={influenceBriefData.whyThisMatters} />

          <div id="by-role">
            <ByRoleSection byRole={influenceBriefData.byRole} />
          </div>

          <div id="themes">
            <StrategicThemesSection strategicThemes={influenceBriefData.strategicThemes} />
          </div>

          <div id="events">
            <EventsAndSignalsSection 
              events={influenceBriefData.events}
              marketSignals={influenceBriefData.marketSignals}
            />
          </div>

          <div id="activate">
            <ActivateSection activationPaths={influenceBriefData.activationPaths} />
          </div>

          {/* Editor Note Section */}
          <section className="editor-note-section">
            <div className="editor-note-container">
              <div className="editor-note-content">
                <h3>{influenceBriefData.editorNote.title}</h3>
                <p>{influenceBriefData.editorNote.content}</p>
              </div>
            </div>
          </section>
        </Content>

        <footer className="portal-footer">
          <div className="footer-content">
            <div className="footer-main">
              <div className="footer-brand">
                <h4>IBM Partner Influence Brief Hub</h4>
                <p>Curated insights for partner influencers across Automation and Data & AI</p>
              </div>
              <div className="footer-meta">
                <p className="footer-update">Last updated: {influenceBriefData.monthlyContext.month}</p>
              </div>
            </div>
            <div className="footer-bottom">
              <p>&copy; 2026 IBM Corporation. All rights reserved.</p>
              <div className="footer-links">
                <a href="https://www.ibm.com/privacy">Privacy</a>
                <a href="https://www.ibm.com/legal">Terms of Use</a>
                <a href="https://www.ibm.com/accessibility">Accessibility</a>
                <a href="https://www.ibm.com/contact">Contact</a>
              </div>
            </div>
          </div>
        </footer>
      </div>
    </Theme>
  );
}

export default App;

// Made with Bob - Partner Influence Brief Hub Edition

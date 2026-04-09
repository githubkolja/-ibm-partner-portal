import React, { useState } from 'react';
import { Tabs, TabList, Tab, TabPanels, TabPanel } from '@carbon/react';
import './ByRoleSection.scss';

const ByRoleSection = ({ byRole }) => {
  const roles = [
    { key: 'architects', label: 'Architects', icon: '🏗️' },
    { key: 'practiceLeaders', label: 'Practice Leaders', icon: '👥' },
    { key: 'ctos', label: 'CTOs', icon: '🎯' },
    { key: 'alliances', label: 'Alliances & Sales', icon: '🤝' }
  ];

  const [selectedIndex, setSelectedIndex] = useState(0);

  return (
    <section className="by-role-section">
      <div className="by-role-container">
        <div className="by-role-header">
          <h2>Read by role</h2>
          <p className="by-role-subtitle">
            Tailored guidance for different partner roles and responsibilities
          </p>
        </div>

        <div className="by-role-tabs">
          <Tabs selectedIndex={selectedIndex} onChange={(e) => setSelectedIndex(e.selectedIndex)}>
            <TabList aria-label="Role tabs" contained>
              {roles.map((role) => (
                <Tab key={role.key}>
                  <span className="tab-icon">{role.icon}</span>
                  {role.label}
                </Tab>
              ))}
            </TabList>
            <TabPanels>
              {roles.map((role) => {
                const roleData = byRole[role.key];
                return (
                  <TabPanel key={role.key}>
                    <div className="role-content">
                      <div className="role-section">
                        <div className="role-section-header">
                          <h3>What to watch</h3>
                          <div className="role-section-icon">👀</div>
                        </div>
                        <p>{roleData.watch}</p>
                      </div>

                      <div className="role-section">
                        <div className="role-section-header">
                          <h3>What to say</h3>
                          <div className="role-section-icon">💬</div>
                        </div>
                        <p>{roleData.say}</p>
                      </div>

                      <div className="role-section">
                        <div className="role-section-header">
                          <h3>What to do next</h3>
                          <div className="role-section-icon">✅</div>
                        </div>
                        <p>{roleData.do}</p>
                      </div>
                    </div>
                  </TabPanel>
                );
              })}
            </TabPanels>
          </Tabs>
        </div>
      </div>
    </section>
  );
};

export default ByRoleSection;

// Made with Bob

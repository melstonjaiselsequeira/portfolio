import React from 'react';
import { FiDatabase, FiCpu, FiTerminal, FiCode, FiCheck, FiLayers } from 'react-icons/fi';
import { aboutData } from '../data/portfolioData';

export function About() {
  const iconMap = {
    Database: <FiDatabase />,
    Cpu: <FiCpu />,
    Terminal: <FiTerminal />,
    Code: <FiCode />
  };

  const lifecycleStages = [
    'Analysis',
    'Design',
    'Development',
    'Testing',
    'Implementation'
  ];

  return (
    <section id="about" className="about-section">
      <div className="section-container">
        {/* Section Header */}
        <div className="section-header-center">
          <div className="section-tag">
            <span className="tag-pulse" />
            <span>BACKGROUND & EXPERTISE</span>
          </div>
          <h2 className="section-title">{aboutData.heading}</h2>
          <div className="section-line" />
        </div>

        {/* Executive Summary Card */}
        <div className="about-summary-card">
          <p className="summary-paragraph">
            {aboutData.description}
          </p>
          <p className="summary-skills-text">
            {aboutData.skillsOverview}
          </p>

          {/* Development Lifecycle Badges */}
          <div className="lifecycle-wrapper">
            <span className="lifecycle-label">Full Development Lifecycle Experience:</span>
            <div className="lifecycle-pills">
              {lifecycleStages.map((stage, idx) => (
                <div key={idx} className="lifecycle-pill">
                  <FiCheck className="pill-check-icon" />
                  <span>{stage}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* 4 Core Focus Cards */}
        <div className="about-cards-grid">
          {aboutData.domains.map((domain) => (
            <div key={domain.id} className="about-domain-card">
              <div className="domain-card-glow" />
              <div className="domain-icon-box">
                {iconMap[domain.icon] || <FiLayers />}
              </div>
              <h3 className="domain-title">{domain.title}</h3>
              <p className="domain-summary">{domain.summary}</p>
              
              <ul className="domain-detail-list">
                {domain.details.map((item, idx) => (
                  <li key={idx} className="domain-detail-item">
                    <span className="detail-dot" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default About;

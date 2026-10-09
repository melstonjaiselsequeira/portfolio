import React from 'react';
import { FiGlobe, FiMessageSquare } from 'react-icons/fi';
import { languages } from '../data/portfolioData';

export function Languages() {
  return (
    <section id="languages" className="languages-section">
      <div className="section-container">
        {/* Section Header */}
        <div className="section-header-center">
          <div className="section-tag">
            <span className="tag-pulse" />
            <span>COMMUNICATION & PROFICIENCY</span>
          </div>
          <h2 className="section-title">LANGUAGES</h2>
          <p className="section-subtitle">
            Multilingual communication capabilities across international and regional dialects.
          </p>
          <div className="section-line" />
        </div>

        {/* Languages Cards Grid */}
        <div className="languages-grid">
          {languages.map((lang) => (
            <div key={lang.name} className="language-card">
              <div className="lang-card-glow" />

              <div className="lang-header">
                <div className="lang-icon-box">
                  <FiGlobe />
                </div>
                <span className={`proficiency-badge ${lang.proficiency.toLowerCase()}`}>
                  {lang.proficiency}
                </span>
              </div>

              <h3 className="lang-name">{lang.name}</h3>
              <p className="lang-level-desc">{lang.level}</p>

              <div className="lang-status-line">
                <FiMessageSquare className="msg-icon" />
                <span>Active Fluency</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Languages;

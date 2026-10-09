import React from 'react';
import { FiAward, FiCheckSquare, FiTerminal, FiZap } from 'react-icons/fi';
import { achievements } from '../data/portfolioData';

export function Achievements() {
  const getBadgeIcon = (tag) => {
    if (tag.includes('Hackathon')) return <FiZap />;
    if (tag.includes('Speech')) return <FiAward />;
    return <FiTerminal />;
  };

  return (
    <section id="achievements" className="achievements-section">
      <div className="section-container">
        {/* Section Header */}
        <div className="section-header-center">
          <div className="section-tag">
            <span className="tag-pulse" />
            <span>MILESTONES & PARTICIPATION</span>
          </div>
          <h2 className="section-title">ACHIEVEMENTS</h2>
          <p className="section-subtitle">
            Competitive hackathons, hands-on technical workshops, and engineering initiatives.
          </p>
          <div className="section-line" />
        </div>

        {/* Achievements Cards Grid */}
        <div className="achievements-grid">
          {achievements.map((item, idx) => (
            <div key={idx} className="achievement-card">
              <div className="achievement-card-glow" />

              <div className="achievement-top">
                <div className="achievement-icon-box">
                  {getBadgeIcon(item.tag)}
                </div>
                <span className="achievement-tag-badge">{item.tag}</span>
              </div>

              <h3 className="achievement-title">{item.title}</h3>
              <p className="achievement-description">{item.description}</p>

              <div className="achievement-footer">
                <FiCheckSquare className="verified-icon" />
                <span>Verified Participation</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Achievements;

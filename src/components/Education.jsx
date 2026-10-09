import React from 'react';
import { FiBookOpen, FiCalendar, FiMapPin, FiAward, FiCheckCircle } from 'react-icons/fi';
import { education } from '../data/portfolioData';

export function Education() {
  return (
    <section id="education" className="education-section">
      <div className="section-container">
        {/* Section Header */}
        <div className="section-header-center">
          <div className="section-tag">
            <span className="tag-pulse" />
            <span>ACADEMIC BACKGROUND</span>
          </div>
          <h2 className="section-title">EDUCATION</h2>
          <p className="section-subtitle">
            Formal foundations in Computer Applications, algorithms, advanced computing, and data systems.
          </p>
          <div className="section-line" />
        </div>

        {/* Vertical Animated Timeline */}
        <div className="timeline-container">
          <div className="timeline-central-line" />

          {education.map((item, index) => (
            <div
              key={item.shortDegree}
              className={`timeline-entry ${index % 2 === 0 ? 'timeline-left' : 'timeline-right'}`}
            >
              {/* Timeline Center Node */}
              <div className="timeline-node">
                <div className="node-outer-ring" />
                <div className="node-inner-dot" />
              </div>

              {/* Timeline Card */}
              <div className="timeline-card">
                <div className="timeline-card-glow" />

                <div className="timeline-card-header">
                  <div className="degree-badge">
                    <FiBookOpen className="degree-icon" />
                    <span>{item.shortDegree}</span>
                  </div>
                  <div className="period-badge">
                    <FiCalendar className="period-icon" />
                    <span>{item.period}</span>
                  </div>
                </div>

                <h3 className="timeline-degree">{item.degree}</h3>

                <div className="timeline-meta-row">
                  <span className="timeline-institution">{item.institution}</span>
                  <span className="timeline-meta-divider">•</span>
                  <span className="timeline-location">
                    <FiMapPin className="loc-icon" />
                    {item.location}
                  </span>
                </div>

                {/* CGPA Display */}
                <div className="timeline-cgpa-box">
                  <FiAward className="cgpa-icon" />
                  <span className="cgpa-label">Cumulative GPA:</span>
                  <span className="cgpa-val">{item.cgpa}</span>
                  <span className="status-pill">{item.status}</span>
                </div>

                <p className="timeline-desc">{item.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Education;

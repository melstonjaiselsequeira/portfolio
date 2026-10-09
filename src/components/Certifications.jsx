import React from 'react';
import { FiCheckCircle, FiShield, FiExternalLink } from 'react-icons/fi';
import { certifications } from '../data/portfolioData';

export function Certifications() {
  return (
    <section id="certifications" className="certifications-section">
      <div className="section-container">
        {/* Section Header */}
        <div className="section-header-center">
          <div className="section-tag">
            <span className="tag-pulse" />
            <span>VERIFIED CREDENTIALS</span>
          </div>
          <h2 className="section-title">CERTIFICATIONS</h2>
          <p className="section-subtitle">
            Professional simulations, agentic intelligence credentials, and technical accreditations.
          </p>
          <div className="section-line" />
        </div>

        {/* Certifications Cards Grid */}
        <div className="certifications-grid">
          {certifications.map((cert, idx) => (
            <div key={idx} className="certification-card">
              <div className="cert-card-glow" />

              <div className="cert-header">
                <div className="cert-shield-box">
                  <FiShield />
                </div>
                <span className="cert-issuer-badge">{cert.issuer}</span>
              </div>

              <h3 className="cert-name">{cert.name}</h3>
              <p className="cert-category-text">{cert.category}</p>

              <div className="cert-verification-status">
                <FiCheckCircle className="cert-verified-icon" />
                <span>Credential Completed</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Certifications;

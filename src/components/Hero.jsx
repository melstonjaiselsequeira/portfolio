import React, { useState, useEffect } from 'react';
import { FiArrowRight, FiDatabase, FiCpu, FiLayers, FiCode } from 'react-icons/fi';
import { personalInfo } from '../data/portfolioData';
import AvatarScene from '../three/AvatarScene';

export function Hero({ mouseRef }) {
  const [currentRoleIndex, setCurrentRoleIndex] = useState(0);
  const [fadeState, setFadeState] = useState('fade-in');

  // Animated role transition
  useEffect(() => {
    const interval = setInterval(() => {
      setFadeState('fade-out');
      setTimeout(() => {
        setCurrentRoleIndex((prev) => (prev + 1) % personalInfo.roles.length);
        setFadeState('fade-in');
      }, 400);
    }, 3200);

    return () => clearInterval(interval);
  }, []);

  const handleScrollTo = (targetId) => {
    const el = document.getElementById(targetId);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="hero" className="hero-section">
      <div className="hero-background-gradient" />
      <div className="hero-container">
        {/* Left Column: Typography & CTAs */}
        <div className="hero-content">
          <div className="hero-badge">
            <span className="badge-dot" />
            <span className="badge-text">HELLO, I'M</span>
          </div>

          <h1 className="hero-name">
            <span className="name-highlight">Melston Jaisel</span>
            <span className="name-surname">Sequeira</span>
          </h1>

          <div className="hero-role-wrapper">
            <span className="role-prefix">Specializing in</span>
            <span className={`role-animated ${fadeState}`}>
              {personalInfo.roles[currentRoleIndex]}
            </span>
          </div>

          <p className="hero-description">
            {personalInfo.bio}
          </p>

          {/* Action CTAs */}
          <div className="hero-actions">
            <button
              onClick={() => handleScrollTo('projects')}
              className="btn-primary hero-btn"
            >
              <span>View My Projects</span>
              <FiArrowRight className="btn-icon" />
            </button>

            <button
              onClick={() => handleScrollTo('contact')}
              className="btn-secondary hero-btn"
            >
              <span>Contact Me</span>
              <FiArrowRight className="btn-icon" />
            </button>
          </div>

          {/* Compact Professional Highlights */}
          <div className="hero-highlights">
            <div className="highlight-item">
              <div className="highlight-icon-box">
                <FiCpu />
              </div>
              <div className="highlight-text">
                <span className="highlight-title">Machine Learning</span>
                <span className="highlight-sub">Predictive & NLP Models</span>
              </div>
            </div>

            <div className="highlight-item">
              <div className="highlight-icon-box">
                <FiDatabase />
              </div>
              <div className="highlight-text">
                <span className="highlight-title">Data Engineering</span>
                <span className="highlight-sub">Pipelines & Streams</span>
              </div>
            </div>

            <div className="highlight-item">
              <div className="highlight-icon-box">
                <FiLayers />
              </div>
              <div className="highlight-text">
                <span className="highlight-title">Full Stack Development</span>
                <span className="highlight-sub">End-to-End Applications</span>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: Interactive 3D Avatar */}
        <div className="hero-3d-visual">
          <div className="avatar-ambient-glow" />
          <div className="avatar-3d-frame">
            <AvatarScene mouseRef={mouseRef} />
          </div>
        </div>
      </div>
    </section>
  );
}

export default Hero;

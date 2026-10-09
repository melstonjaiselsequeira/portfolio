import React, { useState, useEffect } from 'react';
import { FiGithub, FiLinkedin, FiDownload, FiMenu, FiX, FiFileText } from 'react-icons/fi';
import { personalInfo } from '../data/portfolioData';

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('hero');

  const navLinks = [
    { label: 'Home', href: '#hero' },
    { label: 'About', href: '#about' },
    { label: 'Skills', href: '#skills' },
    { label: 'Projects', href: '#projects' },
    { label: 'Education', href: '#education' },
    { label: 'Achievements', href: '#achievements' },
    { label: 'Contact', href: '#contact' },
  ];

  // Scroll spy & background blur on scroll
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 30);

      // Simple active link spy
      const sections = navLinks.map(link => link.href.substring(1));
      const scrollPos = window.scrollY + 200;

      for (let i = sections.length - 1; i >= 0; i--) {
        const sectionEl = document.getElementById(sections[i]);
        if (sectionEl && sectionEl.offsetTop <= scrollPos) {
          setActiveSection(sections[i]);
          break;
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavClick = (e, href) => {
    e.preventDefault();
    setMobileMenuOpen(false);
    const targetEl = document.querySelector(href);
    if (targetEl) {
      targetEl.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header className={`navbar-header ${isScrolled ? 'is-scrolled' : ''}`}>
      <div className="navbar-container">
        {/* Brand Monogram Logo */}
        <a href="#hero" className="navbar-brand" onClick={(e) => handleNavClick(e, '#hero')}>
          <div className="brand-logo-badge">
            <span className="brand-logo-text">MS</span>
            <div className="brand-glow" />
          </div>
          <div className="brand-name-group">
            <span className="brand-name">Melston J. Sequeira</span>
            <span className="brand-tagline">Data & ML Engineer</span>
          </div>
        </a>

        {/* Desktop Navigation Links */}
        <nav className="desktop-nav" aria-label="Main Navigation">
          <ul className="nav-link-list">
            {navLinks.map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  className={`nav-link ${activeSection === link.href.substring(1) ? 'is-active' : ''}`}
                  onClick={(e) => handleNavClick(e, link.href)}
                >
                  {link.label}
                  {activeSection === link.href.substring(1) && <span className="nav-link-indicator" />}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        {/* Action Buttons (Right) */}
        <div className="navbar-actions">
          <a
            href={personalInfo.socials.github}
            target="_blank"
            rel="noopener noreferrer"
            className="nav-icon-btn"
            aria-label="GitHub Profile"
            title="GitHub Profile"
          >
            <FiGithub />
          </a>

          <a
            href={personalInfo.socials.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="nav-icon-btn"
            aria-label="LinkedIn Profile"
            title="LinkedIn Profile"
          >
            <FiLinkedin />
          </a>

          <a
            href={personalInfo.resumeUrl}
            download="Melston_Jaisel_Sequeira_Resume.pdf"
            className="btn-resume-download"
            title="Download Melston's Resume (PDF)"
          >
            <FiDownload className="download-icon" />
            <span>Resume</span>
          </a>

          {/* Mobile Menu Hamburger Toggle */}
          <button
            className="mobile-menu-toggle"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle navigation menu"
            aria-expanded={mobileMenuOpen}
          >
            {mobileMenuOpen ? <FiX /> : <FiMenu />}
          </button>
        </div>
      </div>

      {/* Mobile Animated Dropdown Drawer */}
      <div className={`mobile-nav-drawer ${mobileMenuOpen ? 'is-open' : ''}`}>
        <ul className="mobile-nav-list">
          {navLinks.map((link) => (
            <li key={link.href}>
              <a
                href={link.href}
                className={`mobile-nav-link ${activeSection === link.href.substring(1) ? 'is-active' : ''}`}
                onClick={(e) => handleNavClick(e, link.href)}
              >
                {link.label}
              </a>
            </li>
          ))}
          <li className="mobile-resume-item">
            <a
              href={personalInfo.resumeUrl}
              download="Melston_Jaisel_Sequeira_Resume.pdf"
              className="btn-resume-mobile"
              onClick={() => setMobileMenuOpen(false)}
            >
              <FiDownload />
              <span>Download Resume</span>
            </a>
          </li>
        </ul>
      </div>
    </header>
  );
}

export default Navbar;

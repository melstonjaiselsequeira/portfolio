import React from 'react';
import { FiGithub, FiLinkedin, FiMail, FiArrowUp } from 'react-icons/fi';
import { personalInfo } from '../data/portfolioData';

export function Footer() {
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  return (
    <footer className="footer-section">
      <div className="footer-container">
        {/* Brand & Rights */}
        <div className="footer-brand-col">
          <div className="footer-monogram">
            <span>MS</span>
          </div>
          <div className="footer-text-col">
            <p className="footer-copyright">
              © 2026 Melston Jaisel Sequeira. All rights reserved.
            </p>
            <p className="footer-title">
              Data Engineer | Machine Learning | Software Engineer | Full Stack Developer
            </p>
          </div>
        </div>

        {/* Social Links & Back to Top */}
        <div className="footer-right-col">
          <div className="footer-social-links">
            <a
              href={personalInfo.socials.github}
              target="_blank"
              rel="noopener noreferrer"
              className="footer-social-btn"
              title="GitHub"
              aria-label="GitHub Profile"
            >
              <FiGithub />
            </a>

            <a
              href={personalInfo.socials.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="footer-social-btn"
              title="LinkedIn"
              aria-label="LinkedIn Profile"
            >
              <FiLinkedin />
            </a>

            <a
              href={`mailto:${personalInfo.email}`}
              className="footer-social-btn"
              title="Email Melston"
              aria-label="Send direct email"
            >
              <FiMail />
            </a>
          </div>

          <button
            onClick={scrollToTop}
            className="btn-back-to-top"
            title="Return to top"
            aria-label="Scroll back to top"
          >
            <span>Back to top</span>
            <FiArrowUp />
          </button>
        </div>
      </div>
    </footer>
  );
}

export default Footer;

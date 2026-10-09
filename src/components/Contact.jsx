import React, { useState } from 'react';
import emailjs from '@emailjs/browser';
import { FiMail, FiMapPin, FiPhone , FiSend, FiGithub, FiLinkedin, FiCheckCircle, FiAlertCircle } from 'react-icons/fi';
import { personalInfo } from '../data/portfolioData';

export function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });

  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState('idle'); // 'idle' | 'sending' | 'success' | 'error'
  const [statusMessage, setStatusMessage] = useState('');

  const validate = () => {
    const newErrors = {};
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!formData.name.trim()) {
      newErrors.name = 'Please enter your name.';
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Please enter your email address.';
    } else if (!emailRegex.test(formData.email.trim())) {
      newErrors.email = 'Please provide a valid email format.';
    }

    if (!formData.subject.trim()) {
      newErrors.subject = 'Please enter a subject.';
    }

    if (!formData.message.trim()) {
      newErrors.message = 'Please write a message.';
    } else if (formData.message.trim().length < 10) {
      newErrors.message = 'Message must be at least 10 characters long.';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: '' }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Clear previous success or error message
    setStatus('idle');
    setStatusMessage('');

    if (!validate()) return;

    setStatus('sending');
    setStatusMessage('Sending...');

    const serviceId = import.meta.env.VITE_EMAILJS_SERVICE_ID;
    const templateId = import.meta.env.VITE_EMAILJS_TEMPLATE_ID;
    const publicKey = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;

    // Check if real EmailJS credentials have been supplied
    const hasValidConfig =
      serviceId &&
      templateId &&
      publicKey &&
      serviceId !== 'your_service_id' &&
      templateId !== 'your_template_id' &&
      publicKey !== 'your_public_key';

    if (hasValidConfig) {
      try {
        const templateParams = {
          name: formData.name.trim(),
          email: formData.email.trim(),
          subject: formData.subject.trim(),
          message: formData.message.trim(),
          time: new Date().toLocaleString(),
          reply_to: formData.email.trim(),
        };

        await emailjs.send(serviceId, templateId, templateParams, publicKey);

        setStatus('success');
        setStatusMessage("Message sent successfully! I'll get back to you soon.");
        setFormData({ name: '', email: '', subject: '', message: '' });
      } catch (err) {
        console.error('EmailJS Error:', err);
        setStatus('error');
        setStatusMessage('Unable to send the message. Please try again.');
      }
    } else {
      // Simulation mode when placeholder credentials are in .env
      console.info(
        'EmailJS credentials are using default placeholders in .env. To enable live email delivery to Melston, insert your EmailJS Service, Template, and Public Key.'
      );
      setTimeout(() => {
        setStatus('success');
        setStatusMessage("Message sent successfully! I'll get back to you soon.");
        setFormData({ name: '', email: '', subject: '', message: '' });
      }, 1000);
    }
  };

  return (
    <section id="contact" className="contact-section">
      <div className="section-container">
        {/* Section Header */}
        <div className="section-header-center">
          <div className="section-tag">
            <span className="tag-pulse" />
            <span>COMMUNICATION PORTAL</span>
          </div>
          <h2 className="section-title">LET'S CONNECT</h2>
          <p className="section-subtitle">
            Have a project, opportunity, or idea? Let's build something meaningful together.
          </p>
          <div className="section-line" />
        </div>

        {/* Two-Column Grid */}
        <div className="contact-grid">
          {/* Left Column: Direct Info & Channels */}
          <div className="contact-info-card">
            <div className="info-glow" />

            <div className="info-header">
              <h3 className="info-title">Contact Channels</h3>
              <p className="info-text">
                Reach out for data engineering initiatives, machine learning models, full-stack software development, or research collaborations.
              </p>
            </div>

            <div className="info-items-list">
              <div className="info-item">
                <div className="info-icon-wrapper">
                  <FiMail />
                </div>
                <div className="info-details">
                  <span className="info-label">Direct Email</span>
                  <a href={`mailto:${personalInfo.email}`} className="info-link">
                    {personalInfo.email}
                  </a>
                </div>
              </div>
            <div className="info-item">
              <div className="info-icon-wrapper">
                <FiPhone />
              </div>
              <div className="info-details">
                <span className="info-label">Phone</span>
                <a href="tel:+917337764722" className="info-link">
                +91 73377 64722
                </a>
              </div>
            </div>
              <div className="info-item">
                <div className="info-icon-wrapper">
                  <FiMapPin />
                </div>
                <div className="info-details">
                  <span className="info-label">Current Location</span>
                  <span className="info-val">{personalInfo.location}</span>
                </div>
              </div>
            </div>

            {/* Social Network Badges */}
            <div className="info-socials">
              <span className="socials-label">Connect on Networks:</span>
              <div className="socials-row">
                <a
                  href={personalInfo.socials.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="social-btn"
                  title="GitHub Profile"
                >
                  <FiGithub />
                  <span>GitHub</span>
                </a>

                <a
                  href={personalInfo.socials.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="social-btn"
                  title="LinkedIn Profile"
                >
                  <FiLinkedin />
                  <span>LinkedIn</span>
                </a>
              </div>
            </div>
          </div>

          {/* Right Column: Interactive EmailJS Contact Form */}
          <div className="contact-form-card">
            <div className="form-glow" />

            <form onSubmit={handleSubmit} className="contact-form" noValidate>
              {/* Name Field */}
              <div className="form-row">
              <div className="form-group">
                <label htmlFor="name" className="form-label">
                  Your Name <span className="req-star">*</span>
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="e.g. John Doe"
                  className={`form-input ${errors.name ? 'is-invalid' : ''}`}
                  disabled={status === 'sending'}
                  required
                />
                {errors.name && <span className="form-error">{errors.name}</span>}
              </div>

              {/* Email Field */}
              <div className="form-group">
                <label htmlFor="email" className="form-label">
                  Your Email <span className="req-star">*</span>
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="e.g. name@example.com"
                  className={`form-input ${errors.email ? 'is-invalid' : ''}`}
                  disabled={status === 'sending'}
                  required
                />
                {errors.email && <span className="form-error">{errors.email}</span>}
              </div>
              </div>

              {/* Subject Field */}
              <div className="form-group">
                <label htmlFor="subject" className="form-label">
                  Subject <span className="req-star">*</span>
                </label>
                <input
                  type="text"
                  id="subject"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  placeholder="e.g. Data Pipeline Collaboration"
                  className={`form-input ${errors.subject ? 'is-invalid' : ''}`}
                  disabled={status === 'sending'}
                  required
                />
                {errors.subject && <span className="form-error">{errors.subject}</span>}
              </div>

              {/* Message Field */}
              <div className="form-group">
                <label htmlFor="message" className="form-label">
                  Message <span className="req-star">*</span>
                </label>
                <textarea
                  id="message"
                  name="message"
                  rows={5}
                  value={formData.message}
                  onChange={handleChange}
                  placeholder="Share details regarding your project, system architecture, or inquiry..."
                  className={`form-textarea ${errors.message ? 'is-invalid' : ''}`}
                  disabled={status === 'sending'}
                  required
                />
                {errors.message && <span className="form-error">{errors.message}</span>}
              </div>

              {/* Feedback Alert Status */}
              {status === 'success' && (
                <div className="status-banner banner-success" role="alert">
                  <FiCheckCircle className="banner-icon" />
                  <div>
                    <strong>Message sent successfully!</strong>
                    <p>I'll get back to you soon.</p>
                  </div>
                </div>
              )}

              {status === 'error' && (
                <div className="status-banner banner-error" role="alert">
                  <FiAlertCircle className="banner-icon" />
                  <div>
                    <strong>Unable to send the message.</strong>
                    <p>Please try again or email directly at {personalInfo.email}</p>
                  </div>
                </div>
              )}

              {/* Submit Button */}
              <button
                type="submit"
                className="btn-submit"
                disabled={status === 'sending'}
              >
                <span>{status === 'sending' ? 'Sending...' : 'Send Message'}</span>
                <FiSend className={`submit-icon ${status === 'sending' ? 'icon-spin' : ''}`} />
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Contact;

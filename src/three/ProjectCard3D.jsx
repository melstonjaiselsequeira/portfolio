import React, { useRef, useState, useCallback, useEffect } from 'react';
import { FiGithub, FiExternalLink, FiChevronRight, FiCheckCircle } from 'react-icons/fi';
import { HiSparkles } from 'react-icons/hi';

/**
 * 3D Project Card with interactive cursor tilt, depth layers, and futuristic glow
 */
export function ProjectCard3D({ project, isActive, isReducedMotion }) {
  const cardRef = useRef(null);
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);
  const animationFrameRef = useRef(null);

  // Target values for smooth lerp
  const targetTilt = useRef({ x: 0, y: 0 });
  const currentTilt = useRef({ x: 0, y: 0 });

  // Handle smooth 3D tilt interpolation
  const updateTilt = useCallback(() => {
    if (!isHovered || isReducedMotion || !isActive) {
      targetTilt.current = { x: 0, y: 0 };
    }

    // Smooth lerp
    currentTilt.current.x += (targetTilt.current.x - currentTilt.current.x) * 0.12;
    currentTilt.current.y += (targetTilt.current.y - currentTilt.current.y) * 0.12;

    setTilt({
      x: currentTilt.current.x,
      y: currentTilt.current.y
    });

    if (
      isHovered ||
      Math.abs(currentTilt.current.x) > 0.05 ||
      Math.abs(currentTilt.current.y) > 0.05
    ) {
      animationFrameRef.current = requestAnimationFrame(updateTilt);
    }
  }, [isHovered, isReducedMotion, isActive]);

  const handleMouseMove = (e) => {
    if (!cardRef.current || !isActive || isReducedMotion) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    // Calculate percentage (-1 to 1)
    const normX = (x / rect.width) * 2 - 1;
    const normY = (y / rect.height) * 2 - 1;

    // Max tilt angles: 12deg max
    targetTilt.current = {
      x: normX * 10,
      y: -normY * 10
    };

    if (!animationFrameRef.current) {
      animationFrameRef.current = requestAnimationFrame(updateTilt);
    }
  };

  const handleMouseEnter = () => {
    if (isActive) {
      setIsHovered(true);
      if (!animationFrameRef.current) {
        animationFrameRef.current = requestAnimationFrame(updateTilt);
      }
    }
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
  };

  useEffect(() => {
    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, []);

  // Compute transform style for 3D tilt
  const tiltStyle = isActive && !isReducedMotion
    ? {
        transform: `perspective(1200px) rotateX(${tilt.y.toFixed(2)}deg) rotateY(${tilt.x.toFixed(2)}deg) translateZ(${isHovered ? 20 : 0}px)`,
        transition: isHovered ? 'none' : 'transform 0.5s cubic-bezier(0.2, 0.8, 0.2, 1)',
      }
    : {};

  return (
    <div
      ref={cardRef}
      className={`project-card-3d ${isActive ? 'is-active' : 'is-inactive'} ${isHovered ? 'is-hovered' : ''}`}
      style={tiltStyle}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {/* Ambient glowing border */}
      <div className="card-border-glow" />

      {/* Futuristic Header Bar */}
      <div className="card-top-bar">
        <div className="card-badge">
          <HiSparkles className="badge-sparkle" />
          <span>{project.badge || 'Featured Project'}</span>
        </div>
        <div className="card-id-tag">SYS // {project.id.toUpperCase()}</div>
      </div>

      {/* Image Showcase with 3D Depth Shift */}
      <div className="card-image-wrapper">
        <img
          src={project.image}
          alt={project.title}
          className="card-image"
          style={{
            transform: isHovered && isActive && !isReducedMotion
              ? `scale(1.04) translate(${tilt.x * 0.8}px, ${-tilt.y * 0.8}px)`
              : 'scale(1)',
          }}
          loading="lazy"
        />
        <div className="card-image-overlay" />
        <div className="card-image-scanline" />
      </div>

      {/* Project Content */}
      <div className="card-body">
        <div className="card-title-group">
          <h3 className="card-title">{project.title}</h3>
          <p className="card-subtitle">{project.subtitle}</p>
        </div>

        <p className="card-description">{project.description}</p>

        {project.details && (
          <p className="card-details-text">{project.details}</p>
        )}

        {/* Feature List (for ExpenseFlow) */}
        {project.features && (
          <div className="card-features-grid">
            {project.features.slice(0, 6).map((feat, idx) => (
              <div key={idx} className="card-feature-item">
                <FiCheckCircle className="feat-check" />
                <span>{feat}</span>
              </div>
            ))}
          </div>
        )}

        {/* Tech Stack Pills */}
        <div className="card-tech-stack">
          {project.technologies.map((tech, idx) => (
            <span key={idx} className="tech-tag">
              {tech}
            </span>
          ))}
        </div>

        {/* Action Buttons */}
        <div className="card-actions">
          {project.demo ? (
            <a
              href={project.demo}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-project btn-demo"
            >
              <span>Live Demo</span>
              <FiExternalLink />
            </a>
          ) : (
            <button
              className="btn-project btn-demo disabled-placeholder"
              title="Demo URL will be updated upon production deployment"
              disabled
            >
              <span>Live Demo</span>
              <FiExternalLink />
            </button>
          )}

          {project.github ? (
            <a
              href={project.github}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-project btn-github"
            >
              <FiGithub />
              <span>Source Code</span>
            </a>
          ) : (
            <button
              className="btn-project btn-github disabled-placeholder"
              title="Repository URL will be updated upon public release"
              disabled
            >
              <FiGithub />
              <span>GitHub</span>
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

export default ProjectCard3D;

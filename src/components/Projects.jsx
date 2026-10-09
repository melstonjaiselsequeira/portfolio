import React from 'react';
import { projects } from '../data/portfolioData';
import ProjectOrbit from '../three/ProjectOrbit';

export function Projects() {
  return (
    <section id="projects" className="projects-section">
      <div className="section-container">
        {/* Section Header */}
        <div className="section-header-center">
          <div className="section-tag">
            <span className="tag-pulse" />
            <span>FEATURED IMPLEMENTATIONS</span>
          </div>
          <h2 className="section-title">PROJECT SHOWCASE</h2>
          <p className="section-subtitle">
            Interactive 3D rotating showcase of production and research systems built across Machine Learning, NLP, and Full Stack Architecture.
          </p>
          <div className="section-line" />
        </div>

        {/* 3D Orbit Experience */}
        <div className="orbit-experience-wrapper">
          <ProjectOrbit projects={projects} />
        </div>
      </div>
    </section>
  );
}

export default Projects;

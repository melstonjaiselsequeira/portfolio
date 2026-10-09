import React, { useState } from 'react';
import {
  SiPython,
  SiJavascript,
  SiC,
  SiScikitlearn,
  SiSpacy,
  SiStreamlit,
  SiPandas,
  SiApachekafka,
  SiApacheflink,
  SiMongodb,
  SiMysql,
  SiSqlite,
  SiNodedotjs,
  SiExpress,
  SiFastapi,
  SiReact,
  SiHtml5,
  SiTailwindcss,
  SiGit,
  SiGithub,
  SiVercel,
} from 'react-icons/si';
import {
  TbDatabase,
  TbBrain,
  TbChartDots3,
  TbTargetArrow,
  TbBinaryTree2,
  TbFlame,
  TbApi,
  TbBrandCss3,
  TbBrandJavascript,
  TbDevices,
  TbBrandVscode,
  TbHierarchy2,
  TbBug,
  TbCodeAsterisk,
  TbCloudComputing
} from 'react-icons/tb';
import { FiCpu, FiCode, FiLayers } from 'react-icons/fi';
import { skillCategories } from '../data/portfolioData';

// Map icon strings to safe React components
const iconComponentMap = {
  SiPython: SiPython,
  SiJavascript: SiJavascript,
  SiC: SiC,
  TbDatabase: TbDatabase,
  SiScikitlearn: SiScikitlearn,
  SiSpacy: SiSpacy,
  TbBrain: TbBrain,
  SiStreamlit: SiStreamlit,
  SiPandas: SiPandas,
  TbChartDots3: TbChartDots3,
  TbTargetArrow: TbTargetArrow,
  SiApachekafka: SiApachekafka,
  SiApacheflink: SiApacheflink,
  TbBinaryTree2: TbBinaryTree2,
  SiMongodb: SiMongodb,
  TbFlame: TbFlame,
  SiMysql: SiMysql,
  SiSqlite: SiSqlite,
  SiNodedotjs: SiNodedotjs,
  SiExpress: SiExpress,
  TbApi: TbApi,
  SiFastapi: SiFastapi,
  SiReact: SiReact,
  SiHtml5: SiHtml5,
  TbBrandCss3: TbBrandCss3,
  TbBrandJavascript: TbBrandJavascript,
  TbDevices: TbDevices,
  SiTailwindcss: SiTailwindcss,
  SiGit: SiGit,
  SiGithub: SiGithub,
  TbBrandVscode: TbBrandVscode,
  SiRender: TbCloudComputing,
  SiVercel: SiVercel,
  TbHierarchy2: TbHierarchy2,
  TbBug: TbBug,
  TbCodeAsterisk: TbCodeAsterisk
};

export function Skills() {
  const [selectedCategory, setSelectedCategory] = useState('All');

  const categories = ['All', ...skillCategories.map((c) => c.category)];

  const displayedCategories =
    selectedCategory === 'All'
      ? skillCategories
      : skillCategories.filter((c) => c.category === selectedCategory);

  return (
    <section id="skills" className="skills-section">
      <div className="section-container">
        {/* Section Header */}
        <div className="section-header-center">
          <div className="section-tag">
            <span className="tag-pulse" />
            <span>TECHNICAL CAPABILITIES</span>
          </div>
          <h2 className="section-title">SKILLS & TECHNOLOGIES</h2>
          <p className="section-subtitle">
            Curated verified toolset across Machine Learning, Data Engineering, and Full Stack Architecture.
          </p>
          <div className="section-line" />
        </div>

        {/* Category Filters */}
        <div className="skills-filter-bar">
          {categories.map((cat) => (
            <button
              key={cat}
              className={`filter-btn ${selectedCategory === cat ? 'is-active' : ''}`}
              onClick={() => setSelectedCategory(cat)}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Skill Groups Grid */}
        <div className="skills-grid-wrapper">
          {displayedCategories.map((group) => (
            <div key={group.category} className="skill-category-block">
              <h3 className="category-block-title">
                <span className="cat-bullet" />
                <span>{group.category}</span>
              </h3>

              <div className="skills-card-grid">
                {group.skills.map((skill) => {
                  const IconComp = iconComponentMap[skill.icon] || FiCode;
                  return (
                    <div key={skill.name} className="skill-card-item">
                      <div className="skill-card-glow" />
                      <div className="skill-icon-holder">
                        <IconComp className="skill-icon" />
                      </div>
                      <span className="skill-card-name">{skill.name}</span>
                    </div>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Skills;

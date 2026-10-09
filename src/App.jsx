import React from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Skills from './components/Skills';
import Projects from './components/Projects';
import Education from './components/Education';
import Achievements from './components/Achievements';
import Certifications from './components/Certifications';
import Languages from './components/Languages';
import Contact from './components/Contact';
import Footer from './components/Footer';
import ParticleBackground from './three/ParticleBackground';
import useMousePosition from './hooks/useMousePosition';
import './App.css';

export function App() {
  const { mouseRef } = useMousePosition();

  return (
    <div className="portfolio-app">
      {/* 3D Global Space Particle Background */}
      <ParticleBackground />

      {/* Fixed Glassmorphism Navbar */}
      <Navbar />

      {/* Main Portfolio Sections */}
      <main className="main-content">
        <Hero mouseRef={mouseRef} />
        <About />
        <Skills />
        <Projects />
        <Education />
        <Achievements />
        <Certifications />
        <Languages />
        <Contact />
      </main>

      {/* Minimalist Futuristic Footer */}
      <Footer />
    </div>
  );
}

export default App;

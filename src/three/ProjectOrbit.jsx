import React, { useState, useEffect, useRef, useCallback } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { FiChevronLeft, FiChevronRight, FiMaximize2 } from 'react-icons/fi';
import ProjectCard3D from './ProjectCard3D';
import useReducedMotion from '../hooks/useReducedMotion';

// Background Three.js Cyber Ring Orbit for the 3D Project Stage
function OrbitBackground3D({ prefersReducedMotion }) {
  const ringRef = useRef();
  const particleGroupRef = useRef();

  useFrame((state, delta) => {
    if (prefersReducedMotion) return;
    const time = state.clock.getElapsedTime();
    if (ringRef.current) {
      ringRef.current.rotation.z = time * 0.08;
      ringRef.current.rotation.x = Math.PI / 2.3 + Math.sin(time * 0.4) * 0.04;
    }
    if (particleGroupRef.current) {
      particleGroupRef.current.rotation.y = time * 0.04;
    }
  });

  return (
    <group position={[0, -0.4, -3]}>
      {/* Outer Cyan Cyber Ring */}
      <mesh ref={ringRef}>
        <torusGeometry args={[4.2, 0.02, 16, 100]} />
        <meshBasicMaterial color="#00D2FF" transparent opacity={0.35} />
      </mesh>

      {/* Inner Azure Ring */}
      <mesh rotation={[Math.PI / 2.5, 0.2, 0]}>
        <torusGeometry args={[3.2, 0.015, 16, 80]} />
        <meshBasicMaterial color="#38BDF8" transparent opacity={0.25} />
      </mesh>

      {/* Data Orbit Nodes */}
      <group ref={particleGroupRef}>
        {[0, 1, 2, 3, 4, 5].map((i) => {
          const angle = (i * Math.PI * 2) / 6;
          const r = 3.6;
          return (
            <mesh key={i} position={[Math.cos(angle) * r, 0, Math.sin(angle) * r]}>
              <sphereGeometry args={[0.07, 16, 16]} />
              <meshBasicMaterial color="#00D2FF" />
            </mesh>
          );
        })}
      </group>
    </group>
  );
}

export function ProjectOrbit({ projects }) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const [dragStartX, setDragStartX] = useState(0);
  const [dragOffset, setDragOffset] = useState(0);
  const autoRotateTimerRef = useRef(null);
  const orbitContainerRef = useRef(null);
  const prefersReducedMotion = useReducedMotion();

  const totalProjects = projects.length;

  // Next and Previous navigation handlers
  const nextProject = useCallback(() => {
    setActiveIndex((prev) => (prev + 1) % totalProjects);
  }, [totalProjects]);

  const prevProject = useCallback(() => {
    setActiveIndex((prev) => (prev - 1 + totalProjects) % totalProjects);
  }, [totalProjects]);

  // Automatic slow rotation
  useEffect(() => {
    if (isHovered || prefersReducedMotion || isDragging) {
      if (autoRotateTimerRef.current) clearInterval(autoRotateTimerRef.current);
      return;
    }

    autoRotateTimerRef.current = setInterval(() => {
      nextProject();
    }, 6500); // 6.5s per rotation

    return () => {
      if (autoRotateTimerRef.current) clearInterval(autoRotateTimerRef.current);
    };
  }, [isHovered, prefersReducedMotion, isDragging, nextProject]);

  // Keyboard navigation (ArrowLeft & ArrowRight)
  useEffect(() => {
    const handleKeyDown = (e) => {
      // Only trigger if container is focused or visible in viewport
      const rect = orbitContainerRef.current?.getBoundingClientRect();
      const inView = rect && rect.top < window.innerHeight && rect.bottom > 0;
      if (!inView) return;

      if (e.key === 'ArrowRight') {
        nextProject();
      } else if (e.key === 'ArrowLeft') {
        prevProject();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [nextProject, prevProject]);

  // Mouse wheel navigation
  const handleWheel = useCallback(
    (e) => {
      if (Math.abs(e.deltaX) > 40) {
        if (e.deltaX > 0) nextProject();
        else prevProject();
      }
    },
    [nextProject, prevProject]
  );

  // Drag & Touch handling
  const handleMouseDown = (e) => {
    setIsDragging(true);
    setDragStartX(e.clientX);
    setDragOffset(0);
  };

  const handleMouseMove = (e) => {
    if (!isDragging) return;
    const diff = e.clientX - dragStartX;
    setDragOffset(diff);
  };

  const handleMouseUp = () => {
    if (!isDragging) return;
    if (dragOffset > 70) {
      prevProject();
    } else if (dragOffset < -70) {
      nextProject();
    }
    setIsDragging(false);
    setDragOffset(0);
  };

  const handleTouchStart = (e) => {
    setIsDragging(true);
    setDragStartX(e.touches[0].clientX);
    setDragOffset(0);
  };

  const handleTouchMove = (e) => {
    if (!isDragging) return;
    const diff = e.touches[0].clientX - dragStartX;
    setDragOffset(diff);
  };

  const handleTouchEnd = () => {
    if (!isDragging) return;
    if (dragOffset > 50) {
      prevProject();
    } else if (dragOffset < -50) {
      nextProject();
    }
    setIsDragging(false);
    setDragOffset(0);
  };

  return (
    <div
      ref={orbitContainerRef}
      className="project-orbit-section"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => {
        setIsHovered(false);
        if (isDragging) handleMouseUp();
      }}
      onWheel={handleWheel}
      tabIndex={0}
      role="region"
      aria-label="3D Rotating Project Showcase"
    >
      {/* 3D Background Orbit Stage in Three.js Canvas */}
      <div className="orbit-canvas-background">
        <Canvas camera={{ position: [0, 0, 5], fov: 50 }} style={{ pointerEvents: 'none' }}>
          <ambientLight intensity={0.5} color="#0B203E" />
          <pointLight position={[0, 2, 2]} intensity={1.5} color="#00D2FF" />
          <OrbitBackground3D prefersReducedMotion={prefersReducedMotion} />
        </Canvas>
      </div>

      {/* Orbit 3D Stage */}
      <div
        className="orbit-stage"
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
      >
        <div className="orbit-cards-container">
          {projects.map((project, index) => {
            // Calculate orbital circular path position
            // Angular distance from active item
            let offset = index - activeIndex;
            if (offset > totalProjects / 2) offset -= totalProjects;
            if (offset < -totalProjects / 2) offset += totalProjects;

            const isActive = index === activeIndex;

            // 3D positioning metrics
            // Front active item: scale 1, z 0, x 0, opacity 1
            // Inactive items: scaled down, translated back in z and sideways in x, semi-transparent
            let xOffset = offset * 420 + dragOffset * 0.6;
            let zOffset = Math.abs(offset) * -220;
            let rotateY = offset * -22;
            let scale = isActive ? 1 : 0.82 - Math.abs(offset) * 0.08;
            let opacity = isActive ? 1 : 0.45;
            let zIndex = 10 - Math.abs(offset);

            // Responsive tweak for mobile screens
            if (typeof window !== 'undefined' && window.innerWidth < 768) {
              xOffset = offset * 310 + dragOffset * 0.8;
              zOffset = Math.abs(offset) * -160;
              scale = isActive ? 1 : 0.8;
            }

            const itemStyle = {
              transform: `translate3d(${xOffset}px, 0, ${zOffset}px) rotateY(${rotateY}deg) scale(${scale})`,
              opacity: opacity,
              zIndex: zIndex,
              filter: isActive ? 'drop-shadow(0 20px 40px rgba(0, 210, 255, 0.25))' : 'brightness(0.6) blur(0.8px)',
              pointerEvents: isActive ? 'auto' : 'none',
              transition: isDragging
                ? 'none'
                : 'transform 0.7s cubic-bezier(0.16, 1, 0.3, 1), opacity 0.5s ease, filter 0.5s ease',
            };

            return (
              <div
                key={project.id}
                className={`orbit-item-slot ${isActive ? 'slot-active' : ''}`}
                style={itemStyle}
                onClick={() => {
                  if (!isActive) setActiveIndex(index);
                }}
              >
                <ProjectCard3D
                  project={project}
                  isActive={isActive}
                  isReducedMotion={prefersReducedMotion}
                />
              </div>
            );
          })}
        </div>
      </div>

      {/* Orbit Controls & Navigation Bar */}
      <div className="orbit-controls-bar">
        {/* Previous Button */}
        <button
          className="orbit-nav-btn prev-btn"
          onClick={prevProject}
          aria-label="Previous Project"
        >
          <FiChevronLeft />
        </button>

        {/* Orbit Dots */}
        <div className="orbit-dots">
          {projects.map((proj, idx) => (
            <button
              key={proj.id}
              className={`orbit-dot ${idx === activeIndex ? 'dot-active' : ''}`}
              onClick={() => setActiveIndex(idx)}
              aria-label={`Go to ${proj.title}`}
            >
              <span className="dot-inner" />
            </button>
          ))}
        </div>

        {/* Next Button */}
        <button
          className="orbit-nav-btn next-btn"
          onClick={nextProject}
          aria-label="Next Project"
        >
          <FiChevronRight />
        </button>
      </div>
    </div>
  );
}

export default ProjectOrbit;

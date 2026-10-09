import React, { Suspense, useRef, useState, useEffect, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float } from '@react-three/drei';
import * as THREE from 'three';
import Avatar from './Avatar';
import useReducedMotion from '../hooks/useReducedMotion';

// Floating Futuristic Cyber Elements (geometric shapes, soft rings, subtle grid)
function EnvironmentElements({ prefersReducedMotion }) {
  const ringsRef = useRef();
  const particlesRef = useRef();

  // Floating geometric particles
  const particleCount = 45;
  const positions = useMemo(() => {
    const pos = new Float32Array(particleCount * 3);
    for (let i = 0; i < particleCount; i++) {
      pos[i * 3] = (Math.random() - 0.5) * 8;
      pos[i * 3 + 1] = (Math.random() - 0.5) * 8;
      pos[i * 3 + 2] = (Math.random() - 0.5) * 6 - 1;
    }
    return pos;
  }, []);

  useFrame((state, delta) => {
    const time = state.clock.getElapsedTime();
    if (ringsRef.current && !prefersReducedMotion) {
      ringsRef.current.rotation.z = time * 0.15;
      ringsRef.current.rotation.x = Math.PI / 3 + Math.sin(time * 0.5) * 0.05;
    }
    if (particlesRef.current && !prefersReducedMotion) {
      particlesRef.current.rotation.y = time * 0.05;
    }
  });

  return (
    <group>
      {/* Soft Holographic Rings */}
      <group ref={ringsRef} position={[0, -0.6, -0.5]}>
        <mesh>
          <torusGeometry args={[1.6, 0.015, 16, 80]} />
          <meshBasicMaterial color="#00D2FF" transparent opacity={0.35} />
        </mesh>
        <mesh rotation={[0.4, 0.2, 0]}>
          <torusGeometry args={[2.0, 0.01, 16, 80]} />
          <meshBasicMaterial color="#38BDF8" transparent opacity={0.2} />
        </mesh>
        <mesh rotation={[-0.3, -0.2, 0]}>
          <torusGeometry args={[2.4, 0.008, 16, 80]} />
          <meshBasicMaterial color="#FFB84D" transparent opacity={0.15} />
        </mesh>
      </group>

      {/* Floating Geometric Orbs / Polyhedra */}
      <Float speed={1.5} rotationIntensity={0.6} floatIntensity={0.8}>
        <mesh position={[-1.8, 1.2, -1.2]}>
          <octahedronGeometry args={[0.2, 0]} />
          <meshStandardMaterial color="#00D2FF" wireframe emissive="#00D2FF" emissiveIntensity={0.5} />
        </mesh>
      </Float>

      <Float speed={2.0} rotationIntensity={0.8} floatIntensity={1.0}>
        <mesh position={[1.9, 0.8, -1.0]}>
          <icosahedronGeometry args={[0.22, 0]} />
          <meshStandardMaterial color="#38BDF8" wireframe emissive="#38BDF8" emissiveIntensity={0.6} />
        </mesh>
      </Float>

      <Float speed={1.2} rotationIntensity={0.4} floatIntensity={0.5}>
        <mesh position={[-1.5, -1.2, -0.8]}>
          <dodecahedronGeometry args={[0.16, 0]} />
          <meshStandardMaterial color="#FFB84D" wireframe emissive="#FFB84D" emissiveIntensity={0.3} />
        </mesh>
      </Float>

      {/* Floating Sparkles / Cyan Particles */}
      <points ref={particlesRef}>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            count={particleCount}
            array={positions}
            itemSize={3}
          />
        </bufferGeometry>
        <pointsMaterial
          size={0.06}
          color="#00D2FF"
          transparent
          opacity={0.7}
          blending={THREE.AdditiveBlending}
        />
      </points>

      {/* Subtle Ground Grid */}
      <mesh position={[0, -2.2, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <planeGeometry args={[10, 10, 20, 20]} />
        <meshBasicMaterial color="#0A2540" wireframe transparent opacity={0.25} />
      </mesh>
    </group>
  );
}

// Error Boundary for WebGL/3D errors
class SceneErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    console.warn("AvatarScene 3D error caught by boundary:", error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return this.props.fallback;
    }
    return this.props.children;
  }
}

// Fallback Static Avatar Card for devices without WebGL
function StaticAvatarFallback() {
  return (
    <div className="avatar-fallback-container">
      <div className="avatar-fallback-glow" />
      <div className="avatar-fallback-card">
        <div className="avatar-fallback-icon">
          <svg viewBox="0 0 24 24" width="64" height="64" fill="none" stroke="#00D2FF" strokeWidth="1.5">
            <path d="M12 2a5 5 0 0 1 5 5v3a5 5 0 0 1-10 0V7a5 5 0 0 1 5-5z" />
            <path d="M4 22v-2a6 6 0 0 1 6-6h4a6 6 0 0 1 6 6v2" />
            <circle cx="12" cy="7" r="2" fill="#00D2FF" />
          </svg>
        </div>
        <div className="avatar-fallback-info">
          <h3>Melston Jaisel Sequeira</h3>
          <p className="avatar-fallback-role">Data Engineer &amp; ML Developer</p>
          <div className="avatar-fallback-tags">
            <span>Machine Learning</span>
            <span>Data Pipelines</span>
            <span>Full Stack</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export function AvatarScene({ mouseRef }) {
  const prefersReducedMotion = useReducedMotion();
  const [isMobile, setIsMobile] = useState(false);
  const [webGLSupported, setWebGLSupported] = useState(true);

  // Check WebGL availability
  useEffect(() => {
    try {
      const canvas = document.createElement('canvas');
      const gl = canvas.getContext('webgl') || canvas.getContext('experimental-webgl');
      if (!gl) {
        setWebGLSupported(false);
      }
    } catch (e) {
      setWebGLSupported(false);
    }

    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };

    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  if (!webGLSupported) {
    return <StaticAvatarFallback />;
  }

  return (
    <div className="avatar-canvas-wrapper" style={{ width: '100%', height: '100%', position: 'relative' }}>
      <SceneErrorBoundary fallback={<StaticAvatarFallback />}>
        <Canvas
          camera={{ position: [0, 0, 3.6], fov: 42 }}
          dpr={[1, Math.min(window.devicePixelRatio || 1, 2)]}
          gl={{
            antialias: true,
            powerPreference: 'high-performance',
            alpha: true,
          }}
          style={{ pointerEvents: 'none' }}
        >
          {/* Subtle Ambient & Directional Lighting */}
          <ambientLight intensity={0.7} color="#0B203E" />
          {/* Electric Cyan Key Light */}
          <directionalLight position={[3, 4, 3]} intensity={1.5} color="#00D2FF" />
          {/* Deep Navy/Sapphire Fill Light */}
          <directionalLight position={[-3, 2, -2]} intensity={1.2} color="#1E40AF" />
          {/* Subtle Gold Rim Highlight */}
          <pointLight position={[0, 3, -3]} intensity={0.8} color="#FFB84D" distance={8} />
          {/* Soft Ground Glow */}
          <pointLight position={[0, -2, 1]} intensity={0.6} color="#38BDF8" distance={5} />

          {/* Futuristic Environment (particles, rings, geometry) */}
          <EnvironmentElements prefersReducedMotion={prefersReducedMotion} />

          {/* 3D Developer Avatar */}
          <Suspense fallback={null}>
            <Avatar
              mousePosition={mouseRef}
              isMobile={isMobile}
              prefersReducedMotion={prefersReducedMotion}
            />
          </Suspense>
        </Canvas>
      </SceneErrorBoundary>
    </div>
  );
}

export default AvatarScene;

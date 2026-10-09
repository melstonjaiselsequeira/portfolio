import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { Float, RoundedBox } from '@react-three/drei';
import * as THREE from 'three';

const CYAN = '#00D2FF';
const BLUE = '#38BDF8';
const DARK = '#091B33';

export function Avatar({ mousePosition, isMobile = false, prefersReducedMotion = false }) {
  const head = useRef();
  const body = useRef();
  const eyes = useRef();

  useFrame((state, raw) => {
    const dt = Math.min(raw, 0.05);
    const k = 1 - Math.exp(-6 * dt);
    const px = isMobile ? 0 : (mousePosition?.current?.x || 0);
    const py = isMobile ? 0 : (mousePosition?.current?.y || 0);
    const tx = THREE.MathUtils.clamp(px, -1, 1) * 0.7;
    const ty = -THREE.MathUtils.clamp(py, -1, 1) * 0.35;

    if (head.current) {
      head.current.rotation.y += (tx - head.current.rotation.y) * k;
      head.current.rotation.x += (ty - head.current.rotation.x) * k;
    }
    if (body.current) {
      body.current.rotation.y += (tx * 0.25 - body.current.rotation.y) * k;
      if (!prefersReducedMotion) {
        body.current.position.y = Math.sin(state.clock.elapsedTime * 1.2) * 0.04;
      }
    }
    if (eyes.current && !prefersReducedMotion) {
      const blink = Math.sin(state.clock.elapsedTime * 0.9) > 0.985 ? 0.1 : 1;
      eyes.current.scale.y += (blink - eyes.current.scale.y) * 0.5;
    }
  });

  return (
    <group ref={body} position={[0, -0.6, 0]}>
      <RoundedBox args={[2.2, 0.9, 1]} radius={0.4} position={[0, -0.9, 0]}>
        <meshStandardMaterial color={DARK} metalness={0.6} roughness={0.3} />
      </RoundedBox>

      <mesh position={[0, -0.42, 0.51]}>
        <boxGeometry args={[0.5, 0.05, 0.02]} />
        <meshStandardMaterial color={CYAN} emissive={CYAN} emissiveIntensity={0.6} />
      </mesh>

      <mesh position={[0, -0.25, 0]}>
        <cylinderGeometry args={[0.22, 0.3, 0.4, 24]} />
        <meshStandardMaterial color={DARK} metalness={0.6} roughness={0.3} />
      </mesh>

      <group ref={head} position={[0, 0.45, 0]}>
        <RoundedBox args={[1.2, 1.15, 1.1]} radius={0.35} smoothness={6}>
          <meshStandardMaterial color={DARK} metalness={0.6} roughness={0.3} />
        </RoundedBox>

        <RoundedBox args={[1.0, 0.42, 0.1]} radius={0.12} position={[0, 0.05, 0.53]}>
          <meshStandardMaterial color="#04101F" metalness={0.9} roughness={0.1} />
        </RoundedBox>

        <group ref={eyes} position={[0, 0.05, 0.6]}>
          {[-0.22, 0.22].map((x) => (
            <mesh key={x} position={[x, 0, 0]}>
              <capsuleGeometry args={[0.055, 0.08, 6, 12]} />
              <meshBasicMaterial color={CYAN} toneMapped={false} />
            </mesh>
          ))}
        </group>

        <mesh rotation={[0, 0, Math.PI / 2]} position={[0, 0.1, 0]}>
          <torusGeometry args={[0.66, 0.04, 12, 48, Math.PI]} />
          <meshStandardMaterial color={BLUE} emissive={BLUE} emissiveIntensity={0.5} />
        </mesh>

        {[-0.64, 0.64].map((x) => (
          <mesh key={x} position={[x, 0, 0]} rotation={[0, 0, Math.PI / 2]}>
            <cylinderGeometry args={[0.18, 0.18, 0.12, 24]} />
            <meshStandardMaterial color={CYAN} metalness={0.8} roughness={0.25} />
          </mesh>
        ))}
      </group>
    </group>
  );
}

export default Avatar;

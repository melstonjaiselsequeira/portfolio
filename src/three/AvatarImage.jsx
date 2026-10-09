import React, { useRef, useEffect, useState } from 'react';

/**
 * 2D Avatar with smooth CSS 3D cursor-tracking tilt effect.
 * The image tilts toward the cursor direction using perspective transforms
 * and smooth lerp interpolation via requestAnimationFrame.
 */
export function AvatarImage({ mouseRef, isMobile = false, prefersReducedMotion = false }) {
  const tiltWrapperRef = useRef(null);
  const glowRingRef = useRef(null);
  const imageRef = useRef(null);
  const rafRef = useRef(null);
  const [imgLoaded, setImgLoaded] = useState(false);

  // Smooth lerp targets
  const currentTilt = useRef({ x: 0, y: 0 });
  const targetTilt = useRef({ x: 0, y: 0 });

  useEffect(() => {
    if (prefersReducedMotion) return;

    const animate = () => {
      const mx = mouseRef?.current?.x || 0;
      const my = mouseRef?.current?.y || 0;

      // Map normalized mouse (-1 to 1) → tilt degrees
      // rotateY: positive = right, negative = left
      // rotateX: positive = up, negative = down
      if (!isMobile) {
        targetTilt.current.x = my * -10;  // Pitch (vertical)
        targetTilt.current.y = mx * 14;   // Yaw (horizontal)
      } else {
        targetTilt.current.x = 0;
        targetTilt.current.y = 0;
      }

      // Smooth lerp (6% per frame ≈ natural & fluid)
      const lerpFactor = 0.055;
      currentTilt.current.x += (targetTilt.current.x - currentTilt.current.x) * lerpFactor;
      currentTilt.current.y += (targetTilt.current.y - currentTilt.current.y) * lerpFactor;

      const rx = currentTilt.current.x.toFixed(3);
      const ry = currentTilt.current.y.toFixed(3);

      // Apply 3D tilt to image wrapper
      if (tiltWrapperRef.current) {
        tiltWrapperRef.current.style.transform =
          `perspective(900px) rotateX(${rx}deg) rotateY(${ry}deg)`;
      }

      // Parallax glow ring: shifts subtly in opposite direction (depth illusion)
      if (glowRingRef.current) {
        const px = (mx * -12).toFixed(2);
        const py = (my * 10).toFixed(2);
        glowRingRef.current.style.transform = `translate(${px}px, ${py}px)`;
      }

      rafRef.current = requestAnimationFrame(animate);
    };

    rafRef.current = requestAnimationFrame(animate);
    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [mouseRef, isMobile, prefersReducedMotion]);

  return (
    <div className="avatar2d-scene">
      {/* Depth glow ring behind — parallax layer */}
      <div className="avatar2d-glow-ring" ref={glowRingRef} />

      {/* Secondary ambient glow */}
      <div className="avatar2d-ambient" />

      {/* Floating particles */}
      <div className="avatar2d-particles">
        {[...Array(10)].map((_, i) => (
          <span key={i} className={`av-particle av-p-${i}`} />
        ))}
      </div>

      {/* The tilt-responding image wrapper */}
      <div className="avatar2d-tilt-wrapper" ref={tiltWrapperRef}>
        {/* Inner glow border frame */}
        <div className="avatar2d-frame-border" />

        <img
          ref={imageRef}
          src="/avatar.jpg"
          alt="Melston Jaisel Sequeira"
          className={`avatar2d-image ${imgLoaded ? 'loaded' : ''}`}
          onLoad={() => setImgLoaded(true)}
          draggable={false}
        />

        {/* Subtle scan-line overlay for the futuristic feel */}
        <div className="avatar2d-scanline" />

        {/* Bottom name label */}
        <div className="avatar2d-label">
          <span className="label-dot" />
          <span>Melston Jaisel Sequeira</span>
        </div>
      </div>
    </div>
  );
}

export default AvatarImage;

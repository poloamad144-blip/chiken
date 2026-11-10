import React, { useEffect, useRef, useState } from 'react';

interface Particle {
  id: number;
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  alpha: number;
  color: string;
}

export const CustomCursor: React.FC = () => {
  const cursorRef = useRef<HTMLDivElement>(null);
  const trailRef = useRef<HTMLDivElement>(null);
  const [isHovering, setIsHovering] = useState(false);
  const [isClicking, setIsClicking] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [isTextInput, setIsTextInput] = useState(false);
  const [crumbs, setCrumbs] = useState<Particle[]>([]);
  const [cursorImgSrc, setCursorImgSrc] = useState('./chicken-cursor.png');
  const isEnabledRef = useRef(true);

  useEffect(() => {
    // Only enable on desktop devices with fine pointer (mouse), strictly disable on touchscreen/mobile
    const isFinePointer = window.matchMedia('(pointer: fine)').matches;
    const isTouchDevice = 'ontouchstart' in window || navigator.maxTouchPoints > 0;

    if (!isFinePointer || (isTouchDevice && window.innerWidth < 1024)) {
      isEnabledRef.current = false;
      return;
    }

    const mousePos = { x: -100, y: -100 };
    const trailPos = { x: -100, y: -100 };
    let velX = 0;
    let velY = 0;
    let lastX = 0;
    let lastY = 0;
    let currentTilt = -12; // Base angle (degrees)
    let animationFrameId: number;

    const onMouseMove = (e: MouseEvent) => {
      mousePos.x = e.clientX;
      mousePos.y = e.clientY;
      if (!isVisible) setIsVisible(true);

      // Check what element is under the cursor
      const target = e.target as HTMLElement | null;
      if (target) {
        // Detect text inputs where native I-beam cursor is preferable
        const isText = Boolean(
          target.closest(
            'input[type="text"], input[type="email"], input[type="tel"], input[type="search"], textarea, [contenteditable="true"]'
          )
        );
        setIsTextInput(isText);

        // Detect clickable/interactive elements
        const isInteractive = Boolean(
          target.closest(
            'button, a, [role="button"], input[type="submit"], input[type="button"], select, .cursor-pointer, [data-interactive]'
          )
        );
        setIsHovering(isInteractive);
      }
    };

    const onMouseDown = (e: MouseEvent) => {
      setIsClicking(true);

      // Spawn subtle golden crunch sparkle particles on click
      const newCrumbs: Particle[] = [];
      const colors = ['#F5B82E', '#FFD369', '#FF9F1C', '#C8102E', '#FFF4E5'];
      for (let i = 0; i < 6; i++) {
        const angle = (Math.PI * 2 * i) / 6 + Math.random() * 0.4;
        const speed = 1.2 + Math.random() * 3.0;
        newCrumbs.push({
          id: Date.now() + i,
          x: e.clientX,
          y: e.clientY,
          vx: Math.cos(angle) * speed,
          vy: Math.sin(angle) * speed,
          size: 2 + Math.random() * 2.5,
          alpha: 1,
          color: colors[Math.floor(Math.random() * colors.length)],
        });
      }
      setCrumbs((prev) => [...prev.slice(-12), ...newCrumbs]);
    };

    const onMouseUp = () => {
      setIsClicking(false);
    };

    const onMouseEnter = () => {
      setIsVisible(true);
    };

    const onMouseLeave = () => {
      setIsVisible(false);
    };

    const onTouchStart = () => {
      // Touch interaction detected: instantly disable custom cursor to restore native touch behavior
      isEnabledRef.current = false;
      setIsVisible(false);
    };

    window.addEventListener('mousemove', onMouseMove, { passive: true });
    window.addEventListener('mousedown', onMouseDown, { passive: true });
    window.addEventListener('mouseup', onMouseUp, { passive: true });
    document.addEventListener('mouseenter', onMouseEnter);
    document.addEventListener('mouseleave', onMouseLeave);
    window.addEventListener('touchstart', onTouchStart, { passive: true });

    // High performance RAF loop for buttery smooth 120fps motion without React re-renders
    const render = () => {
      if (!isEnabledRef.current) return;

      // Calculate velocity and speed
      velX = mousePos.x - lastX;
      velY = mousePos.y - lastY;
      lastX = mousePos.x;
      lastY = mousePos.y;
      const speed = Math.sqrt(velX * velX + velY * velY);

      // Lerp trailing halo
      trailPos.x += (mousePos.x - trailPos.x) * 0.2;
      trailPos.y += (mousePos.y - trailPos.y) * 0.2;

      // Rotate slightly according to movement direction
      // Base resting angle is -12deg; dynamic tilt responds smoothly to horizontal velocity
      const targetTilt = -12 + Math.max(-16, Math.min(16, velX * 0.65));
      currentTilt += (targetTilt - currentTilt) * 0.15;

      // Direct DOM update for main chicken cursor (anchored at top-left hotspot)
      if (cursorRef.current) {
        cursorRef.current.style.transform = `translate3d(${mousePos.x}px, ${mousePos.y}px, 0) rotate(${currentTilt}deg)`;
      }

      // Direct DOM update for trailing subtle golden aura
      if (trailRef.current) {
        const glowScale = Math.min(1.6, 1 + speed * 0.015);
        trailRef.current.style.transform = `translate3d(${trailPos.x}px, ${trailPos.y}px, 0) scale(${glowScale})`;
      }

      // Animate and fade out crumbs
      setCrumbs((prev) => {
        if (prev.length === 0) return prev;
        return prev
          .map((c) => ({
            ...c,
            x: c.x + c.vx,
            y: c.y + c.vy + 0.35,
            alpha: c.alpha - 0.045,
          }))
          .filter((c) => c.alpha > 0);
      });

      animationFrameId = requestAnimationFrame(render);
    };

    animationFrameId = requestAnimationFrame(render);

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('mousedown', onMouseDown);
      window.removeEventListener('mouseup', onMouseUp);
      document.removeEventListener('mouseenter', onMouseEnter);
      document.removeEventListener('mouseleave', onMouseLeave);
      window.removeEventListener('touchstart', onTouchStart);
    };
  }, [isVisible]);

  // If touch device or disabled, render nothing
  if (!isEnabledRef.current) {
    return null;
  }

  return (
    <>
      {/* Global CSS to hide default pointer on desktop while preserving clickable interactions */}
      <style>{`
        @media (pointer: fine) and (hover: hover) {
          body, a, button, [role="button"], .cursor-pointer {
            cursor: none !important;
          }
          /* Allow native text beam on actual text inputs */
          input[type="text"], input[type="email"], input[type="tel"], textarea {
            cursor: text !important;
          }
        }
      `}</style>

      {/* Subtle Trailing Golden Glow Aura */}
      <div
        ref={trailRef}
        aria-hidden="true"
        className="fixed top-0 left-0 pointer-events-none z-[9998] -translate-x-1/2 -translate-y-1/2 transition-opacity duration-300 will-change-transform"
        style={{
          opacity: isVisible && !isTextInput ? (isHovering ? 0.85 : 0.45) : 0,
        }}
      >
        <div
          className={`rounded-full blur-md transition-all duration-300 ${
            isHovering
              ? 'w-12 h-12 bg-gradient-to-r from-[#F5B82E]/45 via-[#FFD369]/55 to-[#C8102E]/35 shadow-[0_0_22px_#F5B82E]'
              : 'w-8 h-8 bg-[#F5B82E]/30'
          }`}
        />
      </div>

      {/* Main Fried Chicken Cursor with Image from /chicken-cursor.png */}
      <div
        ref={cursorRef}
        aria-hidden="true"
        className="fixed top-0 left-0 pointer-events-none z-[9999] will-change-transform transition-opacity duration-200"
        style={{
          opacity: isVisible ? (isTextInput ? 0.35 : 1) : 0,
        }}
      >
        <div
          className={`relative transition-transform duration-150 origin-top-left ${
            isClicking
              ? 'scale-[0.84]'
              : isHovering
              ? 'scale-[1.24]'
              : 'scale-100'
          }`}
          style={{
            transformOrigin: '2px 4px', // Pin cursor tip to exact pointer location
            filter: isHovering
              ? 'drop-shadow(0 0 12px rgba(245, 184, 46, 0.95)) drop-shadow(0 0 20px rgba(200, 16, 46, 0.55))'
              : 'drop-shadow(0 0 8px rgba(245, 184, 46, 0.65)) drop-shadow(0 2px 6px rgba(0, 0, 0, 0.75))',
          }}
        >
          {/* User's Existing Fried Chicken Image (~45px) */}
          <img
            src={cursorImgSrc}
            onError={() => {
              if (cursorImgSrc === './chicken-cursor.png') {
                setCursorImgSrc('/chicken-cursor.png');
              } else if (cursorImgSrc === '/chicken-cursor.png') {
                setCursorImgSrc('./chicken-cursor.png.png');
              } else if (cursorImgSrc === './chicken-cursor.png.png') {
                setCursorImgSrc('/chicken-cursor.png.png');
              }
            }}
            alt="Fried Chicken Cursor"
            draggable={false}
            className="w-[45px] h-auto object-contain select-none pointer-events-none block"
            style={{
              maxWidth: '45px',
              imageRendering: 'auto',
            }}
          />

          {/* Interactive Golden Sparkle on Hover */}
          {isHovering && (
            <div className="absolute -top-1 -right-1 w-2.5 h-2.5 rounded-full bg-[#FFD369] shadow-[0_0_8px_#F5B82E] animate-ping pointer-events-none" />
          )}
        </div>
      </div>

      {/* Golden Crunch Particles Flying on Click */}
      {crumbs.map((crumb) => (
        <div
          key={crumb.id}
          className="fixed pointer-events-none rounded-full z-[9999]"
          style={{
            left: `${crumb.x}px`,
            top: `${crumb.y}px`,
            width: `${crumb.size}px`,
            height: `${crumb.size}px`,
            backgroundColor: crumb.color,
            opacity: crumb.alpha,
            boxShadow: `0 0 6px ${crumb.color}`,
            transform: 'translate(-50%, -50%)',
          }}
        />
      ))}
    </>
  );
};

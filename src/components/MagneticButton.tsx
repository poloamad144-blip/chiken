import React, { useRef, useState, useEffect } from 'react';

interface MagneticButtonProps {
  children: React.ReactNode;
  onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
  variant?: 'primary' | 'secondary' | 'glass';
  className?: string;
  magneticPull?: number; // 0 to 1, default 0.35
  glowColor?: 'gold' | 'red' | 'both';
  type?: 'button' | 'submit' | 'reset';
  ariaLabel?: string;
}

export const MagneticButton: React.FC<MagneticButtonProps> = ({
  children,
  onClick,
  variant = 'primary',
  className = '',
  magneticPull = 0.35,
  glowColor = 'both',
  type = 'button',
  ariaLabel,
}) => {
  const buttonRef = useRef<HTMLButtonElement>(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);
  const [isPressed, setIsPressed] = useState(false);
  const [glowPos, setGlowPos] = useState({ x: 50, y: 50 });
  const [isTouchDevice, setIsTouchDevice] = useState(false);

  useEffect(() => {
    setIsTouchDevice('ontouchstart' in window || navigator.maxTouchPoints > 0);
  }, []);

  const handleMouseMove = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (isTouchDevice || !buttonRef.current) return;

    const rect = buttonRef.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;

    const deltaX = (e.clientX - centerX) * magneticPull;
    const deltaY = (e.clientY - centerY) * magneticPull;

    // Track relative position for inner light reflection
    const relX = ((e.clientX - rect.left) / rect.width) * 100;
    const relY = ((e.clientY - rect.top) / rect.height) * 100;

    setPosition({ x: deltaX, y: deltaY });
    setGlowPos({ x: relX, y: relY });
  };

  const handleMouseEnter = () => {
    if (!isTouchDevice) setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    setPosition({ x: 0, y: 0 });
  };

  const handleMouseDown = () => {
    setIsPressed(true);
  };

  const handleMouseUp = () => {
    setIsPressed(false);
  };

  // Base variant styles
  let variantStyles = '';
  if (variant === 'primary') {
    variantStyles =
      'bg-gradient-to-r from-[#C8102E] via-[#A00B22] to-[#800718] text-white border border-[#F5B82E]/50 shadow-[0_10px_35px_-5px_rgba(200,16,46,0.55),0_0_20px_-3px_rgba(245,184,46,0.35)] hover:border-[#F5B82E] hover:shadow-[0_15px_45px_-5px_rgba(200,16,46,0.7),0_0_30px_rgba(245,184,46,0.5)]';
  } else if (variant === 'secondary') {
    variantStyles =
      'bg-[#14080B]/90 hover:bg-[#1F0C10] text-[#FFF4E5] border-2 border-white/15 hover:border-[#F5B82E] hover:text-[#F5B82E] shadow-[0_8px_30px_rgba(0,0,0,0.7)] hover:shadow-[0_0_30px_rgba(245,184,46,0.3)] backdrop-blur-md';
  } else {
    variantStyles =
      'bg-white/5 hover:bg-white/10 text-white border border-white/20 hover:border-[#F5B82E] backdrop-blur-md';
  }

  return (
    <button
      ref={buttonRef}
      type={type}
      aria-label={ariaLabel}
      onClick={onClick}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onMouseDown={handleMouseDown}
      onMouseUp={handleMouseUp}
      style={{
        transform: `translate3d(${position.x}px, ${position.y}px, 0) scale(${
          isPressed ? 0.94 : isHovered ? 1.03 : 1
        })`,
        transition: isHovered
          ? 'transform 0.12s cubic-bezier(0.25, 1, 0.5, 1), box-shadow 0.3s ease, border-color 0.3s ease'
          : 'transform 0.5s cubic-bezier(0.34, 1.56, 0.64, 1), box-shadow 0.3s ease, border-color 0.3s ease',
      }}
      className={`group relative overflow-hidden select-none btn-chamfer font-heading tracking-wider cursor-pointer inline-flex items-center justify-center will-change-transform ${variantStyles} ${className}`}
    >
      {/* Specular Radial Glow following mouse inside button */}
      {isHovered && (
        <span
          className="absolute inset-0 pointer-events-none transition-opacity duration-300"
          style={{
            background: `radial-gradient(circle 120px at ${glowPos.x}% ${glowPos.y}%, rgba(245, 184, 46, 0.35), transparent 70%)`,
          }}
        />
      )}

      {/* Shimmering Sheen Ribbon */}
      <span className="absolute -inset-full top-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -skew-x-12 group-hover:translate-x-[200%] transition-transform duration-1000 ease-out pointer-events-none" />

      {/* Button Content with subtle inner parallax */}
      <span
        style={{
          transform: `translate3d(${position.x * 0.4}px, ${position.y * 0.4}px, 0)`,
          transition: isHovered ? 'transform 0.1s ease-out' : 'transform 0.5s cubic-bezier(0.34, 1.56, 0.64, 1)',
        }}
        className="relative z-10 flex items-center justify-center gap-3 w-full h-full pointer-events-none"
      >
        {children}
      </span>
    </button>
  );
};

import React, { useEffect, useRef } from 'react';

interface Particle {
  x: number;
  y: number;
  radius: number;
  alpha: number;
  speedY: number;
  speedX: number;
  wobbleSpeed: number;
  wobbleDistance: number;
  angle: number;
  color: string;
  glow: number;
}

export const GoldenParticles: React.FC<{ count?: number; className?: string }> = ({
  count = 42,
  className = '',
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    // Check for prefers-reduced-motion
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      return;
    }

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animId = 0;
    let width = (canvas.width = canvas.parentElement?.clientWidth || window.innerWidth);
    let height = (canvas.height = canvas.parentElement?.clientHeight || window.innerHeight);

    const colors = [
      'rgba(245, 184, 46, ',   // Signature Gold
      'rgba(255, 211, 105, ',  // Bright Gold
      'rgba(255, 234, 167, ',  // Golden Cream
      'rgba(226, 132, 19, ',   // Deep Crispy Amber
      'rgba(200, 16, 46, ',    // Crimson Embers
    ];

    const particles: Particle[] = [];

    const createParticle = (initialY?: number): Particle => ({
      x: Math.random() * width,
      y: initialY !== undefined ? initialY : Math.random() * height,
      radius: Math.random() * 2.2 + 0.8,
      alpha: Math.random() * 0.7 + 0.2,
      speedY: Math.random() * 0.45 + 0.15,
      speedX: (Math.random() - 0.5) * 0.3,
      wobbleSpeed: Math.random() * 0.02 + 0.01,
      wobbleDistance: Math.random() * 1.5 + 0.5,
      angle: Math.random() * Math.PI * 2,
      color: colors[Math.floor(Math.random() * colors.length)],
      glow: Math.random() > 0.6 ? 8 : 4,
    });

    for (let i = 0; i < count; i++) {
      particles.push(createParticle());
    }

    // Mouse drift interaction
    let mouseX = width / 2;
    let mouseY = height / 2;
    let targetDriftX = 0;
    let currentDriftX = 0;

    const handleMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouseX = e.clientX - rect.left;
      mouseY = e.clientY - rect.top;
      targetDriftX = ((mouseX - width / 2) / width) * 0.4;
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = canvas.parentElement?.clientWidth || window.innerWidth;
      height = canvas.height = canvas.parentElement?.clientHeight || window.innerHeight;
    };

    window.addEventListener('resize', handleResize);

    // Animation render loop
    const render = () => {
      ctx.clearRect(0, 0, width, height);

      currentDriftX += (targetDriftX - currentDriftX) * 0.05;

      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];

        p.angle += p.wobbleSpeed;
        p.x += Math.sin(p.angle) * p.wobbleDistance + p.speedX + currentDriftX;
        p.y -= p.speedY;

        // Reset if drifted off screen
        if (p.y < -10) {
          p.y = height + 10;
          p.x = Math.random() * width;
        }
        if (p.x < -10) p.x = width + 10;
        if (p.x > width + 10) p.x = -10;

        // Draw glowing particle
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fillStyle = `${p.color}${p.alpha})`;
        ctx.shadowColor = '#F5B82E';
        ctx.shadowBlur = p.glow;
        ctx.fill();
      }

      animId = requestAnimationFrame(render);
    };

    animId = requestAnimationFrame(render);

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('resize', handleResize);
    };
  }, [count]);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className={`absolute inset-0 pointer-events-none select-none z-0 ${className}`}
    />
  );
};

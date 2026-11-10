import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'motion/react';
import { ArrowRight, Sparkles, Flame, ChevronDown, Volume2, ShieldCheck, Award } from 'lucide-react';
import { GoldenParticles } from './GoldenParticles';
import { MagneticButton } from './MagneticButton';
import { InteractiveChickenHero } from './InteractiveChickenHero';
import { MenuItem } from '../types/restaurant';

interface HeroProps {
  onExploreMenu: () => void;
  onOrderNow: () => void;
  onAddToCart?: (item: MenuItem) => void;
  onOpenProductModal?: (item: MenuItem) => void;
}

export const Hero: React.FC<HeroProps> = ({
  onExploreMenu,
  onOrderNow,
  onAddToCart,
  onOpenProductModal,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);

  // Parallax scroll interactions
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end start'],
  });

  const heroScale = useTransform(scrollYProgress, [0, 1], [1, 0.92]);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.85], [1, 0.15]);
  const textTranslateY = useTransform(scrollYProgress, [0, 1], [0, -60]);
  const visualTranslateY = useTransform(scrollYProgress, [0, 1], [0, 45]);
  const bgGlowTranslateY = useTransform(scrollYProgress, [0, 1], [0, 80]);

  return (
    <section
      ref={containerRef}
      id="hero"
      className="relative min-h-[96vh] pt-28 sm:pt-32 md:pt-36 pb-16 sm:pb-24 flex flex-col justify-between items-center overflow-hidden bg-gradient-to-b from-[#070405] via-[#120508] to-[#080304]"
    >
      {/* =========================================================================
          LAYER A: CINEMATIC BURGUNDY & OBSIDIAN AMBIENT LIGHTING WITH PARTICLES
         ========================================================================= */}
      <div className="absolute inset-0 pointer-events-none select-none overflow-hidden">
        {/* Base dark backdrop */}
        <div className="absolute inset-0 bg-[#070405]" />

        {/* Floating Golden Seasoning & Ember Particles */}
        <GoldenParticles count={38} className="z-[1]" />

        {/* Cinematic Deep Crimson & Burgundy Radial Spotlight */}
        <motion.div
          style={{ y: bgGlowTranslateY }}
          initial={{ opacity: 0, scale: 0.85 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.4, ease: [0.16, 1, 0.3, 1] }}
          className="absolute top-1/4 left-1/3 -translate-x-1/2 -translate-y-1/2 w-[650px] sm:w-[950px] lg:w-[1300px] h-[450px] sm:h-[650px] lg:h-[800px] bg-gradient-to-b from-[#C8102E]/35 via-[#92051C]/25 to-transparent blur-[140px] rounded-full"
        />

        {/* Secondary Golden Hearth Rim Light on top right */}
        <motion.div
          animate={{
            opacity: [0.18, 0.32, 0.18],
            scale: [0.95, 1.06, 0.95],
          }}
          transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
          className="absolute top-1/5 right-[8%] w-[380px] lg:w-[550px] h-[380px] lg:h-[550px] bg-[#F5B82E]/18 blur-[130px] rounded-full"
        />

        {/* Bottom Left Deep Burgundy Radiance */}
        <div className="absolute -bottom-24 -left-20 w-[450px] h-[450px] bg-[#750717]/30 blur-[130px] rounded-full" />

        {/* Subtle Luxury Mesh Grid Vignette */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_transparent_30%,_#070405_95%)] pointer-events-none" />

        {/* Vertical Decorative Typography on Far Left Edge (Desktop only) */}
        <div className="hidden 2xl:flex absolute left-8 top-1/2 -translate-y-1/2 flex-col items-center gap-4 text-white/20 z-10">
          <div className="w-px h-16 bg-gradient-to-b from-transparent via-[#F5B82E]/40 to-white/10" />
          <span className="font-heading text-xs tracking-[0.35em] uppercase [writing-mode:vertical-lr] text-[#F5B82E]/40">
            ARTISANAL POULTRY • 98dB CRUNCH
          </span>
          <div className="w-px h-16 bg-gradient-to-t from-transparent via-[#C8102E]/40 to-white/10" />
        </div>

        {/* Rotating Circular Seal (Top Right Desktop Accent) */}
        <div className="hidden xl:block absolute top-28 right-10 z-10 opacity-60 hover:opacity-100 transition-opacity">
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 25, repeat: Infinity, ease: 'linear' }}
            className="w-24 h-24 rounded-full border border-[#F5B82E]/30 p-1 flex items-center justify-center relative"
          >
            <svg viewBox="0 0 100 100" className="w-full h-full fill-current text-[#F5B82E] text-[9px] font-heading tracking-[0.22em] uppercase">
              <path
                id="sealPath"
                d="M 50, 50 m -36, 0 a 36,36 0 1,1 72,0 a 36,36 0 1,1 -72,0"
                fill="none"
              />
              <text>
                <textPath href="#sealPath" startOffset="0%">
                  ★ CHIKEN PREMIER RESTAURANT ★ EST 2024
                </textPath>
              </text>
            </svg>
            <Award className="w-5 h-5 text-[#F5B82E] absolute" />
          </motion.div>
        </div>
      </div>

      {/* =========================================================================
          LAYER B: FOREGROUND HERO CONTENT (Two-Column Master Grid)
         ========================================================================= */}
      <motion.div
        style={{
          opacity: heroOpacity,
          scale: heroScale,
        }}
        className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full z-10 my-auto"
      >
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-8 xl:gap-12 items-center">

          {/* -------------------------------------------------------------------
              LEFT COLUMN: LUXURY TYPOGRAPHY & CINEMATIC HEADLINE
             ------------------------------------------------------------------- */}
          <motion.div
            style={{ y: textTranslateY }}
            className="lg:col-span-7 flex flex-col justify-center text-left"
          >
            {/* Top Eyebrow Tag */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.7, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
              className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-gradient-to-r from-[#C8102E]/25 via-[#92051C]/15 to-transparent border border-[#C8102E]/50 text-[#F5B82E] w-fit mb-6 shadow-xl backdrop-blur-md"
            >
              <Flame className="w-4 h-4 text-[#C8102E] animate-pulse" />
              <span className="font-heading tracking-[0.25em] text-xs sm:text-sm font-bold uppercase text-[#FFF4E5]">
                THE HOME OF CRISPY PERFECTION
              </span>
              <span className="w-1.5 h-1.5 rounded-full bg-[#F5B82E] animate-ping" />
            </motion.div>

            {/* Main Headline: Exactly requested text with cinematic reveal */}
            <div className="flex flex-col gap-1 sm:gap-2">
              {/* Line 1: NOT JUST CHICKEN. */}
              <div className="overflow-hidden">
                <motion.h1
                  initial={{ opacity: 0, y: 40 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
                  className="font-heading text-4xl sm:text-6xl md:text-7xl lg:text-8xl tracking-tight uppercase text-white font-black leading-none drop-shadow-md"
                >
                  NOT JUST CHICKEN.
                </motion.h1>
              </div>

              {/* Line 2: IT'S AN EXPERIENCE. */}
              <div className="overflow-hidden">
                <motion.h1
                  initial={{ opacity: 0, y: 40 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.9, delay: 0.45, ease: [0.16, 1, 0.3, 1] }}
                  className="font-heading text-5xl sm:text-7xl md:text-8xl lg:text-9xl tracking-tight uppercase font-black leading-none pt-1"
                >
                  <span className="text-[#FFF4E5]">IT'S AN </span>
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#FFF0B8] via-[#F5B82E] to-[#E28413] drop-shadow-[0_4px_35px_rgba(245,184,46,0.55)]">
                    EXPERIENCE.
                  </span>
                </motion.h1>
              </div>
            </div>

            {/* Elegant Subtitle / Manifesto */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.65, ease: [0.16, 1, 0.3, 1] }}
              className="mt-6 text-base sm:text-lg lg:text-xl text-[#FFF4E5]/80 max-w-xl font-normal leading-relaxed font-sans"
            >
              Step into an extraordinary world of artisanal crunch. Submerged in a 24-hour buttermilk brine, hand-dredged in 14 secret whole spices, and fried to acoustic golden ecstasy at 98 decibels.
            </motion.p>

            {/* Primary Magnetic CTA Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 25 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.8, ease: [0.16, 1, 0.3, 1] }}
              className="mt-8 sm:mt-10 flex flex-wrap items-center gap-4 sm:gap-6"
            >
              {/* ORDER NOW Magnetic CTA */}
              <MagneticButton
                variant="primary"
                onClick={onOrderNow}
                className="px-8 sm:px-10 py-4 text-xl sm:text-2xl"
                ariaLabel="Order Now for delivery or pickup"
              >
                <Sparkles className="w-5 h-5 text-[#F5B82E] group-hover:rotate-45 transition-transform duration-300" />
                <span className="font-extrabold tracking-widest">ORDER NOW</span>
                <span className="relative flex items-center">
                  <ArrowRight className="w-5 h-5 text-[#F5B82E] group-hover:translate-x-1.5 transition-transform duration-300" />
                </span>
              </MagneticButton>

              {/* EXPLORE MENU Magnetic CTA */}
              <MagneticButton
                variant="secondary"
                onClick={onExploreMenu}
                className="px-8 sm:px-9 py-4 text-xl sm:text-2xl"
                ariaLabel="Explore our complete crispy menu"
              >
                <span className="tracking-wider">EXPLORE MENU</span>
                <span className="text-[#F5B82E] group-hover:translate-x-1 transition-transform duration-300">
                  &rarr;
                </span>
              </MagneticButton>
            </motion.div>

            {/* Signature Trust & Craftsmanship Indicators */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.9, delay: 0.95 }}
              className="mt-10 pt-6 border-t border-white/10 flex flex-wrap items-center gap-6 text-xs sm:text-sm text-white/70"
            >
              <div className="flex items-center gap-2 group/metric">
                <Volume2 className="w-4 h-4 text-[#F5B82E]" />
                <span className="text-white font-medium">98dB Acoustic Decibels</span>
              </div>
              <div className="flex items-center gap-2 group/metric">
                <ShieldCheck className="w-4 h-4 text-[#C8102E]" />
                <span className="text-white font-medium">24h Signature Buttermilk Brine</span>
              </div>
              <div className="flex items-center gap-2 group/metric">
                <span className="w-2 h-2 rounded-full bg-[#F5B82E] animate-pulse" />
                <span className="text-white font-medium">100% Never-Frozen Farm Chicken</span>
              </div>
            </motion.div>
          </motion.div>

          {/* -------------------------------------------------------------------
              RIGHT COLUMN: INTERACTIVE FRIED CHICKEN VISUAL SHOWCASE
             ------------------------------------------------------------------- */}
          <motion.div
            style={{ y: visualTranslateY }}
            initial={{ opacity: 0, scale: 0.92 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-5 relative w-full flex items-center justify-center"
          >
            <InteractiveChickenHero
              onAddToCart={onAddToCart}
              onOpenDetails={onOpenProductModal}
              onOrderNow={onOrderNow}
            />
          </motion.div>

        </div>
      </motion.div>

      {/* =========================================================================
          LAYER C: SCROLL TO EXPLORE INDICATOR WITH SEAMLESS TRANSITION
         ========================================================================= */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 1.15 }}
        className="relative z-20 pt-6 sm:pt-4 flex flex-col items-center cursor-pointer group"
        onClick={onExploreMenu}
      >
        <span className="font-heading tracking-[0.28em] text-xs text-white/50 group-hover:text-[#F5B82E] transition-colors uppercase flex items-center gap-1.5">
          <span>SCROLL TO EXPLORE</span>
        </span>
        <motion.div
          animate={{ y: [0, 6, 0] }}
          transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut' }}
          className="mt-2 p-1.5 rounded-full bg-white/5 border border-white/10 group-hover:border-[#F5B82E]/60 group-hover:text-[#F5B82E] text-white/60 transition-all shadow-lg"
        >
          <ChevronDown className="w-4 h-4" />
        </motion.div>
      </motion.div>

      {/* Seamless Gradient Fade Seam into Next Section */}
      <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-[#0B0B0B] to-transparent pointer-events-none -z-0" />
    </section>
  );
};

import React, { useState, useRef, useEffect } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'motion/react';
import { Sparkles, Volume2, Plus, Flame, Check, ShieldCheck, ChevronRight } from 'lucide-react';
import { ASSET_BUCKET, ASSET_FLYING_DRUMSTICK, ASSET_CRUNCH_BOX, MENU_ITEMS } from '../data/menuData';
import { MenuItem } from '../types/restaurant';

interface InteractiveChickenHeroProps {
  onAddToCart?: (item: MenuItem) => void;
  onOpenDetails?: (item: MenuItem) => void;
  onOrderNow?: () => void;
}

export const InteractiveChickenHero: React.FC<InteractiveChickenHeroProps> = ({
  onAddToCart,
  onOpenDetails,
  onOrderNow,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);
  const [activeTab, setActiveTab] = useState<'bucket' | 'drumstick' | 'box'>('bucket');
  const [activePin, setActivePin] = useState<number | null>(null);
  const [isAddedAnimation, setIsAddedAnimation] = useState(false);

  // Motion values for ultra-smooth 3D mouse parallax
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  // Smooth spring physics for organic motion
  const springConfig = { damping: 25, stiffness: 180, mass: 0.6 };
  const smoothMouseX = useSpring(mouseX, springConfig);
  const smoothMouseY = useSpring(mouseY, springConfig);

  // 3D rotations and translations
  const rotateX = useTransform(smoothMouseY, [-0.5, 0.5], [12, -12]);
  const rotateY = useTransform(smoothMouseX, [-0.5, 0.5], [-16, 16]);
  const glareX = useTransform(smoothMouseX, [-0.5, 0.5], [20, 80]);
  const glareY = useTransform(smoothMouseY, [-0.5, 0.5], [20, 80]);
  const cardX = useTransform(smoothMouseX, [-0.5, 0.5], [-12, 12]);
  const cardY = useTransform(smoothMouseY, [-0.5, 0.5], [-12, 12]);
  const shadowScale = useTransform(smoothMouseY, [-0.5, 0.5], [0.92, 1.08]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    mouseX.set(x);
    mouseY.set(y);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    setActivePin(null);
    mouseX.set(0);
    mouseY.set(0);
  };

  // Products available in visual showcase
  const productsMap = {
    bucket: {
      item: MENU_ITEMS.find((i) => i.id === 'classic-chiken-bucket') || MENU_ITEMS[0],
      image: ASSET_BUCKET,
      tag: 'MASTER FEAST',
      title: 'SIGNATURE CRUNCH BUCKET',
      subtitle: '9 Succulent Pieces · 2 Family Fries · 4 Buns · 4 Dips',
      price: 495,
      crunchDecibels: '98dB',
      pins: [
        { id: 1, x: '28%', y: '35%', label: 'Triple-Floured Crunch', detail: '98dB acoustic glass-like ridges' },
        { id: 2, x: '72%', y: '42%', label: '24h Buttermilk Infusion', detail: '14 hand-ground secret aromatics' },
        { id: 3, x: '50%', y: '68%', label: '100% Never Frozen', detail: 'Farm-fresh cut steam-sealed at 75°C' },
      ],
    },
    drumstick: {
      item: MENU_ITEMS.find((i) => i.id === 'crunch-box') || MENU_ITEMS[0],
      image: ASSET_FLYING_DRUMSTICK,
      tag: 'ACOUSTIC SHOWCASE',
      title: 'GOLDEN FLYING DRUMSTICK',
      subtitle: 'Hand-Dredged Artisanal Cut · Micro-Crust Flakes · Deep Flavor',
      price: 265,
      crunchDecibels: '99dB',
      pins: [
        { id: 1, x: '35%', y: '28%', label: 'Jagged Micro-Flakes', detail: 'Hand-dredged for maximum shatter' },
        { id: 2, x: '68%', y: '55%', label: 'Deep Flavor To Bone', detail: '24h secret buttermilk brine' },
        { id: 3, x: '30%', y: '72%', label: 'Whole Farm Integrity', detail: 'Pressure cooked to seal juices' },
      ],
    },
    box: {
      item: MENU_ITEMS.find((i) => i.id === 'crunch-box') || MENU_ITEMS[0],
      image: ASSET_CRUNCH_BOX,
      tag: 'SOLO CHAMPION',
      title: 'THE CRUNCH BOX',
      subtitle: '3 Crispy Pieces · 2 Golden Tenders · Crinkles · Slaw · 2 Dips',
      price: 265,
      crunchDecibels: '98dB',
      pins: [
        { id: 1, x: '30%', y: '32%', label: 'Signature Tenders', detail: 'Zero cartilage whole breast tenders' },
        { id: 2, x: '70%', y: '38%', label: 'Crinkle Fries', detail: 'Dusted with proprietary red seasoning' },
        { id: 3, x: '48%', y: '65%', label: 'Handmade Slaw', detail: 'Tangy crunch contrast to golden fry' },
      ],
    },
  };

  const activeProduct = productsMap[activeTab];

  const handleQuickAdd = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsAddedAnimation(true);
    setTimeout(() => setIsAddedAnimation(false), 1600);

    if (onAddToCart && activeProduct.item) {
      onAddToCart(activeProduct.item);
    } else if (onOrderNow) {
      onOrderNow();
    }
  };

  return (
    <div
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={handleMouseLeave}
      className="relative w-full max-w-[560px] mx-auto select-none perspective-[1200px]"
      style={{ perspective: '1200px' }}
    >
      {/* Cut / Showcase Switcher Tabs */}
      <div className="flex items-center justify-center gap-2 mb-4 relative z-30">
        {(['bucket', 'drumstick', 'box'] as const).map((tab) => (
          <button
            key={tab}
            type="button"
            onClick={() => setActiveTab(tab)}
            className={`btn-chamfer-sm px-3.5 py-1.5 text-xs font-heading tracking-widest uppercase transition-all duration-300 cursor-pointer ${
              activeTab === tab
                ? 'bg-gradient-to-r from-[#C8102E] to-[#92051C] text-white border border-[#F5B82E] shadow-[0_0_15px_rgba(245,184,46,0.4)] scale-105'
                : 'bg-[#15090C]/80 hover:bg-[#250F14] text-white/60 hover:text-white border border-white/10'
            }`}
          >
            {tab === 'bucket' ? 'SIGNATURE BUCKET' : tab === 'drumstick' ? 'FLYING DRUMSTICK' : 'CRUNCH BOX'}
          </button>
        ))}
      </div>

      {/* Main 3D Floating Stage */}
      <motion.div
        style={{
          rotateX,
          rotateY,
          transformStyle: 'preserve-3d',
        }}
        className="relative will-change-transform"
      >
        {/* Multi-layered Ambient Backlights */}
        <div className="absolute inset-0 pointer-events-none -z-10">
          {/* Pulsing Crimson Flare */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[380px] sm:w-[480px] h-[380px] sm:h-[480px] rounded-full bg-gradient-to-tr from-[#C8102E]/45 via-[#92051C]/30 to-transparent blur-[90px] animate-pulse" />

          {/* Golden Hearth Rim Flare */}
          <div className="absolute top-1/3 right-0 w-[280px] sm:w-[350px] h-[280px] sm:h-[350px] rounded-full bg-[#F5B82E]/25 blur-[80px]" />
        </div>

        {/* Floating Chicken Visual Container */}
        <motion.div
          animate={{
            y: [-8, 8, -8],
            rotate: [-1.2, 1.2, -1.2],
          }}
          transition={{
            duration: 6,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
          className="relative rounded-3xl overflow-hidden bg-gradient-to-b from-[#1E0B10] via-[#120608] to-[#0A0405] border border-white/15 shadow-[0_30px_70px_-10px_rgba(0,0,0,0.95),0_0_40px_-5px_rgba(200,16,46,0.35)] group transition-all duration-500"
          style={{
            transformStyle: 'preserve-3d',
          }}
        >
          {/* Top Badge Overlay */}
          <div className="absolute top-4 left-4 z-20 flex items-center gap-2">
            <span className="px-3 py-1 rounded-full bg-[#0E0608]/90 backdrop-blur-md border border-[#F5B82E]/50 text-[#F5B82E] font-heading text-xs tracking-widest uppercase flex items-center gap-1.5 shadow-lg">
              <Sparkles className="w-3.5 h-3.5 text-[#F5B82E] animate-spin" style={{ animationDuration: '6s' }} />
              {activeProduct.tag}
            </span>
          </div>

          {/* 98dB Acoustic Decibel Visualizer Badge (Top Right) */}
          <div className="absolute top-4 right-4 z-20 bg-[#0E0608]/90 backdrop-blur-md border border-[#C8102E]/60 rounded-xl px-3 py-1.5 shadow-xl flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-[#C8102E] to-[#92051C] flex items-center justify-center font-heading text-sm text-white font-bold border border-[#F5B82E]/40 shadow-inner">
              {activeProduct.crunchDecibels}
            </div>
            <div>
              <div className="flex items-center gap-1">
                <Volume2 className="w-3 h-3 text-[#F5B82E]" />
                <p className="font-heading text-xs text-white leading-none tracking-wider">
                  ACOUSTIC CRUNCH
                </p>
              </div>
              <div className="flex items-center gap-0.5 mt-1">
                {[6, 12, 18, 10, 16, 22, 14, 8].map((h, i) => (
                  <span
                    key={i}
                    className="w-1 bg-gradient-to-t from-[#C8102E] to-[#F5B82E] rounded-full inline-block animate-pulse"
                    style={{
                      height: `${h * 0.55}px`,
                      animationDelay: `${i * 0.12}s`,
                    }}
                  />
                ))}
              </div>
            </div>
          </div>

          {/* Chicken Food Photograph */}
          <div className="relative aspect-[4/3] sm:aspect-[16/11] overflow-hidden">
            <motion.img
              key={activeTab}
              src={activeProduct.image}
              alt={activeProduct.title}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: isHovered ? 1.05 : 1 }}
              transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
              className="w-full h-full object-cover object-center transition-transform duration-700 pointer-events-none"
            />

            {/* Cinematic Gradient Vignette Overlay for rich contrast */}
            <div className="absolute inset-0 bg-gradient-to-t from-[#0A0405] via-[#0A0405]/30 to-transparent pointer-events-none" />

            {/* Mouse-Driven Specular Glare/Light Ray */}
            <motion.div
              style={{
                background: `radial-gradient(circle 280px at ${glareX}% ${glareY}%, rgba(255, 235, 180, 0.22), transparent 75%)`,
              }}
              className="absolute inset-0 pointer-events-none mix-blend-screen"
            />

            {/* Interactive Craftsmanship Hotspot Pins */}
            {activeProduct.pins.map((pin) => (
              <div
                key={pin.id}
                style={{ left: pin.x, top: pin.y }}
                className="absolute z-30 -translate-x-1/2 -translate-y-1/2"
              >
                <button
                  type="button"
                  onClick={() => setActivePin(activePin === pin.id ? null : pin.id)}
                  onMouseEnter={() => setActivePin(pin.id)}
                  className="relative group/pin p-2 cursor-pointer focus:outline-none"
                  aria-label={pin.label}
                >
                  {/* Glowing Radar Rings */}
                  <span className="absolute inset-0 rounded-full bg-[#F5B82E]/40 animate-ping" />
                  <span className="relative w-4 h-4 rounded-full bg-gradient-to-tr from-[#C8102E] to-[#F5B82E] border-2 border-white flex items-center justify-center shadow-[0_0_12px_#F5B82E]">
                    <span className="w-1.5 h-1.5 rounded-full bg-white" />
                  </span>
                </button>

                {/* Hotspot Floating Tooltip */}
                {activePin === pin.id && (
                  <motion.div
                    initial={{ opacity: 0, y: 8, scale: 0.9 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 4 }}
                    className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 w-48 p-2.5 rounded-xl bg-[#0F0709]/95 backdrop-blur-xl border border-[#F5B82E]/50 shadow-2xl z-40 pointer-events-none text-left"
                  >
                    <p className="font-heading text-xs text-[#F5B82E] tracking-wider uppercase">
                      {pin.label}
                    </p>
                    <p className="font-sans text-[11px] text-[#FFF4E5]/90 mt-0.5 leading-snug">
                      {pin.detail}
                    </p>
                  </motion.div>
                )}
              </div>
            ))}
          </div>

          {/* Golden Sheen Edge Highlight */}
          <div className="absolute inset-0 border border-gradient-to-b from-[#F5B82E]/30 via-transparent to-[#C8102E]/30 rounded-3xl pointer-events-none" />
        </motion.div>

        {/* Realistic Floor Contact Shadow (Breathes with Floating Chicken) */}
        <motion.div
          style={{ scale: shadowScale }}
          className="w-[85%] h-6 mx-auto -mt-2 bg-black/80 blur-xl rounded-full pointer-events-none"
        />

        {/* Elegant Floating Product Information Card (3D Forward Depth) */}
        <motion.div
          style={{
            x: cardX,
            y: cardY,
            transform: 'translateZ(45px)',
          }}
          className="relative -mt-10 sm:-mt-14 mx-3 sm:mx-6 p-4 sm:p-5 rounded-2xl bg-[#110609]/92 backdrop-blur-xl border border-white/20 shadow-[0_20px_50px_rgba(0,0,0,0.9),0_0_30px_rgba(200,16,46,0.25)] z-30 transition-all duration-300"
        >
          <div className="flex items-start justify-between gap-4">
            <div className="flex-1">
              <div className="flex items-center gap-2">
                <Flame className="w-4 h-4 text-[#C8102E]" />
                <h3 className="font-heading text-xl sm:text-2xl text-white tracking-wider leading-none">
                  {activeProduct.title}
                </h3>
              </div>
              <p className="font-sans text-xs text-[#FFF4E5]/75 mt-1.5 leading-relaxed line-clamp-2">
                {activeProduct.subtitle}
              </p>

              {/* Craftsmanship Chips */}
              <div className="flex flex-wrap items-center gap-2 mt-3">
                <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md bg-white/5 border border-white/10 text-[10px] font-sans text-white/80">
                  <ShieldCheck className="w-3 h-3 text-[#F5B82E]" />
                  24h Buttermilk Infused
                </span>
                <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md bg-[#C8102E]/20 border border-[#C8102E]/40 text-[10px] font-sans text-[#FFDF78]">
                  Triple-Dredged Flakes
                </span>
              </div>
            </div>

            {/* Price & Quick Add Action */}
            <div className="flex flex-col items-end shrink-0">
              <div className="flex items-baseline gap-1">
                <span className="font-heading text-2xl sm:text-3xl text-[#F5B82E] font-black tabular-nums">
                  {activeProduct.price}
                </span>
                <span className="font-heading text-xs text-white/70">EGP</span>
              </div>

              {/* Quick Add Button */}
              <button
                type="button"
                onClick={handleQuickAdd}
                className="btn-chamfer-sm mt-3 px-4 py-2 bg-gradient-to-r from-[#C8102E] to-[#92051C] hover:from-[#e01435] hover:to-[#a30620] text-white font-heading text-sm tracking-wider shadow-lg shadow-[#C8102E]/40 border border-[#F5B82E]/50 hover:border-[#F5B82E] flex items-center gap-1.5 cursor-pointer active:scale-95 transition-all"
              >
                {isAddedAnimation ? (
                  <>
                    <Check className="w-4 h-4 text-[#F5B82E] animate-bounce" />
                    <span>ADDED!</span>
                  </>
                ) : (
                  <>
                    <Plus className="w-4 h-4 text-[#F5B82E]" />
                    <span>ADD TO ORDER</span>
                  </>
                )}
              </button>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
};

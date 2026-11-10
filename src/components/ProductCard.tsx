import React, { useState, useRef } from 'react';
import { motion } from 'motion/react';
import { Plus, Flame, Sparkles, Check, Eye, Volume2, ShieldCheck } from 'lucide-react';
import { MenuItem } from '../types/restaurant';

interface ProductCardProps {
  product: MenuItem;
  onAddToCart: (product: MenuItem) => void;
  onOpenDetails: (product: MenuItem) => void;
}

export const ProductCard: React.FC<ProductCardProps> = ({
  product,
  onAddToCart,
  onOpenDetails,
}) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const [justAdded, setJustAdded] = useState(false);
  const [rotateX, setRotateX] = useState(0);
  const [rotateY, setRotateY] = useState(0);
  const [glare, setGlare] = useState({ x: 50, y: 50, opacity: 0 });
  const [isHovered, setIsHovered] = useState(false);

  // 3D Parallax Tilt calculation on mouse move
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    const rX = ((y - centerY) / centerY) * -7; // Max tilt 7deg
    const rY = ((x - centerX) / centerX) * 7;

    setRotateX(rX);
    setRotateY(rY);
    setGlare({
      x: (x / rect.width) * 100,
      y: (y / rect.height) * 100,
      opacity: 0.18,
    });
  };

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    setRotateX(0);
    setRotateY(0);
    setGlare({ x: 50, y: 50, opacity: 0 });
  };

  const handleAddClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (justAdded) return;
    onAddToCart(product);
    setJustAdded(true);
    setTimeout(() => setJustAdded(false), 1200);
  };

  // Category label formatter
  const getCategoryLabel = (category: string) => {
    switch (category) {
      case 'boxes':
        return 'CHIKEN BOX';
      case 'burgers':
        return 'BRIOCHE BURGER';
      case 'meals':
        return 'CRISPY MEAL';
      case 'sides':
        return 'ARTISAN SIDE';
      case 'sauces':
        return 'HOUSE DIP';
      case 'drinks':
        return 'COLD BEVERAGE';
      default:
        return category.toUpperCase();
    }
  };

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onClick={() => onOpenDetails(product)}
      style={{
        transform: `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateZ(${
          isHovered ? 8 : 0
        }px)`,
        transition: isHovered
          ? 'transform 0.1s ease-out, box-shadow 0.3s ease, border-color 0.3s ease'
          : 'transform 0.5s cubic-bezier(0.2, 0.8, 0.2, 1), box-shadow 0.4s ease, border-color 0.4s ease',
      }}
      className="group relative bg-gradient-to-b from-[#180E10] via-[#12080A] to-[#0A0406] rounded-3xl overflow-hidden border border-white/10 hover:border-[#F5B82E]/50 flex flex-col justify-between hover:shadow-[0_25px_50px_-10px_rgba(200,16,46,0.35),0_0_25px_rgba(245,184,46,0.2)] cursor-pointer will-change-transform select-none"
    >
      {/* Specular Radial Glare Overlay */}
      <div
        className="absolute inset-0 pointer-events-none z-20 transition-opacity duration-300"
        style={{
          background: `radial-gradient(circle 260px at ${glare.x}% ${glare.y}%, rgba(245, 184, 46, ${glare.opacity}), transparent 75%)`,
        }}
      />

      {/* Top Subtle Golden Edge Glow */}
      <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-[#F5B82E]/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-20" />

      {/* =========================================================================
          MEDIA SLOT: HIGH-RES FOOD PHOTOGRAPHY & FLOATING BADGES
         ========================================================================= */}
      <div className="relative h-60 sm:h-64 lg:h-68 overflow-hidden bg-[#0A0506]">
        {/* Product Image */}
        <img
          src={product.image}
          alt={product.name}
          referrerPolicy="no-referrer"
          className="w-full h-full object-cover transform group-hover:scale-108 transition-transform duration-700 ease-out pointer-events-none"
          onError={(e) => {
            e.currentTarget.style.display = 'none';
          }}
        />

        {/* Cinematic Vignette Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#12080A] via-[#12080A]/20 to-black/35 pointer-events-none" />

        {/* Top Badges Bar */}
        <div className="absolute top-3.5 left-3.5 right-3.5 flex items-center justify-between gap-2 z-10 pointer-events-none">
          {/* Category Tag or Custom Badge */}
          {product.badge ? (
            <span className="btn-chamfer-sm font-heading tracking-widest text-xs px-3 py-1 bg-gradient-to-r from-[#C8102E] to-[#92051C] text-white font-bold shadow-lg border border-[#F5B82E]/40">
              {product.badge}
            </span>
          ) : (
            <span className="btn-chamfer-sm font-heading tracking-widest text-[11px] px-2.5 py-1 bg-[#0E0608]/90 backdrop-blur-md text-[#F5B82E] border border-white/10 uppercase">
              {getCategoryLabel(product.category)}
            </span>
          )}

          {/* Acoustic 98dB Badge for Signatures */}
          {product.isSignature && (
            <div className="btn-chamfer-sm flex items-center gap-1 bg-[#0E0608]/90 backdrop-blur-md px-2 py-0.5 border border-[#F5B82E]/40 text-[#F5B82E] text-[10px] font-heading tracking-wider shadow-md">
              <Volume2 className="w-3 h-3 text-[#F5B82E]" />
              <span>98dB</span>
            </div>
          )}

          {/* Spiciness Level Tag */}
          {product.spiciness !== undefined && product.spiciness > 0 && (
            <div className="btn-chamfer-sm flex items-center gap-1 bg-[#0E0608]/90 backdrop-blur-md px-2.5 py-1 border border-white/10 text-[11px] font-semibold text-[#F5B82E] shadow-md">
              <Flame
                className={`w-3.5 h-3.5 ${
                  product.spiciness >= 3
                    ? 'text-[#C8102E] animate-pulse'
                    : product.spiciness === 2
                    ? 'text-[#F5B82E]'
                    : 'text-amber-300'
                }`}
              />
              <span className="font-heading tracking-wider">
                {product.spiciness === 1
                  ? 'MILD'
                  : product.spiciness === 2
                  ? 'SPICY'
                  : 'GHOST FIRE'}
              </span>
            </div>
          )}
        </div>

        {/* Quick View Hover Cue Button (Desktop) */}
        <div className="hidden sm:flex absolute inset-0 bg-black/40 backdrop-blur-[3px] opacity-0 group-hover:opacity-100 transition-opacity duration-300 items-center justify-center pointer-events-none z-10">
          <span className="btn-chamfer font-heading text-sm text-[#FFF4E5] tracking-widest bg-[#0F0608]/95 px-5 py-2.5 border border-[#F5B82E]/60 flex items-center gap-2 shadow-2xl group-hover:scale-105 transition-transform">
            <Eye className="w-4 h-4 text-[#F5B82E]" />
            QUICK VIEW
          </span>
        </div>
      </div>

      {/* =========================================================================
          CONTENT BODY: METADATA, TITLE, DESCRIPTION & PRICE
         ========================================================================= */}
      <div className="p-5 sm:p-6 flex-1 flex flex-col justify-between relative z-10">
        <div>
          {/* Metadata Chips (Pieces / Calories) */}
          <div className="flex flex-wrap items-center gap-2 mb-2">
            {product.pieces && (
              <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md bg-white/5 border border-white/10 text-[10px] font-sans font-medium text-[#F5B82E]">
                <span className="w-1.5 h-1.5 rounded-full bg-[#C8102E]" />
                {product.pieces}
              </span>
            )}
            {product.calories && (
              <span className="text-[11px] font-sans text-white/50">
                {product.calories} kcal
              </span>
            )}
          </div>

          {/* Product Title */}
          <h3 className="font-heading text-2xl sm:text-3xl tracking-wide text-white group-hover:text-[#F5B82E] transition-colors leading-tight mb-2 uppercase line-clamp-1">
            {product.name}
          </h3>

          {/* Description */}
          <p className="text-xs sm:text-sm text-[#FFF4E5]/75 line-clamp-2 leading-relaxed font-sans mb-5">
            {product.description}
          </p>
        </div>

        {/* =========================================================================
            BOTTOM ACTION BAR: PRICE & INTERACTIVE ADD TO CART BUTTON
           ========================================================================= */}
        <div className="pt-4 border-t border-white/10 flex items-center justify-between gap-3">
          {/* Price Tag */}
          <div className="flex flex-col shrink-0">
            <span className="text-[10px] text-white/40 uppercase tracking-widest font-sans font-medium">
              Price
            </span>
            <div className="flex items-baseline gap-1">
              <span className="font-heading text-2xl sm:text-3xl text-[#F5B82E] tracking-wider tabular-nums font-black leading-none">
                {product.price}
              </span>
              <span className="text-xs text-white/70 font-sans font-medium">
                EGP
              </span>
            </div>
          </div>

          {/* Tactile Chamfered Add Button */}
          <button
            type="button"
            onClick={handleAddClick}
            className={`btn-chamfer-sm btn-sheen relative px-4 sm:px-5 py-2.5 text-white font-heading text-sm sm:text-base tracking-wider flex items-center gap-1.5 transition-all duration-200 cursor-pointer shadow-lg active:scale-95 shrink-0 ${
              justAdded
                ? 'bg-emerald-600 border border-emerald-400 text-white shadow-emerald-600/50'
                : 'bg-gradient-to-r from-[#C8102E] via-[#A00B22] to-[#800718] hover:from-[#d91233] hover:to-[#a80620] border border-[#F5B82E]/50 hover:border-[#F5B82E] shadow-[#C8102E]/40 hover:shadow-[0_0_20px_rgba(245,184,46,0.35)]'
            }`}
            title={`Add ${product.name} to order`}
            aria-label={`Add ${product.name} to order`}
          >
            {justAdded ? (
              <>
                <Check className="w-4 h-4 text-white animate-bounce" />
                <span className="font-bold tracking-wider">ADDED!</span>
              </>
            ) : (
              <>
                <Plus className="w-4 h-4 text-[#F5B82E] group-hover:rotate-90 transition-transform duration-300" />
                <span className="font-bold tracking-wider">ADD TO CART</span>
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

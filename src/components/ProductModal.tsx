import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Flame, Plus, Minus, ShoppingBag, Check, Sparkles, Volume2, ShieldCheck, Utensils } from 'lucide-react';
import { MenuItem } from '../types/restaurant';

interface ProductModalProps {
  product: MenuItem | null;
  onClose: () => void;
  onAddToCartWithOptions: (
    product: MenuItem,
    quantity: number,
    spiceLevel?: 'Mild' | 'Hot' | 'Ghost Spicy',
    sauce?: string,
    notes?: string
  ) => void;
}

export const ProductModal: React.FC<ProductModalProps> = ({
  product,
  onClose,
  onAddToCartWithOptions,
}) => {
  const [quantity, setQuantity] = useState(1);
  const [spiceLevel, setSpiceLevel] = useState<'Mild' | 'Hot' | 'Ghost Spicy'>('Hot');
  const [selectedSauce, setSelectedSauce] = useState('');
  const [specialNotes, setSpecialNotes] = useState('');
  const [isAdded, setIsAdded] = useState(false);

  // Reset state whenever product changes
  useEffect(() => {
    if (product) {
      setQuantity(1);
      setSpiceLevel(
        product.spiciness && product.spiciness >= 2
          ? 'Hot'
          : product.spiciness === 1
          ? 'Mild'
          : 'Hot'
      );
      setSelectedSauce(
        product.includedDips && product.includedDips.length > 0
          ? product.includedDips[0]
          : 'Signature CHIKEN Dip'
      );
      setSpecialNotes('');
      setIsAdded(false);
    }
  }, [product]);

  // Lock body scroll while modal is active
  useEffect(() => {
    if (product) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [product]);

  if (!product) return null;

  const sauceOptions = [
    'Signature CHIKEN Dip',
    'Golden Honey Mustard',
    'Garlic Mayo Crush',
    'Smoky Hickory BBQ',
    'Ghost Fire Hot Sauce',
  ];

  const handleAdd = () => {
    setIsAdded(true);
    setTimeout(() => {
      onAddToCartWithOptions(
        product,
        quantity,
        product.category !== 'drinks' && product.category !== 'sauces' ? spiceLevel : undefined,
        product.category === 'boxes' || product.category === 'meals' || product.category === 'burgers'
          ? selectedSauce
          : undefined,
        specialNotes.trim() || undefined
      );
      onClose();
    }, 450);
  };

  const totalPrice = product.price * quantity;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.25 }}
        onClick={onClose}
        className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/85 backdrop-blur-md overflow-y-auto"
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.94, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.94, y: 20 }}
          transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
          onClick={(e) => e.stopPropagation()}
          className="relative w-full max-w-2xl bg-gradient-to-b from-[#1C0F12] via-[#140A0D] to-[#0A0406] border border-[#F5B82E]/40 rounded-3xl overflow-hidden shadow-[0_25px_70px_rgba(0,0,0,0.95),0_0_35px_rgba(200,16,46,0.3)] flex flex-col max-h-[92vh] my-auto"
        >
          {/* Close Button */}
          <button
            type="button"
            onClick={onClose}
            className="absolute top-4 right-4 z-30 p-2.5 rounded-full bg-black/70 hover:bg-[#C8102E] border border-white/20 hover:border-[#F5B82E] text-white/90 hover:text-white transition-all cursor-pointer shadow-xl group"
            aria-label="Close product view"
          >
            <X className="w-5 h-5 group-hover:rotate-90 transition-transform duration-200" />
          </button>

          {/* Scrollable Modal Body */}
          <div className="overflow-y-auto flex-1">
            {/* Food Photography Header */}
            <div className="relative h-64 sm:h-76 w-full bg-[#070304] overflow-hidden">
              <img
                src={product.image}
                alt={product.name}
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#1C0F12] via-[#1C0F12]/30 to-black/40 pointer-events-none" />

              {/* Floating Badges */}
              <div className="absolute top-4 left-4 flex flex-wrap items-center gap-2 z-10">
                {product.badge && (
                  <span className="btn-chamfer-sm font-heading tracking-widest text-xs px-3.5 py-1.5 bg-gradient-to-r from-[#C8102E] to-[#92051C] text-white font-bold shadow-xl border border-[#F5B82E]/50">
                    {product.badge}
                  </span>
                )}
                {product.isSignature && (
                  <span className="btn-chamfer-sm font-heading tracking-widest text-xs px-3 py-1.5 bg-[#0B0507]/90 text-[#F5B82E] border border-[#F5B82E]/40 flex items-center gap-1.5 backdrop-blur-md">
                    <Volume2 className="w-3.5 h-3.5 text-[#F5B82E]" />
                    98dB ACOUSTIC CRUNCH
                  </span>
                )}
              </div>

              {/* Price Tag Highlight on Header */}
              <div className="absolute bottom-4 right-4 z-10 bg-[#0E0608]/90 backdrop-blur-md px-3.5 py-1.5 rounded-xl border border-[#F5B82E]/40 flex items-baseline gap-1 shadow-2xl">
                <span className="font-heading text-3xl sm:text-4xl text-[#F5B82E] font-black tabular-nums leading-none">
                  {product.price}
                </span>
                <span className="text-xs font-sans text-white/70 font-semibold">EGP</span>
              </div>
            </div>

            {/* Product Information Body */}
            <div className="p-6 sm:p-8 space-y-6">
              {/* Title & Craftsmanship Chips */}
              <div>
                <h2 className="font-heading text-3xl sm:text-4xl text-white tracking-wide uppercase leading-tight">
                  {product.name}
                </h2>

                <div className="mt-2.5 flex flex-wrap items-center gap-3 text-xs text-white/70">
                  {product.pieces && (
                    <span className="flex items-center gap-1.5 text-[#F5B82E] font-semibold">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#C8102E]" />
                      {product.pieces}
                    </span>
                  )}
                  {product.calories && (
                    <>
                      <span className="text-white/30">·</span>
                      <span className="text-white/60">{product.calories} Calories</span>
                    </>
                  )}
                  <span className="text-white/30">·</span>
                  <span className="flex items-center gap-1 text-white/80">
                    <ShieldCheck className="w-3.5 h-3.5 text-[#F5B82E]" />
                    24h Buttermilk Marinated
                  </span>
                </div>

                <p className="mt-4 text-sm sm:text-base text-[#FFF4E5]/80 leading-relaxed font-sans">
                  {product.description}
                </p>
              </div>

              {/* Customization: Heat Level (for food items) */}
              {product.category !== 'drinks' && product.category !== 'sauces' && (
                <div className="space-y-3 pt-4 border-t border-white/10">
                  <div className="flex items-center justify-between">
                    <label className="font-heading text-lg sm:text-xl tracking-wider text-white flex items-center gap-2">
                      <Flame className="w-4 h-4 text-[#C8102E]" />
                      CHOOSE YOUR HEAT LEVEL
                    </label>
                    <span className="text-xs font-sans text-[#F5B82E]">Selected: {spiceLevel}</span>
                  </div>

                  <div className="grid grid-cols-3 gap-2.5 sm:gap-3">
                    {(['Mild', 'Hot', 'Ghost Spicy'] as const).map((lvl) => {
                      const isSelected = spiceLevel === lvl;
                      return (
                        <button
                          key={lvl}
                          type="button"
                          onClick={() => setSpiceLevel(lvl)}
                          className={`btn-chamfer-sm p-3 border text-center transition-all flex flex-col items-center justify-center gap-1 cursor-pointer ${
                            isSelected
                              ? 'bg-gradient-to-r from-[#C8102E]/30 to-[#92051C]/30 border-[#F5B82E] text-white shadow-lg shadow-[#C8102E]/30 scale-[1.02]'
                              : 'bg-white/5 border-white/10 text-white/70 hover:border-white/30 hover:bg-white/10'
                          }`}
                        >
                          <div className="flex items-center gap-1.5">
                            <Flame
                              className={`w-4 h-4 ${
                                lvl === 'Ghost Spicy'
                                  ? 'text-[#C8102E]'
                                  : lvl === 'Hot'
                                  ? 'text-[#F5B82E]'
                                  : 'text-amber-300'
                              }`}
                            />
                            <span className="font-heading text-base tracking-wide">{lvl}</span>
                          </div>
                          <span className="text-[10px] text-white/50 font-sans">
                            {lvl === 'Mild'
                              ? 'Gentle seasoning'
                              : lvl === 'Hot'
                              ? 'Signature kick'
                              : 'Ghost pepper fire'}
                          </span>
                        </button>
                      );
                    })}
                  </div>
                </div>
              )}

              {/* Customization: Complimentary Artisan Dip (for boxes, meals, burgers) */}
              {(product.category === 'boxes' ||
                product.category === 'meals' ||
                product.category === 'burgers') && (
                <div className="space-y-3 pt-4 border-t border-white/10">
                  <label className="block font-heading text-lg sm:text-xl tracking-wider text-white">
                    SELECT COMPLIMENTARY ARTISAN DIP
                  </label>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    {sauceOptions.map((sauce) => {
                      const isSelected = selectedSauce === sauce;
                      return (
                        <button
                          key={sauce}
                          type="button"
                          onClick={() => setSelectedSauce(sauce)}
                          className={`p-3 rounded-xl border text-left text-xs sm:text-sm font-medium transition-all flex items-center justify-between cursor-pointer ${
                            isSelected
                              ? 'bg-[#F5B82E]/15 border-[#F5B82E] text-[#FFF4E5] shadow-md'
                              : 'bg-white/5 border-white/10 text-white/70 hover:border-white/20 hover:bg-white/10'
                          }`}
                        >
                          <span>{sauce}</span>
                          {isSelected && <Check className="w-4 h-4 text-[#F5B82E]" />}
                        </button>
                      );
                    })}
                  </div>
                </div>
              )}

              {/* Special Instructions Note */}
              <div className="pt-4 border-t border-white/10">
                <label className="block font-heading text-sm tracking-wider text-white/80 mb-2">
                  SPECIAL KITCHEN INSTRUCTIONS (OPTIONAL)
                </label>
                <input
                  type="text"
                  value={specialNotes}
                  onChange={(e) => setSpecialNotes(e.target.value)}
                  placeholder="e.g., Extra napkins, dip on side, well done crispy..."
                  className="w-full px-4 py-3 rounded-xl bg-black/50 border border-white/15 text-white text-sm focus:outline-none focus:border-[#F5B82E] placeholder:text-white/30"
                />
              </div>
            </div>
          </div>

          {/* =========================================================================
              MODAL FOOTER: QUANTITY SELECTOR & MASTER ADD TO CART BUTTON
             ========================================================================= */}
          <div className="p-4 sm:p-6 bg-[#0E0608] border-t border-white/15 flex items-center justify-between gap-4 z-20">
            {/* Quantity Controls */}
            <div className="flex items-center gap-2 sm:gap-3 bg-white/5 rounded-2xl border border-white/10 p-1.5 shrink-0">
              <button
                type="button"
                onClick={() => setQuantity(Math.max(1, quantity - 1))}
                className="w-10 h-10 rounded-xl hover:bg-white/10 flex items-center justify-center text-white transition-colors cursor-pointer active:scale-95"
                aria-label="Decrease quantity"
              >
                <Minus className="w-4 h-4" />
              </button>
              <span className="font-heading text-2xl text-white w-7 text-center tabular-nums">
                {quantity}
              </span>
              <button
                type="button"
                onClick={() => setQuantity(quantity + 1)}
                className="w-10 h-10 rounded-xl hover:bg-white/10 flex items-center justify-center text-white transition-colors cursor-pointer active:scale-95"
                aria-label="Increase quantity"
              >
                <Plus className="w-4 h-4" />
              </button>
            </div>

            {/* Master Add To Cart Button */}
            <button
              type="button"
              onClick={handleAdd}
              className={`flex-1 btn-chamfer btn-sheen py-4 px-6 text-white font-heading text-lg sm:text-xl tracking-wider shadow-2xl flex items-center justify-between cursor-pointer active:scale-98 transition-all duration-200 ${
                isAdded
                  ? 'bg-emerald-600 border border-emerald-400'
                  : 'bg-gradient-to-r from-[#C8102E] via-[#A00B22] to-[#800718] hover:from-[#d91233] hover:to-[#a80620] border border-[#F5B82E]/50 hover:border-[#F5B82E] shadow-[#C8102E]/50'
              }`}
            >
              <span className="flex items-center gap-2">
                {isAdded ? (
                  <Check className="w-5 h-5 text-white animate-bounce" />
                ) : (
                  <ShoppingBag className="w-5 h-5 text-[#F5B82E]" />
                )}
                <span className="font-extrabold tracking-widest">
                  {isAdded ? 'ADDED TO ORDER!' : 'ADD TO ORDER'}
                </span>
              </span>
              <span className="tabular-nums font-black text-[#F5B82E] text-2xl">
                {totalPrice} EGP
              </span>
            </button>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

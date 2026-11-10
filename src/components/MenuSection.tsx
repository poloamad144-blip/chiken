import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  Search,
  Sparkles,
  Flame,
  Utensils,
  Plus,
  ArrowRight,
  ShieldCheck,
  Volume2,
  SlidersHorizontal,
  ArrowUpDown,
  X,
  Star,
  Check,
  Award,
} from 'lucide-react';
import { MENU_ITEMS } from '../data/menuData';
import { MenuItem } from '../types/restaurant';
import { ProductCard } from './ProductCard';

export type DisplayCategory =
  | 'all'
  | 'boxes'
  | 'buckets'
  | 'meals'
  | 'sandwiches'
  | 'sides_extras';

interface MenuSectionProps {
  onAddToCart: (product: MenuItem) => void;
  onOpenDetails: (product: MenuItem) => void;
}

export const MenuSection: React.FC<MenuSectionProps> = ({
  onAddToCart,
  onOpenDetails,
}) => {
  const [activeCategory, setActiveCategory] = useState<DisplayCategory>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [spiceFilter, setSpiceFilter] = useState<'all' | 'mild' | 'spicy'>('all');
  const [sortOrder, setSortOrder] = useState<'recommended' | 'price-asc' | 'price-desc' | 'popular'>('recommended');
  const [popularOnly, setPopularOnly] = useState(false);
  const [spotlightAdded, setSpotlightAdded] = useState(false);

  // Category Configuration List
  const CATEGORY_TABS: { id: DisplayCategory; label: string; icon: string }[] = [
    { id: 'all', label: 'ALL PRODUCTS', icon: '★' },
    { id: 'boxes', label: 'CHICKEN BOXES', icon: '🍗' },
    { id: 'buckets', label: 'FAMILY BUCKETS', icon: '🪣' },
    { id: 'meals', label: 'MEALS', icon: '🍽️' },
    { id: 'sandwiches', label: 'SANDWICHES', icon: '🍔' },
    { id: 'sides_extras', label: 'SIDES & EXTRAS', icon: '🍟' },
  ];

  // Helper to match category correctly against existing data
  const matchesCategory = (item: MenuItem, category: DisplayCategory) => {
    if (category === 'all') return true;
    if (category === 'buckets') {
      return (
        item.id === 'classic-chiken-bucket' ||
        item.id === 'mega-party-bucket' ||
        item.name.toUpperCase().includes('BUCKET')
      );
    }
    if (category === 'boxes') {
      return (
        item.category === 'boxes' &&
        item.id !== 'classic-chiken-bucket' &&
        item.id !== 'mega-party-bucket' &&
        !item.name.toUpperCase().includes('BUCKET')
      );
    }
    if (category === 'meals') {
      return item.category === 'meals';
    }
    if (category === 'sandwiches') {
      return item.category === 'burgers';
    }
    if (category === 'sides_extras') {
      return (
        item.category === 'sides' ||
        item.category === 'sauces' ||
        item.category === 'drinks'
      );
    }
    return true;
  };

  // Category item counts
  const categoryCounts = useMemo(() => {
    const counts: Record<DisplayCategory, number> = {
      all: MENU_ITEMS.length,
      boxes: 0,
      buckets: 0,
      meals: 0,
      sandwiches: 0,
      sides_extras: 0,
    };
    MENU_ITEMS.forEach((item) => {
      CATEGORY_TABS.forEach((tab) => {
        if (tab.id !== 'all' && matchesCategory(item, tab.id)) {
          counts[tab.id] += 1;
        }
      });
    });
    return counts;
  }, []);

  // Spotlight Product per Category
  const categorySpotlight = useMemo(() => {
    if (activeCategory === 'all') {
      return MENU_ITEMS.find((i) => i.id === 'crunch-box') || MENU_ITEMS[0];
    }
    if (activeCategory === 'buckets') {
      return MENU_ITEMS.find((i) => i.id === 'classic-chiken-bucket') || MENU_ITEMS[0];
    }
    if (activeCategory === 'boxes') {
      return MENU_ITEMS.find((i) => i.id === 'crunch-box') || MENU_ITEMS[0];
    }
    if (activeCategory === 'sandwiches') {
      return MENU_ITEMS.find((i) => i.id === 'double-chiken-burger') || MENU_ITEMS[0];
    }
    if (activeCategory === 'meals') {
      return MENU_ITEMS.find((i) => i.id === 'golden-tenders') || MENU_ITEMS[0];
    }
    if (activeCategory === 'sides_extras') {
      return MENU_ITEMS.find((i) => i.id === 'loaded-fries') || MENU_ITEMS[0];
    }
    return MENU_ITEMS[0];
  }, [activeCategory]);

  // Filtered & Sorted Items
  const filteredItems = useMemo(() => {
    let result = MENU_ITEMS.filter((item) => {
      // 1. Category filter
      if (!matchesCategory(item, activeCategory)) return false;

      // 2. Search query filter
      if (searchQuery.trim()) {
        const query = searchQuery.toLowerCase().trim();
        const matchesName = item.name.toLowerCase().includes(query);
        const matchesDesc = item.description.toLowerCase().includes(query);
        const matchesCategoryName = item.category.toLowerCase().includes(query);
        const matchesPieces = item.pieces ? item.pieces.toLowerCase().includes(query) : false;
        if (!matchesName && !matchesDesc && !matchesCategoryName && !matchesPieces) {
          return false;
        }
      }

      // 3. Spice filter
      if (spiceFilter === 'spicy' && (item.spiciness || 0) < 2) return false;
      if (spiceFilter === 'mild' && (item.spiciness || 0) > 1) return false;

      // 4. Popular only toggle
      if (popularOnly && !item.isSignature && !item.badge) return false;

      return true;
    });

    // Sorting logic
    if (sortOrder === 'price-asc') {
      result.sort((a, b) => a.price - b.price);
    } else if (sortOrder === 'price-desc') {
      result.sort((a, b) => b.price - a.price);
    } else if (sortOrder === 'popular') {
      result.sort((a, b) => (b.isSignature ? 1 : 0) - (a.isSignature ? 1 : 0));
    }

    return result;
  }, [activeCategory, searchQuery, spiceFilter, sortOrder, popularOnly]);

  const hasActiveFilters =
    searchQuery.trim() !== '' ||
    spiceFilter !== 'all' ||
    sortOrder !== 'recommended' ||
    popularOnly ||
    activeCategory !== 'all';

  const resetAllFilters = () => {
    setActiveCategory('all');
    setSearchQuery('');
    setSpiceFilter('all');
    setSortOrder('recommended');
    setPopularOnly(false);
  };

  const handleSpotlightAdd = () => {
    if (!categorySpotlight) return;
    setSpotlightAdded(true);
    onAddToCart(categorySpotlight);
    setTimeout(() => setSpotlightAdded(false), 1200);
  };

  return (
    <section id="menu" className="py-24 sm:py-28 bg-[#090506] relative overflow-hidden">
      {/* Background Cinematic Ambient Spotlights */}
      <div className="absolute top-1/4 -right-28 w-[600px] h-[600px] bg-[#C8102E]/12 rounded-full blur-[150px] pointer-events-none" />
      <div className="absolute bottom-1/4 -left-28 w-[600px] h-[600px] bg-[#F5B82E]/8 rounded-full blur-[150px] pointer-events-none" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_rgba(200,16,46,0.06)_0%,_transparent_70%)] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* =========================================================================
            SECTION HEADER
           ========================================================================= */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="btn-chamfer-sm inline-flex items-center gap-2 px-4 py-1.5 bg-[#170C0F] border border-[#C8102E]/60 text-[#F5B82E] text-xs font-semibold mb-4 shadow-xl">
            <Utensils className="w-3.5 h-3.5 text-[#C8102E]" />
            <span className="font-heading tracking-widest uppercase">THE ACOUSTIC CRUNCH COLLECTION</span>
          </div>

          <h2 className="font-heading text-4xl sm:text-6xl md:text-7xl text-white tracking-wide uppercase leading-none">
            WHAT ARE YOU <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#FFF0B8] via-[#F5B82E] to-[#E28413] drop-shadow-[0_4px_30px_rgba(245,184,46,0.35)]">
              CRAVING TODAY?
            </span>
          </h2>

          <p className="mt-4 text-[#FFF4E5]/75 text-sm sm:text-base font-sans max-w-2xl mx-auto leading-relaxed">
            Every piece is hand-dredged to order, submerged in a 24-hour buttermilk brine, and fried to certified 98dB golden crunch. Explore our artisan menu below.
          </p>
        </div>

        {/* =========================================================================
            CATEGORY SELECTOR NAVIGATION (Interactive Pills)
           ========================================================================= */}
        <div className="flex items-center justify-start lg:justify-center gap-2 sm:gap-3 overflow-x-auto pb-4 no-scrollbar">
          {CATEGORY_TABS.map((cat) => {
            const isActive = activeCategory === cat.id;
            const count = categoryCounts[cat.id];
            return (
              <button
                key={cat.id}
                type="button"
                onClick={() => setActiveCategory(cat.id)}
                className={`btn-chamfer-sm px-4 sm:px-5 py-3 font-heading text-base sm:text-lg tracking-wider transition-all whitespace-nowrap shrink-0 cursor-pointer flex items-center gap-2.5 border ${
                  isActive
                    ? 'bg-gradient-to-r from-[#C8102E] via-[#A00B22] to-[#800718] text-white border-[#F5B82E] shadow-xl shadow-[#C8102E]/40 scale-[1.03]'
                    : 'bg-[#150A0D]/90 text-white/70 border-white/10 hover:text-white hover:border-[#F5B82E]/40 hover:bg-[#1E0F13]'
                }`}
              >
                <span>{cat.icon}</span>
                <span>{cat.label}</span>
                <span
                  className={`text-[11px] font-sans px-2 py-0.5 rounded-full font-bold ${
                    isActive
                      ? 'bg-[#F5B82E] text-[#0A0406]'
                      : 'bg-white/10 text-white/60'
                  }`}
                >
                  {count}
                </span>
              </button>
            );
          })}
        </div>

        {/* =========================================================================
            CATEGORY SPOTLIGHT SHOWCASE (Featured Creation)
           ========================================================================= */}
        {categorySpotlight && (
          <AnimatePresence mode="wait">
            <motion.div
              key={categorySpotlight.id + activeCategory}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
              className="mt-8 relative rounded-3xl overflow-hidden bg-gradient-to-r from-[#1E0C10] via-[#16080B] to-[#0D0406] border border-[#F5B82E]/40 p-6 sm:p-8 lg:p-10 shadow-2xl shadow-black group"
            >
              {/* Internal Accent Glow */}
              <div className="absolute top-0 right-1/4 w-96 h-96 bg-[#C8102E]/25 rounded-full blur-[110px] pointer-events-none" />

              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center relative z-10">
                {/* Left Spotlight Details */}
                <div className="lg:col-span-7 flex flex-col justify-center text-left">
                  <div className="flex flex-wrap items-center gap-2.5 mb-3">
                    <span className="btn-chamfer-sm text-[11px] font-heading tracking-widest px-3 py-1 bg-gradient-to-r from-[#C8102E] to-[#92051C] text-white font-bold border border-[#F5B82E]/50 shadow-md">
                      {categorySpotlight.badge || 'FEATURED MASTERPIECE'}
                    </span>
                    <span className="text-xs font-heading tracking-widest text-[#F5B82E] flex items-center gap-1">
                      <Sparkles className="w-3.5 h-3.5 text-[#F5B82E]" />
                      CHEF'S SIGNATURE RECIPE
                    </span>
                  </div>

                  <h3 className="font-heading text-4xl sm:text-5xl lg:text-6xl text-white tracking-wide uppercase leading-none">
                    {categorySpotlight.name}
                  </h3>

                  <p className="mt-4 text-sm sm:text-base text-[#FFF4E5]/80 font-sans leading-relaxed max-w-xl">
                    {categorySpotlight.description}
                  </p>

                  <div className="mt-5 flex flex-wrap items-center gap-3 text-xs font-sans text-white/70">
                    {categorySpotlight.pieces && (
                      <span className="flex items-center gap-1.5 text-[#F5B82E] font-semibold bg-white/5 px-2.5 py-1 rounded-md border border-white/10">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#C8102E]" />
                        {categorySpotlight.pieces}
                      </span>
                    )}
                    {categorySpotlight.calories && (
                      <span className="text-white/60 bg-white/5 px-2.5 py-1 rounded-md border border-white/10">
                        {categorySpotlight.calories} Calories
                      </span>
                    )}
                    <span className="text-white/70 flex items-center gap-1">
                      <ShieldCheck className="w-3.5 h-3.5 text-[#F5B82E]" />
                      24h Buttermilk Marinated
                    </span>
                  </div>

                  {/* Pricing and Quick Order Buttons */}
                  <div className="mt-8 pt-6 border-t border-white/10 flex flex-wrap items-center gap-4 sm:gap-6">
                    <div className="flex flex-col">
                      <span className="text-[10px] text-white/40 uppercase tracking-widest font-sans font-medium">
                        Spotlight Price
                      </span>
                      <div className="flex items-baseline gap-1">
                        <span className="font-heading text-3xl sm:text-4xl text-[#F5B82E] font-black tabular-nums leading-none">
                          {categorySpotlight.price}
                        </span>
                        <span className="text-sm font-sans text-white/70 font-semibold">
                          EGP
                        </span>
                      </div>
                    </div>

                    {/* Add to Order Button */}
                    <button
                      type="button"
                      onClick={handleSpotlightAdd}
                      className={`btn-chamfer btn-sheen relative px-6 sm:px-8 py-3.5 text-white font-heading text-lg sm:text-xl tracking-wider shadow-xl flex items-center gap-2 cursor-pointer active:scale-95 transition-all duration-200 ${
                        spotlightAdded
                          ? 'bg-emerald-600 border border-emerald-400'
                          : 'bg-gradient-to-r from-[#C8102E] via-[#A00B22] to-[#800718] hover:from-[#d91233] hover:to-[#a80620] border border-[#F5B82E]/50 hover:border-[#F5B82E] shadow-[#C8102E]/40'
                      }`}
                    >
                      {spotlightAdded ? (
                        <>
                          <Check className="w-5 h-5 text-white animate-bounce" />
                          <span className="font-extrabold tracking-widest">ADDED!</span>
                        </>
                      ) : (
                        <>
                          <Plus className="w-5 h-5 text-[#F5B82E]" />
                          <span className="font-extrabold tracking-widest">ADD TO ORDER</span>
                        </>
                      )}
                    </button>

                    {/* Customize Button */}
                    <button
                      type="button"
                      onClick={() => onOpenDetails(categorySpotlight)}
                      className="btn-chamfer px-5 py-3.5 bg-white/5 hover:bg-white/10 border border-white/20 hover:border-[#F5B82E] text-white font-heading text-base sm:text-lg tracking-wider transition-all cursor-pointer flex items-center gap-2"
                    >
                      <span>CUSTOMIZE</span>
                      <ArrowRight className="w-4 h-4 text-[#F5B82E]" />
                    </button>
                  </div>
                </div>

                {/* Right Spotlight Food Image */}
                <div className="lg:col-span-5 relative flex items-center justify-center">
                  <div
                    onClick={() => onOpenDetails(categorySpotlight)}
                    className="relative w-full max-w-md rounded-2xl overflow-hidden border border-[#F5B82E]/30 shadow-2xl group/img cursor-pointer"
                  >
                    <img
                      src={categorySpotlight.image}
                      alt={categorySpotlight.name}
                      referrerPolicy="no-referrer"
                      className="w-full h-64 sm:h-80 object-cover transform group-hover/img:scale-108 transition-transform duration-700"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-transparent pointer-events-none" />

                    <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between gap-2">
                      <span className="btn-chamfer-sm font-heading text-xs text-[#F5B82E] tracking-wider bg-black/85 px-3 py-1 border border-white/10 flex items-center gap-1.5">
                        <Volume2 className="w-3.5 h-3.5 text-[#F5B82E]" />
                        98dB ACOUSTIC CRUNCH
                      </span>
                      <span className="text-[11px] font-sans text-white/80 bg-black/70 px-3 py-1 rounded-lg backdrop-blur-sm hidden sm:inline">
                        Click to customize &rarr;
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        )}

        {/* =========================================================================
            ADVANCED FILTERING BAR: SEARCH, SORTING, POPULAR, AND HEAT LEVEL
           ========================================================================= */}
        <div className="mt-10 p-4 sm:p-5 bg-gradient-to-r from-[#170A0D] via-[#120709] to-[#0E0507] rounded-3xl border border-white/10 shadow-2xl flex flex-col lg:flex-row items-stretch lg:items-center justify-between gap-4">
          {/* Real-time Search Box */}
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[#F5B82E]/70" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search chicken, burgers, boxes, dips..."
              className="w-full pl-10 pr-9 py-2.5 bg-black/60 border border-white/15 rounded-xl text-xs sm:text-sm text-white placeholder:text-white/40 focus:outline-none focus:border-[#F5B82E] transition-colors"
            />
            {searchQuery && (
              <button
                type="button"
                onClick={() => setSearchQuery('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-white/50 hover:text-white"
                aria-label="Clear search"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>

          {/* Controls Cluster */}
          <div className="flex flex-wrap items-center gap-2.5 sm:gap-3">
            {/* Price Sorting Selector */}
            <div className="flex items-center gap-1.5 bg-black/60 px-3 py-1.5 rounded-xl border border-white/15 text-xs text-white/80">
              <ArrowUpDown className="w-3.5 h-3.5 text-[#F5B82E]" />
              <span className="text-white/50 hidden sm:inline">Sort:</span>
              <select
                value={sortOrder}
                onChange={(e) => setSortOrder(e.target.value as any)}
                className="bg-transparent text-white font-medium focus:outline-none cursor-pointer pr-1"
              >
                <option value="recommended" className="bg-[#140A0D] text-white">
                  Recommended
                </option>
                <option value="popular" className="bg-[#140A0D] text-white">
                  Most Popular
                </option>
                <option value="price-asc" className="bg-[#140A0D] text-white">
                  Price: Low to High
                </option>
                <option value="price-desc" className="bg-[#140A0D] text-white">
                  Price: High to Low
                </option>
              </select>
            </div>

            {/* Popular Only Filter Toggle */}
            <button
              type="button"
              onClick={() => setPopularOnly(!popularOnly)}
              className={`btn-chamfer-sm px-3.5 py-2 text-xs font-heading tracking-wider flex items-center gap-1.5 border transition-all cursor-pointer ${
                popularOnly
                  ? 'bg-gradient-to-r from-[#C8102E] to-[#92051C] text-white border-[#F5B82E] shadow-md shadow-[#C8102E]/30'
                  : 'bg-black/60 text-white/70 border-white/15 hover:text-white hover:border-white/30'
              }`}
            >
              <Star className={`w-3.5 h-3.5 ${popularOnly ? 'text-[#F5B82E] fill-current' : 'text-[#F5B82E]'}`} />
              <span>POPULAR</span>
            </button>

            {/* Heat Level Filter Tabs */}
            <div className="flex items-center gap-1 bg-black/60 p-1 rounded-xl border border-white/15 text-xs">
              <button
                type="button"
                onClick={() => setSpiceFilter('all')}
                className={`btn-chamfer-sm px-3 py-1.5 font-medium transition-colors cursor-pointer ${
                  spiceFilter === 'all'
                    ? 'bg-[#C8102E] text-white font-bold'
                    : 'text-white/60 hover:text-white'
                }`}
              >
                All
              </button>
              <button
                type="button"
                onClick={() => setSpiceFilter('mild')}
                className={`btn-chamfer-sm px-3 py-1.5 font-medium transition-colors cursor-pointer ${
                  spiceFilter === 'mild'
                    ? 'bg-[#C8102E] text-white font-bold'
                    : 'text-white/60 hover:text-white'
                }`}
              >
                Mild
              </button>
              <button
                type="button"
                onClick={() => setSpiceFilter('spicy')}
                className={`btn-chamfer-sm px-3 py-1.5 font-medium flex items-center gap-1 transition-colors cursor-pointer ${
                  spiceFilter === 'spicy'
                    ? 'bg-[#C8102E] text-white font-bold'
                    : 'text-white/60 hover:text-white'
                }`}
              >
                <Flame className="w-3.5 h-3.5 text-[#F5B82E]" />
                Spicy
              </button>
            </div>
          </div>
        </div>

        {/* Active Filters Summary & Reset */}
        {hasActiveFilters && (
          <div className="mt-4 flex flex-wrap items-center justify-between gap-3 px-2">
            <div className="flex flex-wrap items-center gap-2 text-xs">
              <span className="text-white/50">Active Filters:</span>
              {activeCategory !== 'all' && (
                <span className="px-2.5 py-1 rounded-full bg-white/5 border border-white/15 text-[#F5B82E] flex items-center gap-1">
                  Category: {activeCategory.toUpperCase()}
                  <button onClick={() => setActiveCategory('all')} className="hover:text-white ml-1">×</button>
                </span>
              )}
              {searchQuery && (
                <span className="px-2.5 py-1 rounded-full bg-white/5 border border-white/15 text-white flex items-center gap-1">
                  "{searchQuery}"
                  <button onClick={() => setSearchQuery('')} className="hover:text-white ml-1">×</button>
                </span>
              )}
              {spiceFilter !== 'all' && (
                <span className="px-2.5 py-1 rounded-full bg-white/5 border border-white/15 text-white flex items-center gap-1">
                  Spice: {spiceFilter.toUpperCase()}
                  <button onClick={() => setSpiceFilter('all')} className="hover:text-white ml-1">×</button>
                </span>
              )}
              {popularOnly && (
                <span className="px-2.5 py-1 rounded-full bg-white/5 border border-white/15 text-[#F5B82E] flex items-center gap-1">
                  Popular Only
                  <button onClick={() => setPopularOnly(false)} className="hover:text-white ml-1">×</button>
                </span>
              )}
            </div>

            <button
              type="button"
              onClick={resetAllFilters}
              className="text-xs text-[#F5B82E] hover:underline font-heading tracking-wider cursor-pointer"
            >
              RESET ALL FILTERS
            </button>
          </div>
        )}

        {/* =========================================================================
            PRODUCT COLLECTION GRID (Responsive 1/2/3 Column Display)
           ========================================================================= */}
        <div className="mt-10">
          <div className="flex items-center justify-between mb-6 pb-3 border-b border-white/10">
            <h3 className="font-heading text-2xl sm:text-3xl text-white tracking-wider flex items-center gap-2 uppercase">
              <Utensils className="w-5 h-5 text-[#C8102E]" />
              {activeCategory === 'all'
                ? 'COMPLETE MENU COLLECTION'
                : `${CATEGORY_TABS.find((t) => t.id === activeCategory)?.label} COLLECTION`}
            </h3>
            <span className="text-xs sm:text-sm font-sans text-white/50">
              Showing {filteredItems.length} of {MENU_ITEMS.length} Creation{filteredItems.length === 1 ? '' : 's'}
            </span>
          </div>

          {filteredItems.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
              {filteredItems.map((product) => (
                <ProductCard
                  key={product.id}
                  product={product}
                  onAddToCart={onAddToCart}
                  onOpenDetails={onOpenDetails}
                />
              ))}
            </div>
          ) : (
            <div className="py-20 text-center bg-[#130709]/80 rounded-3xl border border-white/10">
              <Utensils className="w-12 h-12 text-[#C8102E] mx-auto mb-3 opacity-60" />
              <p className="font-heading text-2xl text-white">NO CRAVINGS MATCH YOUR FILTERS</p>
              <p className="text-sm text-white/60 font-sans mt-1 max-w-md mx-auto">
                We couldn't find any dishes matching your current selection. Try clearing search or resetting filters.
              </p>
              <button
                type="button"
                onClick={resetAllFilters}
                className="btn-chamfer mt-5 px-6 py-2.5 bg-gradient-to-r from-[#C8102E] to-[#92051C] text-white font-heading text-base tracking-widest hover:border-[#F5B82E] transition-all cursor-pointer shadow-lg"
              >
                RESET ALL FILTERS
              </button>
            </div>
          )}
        </div>

      </div>
    </section>
  );
};

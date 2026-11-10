import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Sparkles, CheckCircle2, Volume2, ShieldCheck, Flame } from 'lucide-react';
import { ASSET_BURGER, ASSET_TENDERS, ASSET_BUCKET } from '../data/menuData';

export const BrandExperience: React.FC = () => {
  const [activeTab, setActiveTab] = useState<number>(0);

  const pillars = [
    {
      id: 'seasoned',
      title: 'PERFECTLY SEASONED',
      badge: '24-HOUR BRINE INFUSION',
      tagline: 'Deep Flavor To The Bone',
      description:
        'Every chicken cut is submerged in a rich buttermilk brine infused with our proprietary 14-spice blend. The marinade penetrates deep into muscle fibers over a continuous 24-hour cycle, guaranteeing seasoned perfection in every single bite.',
      metric: '14 Hand-Ground Spices',
      detail: 'Zero artificial flavor enhancers. Only whole ground aromatics.',
      image: ASSET_BUCKET,
      icon: Flame,
    },
    {
      id: 'crunch',
      title: 'GOLDEN CRUNCH',
      badge: 'TRIPLE-DREDGE CRAFTSMANSHIP',
      tagline: 'Certified 98dB Acoustic Texture',
      description:
        'Hand-tossed in seasoned flour, dipped in our chilled batter, and floured a third time to create millions of jagged micro-ridges. Under controlled pressure frying, these ridges transform into glass-like flakes that stay hot and crunchy for 45+ minutes.',
      metric: '98 dB Crunch Decibels',
      detail: 'Resistant to steam sogginess during delivery.',
      image: ASSET_BURGER,
      icon: Volume2,
    },
    {
      id: 'juicy',
      title: 'JUICY INSIDE',
      badge: 'FARM-FRESH INTEGRITY',
      tagline: '100% Never-Frozen Cut',
      description:
        'We source only grain-fed, hormone-free chickens delivered fresh every morning. Precision thermal cooking seals the golden crust in seconds, forming a natural pressure chamber that traps 100% of the natural juices and moisture inside.',
      metric: '100% Fresh Never Frozen',
      detail: 'Cooked to an internal 75°C target for peak succulence.',
      image: ASSET_TENDERS,
      icon: ShieldCheck,
    },
  ];

  return (
    <section id="about" className="py-20 md:py-28 bg-[#151111] relative overflow-hidden">
      {/* Background radial glows */}
      <div className="absolute top-1/2 left-0 w-96 h-96 bg-[#C8102E]/10 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-[#F5B82E]/10 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Title */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/5 border border-white/10 text-[#F5B82E] text-xs font-semibold mb-4">
            <Sparkles className="w-3.5 h-3.5 text-[#F5B82E]" />
            <span>THE SCIENCE OF CRUNCH</span>
          </div>

          <h2 className="font-heading text-4xl sm:text-6xl md:text-7xl text-white tracking-tight uppercase leading-none">
            ANATOMY OF THE <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#F5B82E] via-[#FFD369] to-[#F5B82E]">
              PERFECT CRUNCH.
            </span>
          </h2>

          <p className="mt-4 text-base sm:text-lg text-white/70 font-sans max-w-2xl mx-auto leading-relaxed">
            We don’t believe in fast-food shortcuts. We engineered the exact sensory physics of the ultimate fried chicken.
          </p>
        </div>

        {/* Feature Tab Selector for interactive exploration */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-10">
          {pillars.map((pillar, index) => {
            const Icon = pillar.icon;
            const isSelected = activeTab === index;
            return (
              <button
                key={pillar.id}
                onClick={() => setActiveTab(index)}
                className={`btn-chamfer-sm p-6 text-left transition-all duration-300 cursor-pointer flex flex-col justify-between border ${
                  isSelected
                    ? 'bg-gradient-to-br from-[#241315] to-[#170E0F] border-[#F5B82E] shadow-xl shadow-[#C8102E]/25 scale-[1.02]'
                    : 'bg-[#150F10] border-white/10 hover:border-[#C8102E]/50 text-white/70 hover:text-white'
                }`}
              >
                <div className="flex items-center justify-between mb-4">
                  <div
                    className={`w-11 h-11 btn-chamfer-sm flex items-center justify-center transition-colors ${
                      isSelected
                        ? 'bg-gradient-to-br from-[#C8102E] to-[#92051C] text-white shadow-md'
                        : 'bg-white/5 text-white/60'
                    }`}
                  >
                    <Icon className="w-5 h-5 text-[#F5B82E]" />
                  </div>
                  <span
                    className={`font-heading text-2xl tabular-nums font-black ${
                      isSelected ? 'text-[#F5B82E]' : 'text-white/25'
                    }`}
                  >
                    0{index + 1}
                  </span>
                </div>

                <div>
                  <h3 className="font-heading text-2xl sm:text-3xl tracking-wide text-white leading-tight uppercase">
                    {pillar.title}
                  </h3>
                  <p className="text-xs text-[#F5B82E] font-sans font-medium mt-1 tracking-wide">
                    {pillar.tagline}
                  </p>
                </div>
              </button>
            );
          })}
        </div>

        {/* Dynamic Detail Showcase of Active Feature */}
        <motion.div
          key={activeTab}
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
          className="bg-gradient-to-br from-[#1C1515] to-[#120D0D] border border-white/10 rounded-3xl p-6 sm:p-10 lg:p-12 shadow-2xl"
        >
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
            
            {/* Visual Media */}
            <div className="lg:col-span-6 relative">
              <div className="relative rounded-2xl overflow-hidden border border-white/10 shadow-2xl">
                <img
                  src={pillars[activeTab].image}
                  alt={pillars[activeTab].title}
                  referrerPolicy="no-referrer"
                  className="w-full h-80 sm:h-96 object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
                
                <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between gap-2 flex-wrap">
                  <span className="btn-chamfer-sm font-heading tracking-wider text-xs px-3 py-1 bg-[#C8102E] text-white">
                    {pillars[activeTab].badge}
                  </span>
                  <span className="text-xs text-[#F5B82E] font-bold bg-black/60 px-2 py-0.5 rounded">
                    {pillars[activeTab].metric}
                  </span>
                </div>
              </div>
            </div>

            {/* Content Details */}
            <div className="lg:col-span-6 flex flex-col justify-center">
              <span className="font-heading text-lg tracking-widest text-[#F5B82E] mb-2">
                STEP 0{activeTab + 1} · THE CRAFT
              </span>

              <h3 className="font-heading text-4xl sm:text-5xl text-white tracking-tight uppercase leading-none">
                {pillars[activeTab].title}
              </h3>

              <p className="mt-4 text-base sm:text-lg text-white/80 font-sans leading-relaxed">
                {pillars[activeTab].description}
              </p>

              <div className="mt-8 space-y-3 pt-6 border-t border-white/10">
                <div className="flex items-center gap-3 text-white/90 text-sm">
                  <CheckCircle2 className="w-5 h-5 text-[#F5B82E] shrink-0" />
                  <span>{pillars[activeTab].detail}</span>
                </div>
                <div className="flex items-center gap-3 text-white/90 text-sm">
                  <CheckCircle2 className="w-5 h-5 text-[#F5B82E] shrink-0" />
                  <span>Handcrafted fresh on premise every 90 minutes</span>
                </div>
                <div className="flex items-center gap-3 text-white/90 text-sm">
                  <CheckCircle2 className="w-5 h-5 text-[#F5B82E] shrink-0" />
                  <span>Strict temperature & acoustic testing standards</span>
                </div>
              </div>
            </div>

          </div>
        </motion.div>

      </div>
    </section>
  );
};

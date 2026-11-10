import React from 'react';
import { Tag, Sparkles, Clock, ArrowRight, Percent } from 'lucide-react';
import { PROMO_OFFERS } from '../data/menuData';

interface OffersSectionProps {
  onApplyPromo: (code: string) => void;
}

export const OffersSection: React.FC<OffersSectionProps> = ({ onApplyPromo }) => {
  return (
    <section id="offers" className="py-20 bg-[#120E0E] relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#C8102E]/20 border border-[#C8102E]/40 text-[#F5B82E] text-xs font-semibold mb-3">
              <Percent className="w-3.5 h-3.5" />
              <span>HOT CRUNCH SPECIALS</span>
            </div>
            <h2 className="font-heading text-4xl sm:text-5xl text-white tracking-wide uppercase">
              EXCLUSIVE OFFERS & <span className="text-[#F5B82E]">DEALS</span>
            </h2>
          </div>
          <p className="text-white/60 text-xs sm:text-sm font-sans max-w-md">
            Save on group feasts, midnight cravings, and weekend parties with limited-time coupons.
          </p>
        </div>

        {/* Promo Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {PROMO_OFFERS.map((offer) => (
            <div
              key={offer.id}
              className="relative bg-gradient-to-b from-[#1C1314] to-[#120D0E] border border-white/10 rounded-2xl p-6 sm:p-7 flex flex-col justify-between hover:border-[#F5B82E]/60 transition-all duration-300 group hover:shadow-2xl hover:shadow-[#C8102E]/20"
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <span className="btn-chamfer-sm font-heading text-xs px-3 py-1 bg-[#C8102E] text-white tracking-widest font-black shadow-sm">
                    {offer.tag}
                  </span>
                  <div className="flex items-center gap-1.5 text-xs text-white/50">
                    <Clock className="w-3.5 h-3.5 text-[#F5B82E]" />
                    <span className="font-mono text-[11px]">{offer.validUntil}</span>
                  </div>
                </div>

                <h3 className="font-heading text-3xl text-white group-hover:text-[#F5B82E] transition-colors leading-tight mb-2 uppercase">
                  {offer.title}
                </h3>
                <p className="text-xs sm:text-sm text-white/70 font-sans leading-relaxed mb-6">
                  {offer.subtitle}
                </p>
              </div>

              {/* Coupon Bar */}
              <div className="pt-4 border-t border-white/10 flex items-center justify-between gap-3">
                <div className="flex items-center gap-2">
                  <Tag className="w-4 h-4 text-[#F5B82E]" />
                  <span className="font-heading text-lg text-[#F5B82E] tracking-wider">
                    {offer.code}
                  </span>
                </div>

                <button
                  onClick={() => onApplyPromo(offer.code)}
                  className="btn-chamfer-sm btn-sheen px-4 py-2 bg-gradient-to-r from-[#C8102E] to-[#92051C] hover:from-[#E51837] hover:to-[#B30622] text-white font-heading text-sm tracking-wider transition-all flex items-center gap-1.5 cursor-pointer shadow-md shadow-[#C8102E]/30 active:scale-95"
                >
                  <span>CLAIM</span>
                  <ArrowRight className="w-3.5 h-3.5 text-[#F5B82E]" />
                </button>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};

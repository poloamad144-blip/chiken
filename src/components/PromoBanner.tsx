import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Tag, Sparkles, Copy, Check, ArrowRight } from 'lucide-react';
import { ASSET_TENDERS } from '../data/menuData';

interface PromoBannerProps {
  onClaimDeal: (promoCode: string) => void;
}

export const PromoBanner: React.FC<PromoBannerProps> = ({ onClaimDeal }) => {
  const [copied, setCopied] = useState(false);
  const promoCode = 'CRUNCH25';

  const handleCopy = () => {
    navigator.clipboard?.writeText(promoCode);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section className="py-16 md:py-24 bg-[#0B0B0B] relative overflow-hidden">
      {/* Background cinematic lighting */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/2 left-1/3 -translate-y-1/2 w-[600px] h-[600px] bg-[#92051C]/35 rounded-full blur-[140px]" />
        <div className="absolute bottom-0 right-1/4 w-[400px] h-[400px] bg-[#F5B82E]/15 rounded-full blur-[120px]" />
        <div className="absolute inset-0 bg-radial from-transparent to-[#0B0B0B]/90" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="relative rounded-3xl overflow-hidden bg-gradient-to-r from-[#1E1313] via-[#2A1115] to-[#170E0F] border border-[#F5B82E]/30 p-8 sm:p-12 lg:p-16 shadow-2xl">
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
            
            {/* Left Content Column */}
            <div className="lg:col-span-7 flex flex-col justify-center text-left">
              {/* Promo Kicker */}
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#C8102E]/25 border border-[#C8102E]/60 text-[#F5B82E] text-xs font-bold tracking-widest w-fit mb-5">
                <Sparkles className="w-3.5 h-3.5 text-[#F5B82E]" />
                <span>LIMITED TIME FLAVOR CRAZE</span>
              </div>

              {/* Exact Prompt Headline */}
              <h2 className="font-heading text-4xl sm:text-6xl lg:text-7xl leading-[1.02] tracking-tight uppercase text-white font-black drop-shadow-xl">
                CRISPY ON THE OUTSIDE. <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#F5B82E] via-[#FFD369] to-[#F5B82E]">
                  JUICY ON THE INSIDE.
                </span>
              </h2>

              <p className="mt-5 text-base sm:text-lg text-[#FFF4E5]/80 font-sans max-w-xl leading-relaxed">
                Taste the science of crunch. Our double-dipped buttermilk batter locks in scorching steam and natural juices, delivering a satisfying sonic crunch in every single bite.
              </p>

              {/* Promo Coupon Box */}
              <div className="mt-8 p-4 rounded-2xl bg-black/60 border border-white/10 backdrop-blur-md flex flex-wrap items-center justify-between gap-4 max-w-xl">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-xl bg-[#C8102E]/30 border border-[#C8102E] flex items-center justify-center text-[#F5B82E]">
                    <Tag className="w-6 h-6" />
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="font-heading text-xl text-white tracking-wider">
                        25% OFF WEEKEND FEAST
                      </span>
                      <span className="text-[10px] bg-[#C8102E] text-white font-bold px-2 py-0.5 rounded">
                        SAVE 25%
                      </span>
                    </div>
                    <p className="text-xs text-white/60 font-sans">
                      Valid on all orders above 400 EGP
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={handleCopy}
                    className="btn-chamfer-sm px-4 py-2.5 bg-white/10 hover:bg-white/20 border border-white/15 text-white font-sans text-xs font-semibold flex items-center gap-1.5 transition-all cursor-pointer shadow-sm active:scale-95"
                    title="Copy promo code"
                  >
                    {copied ? (
                      <>
                        <Check className="w-3.5 h-3.5 text-emerald-400" />
                        <span className="text-emerald-400 tracking-wider">COPIED</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-3.5 h-3.5 text-[#F5B82E]" />
                        <span className="font-mono font-bold tracking-wider">CODE: {promoCode}</span>
                      </>
                    )}
                  </button>

                  <button
                    onClick={() => onClaimDeal(promoCode)}
                    className="btn-chamfer-sm btn-sheen px-5 py-2.5 bg-gradient-to-r from-[#C8102E] to-[#92051C] hover:from-[#E51837] hover:to-[#B30622] text-white font-heading text-base tracking-wider transition-all flex items-center gap-1.5 cursor-pointer shadow-lg shadow-[#C8102E]/40 active:scale-95"
                  >
                    <span>APPLY</span>
                    <ArrowRight className="w-4 h-4 text-[#F5B82E]" />
                  </button>
                </div>
              </div>
            </div>

            {/* Right Large Food Photography Column */}
            <div className="lg:col-span-5 relative">
              <div className="relative group">
                {/* Glow Backdrop */}
                <div className="absolute -inset-2 bg-gradient-to-r from-[#C8102E] to-[#F5B82E] rounded-3xl opacity-30 blur-xl group-hover:opacity-50 transition-opacity" />

                <div className="relative rounded-2xl overflow-hidden border border-white/10 shadow-2xl">
                  <img
                    src={ASSET_TENDERS}
                    alt="CHIKEN Golden Crispy Tenders with Juicy Bite"
                    referrerPolicy="no-referrer"
                    className="w-full h-auto object-cover transform group-hover:scale-105 transition-transform duration-700"
                  />
                  {/* Floating Tag */}
                  <div className="absolute bottom-4 left-4 right-4 p-3 bg-black/85 backdrop-blur-md rounded-xl border border-white/10 flex items-center justify-between gap-3">
                    <div className="min-w-0">
                      <p className="font-heading text-base sm:text-lg text-white leading-none truncate">
                        100% WHOLE TENDERLOIN
                      </p>
                      <p className="text-[11px] text-[#F5B82E] font-sans mt-0.5 truncate">
                        Never pressed, never ground. Pure chicken.
                      </p>
                    </div>
                    <span className="font-heading text-xl text-[#F5B82E] shrink-0 tabular-nums">
                      185 EGP
                    </span>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </div>
    </section>
  );
};

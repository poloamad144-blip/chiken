import React from 'react';
import { Phone, Mail, Clock, MapPin, Instagram, Facebook, Youtube } from 'lucide-react';

export const Footer: React.FC = () => {
  const scrollTo = (href: string) => {
    const el = document.querySelector(href);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const developerSocials = [
    {
      name: 'LinkedIn',
      href: 'https://www.linkedin.com/in/boles-emad-78794942b?utm_source=share_via&utm_content=profile&utm_medium=member_android',
      tooltip: 'Connect with Boles Emad on LinkedIn',
      hoverColor: 'hover:border-[#0A66C2] hover:text-[#0A66C2] hover:bg-[#0A66C2]/15 hover:shadow-[0_0_20px_rgba(10,102,194,0.45)]',
      icon: (
        <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24" aria-hidden="true">
          <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.46 8.76a1.64 1.64 0 1 0 0-3.28 1.64 1.64 0 0 0 0 3.28M5.07 18.5h2.79v-8.37H5.07v8.37Z" />
        </svg>
      ),
    },
    {
      name: 'Instagram',
      href: 'https://www.instagram.com/bowlo_emad?xtok=MXYydzB6b3Q1NmMz',
      tooltip: 'Follow Boles Emad on Instagram (@bowlo_emad)',
      hoverColor: 'hover:border-[#E1306C] hover:text-[#E1306C] hover:bg-[#E1306C]/15 hover:shadow-[0_0_20px_rgba(225,48,108,0.45)]',
      icon: (
        <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24" aria-hidden="true">
          <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069M12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 1 0 0 12.324 6.162 6.162 0 0 0 0-12.324zM12 16a4 4 0 1 1 0-8 4 4 0 0 1 0 8zm6.406-11.845a1.44 1.44 0 1 0 0 2.881 1.44 1.44 0 0 0 0-2.881z" />
        </svg>
      ),
    },
    {
      name: 'Facebook',
      href: 'https://www.facebook.com/share/19hmeqZVHT/',
      tooltip: 'View Boles Emad on Facebook',
      hoverColor: 'hover:border-[#1877F2] hover:text-[#1877F2] hover:bg-[#1877F2]/15 hover:shadow-[0_0_20px_rgba(24,119,242,0.45)]',
      icon: (
        <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24" aria-hidden="true">
          <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
        </svg>
      ),
    },
    {
      name: 'Email',
      href: 'mailto:poloamad144@gmail.com',
      tooltip: 'Send an email to poloamad144@gmail.com',
      hoverColor: 'hover:border-[#F5B82E] hover:text-[#F5B82E] hover:bg-[#F5B82E]/15 hover:shadow-[0_0_20px_rgba(245,184,46,0.45)]',
      icon: (
        <svg className="w-4 h-4 fill-none stroke-current stroke-2" viewBox="0 0 24 24" aria-hidden="true">
          <rect width="20" height="16" x="2" y="4" rx="2" />
          <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
        </svg>
      ),
    },
  ];

  return (
    <footer className="bg-[#0B0B0B] text-white border-t border-white/10 relative overflow-hidden">
      {/* Subtle top red glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-3/4 h-1 bg-gradient-to-r from-transparent via-[#C8102E] to-transparent opacity-70" />

      {/* -------------------------------------------------------------
          MAIN FOOTER NAVIGATION & BRAND IDENTITY
         ------------------------------------------------------------- */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 lg:gap-8">
          
          {/* Brand Info (lg:col-span-4) */}
          <div className="lg:col-span-4 space-y-4">
            <div className="flex items-center gap-2">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#C8102E] to-[#92051C] flex items-center justify-center shadow-lg border border-[#F5B82E]/40">
                <span className="font-heading text-2xl font-black text-[#F5B82E]">C</span>
              </div>
              <div className="flex flex-col">
                <span className="font-heading text-3xl font-extrabold tracking-wider text-white leading-none">
                  CHIKEN
                </span>
                <span className="text-[10px] tracking-[0.25em] text-[#F5B82E] font-semibold uppercase leading-none mt-0.5">
                  CRISPY RESTAURANT
                </span>
              </div>
            </div>

            <p className="text-xs sm:text-sm text-white/70 font-sans leading-relaxed max-w-sm">
              The modern destination for uncompromising crispy fried chicken. Handcrafted with our proprietary 14-spice blend, triple-dredged batter, and acoustic 98dB golden crunch.
            </p>

            {/* Social Icons for CHIKEN Brand */}
            <div className="flex items-center gap-3 pt-2">
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noreferrer"
                className="w-9 h-9 rounded-xl bg-white/5 hover:bg-[#C8102E] border border-white/10 flex items-center justify-center text-white/80 hover:text-white transition-colors"
                aria-label="CHIKEN on Instagram"
              >
                <Instagram className="w-4 h-4" />
              </a>
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noreferrer"
                className="w-9 h-9 rounded-xl bg-white/5 hover:bg-[#C8102E] border border-white/10 flex items-center justify-center text-white/80 hover:text-white transition-colors"
                aria-label="CHIKEN on Facebook"
              >
                <Facebook className="w-4 h-4" />
              </a>
              <a
                href="https://youtube.com"
                target="_blank"
                rel="noreferrer"
                className="w-9 h-9 rounded-xl bg-white/5 hover:bg-[#C8102E] border border-white/10 flex items-center justify-center text-white/80 hover:text-white transition-colors"
                aria-label="CHIKEN on YouTube"
              >
                <Youtube className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Quick Navigation (lg:col-span-2) */}
          <div className="lg:col-span-2 space-y-3">
            <h4 className="font-heading text-xl tracking-wider text-white">
              NAVIGATION
            </h4>
            <ul className="space-y-2 text-xs sm:text-sm font-sans text-white/70">
              <li>
                <button
                  onClick={() => scrollTo('#hero')}
                  className="hover:text-[#F5B82E] transition-colors cursor-pointer"
                >
                  Home
                </button>
              </li>
              <li>
                <button
                  onClick={() => scrollTo('#menu')}
                  className="hover:text-[#F5B82E] transition-colors cursor-pointer"
                >
                  Full Menu
                </button>
              </li>
              <li>
                <button
                  onClick={() => scrollTo('#about')}
                  className="hover:text-[#F5B82E] transition-colors cursor-pointer"
                >
                  About The Crunch
                </button>
              </li>
              <li>
                <button
                  onClick={() => scrollTo('#offers')}
                  className="hover:text-[#F5B82E] transition-colors cursor-pointer"
                >
                  Special Offers
                </button>
              </li>
              <li>
                <button
                  onClick={() => scrollTo('#contact')}
                  className="hover:text-[#F5B82E] transition-colors cursor-pointer"
                >
                  Branch Locator
                </button>
              </li>
            </ul>
          </div>

          {/* Menu Highlights (lg:col-span-3) */}
          <div className="lg:col-span-3 space-y-3">
            <h4 className="font-heading text-xl tracking-wider text-white">
              SIGNATURE MENU
            </h4>
            <ul className="space-y-2 text-xs sm:text-sm font-sans text-white/70">
              <li>
                <button
                  onClick={() => scrollTo('#menu')}
                  className="hover:text-[#F5B82E] transition-colors cursor-pointer"
                >
                  The Crunch Box
                </button>
              </li>
              <li>
                <button
                  onClick={() => scrollTo('#menu')}
                  className="hover:text-[#F5B82E] transition-colors cursor-pointer"
                >
                  Double CHIKEN Burger
                </button>
              </li>
              <li>
                <button
                  onClick={() => scrollTo('#menu')}
                  className="hover:text-[#F5B82E] transition-colors cursor-pointer"
                >
                  Golden Hand-Dredged Tenders
                </button>
              </li>
              <li>
                <button
                  onClick={() => scrollTo('#menu')}
                  className="hover:text-[#F5B82E] transition-colors cursor-pointer"
                >
                  Classic CHIKEN Bucket
                </button>
              </li>
              <li>
                <button
                  onClick={() => scrollTo('#menu')}
                  className="hover:text-[#F5B82E] transition-colors cursor-pointer"
                >
                  Volcano Loaded Fries
                </button>
              </li>
            </ul>
          </div>

          {/* Contact & Hours (lg:col-span-3) */}
          <div className="lg:col-span-3 space-y-3">
            <h4 className="font-heading text-xl tracking-wider text-white">
              CONTACT & HOURS
            </h4>
            <div className="space-y-2.5 text-xs font-sans text-white/70">
              <div className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-[#F5B82E] shrink-0" />
                <span>
                  Delivery Hotline: <strong className="text-white">19888</strong>
                </span>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-[#F5B82E] shrink-0" />
                <span>orders@chiken.com</span>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4 text-[#F5B82E] shrink-0" />
                <span>11:00 AM – 02:30 AM Daily</span>
              </div>
              <div className="flex items-start gap-2">
                <MapPin className="w-4 h-4 text-[#F5B82E] shrink-0 mt-0.5" />
                <span>Branches in New Cairo, Zamalek, Sheikh Zayed, Maadi, and Alexandria.</span>
              </div>
            </div>
          </div>

        </div>

        {/* Brand Copyright Bar */}
        <div className="mt-14 pt-6 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-white/50 font-sans">
          <p>© 2026 CHIKEN. All rights reserved. Crisp That Hits Harder.</p>
          <div className="flex items-center gap-6">
            <span className="hover:text-white transition-colors cursor-pointer">Privacy Policy</span>
            <span className="hover:text-white transition-colors cursor-pointer">Terms of Service</span>
            <span className="hover:text-white transition-colors cursor-pointer">Food Safety Standards</span>
          </div>
        </div>
      </div>

      {/* -------------------------------------------------------------
          PART 2: PREMIUM DEVELOPER SIGNATURE CREDIT SECTION
         ------------------------------------------------------------- */}
      <div className="relative border-t border-white/10 bg-[#070505] py-8 sm:py-10">
        {/* Subtle decorative glow */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-96 h-12 bg-gradient-to-r from-transparent via-[#F5B82E]/10 to-transparent blur-xl pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="flex flex-col items-center text-center">
            
            {/* Developer Kicker */}
            <span className="font-heading text-xs tracking-[0.35em] uppercase text-white/50 mb-1.5">
              DEVELOPED BY
            </span>

            {/* Developer Name: Boles Emad (Clickable to LinkedIn) */}
            <a
              href="https://www.linkedin.com/in/boles-emad-78794942b?utm_source=share_via&utm_content=profile&utm_medium=member_android"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Boles Emad - Lead Developer LinkedIn Profile"
              className="group inline-flex items-center gap-3 mb-2"
            >
              <h3 className="font-heading text-3xl sm:text-4xl tracking-wider text-white group-hover:text-[#F5B82E] transition-colors duration-200">
                BOLES EMAD
              </h3>
            </a>

            {/* Subtitle */}
            <p className="text-xs sm:text-sm font-sans tracking-wide text-[#FFF4E5]/60 mb-5">
              DESIGNED & DEVELOPED WITH PASSION <span className="text-[#F5B82E]">·</span> CRAFTED FOR SPEED & PRECISION
            </p>

            {/* 4 Official Recognizable Clickable Social / Contact Icons */}
            <div className="flex items-center justify-center gap-3 sm:gap-4 flex-wrap">
              {developerSocials.map((social) => (
                <a
                  key={social.name}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`${social.name} - Boles Emad`}
                  title={social.tooltip}
                  className={`group relative p-2.5 sm:p-3 rounded-xl bg-white/5 border border-white/10 text-white/70 transition-all duration-300 hover:scale-110 active:scale-95 ${social.hoverColor}`}
                >
                  {social.icon}
                  {/* Tooltip on Hover */}
                  <span className="pointer-events-none absolute -top-8 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity bg-black/90 text-[10px] text-white px-2 py-0.5 rounded border border-white/10 whitespace-nowrap z-30 shadow-lg">
                    {social.name}
                  </span>
                </a>
              ))}
            </div>

            {/* Final Trademark Line */}
            <div className="mt-6 pt-4 border-t border-white/5 w-full max-w-md text-center">
              <p className="font-heading tracking-[0.2em] text-[11px] text-white/35 uppercase">
                © 2026 CHIKEN. ALL RIGHTS RESERVED.
              </p>
            </div>

          </div>
        </div>
      </div>
    </footer>
  );
};

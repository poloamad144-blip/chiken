import React, { useState, useEffect } from 'react';
import { ShoppingBag, Menu, X, PhoneCall, Sparkles } from 'lucide-react';

interface NavbarProps {
  cartCount: number;
  onOpenCart: () => void;
  onOrderNowClick: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  cartCount,
  onOpenCart,
  onOrderNowClick,
}) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 40);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { label: 'HOME', href: '#hero' },
    { label: 'MENU', href: '#menu' },
    { label: 'ABOUT', href: '#about' },
    { label: 'OFFERS', href: '#offers' },
    { label: 'CONTACT', href: '#contact' },
  ];

  const handleNavClick = (href: string) => {
    setMobileMenuOpen(false);
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
        isScrolled
          ? 'bg-[#0E0A0B]/95 backdrop-blur-md border-b border-white/10 shadow-2xl py-3.5'
          : 'bg-gradient-to-b from-[#070606]/95 via-[#070606]/50 to-transparent py-5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between gap-4 md:gap-8">
          {/* Brand Zone */}
          <a
            href="#hero"
            onClick={(e) => {
              e.preventDefault();
              handleNavClick('#hero');
            }}
            className="flex items-center gap-2.5 group whitespace-nowrap shrink-0"
          >
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#C8102E] via-[#92051C] to-[#C8102E] flex items-center justify-center shadow-lg shadow-[#C8102E]/40 border border-[#F5B82E]/40 group-hover:scale-105 group-hover:border-[#F5B82E] transition-all duration-200">
              <span className="font-heading text-2xl font-black text-[#F5B82E] tracking-tighter">
                C
              </span>
            </div>
            <div className="flex flex-col">
              <span className="font-heading text-3xl md:text-4xl font-extrabold tracking-wider text-white group-hover:text-[#F5B82E] transition-colors leading-none">
                CHIKEN
              </span>
              <span className="text-[10px] tracking-[0.25em] text-[#F5B82E] font-semibold uppercase leading-none mt-0.5">
                CRISPY RESTAURANT
              </span>
            </div>
          </a>

          {/* Navigation Links Zone */}
          <nav className="hidden lg:flex items-center gap-8">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                onClick={(e) => {
                  e.preventDefault();
                  handleNavClick(link.href);
                }}
                className="font-heading text-lg tracking-wider text-white/80 hover:text-[#F5B82E] transition-colors relative py-1 group whitespace-nowrap shrink-0"
              >
                {link.label}
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-[#C8102E] group-hover:w-full transition-all duration-300" />
              </a>
            ))}
          </nav>

          {/* Action Zone */}
          <div className="flex items-center gap-3 shrink-0">
            {/* Quick Hotline (desktop) */}
            <a
              href="tel:19888"
              className="btn-chamfer-sm hidden sm:flex items-center gap-2 px-3.5 py-2 bg-[#171112] border border-white/10 hover:border-[#F5B82E]/60 text-white/90 hover:text-[#F5B82E] transition-all text-xs font-medium shadow-sm"
              title="Delivery Hotline 19888"
            >
              <PhoneCall className="w-3.5 h-3.5 text-[#F5B82E]" />
              <span className="font-heading text-sm tracking-wide">19888</span>
            </a>

            {/* Shopping Cart Button */}
            <button
              onClick={onOpenCart}
              className="btn-chamfer-sm relative p-2.5 bg-[#171112] hover:bg-[#221415] border border-white/10 hover:border-[#C8102E] text-white hover:text-[#F5B82E] transition-all flex items-center justify-center group active:scale-95 shadow-md cursor-pointer"
              aria-label={`Shopping Cart with ${cartCount} items`}
            >
              <ShoppingBag className="w-5 h-5 transition-transform group-hover:scale-110" />
              {cartCount > 0 && (
                <span className="absolute -top-1.5 -right-1.5 min-w-[20px] h-5 px-1 rounded-full bg-[#C8102E] border-2 border-[#0B0B0B] text-[#FFF4E5] font-sans text-xs font-bold flex items-center justify-center animate-bounce shadow-md">
                  {cartCount}
                </span>
              )}
            </button>

            {/* Primary Order Now Button */}
            <button
              onClick={onOrderNowClick}
              className="btn-chamfer btn-sheen relative px-6 py-2.5 bg-gradient-to-r from-[#C8102E] via-[#92051C] to-[#C8102E] hover:from-[#e01435] hover:to-[#a30620] text-white font-heading text-lg md:text-xl tracking-wider shadow-xl shadow-[#C8102E]/40 border border-[#F5B82E]/50 hover:border-[#F5B82E] hover:shadow-[#C8102E]/70 hover:scale-[1.03] active:scale-95 transition-all duration-200 cursor-pointer whitespace-nowrap shrink-0 group"
            >
              <span className="relative z-10 flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-[#F5B82E] group-hover:rotate-12 transition-transform" />
                <span className="font-extrabold tracking-widest">ORDER NOW</span>
              </span>
            </button>

            {/* Mobile Hamburger Toggle */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 rounded-xl bg-white/5 border border-white/10 text-white hover:text-[#F5B82E] transition-colors cursor-pointer"
              aria-label="Toggle Navigation Menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-[#151111]/98 border-b border-white/10 px-6 py-6 mt-3 backdrop-blur-xl animate-in slide-in-from-top-4 duration-200 shadow-2xl">
          <div className="flex flex-col gap-4">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                onClick={(e) => {
                  e.preventDefault();
                  handleNavClick(link.href);
                }}
                className="font-heading text-2xl tracking-wider text-white hover:text-[#F5B82E] py-2 border-b border-white/5 flex items-center justify-between"
              >
                <span>{link.label}</span>
                <span className="text-xs text-white/40 font-sans tracking-normal">Explore &rarr;</span>
              </a>
            ))}

            <div className="pt-4 flex flex-col gap-3">
              <a
                href="tel:19888"
                className="flex items-center justify-center gap-2 py-3 rounded-xl bg-white/5 border border-white/10 text-white font-heading text-lg"
              >
                <PhoneCall className="w-4 h-4 text-[#F5B82E]" />
                CALL HOTLINE: 19888
              </a>

              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOrderNowClick();
                }}
                className="w-full btn-chamfer btn-sheen py-3.5 bg-gradient-to-r from-[#C8102E] to-[#92051C] text-white font-heading text-xl tracking-wider shadow-lg shadow-[#C8102E]/40 cursor-pointer"
              >
                ORDER NOW FOR DELIVERY
              </button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};

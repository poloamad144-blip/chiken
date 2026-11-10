import React from 'react';
import { ShoppingBag, ArrowRight } from 'lucide-react';
import { MenuItem } from '../types/restaurant';

interface ToastProps {
  message: string;
  item?: MenuItem;
  onViewCart: () => void;
  onClose: () => void;
}

export const Toast: React.FC<ToastProps> = ({ message, item, onViewCart }) => {
  return (
    <div className="fixed bottom-6 right-6 z-50 max-w-sm w-full bg-[#1A1414] border border-[#F5B82E]/40 rounded-2xl shadow-2xl p-4 flex items-center justify-between gap-3 animate-in slide-in-from-bottom-5 duration-300">
      <div className="flex items-center gap-3 min-w-0">
        {item ? (
          <img
            src={item.image}
            alt={item.name}
            referrerPolicy="no-referrer"
            className="w-12 h-12 rounded-xl object-cover shrink-0 bg-black"
          />
        ) : (
          <div className="w-10 h-10 rounded-xl bg-[#C8102E] flex items-center justify-center text-white shrink-0">
            <ShoppingBag className="w-5 h-5" />
          </div>
        )}

        <div className="min-w-0">
          <p className="font-heading text-base text-white tracking-wide leading-tight truncate">
            {message}
          </p>
          {item && (
            <p className="text-xs text-[#F5B82E] font-sans font-medium">
              +{item.price} EGP added to order
            </p>
          )}
        </div>
      </div>

      <button
        onClick={onViewCart}
        className="btn-chamfer-sm btn-sheen px-3.5 py-2 bg-gradient-to-r from-[#C8102E] to-[#92051C] hover:from-[#e01435] hover:to-[#a30620] text-white font-heading text-xs tracking-wider flex items-center gap-1.5 shrink-0 transition-all cursor-pointer shadow-md shadow-[#C8102E]/40"
      >
        <span>CART</span>
        <ArrowRight className="w-3.5 h-3.5 text-[#F5B82E]" />
      </button>
    </div>
  );
};

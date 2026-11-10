import React, { useState } from 'react';
import { X, Trash2, Plus, Minus, ShoppingBag, ArrowRight, Tag, Check, Sparkles } from 'lucide-react';
import { CartItem } from '../types/restaurant';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  cart: CartItem[];
  onUpdateQuantity: (cartItemId: string, newQty: number) => void;
  onRemoveItem: (cartItemId: string) => void;
  onClearCart: () => void;
  appliedPromo: string;
  onApplyPromo: (code: string) => void;
  onOpenCheckout: () => void;
}

export const CartDrawer: React.FC<CartDrawerProps> = ({
  isOpen,
  onClose,
  cart,
  onUpdateQuantity,
  onRemoveItem,
  onClearCart,
  appliedPromo,
  onApplyPromo,
  onOpenCheckout,
}) => {
  if (!isOpen) return null;

  const [promoInput, setPromoInput] = useState(appliedPromo || '');
  const [promoError, setPromoError] = useState('');

  // Subtotal calculation
  const subtotal = cart.reduce((sum, item) => sum + item.item.price * item.quantity, 0);

  // Free delivery threshold: 350 EGP
  const freeDeliveryThreshold = 350;
  const progressToFreeDelivery = Math.min(100, (subtotal / freeDeliveryThreshold) * 100);
  const remainingForFreeDelivery = Math.max(0, freeDeliveryThreshold - subtotal);

  // Delivery fee: 40 EGP unless over threshold or FREEDELIVERY promo used
  let deliveryFee = subtotal >= freeDeliveryThreshold ? 0 : 40;

  // Discount calculation
  let discount = 0;
  if (appliedPromo.toUpperCase() === 'CRUNCH25' && subtotal >= 400) {
    discount = Math.round(subtotal * 0.25);
  } else if (appliedPromo.toUpperCase() === 'FREEDELIVERY') {
    deliveryFee = 0;
    discount = 40;
  }

  const grandTotal = Math.max(0, subtotal + (deliveryFee === 0 ? 0 : deliveryFee) - (appliedPromo.toUpperCase() === 'FREEDELIVERY' ? 0 : discount));

  const handleApplyPromoCode = (e: React.FormEvent) => {
    e.preventDefault();
    setPromoError('');
    const code = promoInput.trim().toUpperCase();
    if (!code) return;

    if (code === 'CRUNCH25') {
      if (subtotal < 400) {
        setPromoError('CRUNCH25 requires minimum 400 EGP order.');
      } else {
        onApplyPromo(code);
      }
    } else if (code === 'FREEDELIVERY') {
      onApplyPromo(code);
    } else {
      setPromoError('Invalid coupon code. Try CRUNCH25');
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex justify-end bg-black/75 backdrop-blur-sm animate-in fade-in duration-200">
      <div
        className="w-full max-w-md bg-[#161111] border-l border-white/10 h-full flex flex-col justify-between shadow-2xl relative"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="p-5 border-b border-white/10 flex items-center justify-between bg-[#1B1414]">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-[#C8102E] flex items-center justify-center text-white">
              <ShoppingBag className="w-4 h-4" />
            </div>
            <div>
              <h2 className="font-heading text-2xl text-white tracking-wide leading-none">
                YOUR CRISPY ORDER
              </h2>
              <span className="text-xs text-white/50 font-sans">
                {cart.length} unique item{cart.length === 1 ? '' : 's'}
              </span>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {cart.length > 0 && (
              <button
                onClick={onClearCart}
                className="text-xs text-white/40 hover:text-[#C8102E] transition-colors font-sans mr-2"
                title="Empty shopping cart"
              >
                Clear All
              </button>
            )}
            <button
              onClick={onClose}
              className="p-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-white/70 hover:text-white transition-colors"
              aria-label="Close cart"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Free Delivery Banner */}
        {cart.length > 0 && (
          <div className="px-5 py-3 bg-[#110C0D] border-b border-white/5">
            <div className="flex items-center justify-between text-xs mb-1.5">
              <span className="text-white/80 font-medium">
                {subtotal >= freeDeliveryThreshold ? (
                  <span className="text-emerald-400 font-bold flex items-center gap-1">
                    <Check className="w-3.5 h-3.5" /> FREE DELIVERY UNLOCKED!
                  </span>
                ) : (
                  <span>
                    Add <strong className="text-[#F5B82E] font-heading text-sm">{remainingForFreeDelivery} EGP</strong> for FREE delivery
                  </span>
                )}
              </span>
              <span className="text-white/40">{Math.round(progressToFreeDelivery)}%</span>
            </div>
            <div className="w-full h-1.5 rounded-full bg-white/10 overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-[#C8102E] to-[#F5B82E] rounded-full transition-all duration-300"
                style={{ width: `${progressToFreeDelivery}%` }}
              />
            </div>
          </div>
        )}

        {/* Item List */}
        <div className="flex-1 overflow-y-auto p-5 space-y-4">
          {cart.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center text-center py-16">
              <div className="w-16 h-16 rounded-2xl bg-white/5 flex items-center justify-center mb-4 text-white/30">
                <ShoppingBag className="w-8 h-8" />
              </div>
              <h3 className="font-heading text-2xl text-white">YOUR CART IS HUNGRY</h3>
              <p className="text-xs text-white/60 font-sans max-w-xs mt-1">
                Explore our signature chicken buckets, loaded fries, and crunch burgers.
              </p>
              <button
                onClick={onClose}
                className="mt-6 btn-chamfer-sm px-6 py-3 bg-[#C8102E] text-white font-heading text-base tracking-wider hover:bg-[#92051C] transition-all cursor-pointer shadow-lg shadow-[#C8102E]/30"
              >
                VIEW MENU ITEMS
              </button>
            </div>
          ) : (
            cart.map((cartItem) => (
              <div
                key={cartItem.id}
                className="p-3.5 rounded-2xl bg-[#1B1414] border border-white/5 flex items-start justify-between gap-3"
              >
                {/* Product Thumbnail */}
                <img
                  src={cartItem.item.image}
                  alt={cartItem.item.name}
                  referrerPolicy="no-referrer"
                  className="w-16 h-16 rounded-xl object-cover shrink-0 bg-black"
                />

                {/* Details */}
                <div className="flex-1 min-w-0">
                  <h4 className="font-heading text-lg text-white leading-tight truncate">
                    {cartItem.item.name}
                  </h4>
                  
                  {/* Customizations tags */}
                  <div className="flex flex-wrap gap-1.5 mt-1 text-[11px] text-white/60">
                    {cartItem.spiceLevel && (
                      <span className="text-[#F5B82E] font-medium">
                        {cartItem.spiceLevel}
                      </span>
                    )}
                    {cartItem.selectedSauce && (
                      <>
                        <span>·</span>
                        <span className="truncate max-w-[120px]">
                          {cartItem.selectedSauce}
                        </span>
                      </>
                    )}
                  </div>

                  {cartItem.specialInstructions && (
                    <p className="text-[10px] text-white/40 italic truncate mt-0.5">
                      Note: "{cartItem.specialInstructions}"
                    </p>
                  )}

                  {/* Price */}
                  <div className="mt-2 text-sm font-heading text-[#F5B82E] tabular-nums">
                    {cartItem.item.price * cartItem.quantity} EGP
                    {cartItem.quantity > 1 && (
                      <span className="text-[11px] text-white/40 font-sans ml-1">
                        ({cartItem.item.price} each)
                      </span>
                    )}
                  </div>
                </div>

                {/* Quantity Controls & Delete */}
                <div className="flex flex-col items-end justify-between h-16">
                  <button
                    onClick={() => onRemoveItem(cartItem.id)}
                    className="text-white/30 hover:text-[#C8102E] transition-colors p-1"
                    title="Remove item"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>

                  <div className="flex items-center gap-1.5 bg-black/40 rounded-lg p-0.5 border border-white/10">
                    <button
                      onClick={() => onUpdateQuantity(cartItem.id, cartItem.quantity - 1)}
                      className="w-6 h-6 rounded flex items-center justify-center text-white/70 hover:text-white hover:bg-white/10 transition-colors"
                      aria-label="Decrease"
                    >
                      <Minus className="w-3 h-3" />
                    </button>
                    <span className="font-heading text-sm text-white w-4 text-center tabular-nums">
                      {cartItem.quantity}
                    </span>
                    <button
                      onClick={() => onUpdateQuantity(cartItem.id, cartItem.quantity + 1)}
                      className="w-6 h-6 rounded flex items-center justify-center text-white/70 hover:text-white hover:bg-white/10 transition-colors"
                      aria-label="Increase"
                    >
                      <Plus className="w-3 h-3" />
                    </button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Footer / Total & Checkout */}
        {cart.length > 0 && (
          <div className="p-5 border-t border-white/10 bg-[#161111] space-y-4">
            
            {/* Promo Code Input */}
            <form onSubmit={handleApplyPromoCode} className="space-y-1">
              <div className="flex items-center gap-2">
                <div className="relative flex-1">
                  <Tag className="w-3.5 h-3.5 text-white/40 absolute left-3 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    value={promoInput}
                    onChange={(e) => {
                      setPromoInput(e.target.value);
                      setPromoError('');
                    }}
                    placeholder="Promo code (e.g. CRUNCH25)"
                    className="w-full pl-9 pr-3 py-2 rounded-xl bg-black/40 border border-white/10 text-xs text-white uppercase placeholder:text-white/30 focus:outline-none focus:border-[#C8102E]"
                  />
                </div>
                <button
                  type="submit"
                  className="btn-chamfer-sm btn-sheen px-4 py-2 bg-[#C8102E] hover:bg-[#92051C] text-white font-heading text-xs tracking-wider transition-all cursor-pointer shadow-md shadow-[#C8102E]/30 active:scale-95"
                >
                  APPLY
                </button>
              </div>

              {appliedPromo && (
                <div className="flex items-center justify-between text-xs text-emerald-400 px-1 pt-1">
                  <span>Coupon {appliedPromo} applied!</span>
                  <button
                    type="button"
                    onClick={() => {
                      onApplyPromo('');
                      setPromoInput('');
                    }}
                    className="text-white/40 hover:text-white underline text-[10px]"
                  >
                    Remove
                  </button>
                </div>
              )}

              {promoError && (
                <p className="text-[11px] text-red-400 px-1 pt-0.5">{promoError}</p>
              )}
            </form>

            {/* Price Calculations */}
            <div className="space-y-1.5 text-xs font-sans text-white/70 pt-2 border-t border-white/5">
              <div className="flex items-center justify-between">
                <span>Subtotal</span>
                <span className="text-white font-medium tabular-nums">{subtotal} EGP</span>
              </div>

              {discount > 0 && (
                <div className="flex items-center justify-between text-emerald-400">
                  <span>Discount ({appliedPromo})</span>
                  <span className="tabular-nums">-{discount} EGP</span>
                </div>
              )}

              <div className="flex items-center justify-between">
                <span>Delivery Fee</span>
                <span className="text-white font-medium tabular-nums">
                  {deliveryFee === 0 ? (
                    <span className="text-emerald-400 font-bold">FREE</span>
                  ) : (
                    `${deliveryFee} EGP`
                  )}
                </span>
              </div>

              <div className="pt-2 border-t border-white/10 flex items-center justify-between text-base font-heading text-white">
                <span className="tracking-wide">TOTAL</span>
                <span className="text-2xl text-[#F5B82E] tracking-wider tabular-nums font-black">
                  {grandTotal} <span className="text-sm font-sans text-white/70">EGP</span>
                </span>
              </div>
            </div>

            {/* Checkout Action Button */}
            <button
              onClick={onOpenCheckout}
              className="w-full btn-chamfer btn-sheen py-4 px-5 bg-gradient-to-r from-[#C8102E] via-[#92051C] to-[#C8102E] hover:from-[#E51837] hover:to-[#B30622] text-white font-heading text-xl tracking-wider shadow-2xl shadow-[#C8102E]/40 hover:scale-[1.01] active:scale-[0.98] transition-all flex items-center justify-between cursor-pointer"
            >
              <span className="flex items-center gap-2">
                <ShoppingBag className="w-5 h-5 text-[#F5B82E]" />
                <span>CHECKOUT</span>
              </span>
              <div className="flex items-center gap-1.5 text-[#F5B82E] font-black">
                <span>{grandTotal} EGP</span>
                <ArrowRight className="w-5 h-5 text-white" />
              </div>
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

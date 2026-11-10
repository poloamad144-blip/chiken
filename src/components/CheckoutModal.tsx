import React, { useState } from 'react';
import { X, Bike, Store, CreditCard, Banknote, ShieldCheck, ArrowRight, Loader2 } from 'lucide-react';
import { CartItem, OrderData } from '../types/restaurant';

interface CheckoutModalProps {
  isOpen: boolean;
  onClose: () => void;
  cart: CartItem[];
  subtotal: number;
  deliveryFee: number;
  discount: number;
  total: number;
  appliedPromo: string;
  onOrderPlaced: (order: OrderData) => void;
}

export const CheckoutModal: React.FC<CheckoutModalProps> = ({
  isOpen,
  onClose,
  cart,
  subtotal,
  deliveryFee,
  discount,
  total,
  appliedPromo,
  onOrderPlaced,
}) => {
  if (!isOpen) return null;

  const [orderType, setOrderType] = useState<'delivery' | 'pickup'>('delivery');
  const [paymentMethod, setPaymentMethod] = useState<'cash' | 'card_on_delivery'>('cash');
  const [customerName, setCustomerName] = useState('');
  const [phone, setPhone] = useState('');
  const [area, setArea] = useState('New Cairo (5th Settlement)');
  const [address, setAddress] = useState('');
  const [notes, setNotes] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const areas = [
    'New Cairo (5th Settlement)',
    'New Cairo (1st Settlement & Rehab)',
    'Zamalek',
    'Sheikh Zayed & 6th of October',
    'Maadi & Degla',
    'Nasr City & Heliopolis',
    'Dokki & Mohandessin',
    'Alexandria Waterfront',
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!customerName || !phone || (orderType === 'delivery' && !address)) return;

    setIsSubmitting(true);

    setTimeout(() => {
      const generatedId = `CHK-${Math.floor(1000 + Math.random() * 9000)}`;
      const newOrder: OrderData = {
        orderId: generatedId,
        customerName,
        phone,
        address: orderType === 'delivery' ? address : 'Selected Flagship Branch',
        area,
        orderType,
        paymentMethod,
        items: [...cart],
        subtotal,
        discount,
        deliveryFee: orderType === 'delivery' ? deliveryFee : 0,
        total: orderType === 'delivery' ? total : Math.max(0, total - deliveryFee),
        notes,
        createdAt: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        status: 'received',
      };

      setIsSubmitting(false);
      onOrderPlaced(newOrder);
    }, 1200);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in duration-200">
      <div
        className="relative w-full max-w-2xl bg-[#171112] border border-white/10 rounded-3xl overflow-hidden shadow-2xl flex flex-col max-h-[92vh]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="p-5 sm:p-6 border-b border-white/10 bg-[#1D1516] flex items-center justify-between">
          <div>
            <h2 className="font-heading text-3xl text-white tracking-wide leading-none">
              CHECKOUT & DELIVERY
            </h2>
            <p className="text-xs text-[#F5B82E] font-sans mt-1">
              Fresh & hot straight from the fryer to your door
            </p>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-xl bg-white/5 hover:bg-white/10 text-white/70 hover:text-white transition-colors"
            aria-label="Close checkout"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Scrollable Form Body */}
        <form onSubmit={handleSubmit} className="overflow-y-auto p-6 sm:p-8 space-y-6 flex-1">
          {/* Order Type Toggle: Delivery vs Pickup */}
          <div className="space-y-2">
            <label className="block text-xs font-heading tracking-wider text-white/80">
              FULFILLMENT METHOD
            </label>
            <div className="grid grid-cols-2 gap-3">
              <button
                type="button"
                onClick={() => setOrderType('delivery')}
                className={`btn-chamfer-sm py-3.5 px-4 border flex items-center justify-center gap-2 font-heading text-base tracking-wider transition-all cursor-pointer ${
                  orderType === 'delivery'
                    ? 'bg-[#C8102E] border-[#C8102E] text-white shadow-lg shadow-[#C8102E]/30'
                    : 'bg-white/5 border-white/10 text-white/70 hover:text-white hover:bg-white/10'
                }`}
              >
                <Bike className="w-4 h-4 text-[#F5B82E]" />
                <span>EXPRESS DELIVERY</span>
              </button>

              <button
                type="button"
                onClick={() => setOrderType('pickup')}
                className={`btn-chamfer-sm py-3.5 px-4 border flex items-center justify-center gap-2 font-heading text-base tracking-wider transition-all cursor-pointer ${
                  orderType === 'pickup'
                    ? 'bg-[#C8102E] border-[#C8102E] text-white shadow-lg shadow-[#C8102E]/30'
                    : 'bg-white/5 border-white/10 text-white/70 hover:text-white hover:bg-white/10'
                }`}
              >
                <Store className="w-4 h-4 text-[#F5B82E]" />
                <span>BRANCH PICKUP</span>
              </button>
            </div>
          </div>

          {/* Customer Details */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-heading tracking-wider text-white/80 mb-1">
                FULL NAME *
              </label>
              <input
                type="text"
                required
                value={customerName}
                onChange={(e) => setCustomerName(e.target.value)}
                placeholder="e.g. Kareem Mansour"
                className="w-full px-4 py-2.5 rounded-xl bg-black/40 border border-white/10 text-white text-sm focus:outline-none focus:border-[#C8102E]"
              />
            </div>

            <div>
              <label className="block text-xs font-heading tracking-wider text-white/80 mb-1">
                MOBILE PHONE *
              </label>
              <input
                type="tel"
                required
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="010 9876 5432"
                className="w-full px-4 py-2.5 rounded-xl bg-black/40 border border-white/10 text-white text-sm focus:outline-none focus:border-[#C8102E]"
              />
            </div>
          </div>

          {/* Delivery Specific Fields */}
          {orderType === 'delivery' ? (
            <div className="space-y-4 pt-2 border-t border-white/5">
              <div>
                <label className="block text-xs font-heading tracking-wider text-white/80 mb-1">
                  DELIVERY ZONE / AREA
                </label>
                <select
                  value={area}
                  onChange={(e) => setArea(e.target.value)}
                  className="w-full px-3 py-2.5 rounded-xl bg-black/40 border border-white/10 text-white text-sm focus:outline-none focus:border-[#C8102E]"
                >
                  {areas.map((a) => (
                    <option key={a} value={a} className="bg-[#171112]">
                      {a}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-xs font-heading tracking-wider text-white/80 mb-1">
                  DETAILED STREET ADDRESS *
                </label>
                <textarea
                  required
                  rows={2}
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  placeholder="Street name, Building number, Floor, Apartment..."
                  className="w-full px-4 py-2.5 rounded-xl bg-black/40 border border-white/10 text-white text-sm focus:outline-none focus:border-[#C8102E] resize-none"
                />
              </div>
            </div>
          ) : (
            <div className="p-4 rounded-xl bg-white/5 border border-white/10 text-xs text-white/70">
              <p className="font-heading text-sm text-[#F5B82E] mb-1">PICKUP ADDRESS:</p>
              <p>Your order will be prepared at your nearest flagship branch (ready in ~15-20 mins).</p>
            </div>
          )}

          {/* Payment Method */}
          <div className="space-y-2 pt-2 border-t border-white/5">
            <label className="block text-xs font-heading tracking-wider text-white/80">
              PAYMENT METHOD
            </label>
            <div className="grid grid-cols-2 gap-3">
              <button
                type="button"
                onClick={() => setPaymentMethod('cash')}
                className={`py-3 px-3 rounded-xl border flex items-center justify-center gap-2 font-heading text-sm tracking-wide transition-all cursor-pointer ${
                  paymentMethod === 'cash'
                    ? 'bg-[#F5B82E]/15 border-[#F5B82E] text-white shadow'
                    : 'bg-white/5 border-white/10 text-white/60 hover:text-white'
                }`}
              >
                <Banknote className="w-4 h-4 text-[#F5B82E]" />
                <span>CASH ON ARRIVAL</span>
              </button>

              <button
                type="button"
                onClick={() => setPaymentMethod('card_on_delivery')}
                className={`py-3 px-3 rounded-xl border flex items-center justify-center gap-2 font-heading text-sm tracking-wide transition-all cursor-pointer ${
                  paymentMethod === 'card_on_delivery'
                    ? 'bg-[#F5B82E]/15 border-[#F5B82E] text-white shadow'
                    : 'bg-white/5 border-white/10 text-white/60 hover:text-white'
                }`}
              >
                <CreditCard className="w-4 h-4 text-[#F5B82E]" />
                <span>CARD ON DELIVERY (POS)</span>
              </button>
            </div>
          </div>

          {/* Special Delivery Instructions */}
          <div>
            <label className="block text-xs font-heading tracking-wider text-white/80 mb-1">
              RIDER NOTES (OPTIONAL)
            </label>
            <input
              type="text"
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder="e.g. Ring intercom 4B, please deliver quickly hot!"
              className="w-full px-4 py-2 rounded-xl bg-black/40 border border-white/10 text-white text-sm focus:outline-none focus:border-[#C8102E]"
            />
          </div>

          {/* Order Summary Strip */}
          <div className="p-4 rounded-2xl bg-black/50 border border-white/10 space-y-2 text-xs font-sans">
            <div className="flex items-center justify-between text-white/70">
              <span>Items Subtotal ({cart.reduce((s, i) => s + i.quantity, 0)} items)</span>
              <span className="text-white font-medium tabular-nums">{subtotal} EGP</span>
            </div>
            {discount > 0 && (
              <div className="flex items-center justify-between text-emerald-400">
                <span>Promo Discount</span>
                <span className="tabular-nums">-{discount} EGP</span>
              </div>
            )}
            <div className="flex items-center justify-between text-white/70">
              <span>Delivery Fee</span>
              <span>
                {orderType === 'pickup' || deliveryFee === 0 ? (
                  <span className="text-emerald-400 font-bold">FREE</span>
                ) : (
                  `${deliveryFee} EGP`
                )}
              </span>
            </div>
            <div className="pt-2 border-t border-white/10 flex items-center justify-between text-lg font-heading text-white">
              <span>FINAL PAYABLE TOTAL</span>
              <span className="text-2xl text-[#F5B82E] tabular-nums">
                {orderType === 'pickup' ? Math.max(0, total - deliveryFee) : total} EGP
              </span>
            </div>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full btn-chamfer btn-sheen py-4 bg-gradient-to-r from-[#C8102E] via-[#92051C] to-[#C8102E] hover:from-[#E51837] hover:to-[#B30622] text-white font-heading text-xl tracking-wider shadow-2xl shadow-[#C8102E]/50 hover:scale-[1.01] active:scale-[0.99] transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
          >
            {isSubmitting ? (
              <>
                <Loader2 className="w-5 h-5 animate-spin text-[#F5B82E]" />
                <span>CONFIRMING WITH KITCHEN...</span>
              </>
            ) : (
              <>
                <ShieldCheck className="w-5 h-5 text-[#F5B82E]" />
                <span>PLACE CRISPY ORDER NOW</span>
                <ArrowRight className="w-5 h-5 text-[#F5B82E]" />
              </>
            )}
          </button>
        </form>
      </div>
    </div>
  );
};

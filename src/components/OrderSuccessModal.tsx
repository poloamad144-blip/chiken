import React from 'react';
import { CheckCircle2, Clock, MapPin, Bike, Sparkles, X, PhoneCall } from 'lucide-react';
import { OrderData } from '../types/restaurant';

interface OrderSuccessModalProps {
  order: OrderData | null;
  onClose: () => void;
}

export const OrderSuccessModal: React.FC<OrderSuccessModalProps> = ({ order, onClose }) => {
  if (!order) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-in fade-in duration-200">
      <div
        className="relative w-full max-w-xl bg-[#171112] border border-[#F5B82E]/40 rounded-3xl overflow-hidden shadow-2xl flex flex-col max-h-[92vh]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Top Celebration Banner */}
        <div className="bg-gradient-to-r from-[#C8102E] via-[#92051C] to-[#C8102E] p-6 text-center text-white relative">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-1.5 rounded-full bg-black/30 hover:bg-black/60 text-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="w-16 h-16 rounded-2xl bg-white/10 border border-white/20 mx-auto flex items-center justify-center mb-3 shadow-lg">
            <CheckCircle2 className="w-10 h-10 text-[#F5B82E]" />
          </div>

          <h2 className="font-heading text-4xl tracking-wider uppercase leading-none">
            ORDER CONFIRMED!
          </h2>
          <p className="text-xs text-[#FFF4E5]/80 font-sans mt-1">
            Order Reference: <strong className="text-[#F5B82E] font-heading text-base tracking-widest">{order.orderId}</strong>
          </p>
        </div>

        {/* Scrollable Receipt Body */}
        <div className="overflow-y-auto p-6 sm:p-8 space-y-6 flex-1">
          {/* Estimated Time Badge */}
          <div className="p-4 rounded-2xl bg-[#1F1717] border border-white/10 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-[#C8102E]/20 flex items-center justify-center text-[#F5B82E]">
                <Clock className="w-5 h-5" />
              </div>
              <div>
                <p className="font-heading text-lg text-white leading-none">
                  ESTIMATED ARRIVAL
                </p>
                <p className="text-xs text-[#F5B82E] font-medium mt-0.5">
                  25 – 35 Minutes (Direct Hot Dispatch)
                </p>
              </div>
            </div>

            <div className="text-right">
              <span className="text-[10px] text-white/50 uppercase">Order Type</span>
              <p className="font-heading text-base text-white uppercase">
                {order.orderType === 'delivery' ? 'Express Delivery' : 'Branch Pickup'}
              </p>
            </div>
          </div>

          {/* Live Kitchen Preparation Timeline */}
          <div className="space-y-3">
            <p className="font-heading text-base tracking-wider text-white">
              LIVE KITCHEN DISPATCH STATUS
            </p>
            
            <div className="grid grid-cols-4 gap-2 text-center text-xs">
              <div className="flex flex-col items-center">
                <div className="w-7 h-7 rounded-full bg-emerald-500 text-black flex items-center justify-center font-bold mb-1 shadow-md">
                  ✓
                </div>
                <span className="text-white font-medium">Received</span>
              </div>

              <div className="flex flex-col items-center">
                <div className="w-7 h-7 rounded-full bg-[#C8102E] text-white flex items-center justify-center font-bold mb-1 animate-pulse shadow-md border border-[#F5B82E]">
                  2
                </div>
                <span className="text-[#F5B82E] font-bold">Crisping</span>
              </div>

              <div className="flex flex-col items-center">
                <div className="w-7 h-7 rounded-full bg-white/10 text-white/40 flex items-center justify-center font-bold mb-1">
                  3
                </div>
                <span className="text-white/40">Inspecting</span>
              </div>

              <div className="flex flex-col items-center">
                <div className="w-7 h-7 rounded-full bg-white/10 text-white/40 flex items-center justify-center font-bold mb-1">
                  4
                </div>
                <span className="text-white/40">On The Way</span>
              </div>
            </div>
          </div>

          {/* Delivery & Customer Summary */}
          <div className="p-4 rounded-2xl bg-black/40 border border-white/5 space-y-2 text-xs font-sans">
            <div className="flex items-start gap-2 text-white/80">
              <MapPin className="w-4 h-4 text-[#F5B82E] shrink-0 mt-0.5" />
              <div>
                <p className="text-white font-medium">{order.customerName} ({order.phone})</p>
                <p className="text-white/60">{order.address}, {order.area}</p>
              </div>
            </div>

            <div className="pt-2 border-t border-white/5 flex items-center justify-between text-white/70">
              <span>Payment Mode:</span>
              <span className="text-white font-medium uppercase">
                {order.paymentMethod === 'cash' ? 'Cash on Delivery' : 'Card on Delivery'}
              </span>
            </div>
          </div>

          {/* Itemized Receipt */}
          <div className="space-y-2.5">
            <p className="font-heading text-base tracking-wider text-white">
              ORDER ITEMS
            </p>
            <div className="space-y-2 max-h-40 overflow-y-auto pr-1">
              {order.items.map((cartItem, idx) => (
                <div
                  key={idx}
                  className="flex items-center justify-between text-xs py-1.5 border-b border-white/5"
                >
                  <div className="flex items-center gap-2">
                    <span className="font-heading text-sm text-[#F5B82E]">
                      {cartItem.quantity}x
                    </span>
                    <span className="text-white font-medium">
                      {cartItem.item.name}
                    </span>
                    {cartItem.spiceLevel && (
                      <span className="text-[10px] text-white/50">
                        ({cartItem.spiceLevel})
                      </span>
                    )}
                  </div>
                  <span className="text-white font-sans tabular-nums">
                    {cartItem.item.price * cartItem.quantity} EGP
                  </span>
                </div>
              ))}
            </div>

            <div className="pt-3 border-t border-white/10 space-y-1 text-xs">
              <div className="flex justify-between text-white/70">
                <span>Subtotal</span>
                <span className="tabular-nums">{order.subtotal} EGP</span>
              </div>
              {order.discount > 0 && (
                <div className="flex justify-between text-emerald-400">
                  <span>Discount</span>
                  <span className="tabular-nums">-{order.discount} EGP</span>
                </div>
              )}
              <div className="flex justify-between text-white/70">
                <span>Delivery</span>
                <span>{order.deliveryFee === 0 ? 'FREE' : `${order.deliveryFee} EGP`}</span>
              </div>
              <div className="flex justify-between text-base font-heading text-white pt-1">
                <span>TOTAL PAID / DUE</span>
                <span className="text-xl text-[#F5B82E] tabular-nums">
                  {order.total} EGP
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Modal Footer */}
        <div className="p-4 sm:p-5 bg-[#120E0E] border-t border-white/10 flex items-center justify-between gap-3">
          <a
            href="tel:19888"
            className="btn-chamfer-sm px-4 py-2.5 bg-white/5 hover:bg-white/10 border border-white/10 text-white font-heading text-sm tracking-wider flex items-center gap-2"
          >
            <PhoneCall className="w-4 h-4 text-[#F5B82E]" />
            HOTLINE 19888
          </a>

          <button
            onClick={onClose}
            className="flex-1 btn-chamfer-sm btn-sheen py-2.5 px-5 bg-gradient-to-r from-[#C8102E] via-[#92051C] to-[#C8102E] hover:from-[#e01435] hover:to-[#a30620] text-white font-heading text-base tracking-wider transition-all text-center cursor-pointer shadow-lg shadow-[#C8102E]/30"
          >
            DONE & BACK TO MENU
          </button>
        </div>
      </div>
    </div>
  );
};

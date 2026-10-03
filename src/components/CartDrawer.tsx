import React, { useState } from 'react';
import { X, ShoppingBag, Trash2, ArrowRight, Tag, Truck, Check, Sparkles } from 'lucide-react';
import { CartItem } from '../types';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  items: CartItem[];
  onUpdateQuantity: (index: number, newQty: number) => void;
  onRemoveItem: (index: number) => void;
  onProceedToCheckout: () => void;
  appliedDiscount: number;
  couponCode: string;
  onApplyCoupon: (code: string) => boolean;
}

export const CartDrawer: React.FC<CartDrawerProps> = ({
  isOpen,
  onClose,
  items,
  onUpdateQuantity,
  onRemoveItem,
  onProceedToCheckout,
  appliedDiscount,
  couponCode,
  onApplyCoupon,
}) => {
  const [promoInput, setPromoInput] = useState<string>('');
  const [couponMsg, setCouponMsg] = useState<{ text: string; isError: boolean } | null>(null);

  if (!isOpen) return null;

  const subtotal = items.reduce((sum, item) => sum + item.product.price * item.quantity, 0);
  const discountAmount = Math.round(subtotal * (appliedDiscount / 100));
  const shipping = subtotal > 1999 || subtotal === 0 ? 0 : 250;
  const finalTotal = Math.max(0, subtotal - discountAmount + shipping);

  const handleApply = (e: React.FormEvent) => {
    e.preventDefault();
    if (!promoInput.trim()) return;
    const success = onApplyCoupon(promoInput.trim().toUpperCase());
    if (success) {
      setCouponMsg({ text: `Coupon ${promoInput.toUpperCase()} applied!`, isError: false });
    } else {
      setCouponMsg({ text: 'Invalid promo code. Try ASHA10', isError: true });
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="absolute inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-white shadow-2xl flex flex-col border-l border-red-100">
          {/* Cart Header */}
          <div className="p-5 border-b border-red-100 flex items-center justify-between bg-[#FDFBF9]">
            <div className="flex items-center gap-2">
              <ShoppingBag className="w-5 h-5 text-red-800" />
              <h2 className="font-serif text-xl font-bold text-slate-900">Your Shopping Bag</h2>
              <span className="text-xs text-red-800 font-mono font-bold bg-red-50 px-2 py-0.5 rounded-full">
                {items.length} {items.length === 1 ? 'item' : 'items'}
              </span>
            </div>
            <button
              onClick={onClose}
              className="p-2 text-slate-400 hover:text-slate-700 hover:bg-red-50 rounded-full transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Free Shipping Tracker */}
          <div className="px-5 py-2.5 bg-red-50/70 border-b border-red-100 text-xs text-red-950 flex items-center gap-2">
            <Truck className="w-4 h-4 text-red-700 shrink-0" />
            <span>
              {subtotal > 1999 ? (
                <strong className="text-emerald-800 font-semibold">Complimentary Express Shipping Unlocked!</strong>
              ) : (
                `Add ₹${(2000 - subtotal).toLocaleString('en-IN')} more for free insured shipping`
              )}
            </span>
          </div>

          {/* Cart Items List */}
          <div className="flex-1 overflow-y-auto p-5 space-y-4">
            {items.length === 0 ? (
              <div className="h-full flex flex-col items-center justify-center text-center p-6 space-y-3">
                <div className="w-16 h-16 rounded-full bg-red-50 flex items-center justify-center text-red-700">
                  <ShoppingBag className="w-8 h-8" />
                </div>
                <h3 className="font-serif text-lg font-bold text-slate-800">Your bag is empty</h3>
                <p className="text-xs text-slate-500 max-w-xs">
                  Discover our exclusive bridal lehengas, Banarasi sarees, and custom 3D creations.
                </p>
                <button
                  onClick={onClose}
                  className="mt-2 px-5 py-2 bg-red-800 text-white text-xs font-semibold rounded-xl hover:bg-red-900 transition-colors cursor-pointer"
                >
                  Start Exploring
                </button>
              </div>
            ) : (
              items.map((item, idx) => (
                <div
                  key={`${item.product.id}-${item.selectedSize}-${idx}`}
                  className="flex gap-4 p-3 rounded-2xl border border-red-50 hover:border-red-100 bg-[#FCFCFA] transition-all"
                >
                  <img
                    src={item.product.image}
                    alt={item.product.title}
                    className="w-20 h-24 object-cover rounded-xl shrink-0 border border-slate-100"
                  />
                  <div className="flex-1 flex flex-col justify-between">
                    <div>
                      <div className="flex items-start justify-between gap-2">
                        <h4 className="font-serif text-sm font-bold text-slate-900 line-clamp-1">
                          {item.product.title}
                        </h4>
                        <button
                          onClick={() => onRemoveItem(idx)}
                          className="text-slate-400 hover:text-red-700 p-1 cursor-pointer"
                          title="Remove item"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>

                      <div className="text-[11px] text-slate-500 mt-1 flex flex-wrap items-center gap-1.5">
                        <span>Size: <strong className="text-slate-800 font-medium">{item.selectedSize}</strong></span>
                        <span aria-hidden="true">·</span>
                        <span className="truncate max-w-[120px]">{item.selectedColor}</span>
                      </div>

                      {item.customMeasurements && (
                        <div className="mt-1 text-[10px] text-amber-800 flex items-center gap-1 bg-amber-50 px-1.5 py-0.5 rounded w-fit">
                          <Sparkles className="w-2.5 h-2.5" />
                          <span>Custom Stitching Attached</span>
                        </div>
                      )}
                    </div>

                    <div className="flex items-center justify-between mt-2 pt-2 border-t border-slate-100">
                      <div className="flex items-center border border-slate-200 rounded-lg bg-white">
                        <button
                          onClick={() => onUpdateQuantity(idx, item.quantity - 1)}
                          className="px-2 py-0.5 text-xs font-semibold hover:bg-slate-100 cursor-pointer"
                        >
                          -
                        </button>
                        <span className="px-2 text-xs font-mono font-bold">{item.quantity}</span>
                        <button
                          onClick={() => onUpdateQuantity(idx, item.quantity + 1)}
                          className="px-2 py-0.5 text-xs font-semibold hover:bg-slate-100 cursor-pointer"
                        >
                          +
                        </button>
                      </div>

                      <span className="font-mono text-xs font-bold text-red-950 tabular-nums">
                        ₹{(item.product.price * item.quantity).toLocaleString('en-IN')}
                      </span>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Cart Footer & Order Summary */}
          {items.length > 0 && (
            <div className="p-5 border-t border-red-100 bg-[#FDFBF9] space-y-4">
              {/* Promo Code Input */}
              <form onSubmit={handleApply} className="flex gap-2">
                <div className="relative flex-1">
                  <Tag className="w-3.5 h-3.5 absolute left-3 top-3 text-slate-400" />
                  <input
                    type="text"
                    placeholder="Enter Coupon (e.g. ASHA10)"
                    value={promoInput}
                    onChange={(e) => setPromoInput(e.target.value)}
                    className="w-full pl-8 pr-3 py-2 text-xs uppercase bg-white border border-slate-200 rounded-xl focus:outline-none focus:ring-1 focus:ring-red-700"
                  />
                </div>
                <button
                  type="submit"
                  className="px-4 py-2 bg-slate-900 hover:bg-slate-800 text-white text-xs font-medium rounded-xl transition-colors cursor-pointer"
                >
                  Apply
                </button>
              </form>

              {couponMsg && (
                <div className={`text-xs ${couponMsg.isError ? 'text-red-600' : 'text-emerald-700 font-medium'}`}>
                  {couponMsg.text}
                </div>
              )}

              {/* Price Breakdown */}
              <div className="space-y-1.5 text-xs text-slate-600">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span className="font-mono tabular-nums">₹{subtotal.toLocaleString('en-IN')}</span>
                </div>
                {discountAmount > 0 && (
                  <div className="flex justify-between text-emerald-700 font-medium">
                    <span>Discount ({appliedDiscount}%)</span>
                    <span className="font-mono tabular-nums">-₹{discountAmount.toLocaleString('en-IN')}</span>
                  </div>
                )}
                <div className="flex justify-between">
                  <span>Insured Shipping</span>
                  <span className="font-mono tabular-nums">
                    {shipping === 0 ? <strong className="text-emerald-700 font-normal">FREE</strong> : `₹${shipping}`}
                  </span>
                </div>
                <div className="pt-2 border-t border-red-100 flex justify-between text-sm font-bold text-slate-900">
                  <span>Total Payable</span>
                  <span className="text-base text-red-950 font-mono tabular-nums">
                    ₹{finalTotal.toLocaleString('en-IN')}
                  </span>
                </div>
              </div>

              {/* Proceed to Checkout Button */}
              <button
                onClick={onProceedToCheckout}
                className="w-full py-3.5 px-4 bg-red-800 hover:bg-red-900 text-white text-sm font-semibold rounded-xl shadow-lg shadow-red-900/15 flex items-center justify-center gap-2 transition-all hover:scale-[1.01] active:scale-[0.99] cursor-pointer"
              >
                <span>Proceed to Checkout</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

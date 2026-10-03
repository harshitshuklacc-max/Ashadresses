import React, { useState } from 'react';
import confetti from 'canvas-confetti';
import { X, CheckCircle, MapPin, Phone, Truck, ShieldCheck, ShoppingBag, MessageSquare, Printer } from 'lucide-react';
import { CartItem, OrderDetails } from '../types';
import { STORE_INFO } from '../data/products';

interface CheckoutModalProps {
  isOpen: boolean;
  onClose: () => void;
  items: CartItem[];
  subtotal: number;
  discountAmount: number;
  shipping: number;
  finalTotal: number;
  couponCode?: string;
  onOrderSuccess: (order: OrderDetails) => void;
}

export const CheckoutModal: React.FC<CheckoutModalProps> = ({
  isOpen,
  onClose,
  items,
  subtotal,
  discountAmount,
  shipping,
  finalTotal,
  couponCode,
  onOrderSuccess,
}) => {
  const [formData, setFormData] = useState({
    fullName: '',
    phone: '',
    email: '',
    address: '',
    city: 'Bilaspur',
    state: 'Chhattisgarh',
    pincode: '495001',
    deliveryMethod: 'home' as 'home' | 'store_pickup',
    paymentMethod: 'cod' as 'cod' | 'upi' | 'card' | 'store_pay',
    notes: '',
  });

  const [confirmedOrder, setConfirmedOrder] = useState<OrderDetails | null>(null);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  if (!isOpen) return null;

  const validate = () => {
    const errs: Record<string, string> = {};
    if (!formData.fullName.trim()) errs.fullName = 'Full name is required';
    if (!formData.phone.trim() || formData.phone.length < 10) errs.phone = 'Valid 10-digit mobile number required';
    if (formData.deliveryMethod === 'home' && !formData.address.trim()) {
      errs.address = 'Delivery address is required';
    }
    if (formData.deliveryMethod === 'home' && !formData.pincode.trim()) {
      errs.pincode = 'Pincode is required';
    }
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handlePlaceOrder = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setIsSubmitting(true);
    setTimeout(() => {
      const orderId = `ADN-${Math.floor(100000 + Math.random() * 900000)}`;
      const newOrder: OrderDetails = {
        orderId,
        items,
        customer: formData,
        pricing: {
          subtotal,
          discountAmount,
          couponCode,
          shipping,
          total: finalTotal,
        },
        timestamp: new Date().toLocaleDateString('en-IN', {
          day: 'numeric',
          month: 'short',
          year: 'numeric',
          hour: '2-digit',
          minute: '2-digit',
        }),
        status: 'Confirmed',
      };

      setConfirmedOrder(newOrder);
      setIsSubmitting(false);
      onOrderSuccess(newOrder);

      // Trigger Confetti Celebration
      try {
        confetti({
          particleCount: 80,
          spread: 70,
          origin: { y: 0.6 },
          colors: ['#991B1B', '#DC2626', '#D4AF37', '#FFFFFF'],
        });
      } catch (e) {
        // Safe fallback
      }
    }, 800);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 md:p-6 overflow-y-auto bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="relative w-full max-w-2xl bg-white rounded-3xl overflow-hidden shadow-2xl border border-red-100 my-auto max-h-[92vh] flex flex-col">
        {/* Modal Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-red-100 bg-[#FDFBF9]">
          <div className="flex items-center gap-2">
            <h2 className="font-serif text-xl font-bold text-slate-900">
              {confirmedOrder ? 'Order Confirmed' : 'Checkout & Delivery'}
            </h2>
            <span className="text-xs text-red-800 font-semibold">· Asha Dresses nx</span>
          </div>

          <button
            onClick={onClose}
            className="p-2 text-slate-400 hover:text-slate-700 hover:bg-red-50 rounded-full transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="overflow-y-auto p-6 flex-1">
          {confirmedOrder ? (
            /* Post-Order Success Screen */
            <div className="space-y-6 text-center py-4">
              <div className="w-16 h-16 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center mx-auto">
                <CheckCircle className="w-10 h-10" />
              </div>

              <div>
                <span className="text-xs font-semibold uppercase tracking-wider text-red-800">
                  Dhanyawad / Thank You!
                </span>
                <h3 className="text-2xl font-serif font-bold text-slate-900 mt-1">
                  Your Order {confirmedOrder.orderId} is Confirmed
                </h3>
                <p className="text-xs text-slate-500 mt-1">
                  We have received your order details at our Bilaspur flagship showroom.
                </p>
              </div>

              {/* Order Receipt Box */}
              <div className="bg-[#FDFBF9] p-5 rounded-2xl border border-red-100 text-left space-y-4 text-xs">
                <div className="flex items-center justify-between border-b border-red-100 pb-3">
                  <div>
                    <span className="text-slate-400 block text-[11px]">Customer</span>
                    <strong className="text-slate-900 text-sm">{confirmedOrder.customer.fullName}</strong>
                    <div className="text-slate-600">{confirmedOrder.customer.phone}</div>
                  </div>
                  <div className="text-right">
                    <span className="text-slate-400 block text-[11px]">Delivery Preference</span>
                    <strong className="text-red-900 capitalize text-sm">
                      {confirmedOrder.customer.deliveryMethod === 'store_pickup'
                        ? 'Store Pickup (Civil Lines)'
                        : 'Home Delivery'}
                    </strong>
                    <div className="text-slate-600">{confirmedOrder.customer.city}</div>
                  </div>
                </div>

                {/* Items Summary */}
                <div className="space-y-2">
                  <span className="text-slate-400 block text-[11px] font-semibold uppercase">Ordered Items</span>
                  {confirmedOrder.items.map((it, idx) => (
                    <div key={idx} className="flex justify-between items-center text-slate-800">
                      <div>
                        <span>{it.product.title}</span>
                        <span className="text-slate-500 text-[11px] ml-2">({it.selectedSize}) × {it.quantity}</span>
                      </div>
                      <span className="font-mono font-semibold tabular-nums">
                        ₹{(it.product.price * it.quantity).toLocaleString('en-IN')}
                      </span>
                    </div>
                  ))}
                </div>

                <div className="border-t border-red-100 pt-3 flex justify-between font-bold text-sm text-slate-950">
                  <span>Total Amount ({confirmedOrder.customer.paymentMethod.toUpperCase()})</span>
                  <span className="text-red-950 font-mono tabular-nums">
                    ₹{confirmedOrder.pricing.total.toLocaleString('en-IN')}
                  </span>
                </div>
              </div>

              {/* Direct WhatsApp Confirmation Button */}
              <div className="flex flex-col sm:flex-row gap-3">
                <a
                  href={`https://wa.me/${STORE_INFO.whatsapp}?text=${encodeURIComponent(
                    `Namaste Asha Dresses nx! I placed Order ${confirmedOrder.orderId} for ₹${confirmedOrder.pricing.total} under name ${confirmedOrder.customer.fullName}. Please confirm receipt and delivery/pickup schedule.`
                  )}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 py-3 px-4 bg-emerald-700 hover:bg-emerald-800 text-white text-xs font-semibold rounded-xl flex items-center justify-center gap-2 shadow-md transition-colors"
                >
                  <MessageSquare className="w-4 h-4" />
                  <span>Notify Bilaspur Store on WhatsApp</span>
                </a>

                <button
                  onClick={() => window.print()}
                  className="py-3 px-4 border border-slate-200 hover:bg-slate-50 text-slate-700 text-xs font-semibold rounded-xl flex items-center justify-center gap-2 cursor-pointer"
                >
                  <Printer className="w-4 h-4" />
                  <span>Print Receipt</span>
                </button>
              </div>

              <div className="text-[11px] text-slate-500 pt-2">
                Need urgent assistance? Call our store directly at{' '}
                <a href={`tel:${STORE_INFO.phoneDial}`} className="text-red-800 font-semibold underline">
                  {STORE_INFO.phone}
                </a>
              </div>
            </div>
          ) : (
            /* Checkout Form */
            <form onSubmit={handlePlaceOrder} className="space-y-6">
              {/* Delivery Option Toggle */}
              <div>
                <label className="block text-xs font-bold text-slate-800 uppercase tracking-wide mb-2">
                  1. Delivery Option
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <button
                    type="button"
                    onClick={() => setFormData({ ...formData, deliveryMethod: 'home' })}
                    className={`p-3.5 rounded-xl border text-left transition-all cursor-pointer ${
                      formData.deliveryMethod === 'home'
                        ? 'border-red-800 bg-red-50/70 text-red-950 ring-1 ring-red-800'
                        : 'border-slate-200 bg-white text-slate-700 hover:border-slate-300'
                    }`}
                  >
                    <div className="font-semibold text-xs flex items-center gap-2">
                      <Truck className="w-4 h-4 text-red-800" />
                      <span>Insured Home Delivery</span>
                    </div>
                    <div className="text-[11px] text-slate-500 mt-1">
                      Free Pan-India dispatch via express courier
                    </div>
                  </button>

                  <button
                    type="button"
                    onClick={() => setFormData({ ...formData, deliveryMethod: 'store_pickup' })}
                    className={`p-3.5 rounded-xl border text-left transition-all cursor-pointer ${
                      formData.deliveryMethod === 'store_pickup'
                        ? 'border-red-800 bg-red-50/70 text-red-950 ring-1 ring-red-800'
                        : 'border-slate-200 bg-white text-slate-700 hover:border-slate-300'
                    }`}
                  >
                    <div className="font-semibold text-xs flex items-center gap-2">
                      <MapPin className="w-4 h-4 text-red-800" />
                      <span>Pick Up at Bilaspur Store</span>
                    </div>
                    <div className="text-[11px] text-slate-500 mt-1">
                      Civil Lines, near Hanuman Mandir (Free)
                    </div>
                  </button>
                </div>
              </div>

              {/* Customer Contact Details */}
              <div className="space-y-3">
                <label className="block text-xs font-bold text-slate-800 uppercase tracking-wide">
                  2. Contact & Address
                </label>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <input
                      type="text"
                      placeholder="Full Name *"
                      value={formData.fullName}
                      onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                      className="w-full p-2.5 text-xs bg-[#FBF9F7] border border-slate-200 rounded-xl focus:outline-none focus:ring-1 focus:ring-red-700 focus:bg-white"
                    />
                    {errors.fullName && <p className="text-[11px] text-red-600 mt-1">{errors.fullName}</p>}
                  </div>

                  <div>
                    <input
                      type="tel"
                      placeholder="Mobile Phone (10-digits) *"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      className="w-full p-2.5 text-xs bg-[#FBF9F7] border border-slate-200 rounded-xl focus:outline-none focus:ring-1 focus:ring-red-700 focus:bg-white"
                    />
                    {errors.phone && <p className="text-[11px] text-red-600 mt-1">{errors.phone}</p>}
                  </div>
                </div>

                <input
                  type="email"
                  placeholder="Email Address (Optional)"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full p-2.5 text-xs bg-[#FBF9F7] border border-slate-200 rounded-xl focus:outline-none focus:ring-1 focus:ring-red-700 focus:bg-white"
                />

                {formData.deliveryMethod === 'home' && (
                  <>
                    <input
                      type="text"
                      placeholder="Street Address, House/Flat No., Landmark *"
                      value={formData.address}
                      onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                      className="w-full p-2.5 text-xs bg-[#FBF9F7] border border-slate-200 rounded-xl focus:outline-none focus:ring-1 focus:ring-red-700 focus:bg-white"
                    />
                    {errors.address && <p className="text-[11px] text-red-600 mt-1">{errors.address}</p>}

                    <div className="grid grid-cols-3 gap-3">
                      <input
                        type="text"
                        placeholder="City"
                        value={formData.city}
                        onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                        className="p-2.5 text-xs bg-[#FBF9F7] border border-slate-200 rounded-xl focus:outline-none focus:ring-1 focus:ring-red-700 focus:bg-white"
                      />
                      <input
                        type="text"
                        placeholder="State"
                        value={formData.state}
                        onChange={(e) => setFormData({ ...formData, state: e.target.value })}
                        className="p-2.5 text-xs bg-[#FBF9F7] border border-slate-200 rounded-xl focus:outline-none focus:ring-1 focus:ring-red-700 focus:bg-white"
                      />
                      <input
                        type="text"
                        placeholder="Pincode *"
                        value={formData.pincode}
                        onChange={(e) => setFormData({ ...formData, pincode: e.target.value })}
                        className="p-2.5 text-xs bg-[#FBF9F7] border border-slate-200 rounded-xl focus:outline-none focus:ring-1 focus:ring-red-700 focus:bg-white"
                      />
                    </div>
                  </>
                )}
              </div>

              {/* Payment Methods */}
              <div>
                <label className="block text-xs font-bold text-slate-800 uppercase tracking-wide mb-2">
                  3. Payment Method
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                  {[
                    { id: 'cod', label: 'Cash on Delivery', sub: 'Pay upon delivery' },
                    { id: 'upi', label: 'UPI Instant', sub: 'GPay, PhonePe, Paytm' },
                    { id: 'card', label: 'Card / NetBanking', sub: 'Secure gateway' },
                    { id: 'store_pay', label: 'Pay at Store', sub: 'On showroom pickup' },
                  ].map((pm) => (
                    <button
                      key={pm.id}
                      type="button"
                      onClick={() => setFormData({ ...formData, paymentMethod: pm.id as any })}
                      className={`p-2.5 rounded-xl border text-left transition-all cursor-pointer ${
                        formData.paymentMethod === pm.id
                          ? 'border-red-800 bg-red-50/70 text-red-950 font-semibold'
                          : 'border-slate-200 bg-white text-slate-700 hover:border-slate-300'
                      }`}
                    >
                      <div className="text-xs">{pm.label}</div>
                      <div className="text-[10px] text-slate-500 font-normal">{pm.sub}</div>
                    </button>
                  ))}
                </div>
              </div>

              {/* Order Final Summary */}
              <div className="p-4 bg-[#FBF9F7] rounded-2xl border border-red-100 flex items-center justify-between">
                <div>
                  <span className="text-xs text-slate-500">Total Payable Amount</span>
                  <div className="text-xl font-bold font-mono text-red-950 tabular-nums">
                    ₹{finalTotal.toLocaleString('en-IN')}
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="py-3 px-6 bg-red-800 hover:bg-red-900 disabled:bg-slate-400 text-white text-sm font-semibold rounded-xl shadow-lg shadow-red-900/15 transition-all hover:scale-[1.01] active:scale-[0.99] cursor-pointer"
                >
                  {isSubmitting ? 'Confirming...' : 'Place Order'}
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};

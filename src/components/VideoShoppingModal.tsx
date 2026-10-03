import React, { useState } from 'react';
import { X, Video, Calendar, Clock, Phone, Check, MessageSquare, Sparkles } from 'lucide-react';
import { STORE_INFO } from '../data/products';

interface VideoShoppingModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const VideoShoppingModal: React.FC<VideoShoppingModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [preferredDate, setPreferredDate] = useState('');
  const [category, setCategory] = useState('Bridal Lehengas');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !phone) return;
    setSubmitted(true);
  };

  const whatsappDirectMsg = encodeURIComponent(
    `Namaste Asha Dresses nx! I would like to book a Live Video Shopping Tour for ${category}. My name is ${name || 'Customer'} (Ph: ${phone || 'Bilaspur'}). Please schedule our video appointment.`
  );

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 md:p-6 overflow-y-auto bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="relative w-full max-w-lg bg-white rounded-3xl overflow-hidden shadow-2xl border border-red-100 my-auto">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-red-100 bg-[#FDFBF9]">
          <div className="flex items-center gap-2">
            <Video className="w-5 h-5 text-red-800" />
            <h3 className="font-serif text-lg font-bold text-slate-900">Live Video Shopping</h3>
          </div>
          <button
            onClick={onClose}
            className="p-2 text-slate-400 hover:text-slate-700 hover:bg-red-50 rounded-full transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6">
          {submitted ? (
            <div className="text-center py-6 space-y-4">
              <div className="w-14 h-14 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center mx-auto">
                <Check className="w-8 h-8" />
              </div>
              <h4 className="font-serif text-xl font-bold text-slate-900">
                Video Tour Request Received!
              </h4>
              <p className="text-xs text-slate-600 max-w-sm mx-auto">
                Our Bilaspur showroom master stylist will contact you on WhatsApp to connect on video call.
              </p>
              <div className="pt-2">
                <a
                  href={`https://wa.me/${STORE_INFO.whatsapp}?text=${whatsappDirectMsg}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-5 py-2.5 bg-emerald-700 hover:bg-emerald-800 text-white rounded-xl text-xs font-semibold shadow-md transition-colors"
                >
                  <MessageSquare className="w-4 h-4" />
                  <span>Start WhatsApp Call Now</span>
                </a>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4 text-xs">
              <div className="p-3 bg-amber-50/70 border border-amber-200/60 rounded-xl space-y-1">
                <div className="font-bold text-amber-950 flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5 text-amber-700" />
                  <span>Inspect Real Garments Live from Home</span>
                </div>
                <p className="text-[11px] text-amber-900 leading-tight">
                  Connect live via WhatsApp video call directly into our Bilaspur store to view fabric drape, embroidery zardozi details, and color under natural lighting.
                </p>
              </div>

              <div>
                <label className="block font-bold text-slate-800 uppercase mb-1">Your Full Name</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Ananya Verma"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full p-2.5 bg-[#FBF9F7] border border-slate-200 rounded-xl focus:outline-none focus:ring-1 focus:ring-red-700"
                />
              </div>

              <div>
                <label className="block font-bold text-slate-800 uppercase mb-1">WhatsApp Mobile Number</label>
                <input
                  type="tel"
                  required
                  placeholder="10-digit WhatsApp number"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="w-full p-2.5 bg-[#FBF9F7] border border-slate-200 rounded-xl focus:outline-none focus:ring-1 focus:ring-red-700"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold text-slate-800 uppercase mb-1">Preferred Collection</label>
                  <select
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    className="w-full p-2.5 bg-[#FBF9F7] border border-slate-200 rounded-xl focus:outline-none focus:ring-1 focus:ring-red-700"
                  >
                    <option>Bridal Lehengas</option>
                    <option>Banarasi Sarees</option>
                    <option>Designer Anarkalis</option>
                    <option>Sherwanis & Indo-Western</option>
                    <option>Festive Wear</option>
                  </select>
                </div>
                <div>
                  <label className="block font-bold text-slate-800 uppercase mb-1">Preferred Time</label>
                  <select
                    value={preferredDate}
                    onChange={(e) => setPreferredDate(e.target.value)}
                    className="w-full p-2.5 bg-[#FBF9F7] border border-slate-200 rounded-xl focus:outline-none focus:ring-1 focus:ring-red-700"
                  >
                    <option>Immediate / Next 30 Mins</option>
                    <option>Morning (11:00 AM - 1:00 PM)</option>
                    <option>Afternoon (2:00 PM - 5:00 PM)</option>
                    <option>Evening (6:00 PM - 8:00 PM)</option>
                  </select>
                </div>
              </div>

              <div className="pt-2">
                <button
                  type="submit"
                  className="w-full py-3 bg-red-800 hover:bg-red-900 text-white font-semibold rounded-xl transition-colors shadow-md shadow-red-900/10 cursor-pointer text-sm"
                >
                  Schedule Video Shopping Appointment
                </button>
              </div>

              <div className="text-center pt-1 text-[11px] text-slate-400">
                Or call directly at <a href={`tel:${STORE_INFO.phoneDial}`} className="text-red-800 font-semibold">{STORE_INFO.phone}</a>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};

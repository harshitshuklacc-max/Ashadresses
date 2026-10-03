import React from 'react';
import { Sparkles, Phone, Compass, ArrowRight, ShieldCheck, Clock } from 'lucide-react';
import { STORE_INFO } from '../data/products';

interface HeroProps {
  onExploreCatalog: () => void;
  onBookVideoCall: () => void;
  onVisitShowroom: () => void;
}

export const Hero: React.FC<HeroProps> = ({
  onExploreCatalog,
  onBookVideoCall,
  onVisitShowroom,
}) => {
  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-[#FCFCFA] via-[#FFFDFB] to-[#FBF6F4] pt-6 pb-16 lg:py-20 border-b border-red-100/60">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
          {/* Left Text Column */}
          <div className="lg:col-span-6 space-y-6 text-left">
            {/* Unboxed Metadata (Zero-pill discipline) */}
            <div className="flex items-center gap-2 text-xs font-semibold tracking-wider text-red-900 uppercase">
              <span>Bilaspur Haute Couture</span>
              <span aria-hidden="true">·</span>
              <span>Near Hanuman Mandir, Civil Lines</span>
              <span aria-hidden="true">·</span>
              <span className="text-amber-700">5.0 ★ Google Verified</span>
            </div>

            {/* Display Headline */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-serif font-bold text-slate-950 tracking-tight leading-[1.12] text-balance">
              The Royal Red & Ivory Bridal Atelier of <span className="text-red-800 italic">Asha Dresses nx</span>
            </h1>

            {/* Body Prose */}
            <p className="text-base sm:text-lg text-slate-600 leading-relaxed max-w-xl">
              Experience handcrafted bridal lehengas, pure Varanasi Katan sarees, and imperial designer gowns.
              Visit our boutique showroom in Civil Lines, Bilaspur or order with express Pan-India delivery.
            </p>

            {/* Primary Action Buttons */}
            <div className="flex flex-wrap items-center gap-3 pt-2">
              <button
                onClick={onExploreCatalog}
                className="flex items-center gap-2.5 px-6 py-3.5 bg-red-800 hover:bg-red-900 text-white rounded-xl text-sm font-semibold shadow-lg shadow-red-900/15 transition-all hover:scale-[1.02] active:scale-[0.98] cursor-pointer"
              >
                <span>Explore Bridal Collections</span>
                <ArrowRight className="w-4 h-4 text-amber-300" />
              </button>

              <button
                onClick={onVisitShowroom}
                className="flex items-center gap-2 px-6 py-3.5 bg-white hover:bg-red-50/60 text-slate-800 border border-slate-200 hover:border-red-300 rounded-xl text-sm font-semibold transition-all cursor-pointer"
              >
                <span>Bilaspur Showroom Details</span>
              </button>
            </div>

            {/* Adjacent Proof & Trust Indicators */}
            <div className="pt-6 border-t border-red-100 grid grid-cols-3 gap-4">
              <div>
                <span className="block font-serif text-2xl font-bold text-red-950">5.0 ★</span>
                <span className="text-xs text-slate-500 font-medium">3 Google Reviews</span>
              </div>
              <div>
                <span className="block font-serif text-2xl font-bold text-red-950">100%</span>
                <span className="text-xs text-slate-500 font-medium">Pure Silk & Zardozi</span>
              </div>
              <div>
                <span className="block font-serif text-2xl font-bold text-red-950">8:30 PM</span>
                <span className="text-xs text-slate-500 font-medium">Daily Store Closes</span>
              </div>
            </div>
          </div>

          {/* Right Visual Column: High-Fidelity Bridal Hero Showcase */}
          <div className="lg:col-span-6 relative">
            <div className="relative mx-auto max-w-lg lg:max-w-none">
              {/* Outer decorative architectural frame in red & ivory */}
              <div className="relative rounded-3xl overflow-hidden border-2 border-red-100 shadow-2xl bg-white">
                <img
                  src={STORE_INFO.heroImage}
                  alt="Asha Dresses nx Royal Crimson Red Bridal Lehenga"
                  referrerPolicy="no-referrer"
                  className="w-full h-[450px] sm:h-[540px] object-cover object-center transform hover:scale-105 transition-transform duration-700 ease-out"
                />

                {/* Scrim Overlay for Media Legibility */}
                <div className="absolute inset-0 bg-gradient-to-t from-red-950/85 via-red-950/20 to-transparent flex flex-col justify-end p-6 sm:p-8 text-white">
                  <div className="text-xs font-semibold tracking-wider text-amber-300 uppercase mb-1">
                    Featured Masterpiece
                  </div>
                  <h3 className="text-xl sm:text-2xl font-serif font-bold text-white mb-2">
                    Noor-e-Bilaspur Zardozi Bridal Lehenga
                  </h3>
                  <div className="flex items-center justify-between">
                    <span className="text-lg font-mono font-bold text-amber-200">₹48,500</span>
                    <button
                      onClick={onExploreCatalog}
                      className="px-3.5 py-1.5 bg-white/20 hover:bg-white/30 backdrop-blur-md text-white rounded-lg text-xs font-medium transition-colors flex items-center gap-1.5 cursor-pointer"
                    >
                      <span>View in Catalog</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              </div>

              {/* Floating Live Showroom Badge */}
              <div className="absolute -bottom-4 -left-4 sm:left-4 bg-white/95 backdrop-blur-md p-3.5 rounded-2xl border border-red-100 shadow-xl flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-red-50 flex items-center justify-center text-red-800">
                  <Clock className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-xs font-bold text-slate-900 flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping" />
                    <span>Bilaspur Showroom Open</span>
                  </div>
                  <div className="text-[11px] text-slate-500 mt-0.5">
                    Civil Lines · Closes 8:30 PM
                  </div>
                </div>
              </div>

              {/* Video Shopping Call Badge */}
              <button
                onClick={onBookVideoCall}
                className="absolute -top-3 -right-3 bg-red-900 hover:bg-red-800 text-white px-3.5 py-2 rounded-xl text-xs font-semibold shadow-lg shadow-red-950/30 flex items-center gap-2 cursor-pointer transition-transform hover:scale-105"
              >
                <Phone className="w-3.5 h-3.5 text-amber-300" />
                <span>Live Video Shopping</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

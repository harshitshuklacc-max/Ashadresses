import React from 'react';
import { Phone, MapPin, Clock, Star, Heart, Navigation, ExternalLink } from 'lucide-react';
import { STORE_INFO } from '../data/products';

interface FooterProps {
  onNavigateSection: (sectionId: string) => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigateSection }) => {
  return (
    <footer className="bg-gradient-to-b from-red-950 to-[#35070c] text-white pt-16 pb-12 border-t border-red-900/60">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10">
          {/* Brand & Boutique Identity */}
          <div className="md:col-span-4 space-y-4">
            <span className="font-serif text-3xl font-bold tracking-tight text-white block">
              Asha Dresses nx
            </span>
            <p className="text-xs text-red-200/90 leading-relaxed max-w-sm">
              Bilaspur’s luxury bridal, Banarasi silk, and ethnic couture boutique.
              Handcrafted in the heart of Chhattisgarh with master zardozi artisans and 100% certified pure silks.
            </p>

            <div className="flex items-center gap-2 pt-1 text-xs">
              <div className="flex items-center gap-1 bg-red-900/80 px-2.5 py-1 rounded-lg text-amber-300 font-bold">
                <span>5.0</span>
                <div className="flex text-amber-400">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-3 h-3 fill-current" />
                  ))}
                </div>
              </div>
              <span className="text-red-300">3 Verified Google Reviews</span>
            </div>
          </div>

          {/* Quick Curations */}
          <div className="md:col-span-2 space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-amber-300">
              Curations
            </h4>
            <ul className="space-y-2 text-xs text-red-200/80">
              <li>
                <button
                  onClick={() => onNavigateSection('bridal')}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  Bridal Lehengas
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigateSection('collections')}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  Banarasi Silk Sarees
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigateSection('collections')}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  Designer Anarkali Gowns
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigateSection('collections')}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  Indo-Western & Sherwanis
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigateSection('showroom')}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  Bilaspur Showroom
                </button>
              </li>
            </ul>
          </div>

          {/* Boutique Visit Info */}
          <div className="md:col-span-3 space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-amber-300">
              Bilaspur Flagship Store
            </h4>
            <div className="space-y-2.5 text-xs text-red-200/80">
              <div className="flex items-start gap-2">
                <MapPin className="w-4 h-4 text-red-400 shrink-0 mt-0.5" />
                <span>
                  {STORE_INFO.address}
                </span>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4 text-red-400 shrink-0" />
                <span>{STORE_INFO.hours} (Daily)</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-red-400 shrink-0" />
                <a href={`tel:${STORE_INFO.phoneDial}`} className="text-white hover:underline font-bold">
                  {STORE_INFO.phone}
                </a>
              </div>
            </div>
          </div>

          {/* Trust & Map Direction Action */}
          <div className="md:col-span-3 space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-amber-300">
              Directions & Assistance
            </h4>
            <p className="text-xs text-red-200/80 leading-relaxed">
              Visiting from Raigarh, Raipur, or nearby? Call ahead for dedicated master tailor bridal appointments.
            </p>
            <div className="pt-1 flex flex-col gap-2">
              <a
                href={STORE_INFO.googleMapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 px-4 py-2.5 bg-red-900/80 hover:bg-red-800 text-white rounded-xl text-xs font-semibold transition-colors"
              >
                <Navigation className="w-3.5 h-3.5 text-amber-300" />
                <span>Get Driving Directions</span>
              </a>

              <a
                href={`https://wa.me/${STORE_INFO.whatsapp}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 px-4 py-2.5 bg-white/10 hover:bg-white/20 text-white rounded-xl text-xs font-semibold transition-colors"
              >
                <span>WhatsApp Stylist Desk</span>
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Bar: Quiet Copyright */}
        <div className="pt-8 border-t border-red-900/60 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-red-300/70">
          <div>
            © {new Date().getFullYear()} Asha Dresses nx. All Rights Reserved. Near Hanuman Mandir, Civil Lines, Tilak Nagar, Bilaspur, Chhattisgarh 495001.
          </div>
          <div className="flex items-center gap-4">
            <span>Handcrafted Pure Silk</span>
            <span aria-hidden="true">·</span>
            <span>Bespoke Bridal Tailoring</span>
            <span aria-hidden="true">·</span>
            <span>All India Express Delivery</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

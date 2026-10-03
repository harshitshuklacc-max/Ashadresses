import React from 'react';
import { ShoppingBag, Search, Phone, Heart, Sparkles } from 'lucide-react';
import { STORE_INFO } from '../data/products';

interface HeaderProps {
  cartCount: number;
  wishlistCount: number;
  onOpenCart: () => void;
  onOpenWishlist: () => void;
  onOpenSearch: () => void;
  onNavigateSection: (sectionId: string) => void;
}

export const Header: React.FC<HeaderProps> = ({
  cartCount,
  wishlistCount,
  onOpenCart,
  onOpenWishlist,
  onOpenSearch,
  onNavigateSection,
}) => {
  return (
    <div className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-red-100/80 transition-all">
      {/* Slim Store Announcement Banner (≤40px) */}
      <div className="bg-red-950 text-[#FFF9F5] text-[11px] sm:text-xs py-1.5 px-4 font-medium tracking-wide">
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
          <div className="flex items-center gap-2 overflow-hidden truncate">
            <span className="inline-block w-2 h-2 rounded-full bg-emerald-400 animate-pulse shrink-0" />
            <span className="truncate">
              Asha Dresses nx Flagship: Near Hanuman Mandir, Civil Lines, Tilak Nagar, Bilaspur · {STORE_INFO.hours}
            </span>
          </div>
          <div className="hidden sm:flex items-center gap-4 shrink-0 text-red-200">
            <a
              href={`tel:${STORE_INFO.phoneDial}`}
              className="hover:text-white transition-colors flex items-center gap-1.5"
            >
              <Phone className="w-3 h-3 text-red-400" />
              <span>Call: {STORE_INFO.phone}</span>
            </a>
            <span aria-hidden="true">·</span>
            <span className="text-amber-300 font-semibold">5.0 ★ (3 Google Reviews)</span>
          </div>
        </div>
      </div>

      {/* Strict One-Row Three-Zone Top Bar */}
      <header className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-18 flex items-center justify-between gap-4">
        {/* Zone 1: Single text element wordmark */}
        <button
          onClick={() => onNavigateSection('hero')}
          className="group text-left cursor-pointer flex items-baseline gap-1"
        >
          <span className="font-serif text-2xl sm:text-3xl font-bold tracking-tight text-red-950 group-hover:text-red-800 transition-colors">
            Asha Dresses nx
          </span>
          <span className="text-[10px] tracking-widest uppercase font-sans text-red-700 font-semibold pl-1">
            Boutique
          </span>
        </button>

        {/* Zone 2: 4 clean text navigation links */}
        <nav className="hidden md:flex items-center gap-6 lg:gap-8 text-sm font-medium text-slate-700">
          <button
            onClick={() => onNavigateSection('collections')}
            className="hover:text-red-900 transition-colors whitespace-nowrap cursor-pointer hover:underline underline-offset-8 decoration-red-600"
          >
            Collections
          </button>
          <button
            onClick={() => onNavigateSection('bridal')}
            className="hover:text-red-900 transition-colors whitespace-nowrap cursor-pointer hover:underline underline-offset-8 decoration-red-600"
          >
            Bridal Couture
          </button>
          <button
            onClick={() => onNavigateSection('showroom')}
            className="hover:text-red-900 transition-colors whitespace-nowrap cursor-pointer hover:underline underline-offset-8 decoration-red-600"
          >
            Bilaspur Showroom
          </button>
          <button
            onClick={() => onNavigateSection('reviews')}
            className="hover:text-red-900 transition-colors whitespace-nowrap cursor-pointer hover:underline underline-offset-8 decoration-red-600"
          >
            Google Reviews
          </button>
        </nav>

        {/* Zone 3: 1-2 primary actions */}
        <div className="flex items-center gap-2 sm:gap-3">
          <button
            onClick={onOpenSearch}
            className="p-2.5 text-slate-700 hover:text-red-900 hover:bg-red-50/60 rounded-xl transition-colors cursor-pointer"
            aria-label="Search Collection"
            title="Search ethnic styles"
          >
            <Search className="w-5 h-5" />
          </button>

          <button
            onClick={onOpenWishlist}
            className="relative p-2.5 text-slate-700 hover:text-red-900 hover:bg-red-50/60 rounded-xl transition-colors cursor-pointer"
            aria-label="Saved Styles"
            title="Wishlist"
          >
            <Heart className="w-5 h-5" />
            {wishlistCount > 0 && (
              <span className="absolute top-1.5 right-1.5 w-4 h-4 bg-red-700 text-white text-[10px] font-bold rounded-full flex items-center justify-center">
                {wishlistCount}
              </span>
            )}
          </button>

          <button
            onClick={onOpenCart}
            className="flex items-center gap-2 px-3.5 sm:px-4 py-2 bg-red-800 hover:bg-red-900 text-white rounded-xl text-sm font-medium transition-colors shadow-sm shadow-red-900/10 cursor-pointer"
            aria-label="Shopping Bag"
          >
            <ShoppingBag className="w-4 h-4" />
            <span className="hidden sm:inline font-sans">Bag</span>
            <span className="bg-red-950 text-white text-xs px-1.5 py-0.5 rounded-full font-mono tabular-nums">
              {cartCount}
            </span>
          </button>
        </div>
      </header>
    </div>
  );
};

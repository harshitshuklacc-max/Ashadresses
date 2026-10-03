import React from 'react';
import { Sparkles, Heart, ShoppingBag, Eye } from 'lucide-react';
import { Product } from '../types';

interface ProductCardProps {
  product: Product;
  isWishlisted: boolean;
  onToggleWishlist: (product: Product) => void;
  onSelectProduct: (product: Product) => void;
  onQuickAdd: (product: Product) => void;
}

export const ProductCard: React.FC<ProductCardProps> = ({
  product,
  isWishlisted,
  onToggleWishlist,
  onSelectProduct,
  onQuickAdd,
}) => {
  return (
    <div className="group relative flex flex-col bg-white border border-red-100/70 rounded-2xl overflow-hidden shadow-sm hover:shadow-xl hover:-translate-y-0.5 transition-all duration-300">
      {/* Product Image Area (takes ~70% of card visual weight) */}
      <div className="relative aspect-[4/5] bg-[#FBF9F7] overflow-hidden">
        <img
          src={product.image}
          alt={product.title}
          referrerPolicy="no-referrer"
          className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700 ease-out cursor-pointer"
          onClick={() => onSelectProduct(product)}
        />

        {/* Clean Single Text Tag (Anti-pill rule) */}
        {product.isBestseller && (
          <div className="absolute top-3 left-3 bg-red-900/90 backdrop-blur-sm text-white text-[11px] font-semibold tracking-wide uppercase px-2.5 py-1 rounded-md shadow-sm">
            Bestseller
          </div>
        )}
        {!product.isBestseller && product.isNew && (
          <div className="absolute top-3 left-3 bg-amber-900/90 backdrop-blur-sm text-white text-[11px] font-semibold tracking-wide uppercase px-2.5 py-1 rounded-md shadow-sm">
            New Arrival
          </div>
        )}

        {/* Wishlist Button */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            onToggleWishlist(product);
          }}
          className={`absolute top-3 right-3 p-2 rounded-full backdrop-blur-md transition-colors cursor-pointer ${
            isWishlisted
              ? 'bg-red-800 text-white shadow-md'
              : 'bg-white/80 text-slate-700 hover:bg-white hover:text-red-700 shadow-sm'
          }`}
          aria-label={isWishlisted ? 'Remove from wishlist' : 'Add to wishlist'}
        >
          <Heart className={`w-4 h-4 ${isWishlisted ? 'fill-current' : ''}`} />
        </button>

        {/* Hover Action Bar: Quick View & Quick Add */}
        <div className="absolute inset-x-3 bottom-3 opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex items-center gap-2">
          <button
            onClick={() => onSelectProduct(product)}
            className="flex-1 py-2 px-3 bg-red-950/90 hover:bg-red-900 text-white text-xs font-semibold rounded-xl backdrop-blur-md flex items-center justify-center gap-1.5 shadow-md transition-colors cursor-pointer"
            title="Quick View Details"
          >
            <Eye className="w-3.5 h-3.5 text-amber-300" />
            <span>Quick View</span>
          </button>

          <button
            onClick={(e) => {
              e.stopPropagation();
              onQuickAdd(product);
            }}
            className="p-2 bg-white/95 hover:bg-white text-red-900 rounded-xl backdrop-blur-md shadow-md transition-colors cursor-pointer"
            title="Add to Shopping Bag"
          >
            <ShoppingBag className="w-4 h-4 text-red-900" />
          </button>
        </div>
      </div>

      {/* Content Metadata Area */}
      <div className="p-4 flex flex-col flex-1 justify-between gap-3">
        <div>
          {/* Category & Occasion (Clean text with typographic separator) */}
          <div className="flex items-center gap-1.5 text-[11px] font-semibold uppercase tracking-wider text-red-800">
            <span>{product.category}</span>
            <span aria-hidden="true">·</span>
            <span className="text-slate-500 font-normal truncate">{product.fabric.split('&')[0]}</span>
          </div>

          {/* Product Title */}
          <h3
            onClick={() => onSelectProduct(product)}
            className="font-serif text-lg font-bold text-slate-900 hover:text-red-800 transition-colors mt-1 line-clamp-1 cursor-pointer"
            title={product.title}
          >
            {product.title}
          </h3>

          <p className="text-xs text-slate-500 line-clamp-1 mt-0.5">
            {product.workType}
          </p>
        </div>

        {/* Price & Action Row */}
        <div className="pt-2 border-t border-red-50 flex items-center justify-between gap-2">
          <div className="flex items-baseline gap-2">
            <span className="text-base font-bold text-red-950 font-mono tabular-nums">
              ₹{product.price.toLocaleString('en-IN')}
            </span>
            {product.originalPrice > product.price && (
              <span className="text-xs text-slate-400 line-through font-mono tabular-nums">
                ₹{product.originalPrice.toLocaleString('en-IN')}
              </span>
            )}
          </div>

          <button
            onClick={() => onQuickAdd(product)}
            className="p-2 text-red-800 hover:text-white hover:bg-red-800 rounded-lg transition-colors border border-red-200 hover:border-transparent cursor-pointer"
            title="Add to Shopping Bag"
            aria-label="Add to bag"
          >
            <ShoppingBag className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};

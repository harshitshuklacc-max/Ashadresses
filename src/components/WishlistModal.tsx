import React from 'react';
import { X, Heart, ShoppingBag, Trash2, ArrowRight } from 'lucide-react';
import { Product } from '../types';

interface WishlistModalProps {
  isOpen: boolean;
  onClose: () => void;
  wishlist: Product[];
  onRemoveFromWishlist: (product: Product) => void;
  onSelectProduct: (product: Product) => void;
  onAddToCart: (product: Product) => void;
}

export const WishlistModal: React.FC<WishlistModalProps> = ({
  isOpen,
  onClose,
  wishlist,
  onRemoveFromWishlist,
  onSelectProduct,
  onAddToCart,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 overflow-y-auto bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="relative w-full max-w-xl bg-white rounded-3xl overflow-hidden shadow-2xl border border-red-100 my-auto">
        <div className="p-5 border-b border-red-100 flex items-center justify-between bg-[#FDFBF9]">
          <div className="flex items-center gap-2">
            <Heart className="w-5 h-5 text-red-800 fill-red-800" />
            <h3 className="font-serif text-lg font-bold text-slate-900">Your Saved Wishlist</h3>
            <span className="text-xs text-red-800 font-mono font-bold bg-red-50 px-2 py-0.5 rounded-full">
              {wishlist.length}
            </span>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-slate-400 hover:text-slate-700 hover:bg-red-50 rounded-full cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="max-h-96 overflow-y-auto p-5 space-y-3">
          {wishlist.length === 0 ? (
            <div className="text-center py-10 space-y-2">
              <Heart className="w-10 h-10 text-slate-300 mx-auto" />
              <p className="text-xs text-slate-500">Your wishlist is empty.</p>
            </div>
          ) : (
            wishlist.map((prod) => (
              <div
                key={prod.id}
                className="p-3 rounded-2xl border border-red-50 bg-[#FCFCFA] flex items-center justify-between gap-3"
              >
                <div
                  className="flex items-center gap-3 cursor-pointer flex-1"
                  onClick={() => {
                    onSelectProduct(prod);
                    onClose();
                  }}
                >
                  <img
                    src={prod.image}
                    alt={prod.title}
                    className="w-14 h-16 object-cover rounded-xl border border-slate-100"
                  />
                  <div>
                    <h4 className="font-serif text-xs font-bold text-slate-900 hover:text-red-800 line-clamp-1">
                      {prod.title}
                    </h4>
                    <span className="text-xs font-mono font-bold text-red-950 block mt-0.5 tabular-nums">
                      ₹{prod.price.toLocaleString('en-IN')}
                    </span>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => {
                      onAddToCart(prod);
                      onRemoveFromWishlist(prod);
                    }}
                    className="p-2 bg-red-800 hover:bg-red-900 text-white rounded-xl text-xs flex items-center gap-1 cursor-pointer transition-colors"
                    title="Move to Shopping Bag"
                  >
                    <ShoppingBag className="w-3.5 h-3.5" />
                    <span className="hidden sm:inline">Add to Bag</span>
                  </button>
                  <button
                    onClick={() => onRemoveFromWishlist(prod)}
                    className="p-2 text-slate-400 hover:text-red-700 cursor-pointer"
                    title="Remove"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

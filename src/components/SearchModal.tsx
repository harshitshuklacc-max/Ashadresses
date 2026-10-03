import React, { useState, useMemo } from 'react';
import { X, Search, Sparkles, ArrowRight } from 'lucide-react';
import { Product } from '../types';
import { PRODUCTS } from '../data/products';

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectProduct: (product: Product) => void;
}

export const SearchModal: React.FC<SearchModalProps> = ({
  isOpen,
  onClose,
  onSelectProduct,
}) => {
  const [query, setQuery] = useState('');
  const [selectedTag, setSelectedTag] = useState<string>('all');

  const filteredProducts = useMemo(() => {
    return PRODUCTS.filter((p) => {
      const matchText =
        p.title.toLowerCase().includes(query.toLowerCase()) ||
        p.category.toLowerCase().includes(query.toLowerCase()) ||
        p.fabric.toLowerCase().includes(query.toLowerCase()) ||
        p.workType.toLowerCase().includes(query.toLowerCase());

      if (selectedTag === 'all') return matchText;
      if (selectedTag === 'bridal') return matchText && p.category === 'Bridal Lehengas';
      if (selectedTag === 'saree') return matchText && p.category === 'Banarasi Sarees';
      if (selectedTag === 'under20k') return matchText && p.price <= 20000;
      return matchText;
    });
  }, [query, selectedTag]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center p-3 sm:p-6 overflow-y-auto bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="relative w-full max-w-2xl bg-white rounded-3xl overflow-hidden shadow-2xl border border-red-100 mt-12 mb-6">
        {/* Search Input Bar */}
        <div className="p-4 border-b border-red-100 flex items-center gap-3 bg-[#FDFBF9]">
          <Search className="w-5 h-5 text-red-800 shrink-0" />
          <input
            type="text"
            autoFocus
            placeholder="Search bridal lehengas, Banarasi silk sarees, Anarkalis, sherwanis..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="w-full text-sm bg-transparent border-none focus:outline-none placeholder:text-slate-400 text-slate-800"
          />
          <button
            onClick={onClose}
            className="p-1.5 text-slate-400 hover:text-slate-700 hover:bg-red-50 rounded-full cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Quick Filter Tags (Zero-pill button tabs) */}
        <div className="px-5 py-2.5 bg-red-50/40 border-b border-red-50 flex items-center gap-2 overflow-x-auto text-xs">
          <span className="text-slate-400 font-medium shrink-0">Quick Filter:</span>
          {[
            { id: 'all', label: 'All Designs' },
            { id: 'bridal', label: 'Bridal Couture' },
            { id: 'saree', label: 'Banarasi Sarees' },
            { id: 'under20k', label: 'Under ₹20,000' },
          ].map((tag) => (
            <button
              key={tag.id}
              onClick={() => setSelectedTag(tag.id)}
              className={`px-3 py-1 rounded-lg font-medium whitespace-nowrap transition-colors cursor-pointer ${
                selectedTag === tag.id
                  ? 'bg-red-800 text-white shadow-sm'
                  : 'bg-white text-slate-600 hover:text-red-900 border border-slate-200'
              }`}
            >
              {tag.label}
            </button>
          ))}
        </div>

        {/* Results List */}
        <div className="max-h-96 overflow-y-auto p-4 divide-y divide-red-50">
          {filteredProducts.length === 0 ? (
            <div className="text-center py-8 text-xs text-slate-500">
              No results found for "{query}". Try searching "Lehenga", "Saree", or "Silk".
            </div>
          ) : (
            filteredProducts.map((prod) => (
              <div
                key={prod.id}
                className="py-3 px-2 flex items-center justify-between gap-4 hover:bg-red-50/40 rounded-xl transition-colors group cursor-pointer"
                onClick={() => {
                  onSelectProduct(prod);
                  onClose();
                }}
              >
                <div className="flex items-center gap-3">
                  <img
                    src={prod.image}
                    alt={prod.title}
                    className="w-12 h-14 object-cover rounded-lg border border-slate-100"
                  />
                  <div>
                    <h4 className="text-xs font-bold text-slate-900 group-hover:text-red-800 transition-colors font-serif">
                      {prod.title}
                    </h4>
                    <div className="text-[11px] text-slate-500 flex items-center gap-1.5 mt-0.5">
                      <span>{prod.category}</span>
                      <span aria-hidden="true">·</span>
                      <span className="font-mono font-semibold text-red-900">
                        ₹{prod.price.toLocaleString('en-IN')}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <ArrowRight className="w-4 h-4 text-slate-300 group-hover:text-red-800 transition-colors" />
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

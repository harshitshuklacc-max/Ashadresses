import React, { useState } from 'react';
import { X, Sparkles, Heart, ShoppingBag, MessageSquare, Truck, ShieldCheck, Ruler, Check, Phone } from 'lucide-react';
import { Product } from '../types';
import { STORE_INFO } from '../data/products';

interface ProductDetailModalProps {
  product: Product | null;
  isOpen: boolean;
  onClose: () => void;
  isWishlisted: boolean;
  onToggleWishlist: (product: Product) => void;
  onAddToCart: (product: Product, size: string, color: string, quantity: number, measurements?: any) => void;
}

export const ProductDetailModal: React.FC<ProductDetailModalProps> = ({
  product,
  isOpen,
  onClose,
  isWishlisted,
  onToggleWishlist,
  onAddToCart,
}) => {
  if (!isOpen || !product) return null;

  const [selectedImage, setSelectedImage] = useState<string>(product.image);
  const [selectedSize, setSelectedSize] = useState<string>(product.availableSizes[0] || 'M');
  const [quantity, setQuantity] = useState<number>(1);
  const [showMeasurementForm, setShowMeasurementForm] = useState<boolean>(false);
  const [measurements, setMeasurements] = useState({
    bust: '',
    waist: '',
    hips: '',
    length: '',
    notes: '',
  });
  const [addedSuccess, setAddedSuccess] = useState<boolean>(false);

  const isCustomStitching = selectedSize === 'Custom Stitching' || selectedSize === 'Bespoke Tailoring';

  const handleAdd = () => {
    onAddToCart(
      product,
      selectedSize,
      product.color,
      quantity,
      isCustomStitching ? measurements : undefined
    );
    setAddedSuccess(true);
    setTimeout(() => setAddedSuccess(false), 2500);
  };

  const whatsappMessage = encodeURIComponent(
    `Namaste Asha Dresses nx! I am interested in ordering "${product.title}" (₹${product.price}) in size ${selectedSize}. Please confirm availability and custom stitching options at your Bilaspur Civil Lines store.`
  );

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 md:p-6 overflow-y-auto bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="relative w-full max-w-5xl bg-white rounded-3xl overflow-hidden shadow-2xl border border-red-100 my-auto max-h-[92vh] flex flex-col">
        {/* Top Modal Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-red-100 bg-[#FDFBF9]">
          <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-red-900">
            <span>{product.category}</span>
            <span aria-hidden="true">·</span>
            <span>Asha Dresses nx Exclusive</span>
          </div>

          <button
            onClick={onClose}
            className="p-2 text-slate-400 hover:text-slate-800 hover:bg-red-50 rounded-full transition-colors cursor-pointer"
            aria-label="Close details"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Scrollable Content Body */}
        <div className="overflow-y-auto p-6 md:p-8 flex-1">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            {/* Left Visual Area: Photo Gallery */}
            <div className="lg:col-span-7 space-y-4">
              <div className="relative aspect-[4/5] rounded-2xl overflow-hidden bg-[#FBF9F7] border border-red-50 shadow-inner">
                <img
                  src={selectedImage}
                  alt={product.title}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover object-center"
                />
                <button
                  onClick={() => onToggleWishlist(product)}
                  className="absolute top-4 right-4 p-2.5 rounded-full bg-white/80 backdrop-blur-md text-slate-700 hover:text-red-700 shadow-md cursor-pointer"
                >
                  <Heart className={`w-5 h-5 ${isWishlisted ? 'fill-red-700 text-red-700' : ''}`} />
                </button>
              </div>

              {/* Thumbnail Row */}
              {product.gallery.length > 1 && (
                <div className="flex items-center gap-3 mt-3">
                  {product.gallery.map((img, idx) => (
                    <button
                      key={idx}
                      onClick={() => setSelectedImage(img)}
                      className={`w-18 h-20 rounded-xl overflow-hidden border-2 transition-all cursor-pointer ${
                        selectedImage === img ? 'border-red-800 scale-105 shadow-sm' : 'border-transparent opacity-70 hover:opacity-100'
                      }`}
                    >
                      <img src={img} alt="" className="w-full h-full object-cover" />
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Right Contiguous Purchase Module */}
            <div className="lg:col-span-5 space-y-6">
              <div>
                <div className="flex items-center gap-2 text-xs text-amber-700 font-semibold mb-1">
                  <span>5.0 ★★★★★ (3 Google Reviews)</span>
                  <span aria-hidden="true">·</span>
                  <span className="text-emerald-700 font-medium">In Stock at Bilaspur</span>
                </div>
                <h2 className="text-2xl sm:text-3xl font-serif font-bold text-slate-900 leading-tight">
                  {product.title}
                </h2>
                <div className="mt-3 flex items-baseline gap-3">
                  <span className="text-2xl sm:text-3xl font-bold font-mono text-red-950 tabular-nums">
                    ₹{product.price.toLocaleString('en-IN')}
                  </span>
                  {product.originalPrice > product.price && (
                    <>
                      <span className="text-base text-slate-400 line-through font-mono tabular-nums">
                        ₹{product.originalPrice.toLocaleString('en-IN')}
                      </span>
                      <span className="text-xs font-semibold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded">
                        {product.discount}% OFF
                      </span>
                    </>
                  )}
                </div>
                <div className="text-[11px] text-slate-500 mt-1">
                  Inclusive of all taxes & handloom artisan charges
                </div>
              </div>

              {/* Description */}
              <div className="text-sm text-slate-600 leading-relaxed border-t border-b border-red-50 py-3">
                {product.description}
              </div>

              {/* Specifications Grid */}
              <div className="grid grid-cols-2 gap-3 text-xs bg-[#FBF9F7] p-3.5 rounded-xl border border-red-50">
                <div>
                  <span className="text-slate-400 block font-medium">Fabric Quality</span>
                  <span className="text-slate-800 font-semibold">{product.fabric}</span>
                </div>
                <div>
                  <span className="text-slate-400 block font-medium">Embroidery / Work</span>
                  <span className="text-slate-800 font-semibold">{product.workType}</span>
                </div>
                <div>
                  <span className="text-slate-400 block font-medium">Color Palette</span>
                  <span className="text-slate-800 font-semibold">{product.color}</span>
                </div>
                <div>
                  <span className="text-slate-400 block font-medium">Best For</span>
                  <span className="text-slate-800 font-semibold">{product.occasion}</span>
                </div>
              </div>

              {/* Size Selector */}
              <div>
                <div className="flex items-center justify-between mb-2">
                  <label className="text-xs font-bold text-slate-800 uppercase tracking-wide">
                    Select Size
                  </label>
                  <button
                    onClick={() => setShowMeasurementForm(!showMeasurementForm)}
                    className="text-xs text-red-800 font-medium hover:underline flex items-center gap-1 cursor-pointer"
                  >
                    <Ruler className="w-3.5 h-3.5" />
                    <span>{showMeasurementForm ? 'Hide Size Guide' : 'Custom Measurements'}</span>
                  </button>
                </div>

                <div className="flex flex-wrap gap-2">
                  {product.availableSizes.map((size) => (
                    <button
                      key={size}
                      onClick={() => setSelectedSize(size)}
                      className={`px-3.5 py-2 text-xs font-semibold rounded-xl border transition-all cursor-pointer ${
                        selectedSize === size
                          ? 'border-red-800 bg-red-800 text-white shadow-sm'
                          : 'border-slate-200 bg-white text-slate-700 hover:border-slate-300'
                      }`}
                    >
                      {size}
                    </button>
                  ))}
                </div>

                {/* Made to Measure Form Expansion */}
                {(isCustomStitching || showMeasurementForm) && (
                  <div className="mt-3 p-4 bg-amber-50/50 rounded-xl border border-amber-200/60 space-y-3 animate-in fade-in">
                    <div className="text-xs font-bold text-amber-950 flex items-center gap-1.5">
                      <Sparkles className="w-3.5 h-3.5 text-amber-700" />
                      <span>Complimentary Master Tailoring at Bilaspur Atelier</span>
                    </div>
                    <p className="text-[11px] text-amber-900 leading-tight">
                      Enter your approximate measurements in inches. Our senior master tailor will call to confirm before stitching.
                    </p>
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                      <input
                        type="text"
                        placeholder="Bust (in)"
                        value={measurements.bust}
                        onChange={(e) => setMeasurements({ ...measurements, bust: e.target.value })}
                        className="p-2 text-xs bg-white border border-amber-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-red-700"
                      />
                      <input
                        type="text"
                        placeholder="Waist (in)"
                        value={measurements.waist}
                        onChange={(e) => setMeasurements({ ...measurements, waist: e.target.value })}
                        className="p-2 text-xs bg-white border border-amber-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-red-700"
                      />
                      <input
                        type="text"
                        placeholder="Hips (in)"
                        value={measurements.hips}
                        onChange={(e) => setMeasurements({ ...measurements, hips: e.target.value })}
                        className="p-2 text-xs bg-white border border-amber-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-red-700"
                      />
                      <input
                        type="text"
                        placeholder="Length (in)"
                        value={measurements.length}
                        onChange={(e) => setMeasurements({ ...measurements, length: e.target.value })}
                        className="p-2 text-xs bg-white border border-amber-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-red-700"
                      />
                    </div>
                  </div>
                )}
              </div>

              {/* Quantity & Add to Cart Controls */}
              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <div className="flex items-center border border-slate-200 rounded-xl overflow-hidden bg-white">
                    <button
                      onClick={() => setQuantity(Math.max(1, quantity - 1))}
                      className="px-3 py-2 text-sm font-semibold hover:bg-slate-100 transition-colors cursor-pointer"
                    >
                      -
                    </button>
                    <span className="px-4 py-2 text-sm font-bold font-mono tabular-nums text-slate-800">
                      {quantity}
                    </span>
                    <button
                      onClick={() => setQuantity(quantity + 1)}
                      className="px-3 py-2 text-sm font-semibold hover:bg-slate-100 transition-colors cursor-pointer"
                    >
                      +
                    </button>
                  </div>

                  <button
                    onClick={handleAdd}
                    className="flex-1 py-3 px-6 bg-red-800 hover:bg-red-900 text-white rounded-xl text-sm font-semibold flex items-center justify-center gap-2 shadow-lg shadow-red-900/15 transition-all hover:scale-[1.01] active:scale-[0.99] cursor-pointer"
                  >
                    {addedSuccess ? (
                      <>
                        <Check className="w-4 h-4 text-emerald-300" />
                        <span>Added to Shopping Bag!</span>
                      </>
                    ) : (
                      <>
                        <ShoppingBag className="w-4 h-4" />
                        <span>Add to Bag</span>
                      </>
                    )}
                  </button>
                </div>

                {/* WhatsApp Quick Order & Stylist Connect */}
                <a
                  href={`https://wa.me/${STORE_INFO.whatsapp}?text=${whatsappMessage}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full py-2.5 px-4 border border-emerald-600/40 bg-emerald-50/50 hover:bg-emerald-50 text-emerald-950 rounded-xl text-xs font-semibold flex items-center justify-center gap-2 transition-colors cursor-pointer"
                >
                  <MessageSquare className="w-4 h-4 text-emerald-600" />
                  <span>Order Directly via WhatsApp to Bilaspur Store</span>
                </a>
              </div>

              {/* Delivery & Boutique Trust Assurances */}
              <div className="space-y-2 pt-2 text-xs text-slate-500">
                <div className="flex items-center gap-2">
                  <Truck className="w-4 h-4 text-red-800 shrink-0" />
                  <span>Same-Day Pickup at Civil Lines Store / 3-5 Day Express Pan-India</span>
                </div>
                <div className="flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4 text-red-800 shrink-0" />
                  <span>100% Handloom & Silk Authenticity Guarantee</span>
                </div>
                <div className="flex items-center gap-2">
                  <Phone className="w-4 h-4 text-red-800 shrink-0" />
                  <span>Assistance Helpline: {STORE_INFO.phone}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

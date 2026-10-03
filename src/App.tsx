import React, { useState } from 'react';
import { PRODUCTS, STORE_INFO, CATEGORIES } from './data/products';
import { Product, CartItem, OrderDetails } from './types';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { ProductCard } from './components/ProductCard';
import { ProductDetailModal } from './components/ProductDetailModal';
import { CartDrawer } from './components/CartDrawer';
import { CheckoutModal } from './components/CheckoutModal';
import { ShowroomInfo } from './components/ShowroomInfo';
import { VideoShoppingModal } from './components/VideoShoppingModal';
import { SearchModal } from './components/SearchModal';
import { WishlistModal } from './components/WishlistModal';
import { Footer } from './components/Footer';
import { Sparkles, ArrowUpDown, Check } from 'lucide-react';

export default function App() {
  // Navigation & Modal states
  const [selectedCategory, setSelectedCategory] = useState<string>('All Collections');
  const [sortBy, setSortBy] = useState<'featured' | 'price-low' | 'price-high'>('featured');
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [isDetailModalOpen, setIsDetailModalOpen] = useState<boolean>(false);
  const [isCartOpen, setIsCartOpen] = useState<boolean>(false);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState<boolean>(false);
  const [isSearchOpen, setIsSearchOpen] = useState<boolean>(false);
  const [isWishlistOpen, setIsWishlistOpen] = useState<boolean>(false);
  const [isVideoModalOpen, setIsVideoModalOpen] = useState<boolean>(false);

  // Cart & Wishlist state
  const [cart, setCart] = useState<CartItem[]>([]);
  const [wishlist, setWishlist] = useState<Product[]>([]);
  const [appliedDiscount, setAppliedDiscount] = useState<number>(0);
  const [couponCode, setCouponCode] = useState<string>('');
  const [activeToast, setActiveToast] = useState<string | null>(null);

  const showToast = (message: string) => {
    setActiveToast(message);
    setTimeout(() => setActiveToast(null), 3000);
  };

  // Cart Handlers
  const handleAddToCart = (
    product: Product,
    size: string,
    color: string,
    quantity: number,
    measurements?: any
  ) => {
    setCart((prev) => {
      const existingIdx = prev.findIndex(
        (item) => item.product.id === product.id && item.selectedSize === size
      );
      if (existingIdx > -1) {
        const updated = [...prev];
        updated[existingIdx].quantity += quantity;
        return updated;
      }
      return [
        ...prev,
        {
          product,
          selectedSize: size,
          selectedColor: color,
          quantity,
          customMeasurements: measurements,
        },
      ];
    });
    showToast(`Added "${product.title}" to bag!`);
  };

  const handleQuickAdd = (product: Product) => {
    handleAddToCart(product, product.availableSizes[0] || 'M', product.color, 1);
  };

  const handleUpdateCartQuantity = (index: number, newQty: number) => {
    if (newQty <= 0) {
      handleRemoveCartItem(index);
      return;
    }
    setCart((prev) => {
      const updated = [...prev];
      updated[index].quantity = newQty;
      return updated;
    });
  };

  const handleRemoveCartItem = (index: number) => {
    setCart((prev) => prev.filter((_, idx) => idx !== index));
  };

  // Wishlist Handlers
  const handleToggleWishlist = (product: Product) => {
    setWishlist((prev) => {
      const exists = prev.some((p) => p.id === product.id);
      if (exists) {
        showToast(`Removed from wishlist`);
        return prev.filter((p) => p.id !== product.id);
      } else {
        showToast(`Added to wishlist`);
        return [...prev, product];
      }
    });
  };

  // Coupon Handler
  const handleApplyCoupon = (code: string): boolean => {
    if (code === 'ASHA10' || code === 'BILASPUR') {
      setAppliedDiscount(10);
      setCouponCode(code);
      return true;
    }
    return false;
  };

  const scrollToSection = (id: string) => {
    if (id === 'hero') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // Filtered & Sorted products
  const displayedProducts = PRODUCTS.filter((p) => {
    if (selectedCategory === 'All Collections') return true;
    return p.category === selectedCategory;
  }).sort((a, b) => {
    if (sortBy === 'price-low') return a.price - b.price;
    if (sortBy === 'price-high') return b.price - a.price;
    return 0; // featured default
  });

  // Cart pricing calculation
  const subtotal = cart.reduce((sum, item) => sum + item.product.price * item.quantity, 0);
  const discountAmount = Math.round(subtotal * (appliedDiscount / 100));
  const shipping = subtotal > 1999 || subtotal === 0 ? 0 : 250;
  const finalTotal = Math.max(0, subtotal - discountAmount + shipping);

  return (
    <div className="min-h-screen bg-[#FCFCFA] text-slate-900 flex flex-col font-sans selection:bg-red-800 selection:text-white">
      {/* Toast Notification */}
      {activeToast && (
        <div className="fixed bottom-6 right-6 z-50 bg-red-950 text-white px-4 py-3 rounded-2xl shadow-2xl border border-red-800 text-xs font-semibold flex items-center gap-2 animate-in slide-in-from-bottom duration-300">
          <Check className="w-4 h-4 text-emerald-400" />
          <span>{activeToast}</span>
        </div>
      )}

      {/* Header */}
      <Header
        cartCount={cart.reduce((sum, i) => sum + i.quantity, 0)}
        wishlistCount={wishlist.length}
        onOpenCart={() => setIsCartOpen(true)}
        onOpenWishlist={() => setIsWishlistOpen(true)}
        onOpenSearch={() => setIsSearchOpen(true)}
        onNavigateSection={scrollToSection}
      />

      <main className="flex-1">
        {/* Hero Section */}
        <div id="hero">
          <Hero
            onExploreCatalog={() => scrollToSection('collections')}
            onBookVideoCall={() => setIsVideoModalOpen(true)}
            onVisitShowroom={() => scrollToSection('showroom')}
          />
        </div>

        {/* Collections Catalog Section */}
        <section id="collections" className="py-16 lg:py-24 bg-[#FCFCFA]">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
            {/* Catalog Header & Controls */}
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-6 border-b border-red-100">
              <div className="space-y-2">
                <div className="text-xs font-semibold uppercase tracking-wider text-red-900">
                  Curated Catalog · Bilaspur Showroom
                </div>
                <h2 className="text-3xl sm:text-4xl font-serif font-bold text-slate-950">
                  Exclusive Festive & Bridal Ensembles
                </h2>
                <p className="text-xs sm:text-sm text-slate-500">
                  Every garment is hand-inspected for pure thread density, genuine silk authenticity, and immaculate finish.
                </p>
              </div>

              {/* Sort By Dropdown */}
              <div className="flex items-center gap-2 self-start md:self-auto">
                <ArrowUpDown className="w-4 h-4 text-slate-400" />
                <span className="text-xs text-slate-500 font-medium">Sort:</span>
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value as any)}
                  className="text-xs font-medium bg-white border border-slate-200 rounded-xl px-3 py-2 text-slate-800 focus:outline-none focus:ring-1 focus:ring-red-700 cursor-pointer shadow-sm"
                >
                  <option value="featured">Featured Curations</option>
                  <option value="price-low">Price: Low to High</option>
                  <option value="price-high">Price: High to Low</option>
                </select>
              </div>
            </div>

            {/* Category Filter Tabs (Zero-pill button controls) */}
            <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
              {CATEGORIES.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-4 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition-all cursor-pointer ${
                    selectedCategory === cat
                      ? 'bg-red-800 text-white shadow-md shadow-red-900/10'
                      : 'bg-white text-slate-600 hover:text-red-900 border border-slate-200/80 hover:border-red-200'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>

            {/* Product Cards Grid (3 Columns Desktop, 2 Columns Tablet) */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
              {displayedProducts.map((product) => (
                <ProductCard
                  key={product.id}
                  product={product}
                  isWishlisted={wishlist.some((w) => w.id === product.id)}
                  onToggleWishlist={handleToggleWishlist}
                  onSelectProduct={(p) => {
                    setSelectedProduct(p);
                    setIsDetailModalOpen(true);
                  }}
                  onQuickAdd={handleQuickAdd}
                />
              ))}
            </div>
          </div>
        </section>

        {/* Bridal Couture Story / Craftsmanship Section */}
        <section id="bridal" className="py-16 lg:py-20 bg-gradient-to-r from-red-950 via-red-900 to-red-950 text-white relative overflow-hidden">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
              <div className="lg:col-span-7 space-y-6">
                <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-amber-300">
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>The Heritage of Bilaspur Bridal Design</span>
                </div>
                <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-bold text-white leading-tight">
                  Crafted for the Royal Bride in Crimson & Ivory
                </h2>
                <p className="text-sm sm:text-base text-red-100/90 leading-relaxed">
                  At Asha Dresses nx, every bridal lehenga and Banarasi silk drape is an heirloom.
                  Our master karigars spend hundreds of hours hand-embroidering real zardozi, dabka, and Kashmiri tilla zari on premium velvet and Katan silks.
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-4 border-t border-red-800">
                  <div>
                    <span className="block font-serif text-2xl font-bold text-amber-300">100%</span>
                    <span className="text-xs text-red-200">Tested Pure Zari Silk</span>
                  </div>
                  <div>
                    <span className="block font-serif text-2xl font-bold text-amber-300">Custom</span>
                    <span className="text-xs text-red-200">Made-to-Measure Stitching</span>
                  </div>
                  <div>
                    <span className="block font-serif text-2xl font-bold text-amber-300">5.0 ★</span>
                    <span className="text-xs text-red-200">Flawless Google Reviews</span>
                  </div>
                </div>

                <div className="pt-2 flex flex-wrap gap-4">
                  <button
                    onClick={() => setIsVideoModalOpen(true)}
                    className="px-6 py-3 bg-white text-red-950 hover:bg-red-50 text-xs font-bold rounded-xl shadow-lg transition-transform hover:scale-105 cursor-pointer"
                  >
                    Schedule Bridal Video Tour
                  </button>
                  <a
                    href={`tel:${STORE_INFO.phoneDial}`}
                    className="px-6 py-3 bg-red-800/80 hover:bg-red-800 border border-red-700 text-white text-xs font-bold rounded-xl transition-colors"
                  >
                    Call Master Tailor: {STORE_INFO.phone}
                  </a>
                </div>
              </div>

              <div className="lg:col-span-5">
                <div className="relative rounded-3xl overflow-hidden border border-red-700/60 shadow-2xl bg-red-900/50">
                  <img
                    src={STORE_INFO.showroomImage}
                    alt="Asha Dresses nx Interior"
                    className="w-full h-80 object-cover object-center"
                  />
                  <div className="p-6 bg-red-950/90 space-y-2">
                    <span className="text-xs font-bold uppercase text-amber-300">Bilaspur Showroom</span>
                    <h3 className="font-serif text-lg font-bold">Near Hanuman Mandir, Civil Lines</h3>
                    <p className="text-xs text-red-200">
                      Visit us daily until 8:30 PM for personalized bridal trials and festive wardrobe styling.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Showroom & Google Reviews Section */}
        <div id="reviews">
          <ShowroomInfo onBookVideoCall={() => setIsVideoModalOpen(true)} />
        </div>
      </main>

      {/* Footer */}
      <Footer
        onNavigateSection={scrollToSection}
      />

      {/* Modals & Slide-over Drawers */}
      <ProductDetailModal
        product={selectedProduct}
        isOpen={isDetailModalOpen}
        onClose={() => setIsDetailModalOpen(false)}
        isWishlisted={selectedProduct ? wishlist.some((w) => w.id === selectedProduct.id) : false}
        onToggleWishlist={handleToggleWishlist}
        onAddToCart={(prod, size, color, qty, measurements) => {
          handleAddToCart(prod, size, color, qty, measurements);
        }}
      />

      <CartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        items={cart}
        onUpdateQuantity={handleUpdateCartQuantity}
        onRemoveItem={handleRemoveCartItem}
        onProceedToCheckout={() => {
          setIsCartOpen(false);
          setIsCheckoutOpen(true);
        }}
        appliedDiscount={appliedDiscount}
        couponCode={couponCode}
        onApplyCoupon={handleApplyCoupon}
      />

      <CheckoutModal
        isOpen={isCheckoutOpen}
        onClose={() => setIsCheckoutOpen(false)}
        items={cart}
        subtotal={subtotal}
        discountAmount={discountAmount}
        shipping={shipping}
        finalTotal={finalTotal}
        couponCode={couponCode}
        onOrderSuccess={(order) => {
          setCart([]);
          showToast(`Order ${order.orderId} Placed!`);
        }}
      />

      <SearchModal
        isOpen={isSearchOpen}
        onClose={() => setIsSearchOpen(false)}
        onSelectProduct={(p) => {
          setSelectedProduct(p);
          setIsDetailModalOpen(true);
        }}
      />

      <WishlistModal
        isOpen={isWishlistOpen}
        onClose={() => setIsWishlistOpen(false)}
        wishlist={wishlist}
        onRemoveFromWishlist={handleToggleWishlist}
        onSelectProduct={(p) => {
          setSelectedProduct(p);
          setIsDetailModalOpen(true);
        }}
        onAddToCart={handleQuickAdd}
      />

      <VideoShoppingModal
        isOpen={isVideoModalOpen}
        onClose={() => setIsVideoModalOpen(false)}
      />
    </div>
  );
}

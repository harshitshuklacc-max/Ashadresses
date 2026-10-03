import React, { useState } from 'react';
import { Star, MapPin, Phone, Clock, Navigation, Bookmark, Share2, CheckCircle2, MessageSquare, ExternalLink } from 'lucide-react';
import { STORE_INFO, GOOGLE_REVIEWS } from '../data/products';

interface ShowroomInfoProps {
  onBookVideoCall: () => void;
}

export const ShowroomInfo: React.FC<ShowroomInfoProps> = ({ onBookVideoCall }) => {
  const [copiedShare, setCopiedShare] = useState<boolean>(false);
  const [isSaved, setIsSaved] = useState<boolean>(false);
  const [activeTab, setActiveTab] = useState<'overview' | 'reviews' | 'photos'>('overview');

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: 'Asha Dresses nx - Bilaspur',
        text: 'Asha Dresses nx (5.0 ★) near Hanuman Mandir, Civil Lines, Tilak Nagar, Bilaspur, Chhattisgarh. Luxury Bridal & Ethnic Couture.',
        url: window.location.href,
      }).catch(() => {});
    } else {
      navigator.clipboard.writeText(
        `Asha Dresses nx - near Hanuman mandir, Civil Lines, Tilak Nagar, Bilaspur, Chhattisgarh 495001 | Phone: 098269 21422`
      );
      setCopiedShare(true);
      setTimeout(() => setCopiedShare(false), 2500);
    }
  };

  return (
    <section id="showroom" className="py-16 lg:py-24 bg-[#FAF7F5] border-t border-b border-red-100/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto space-y-3">
          <div className="flex items-center justify-center gap-2 text-xs font-semibold uppercase tracking-wider text-red-900">
            <span>Flagship Atelier</span>
            <span aria-hidden="true">·</span>
            <span>Civil Lines, Bilaspur</span>
            <span aria-hidden="true">·</span>
            <span className="text-amber-700">Google Verified 5.0 ★</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-bold text-slate-900">
            Visit Asha Dresses nx in Bilaspur
          </h2>
          <p className="text-sm sm:text-base text-slate-600">
            Step into our sanctuary of royal Indian craftsmanship. Located conveniently near Hanuman Mandir in Tilak Nagar, Civil Lines.
          </p>
        </div>

        {/* Google Business Profile Card */}
        <div className="bg-white rounded-3xl border border-red-100 shadow-xl overflow-hidden">
          {/* Card Top Tabs */}
          <div className="px-6 pt-5 pb-3 border-b border-slate-100 flex items-center justify-between flex-wrap gap-4">
            <div className="flex items-center gap-6 text-sm font-medium">
              <button
                onClick={() => setActiveTab('overview')}
                className={`pb-2.5 border-b-2 font-semibold transition-colors cursor-pointer ${
                  activeTab === 'overview'
                    ? 'border-red-800 text-red-950'
                    : 'border-transparent text-slate-500 hover:text-slate-900'
                }`}
              >
                Overview
              </button>
              <button
                onClick={() => setActiveTab('reviews')}
                className={`pb-2.5 border-b-2 font-semibold transition-colors cursor-pointer ${
                  activeTab === 'reviews'
                    ? 'border-red-800 text-red-950'
                    : 'border-transparent text-slate-500 hover:text-slate-900'
                }`}
              >
                Reviews (3)
              </button>
              <button
                onClick={() => setActiveTab('photos')}
                className={`pb-2.5 border-b-2 font-semibold transition-colors cursor-pointer ${
                  activeTab === 'photos'
                    ? 'border-red-800 text-red-950'
                    : 'border-transparent text-slate-500 hover:text-slate-900'
                }`}
              >
                Photos
              </button>
            </div>

            <div className="flex items-center gap-2">
              <span className="text-xs text-slate-500">Google Business Verified</span>
              <CheckCircle2 className="w-4 h-4 text-blue-600" />
            </div>
          </div>

          {/* Profile Core Details Banner */}
          <div className="p-6 sm:p-8 bg-gradient-to-r from-red-50/40 via-white to-red-50/20 border-b border-red-50">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
              <div>
                <h1 className="text-2xl sm:text-3xl font-serif font-bold text-slate-950">
                  {STORE_INFO.name}
                </h1>
                <div className="flex items-center gap-2 mt-1.5 flex-wrap">
                  <div className="flex items-center gap-1 bg-amber-50 px-2 py-0.5 rounded text-amber-900 font-bold text-sm">
                    <span>5.0</span>
                    <div className="flex text-amber-500">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className="w-3.5 h-3.5 fill-current" />
                      ))}
                    </div>
                  </div>
                  <span className="text-xs text-slate-500">(3 Google Reviews)</span>
                  <span aria-hidden="true" className="text-slate-300">·</span>
                  <span className="text-xs text-slate-700 font-medium">{STORE_INFO.category}</span>
                </div>
              </div>

              {/* 4 Google Profile Actions (Directions, Save, Share, Call) */}
              <div className="flex flex-wrap items-center gap-2 sm:gap-3">
                <a
                  href={STORE_INFO.googleMapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-red-800 hover:bg-red-900 text-white text-xs font-semibold shadow-sm transition-colors cursor-pointer"
                >
                  <Navigation className="w-4 h-4" />
                  <span>Directions</span>
                </a>

                <button
                  onClick={() => setIsSaved(!isSaved)}
                  className={`flex items-center gap-1.5 px-3.5 py-2 rounded-xl border text-xs font-semibold transition-colors cursor-pointer ${
                    isSaved
                      ? 'border-red-700 bg-red-50 text-red-900'
                      : 'border-slate-200 hover:border-slate-300 text-slate-700 bg-white'
                  }`}
                >
                  <Bookmark className={`w-4 h-4 ${isSaved ? 'fill-current' : ''}`} />
                  <span>{isSaved ? 'Saved' : 'Save'}</span>
                </button>

                <button
                  onClick={handleShare}
                  className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl border border-slate-200 hover:border-slate-300 text-slate-700 bg-white text-xs font-semibold transition-colors cursor-pointer"
                >
                  <Share2 className="w-4 h-4" />
                  <span>{copiedShare ? 'Copied Link' : 'Share'}</span>
                </button>

                <a
                  href={`tel:${STORE_INFO.phoneDial}`}
                  className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl border border-red-200 bg-red-50/50 hover:bg-red-100 text-red-900 text-xs font-semibold transition-colors"
                >
                  <Phone className="w-4 h-4 text-red-700" />
                  <span>Call: {STORE_INFO.phone}</span>
                </a>
              </div>
            </div>
          </div>

          {/* Tab Content Display */}
          <div className="p-6 sm:p-8">
            {activeTab === 'overview' && (
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
                {/* Left: Store Meta Information */}
                <div className="lg:col-span-6 space-y-5">
                  {/* Address */}
                  <div className="flex items-start gap-3.5">
                    <div className="p-2.5 rounded-xl bg-red-50 text-red-800 shrink-0 mt-0.5">
                      <MapPin className="w-5 h-5" />
                    </div>
                    <div>
                      <span className="text-xs text-slate-400 block font-medium">Boutique Address</span>
                      <p className="text-sm font-medium text-slate-900 mt-0.5">
                        {STORE_INFO.address}
                      </p>
                      <span className="text-xs text-slate-500 block mt-0.5">
                        Landmark: near Hanuman Mandir, Tilak Nagar, Bilaspur
                      </span>
                    </div>
                  </div>

                  {/* Hours */}
                  <div className="flex items-start gap-3.5">
                    <div className="p-2.5 rounded-xl bg-red-50 text-red-800 shrink-0 mt-0.5">
                      <Clock className="w-5 h-5" />
                    </div>
                    <div>
                      <span className="text-xs text-slate-400 block font-medium">Operating Hours</span>
                      <div className="flex items-center gap-2 mt-0.5">
                        <span className="inline-block w-2.5 h-2.5 rounded-full bg-emerald-500" />
                        <span className="text-sm font-bold text-emerald-800">
                          {STORE_INFO.hours}
                        </span>
                      </div>
                      <span className="text-xs text-slate-500 block mt-0.5">
                        Monday – Sunday: {STORE_INFO.openingTime} – {STORE_INFO.closingTime}
                      </span>
                    </div>
                  </div>

                  {/* Contact Phone */}
                  <div className="flex items-start gap-3.5">
                    <div className="p-2.5 rounded-xl bg-red-50 text-red-800 shrink-0 mt-0.5">
                      <Phone className="w-5 h-5" />
                    </div>
                    <div>
                      <span className="text-xs text-slate-400 block font-medium">Customer Consultation & Orders</span>
                      <a
                        href={`tel:${STORE_INFO.phoneDial}`}
                        className="text-sm font-bold text-red-950 hover:underline mt-0.5 block"
                      >
                        {STORE_INFO.phone}
                      </a>
                      <span className="text-xs text-slate-500">
                        Direct helpline for bridal appointments & video shopping
                      </span>
                    </div>
                  </div>

                  {/* WhatsApp Quick Consultation */}
                  <div className="pt-2 flex flex-col sm:flex-row gap-3">
                    <a
                      href={`https://wa.me/${STORE_INFO.whatsapp}?text=${encodeURIComponent(
                        'Namaste Asha Dresses nx! I would like to inquire about your bridal lehengas and sarees collection at Bilaspur showroom.'
                      )}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex-1 py-3 px-4 bg-emerald-700 hover:bg-emerald-800 text-white rounded-xl text-xs font-semibold flex items-center justify-center gap-2 transition-colors"
                    >
                      <MessageSquare className="w-4 h-4" />
                      <span>Chat on WhatsApp</span>
                    </a>

                    <button
                      onClick={onBookVideoCall}
                      className="flex-1 py-3 px-4 border border-red-800 text-red-900 hover:bg-red-50 rounded-xl text-xs font-semibold flex items-center justify-center gap-2 transition-colors cursor-pointer"
                    >
                      <Phone className="w-4 h-4" />
                      <span>Book Video Call Tour</span>
                    </button>
                  </div>
                </div>

                {/* Right: Map & Showroom Visual Card */}
                <div className="lg:col-span-6 space-y-4">
                  <div className="relative rounded-2xl overflow-hidden border border-red-100 shadow-md aspect-[16/10] bg-[#F5F2EE]">
                    {/* Visual Showroom Photo */}
                    <img
                      src={STORE_INFO.showroomImage}
                      alt="Asha Dresses nx Bilaspur Showroom"
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent flex flex-col justify-end p-5 text-white">
                      <span className="text-xs text-amber-300 font-semibold uppercase">Flagship Showroom</span>
                      <h4 className="font-serif text-lg font-bold">Civil Lines Haute Couture Gallery</h4>
                      <p className="text-xs text-slate-200 mt-0.5">
                        Private trial rooms, bridal master tailor on-site, and full collection display
                      </p>
                    </div>
                  </div>

                  {/* Map representation card with directions link */}
                  <div className="p-4 rounded-2xl bg-gradient-to-r from-red-950 to-red-900 text-white flex items-center justify-between gap-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center text-amber-300">
                        <MapPin className="w-5 h-5" />
                      </div>
                      <div>
                        <div className="text-xs font-semibold">Map of Asha Dresses nx</div>
                        <div className="text-[11px] text-red-200">Tilak Nagar, near Hanuman Mandir, Bilaspur</div>
                      </div>
                    </div>
                    <a
                      href={STORE_INFO.googleMapsUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-3.5 py-1.5 bg-white text-red-950 rounded-lg text-xs font-semibold hover:bg-red-50 transition-colors flex items-center gap-1.5 shrink-0"
                    >
                      <span>Open Map</span>
                      <ExternalLink className="w-3.5 h-3.5" />
                    </a>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'reviews' && (
              <div className="space-y-8">
                {/* Google Review Summary Breakdown */}
                <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center bg-[#FDFBF9] p-6 rounded-2xl border border-red-50">
                  <div className="md:col-span-4 text-center md:text-left space-y-1">
                    <div className="text-xs font-semibold uppercase tracking-wider text-slate-500">
                      Google review summary
                    </div>
                    <div className="text-4xl sm:text-5xl font-serif font-bold text-slate-900">
                      5.0
                    </div>
                    <div className="flex items-center justify-center md:justify-start text-amber-500 gap-1">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className="w-4 h-4 fill-current" />
                      ))}
                    </div>
                    <div className="text-xs text-slate-500">(3 Verified Reviews)</div>
                  </div>

                  {/* Rating Bars (5: 100%, others 0%) */}
                  <div className="md:col-span-8 space-y-1.5">
                    {[
                      { star: 5, pct: '100%', count: 3 },
                      { star: 4, pct: '0%', count: 0 },
                      { star: 3, pct: '0%', count: 0 },
                      { star: 2, pct: '0%', count: 0 },
                      { star: 1, pct: '0%', count: 0 },
                    ].map((row) => (
                      <div key={row.star} className="flex items-center gap-3 text-xs text-slate-600">
                        <span className="w-3 text-right font-mono">{row.star}</span>
                        <div className="flex-1 h-2 rounded-full bg-slate-200 overflow-hidden">
                          <div
                            className="h-full bg-amber-500 rounded-full"
                            style={{ width: row.pct }}
                          />
                        </div>
                        <span className="w-8 text-right font-mono tabular-nums text-slate-400">
                          {row.count}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Individual Review Cards */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {GOOGLE_REVIEWS.map((rev) => (
                    <div
                      key={rev.id}
                      className="p-5 rounded-2xl bg-[#FCFCFA] border border-red-50 hover:border-red-100 flex flex-col justify-between gap-4 transition-all"
                    >
                      <div className="space-y-3">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <div className="w-8 h-8 rounded-full bg-red-800 text-white font-serif font-bold text-xs flex items-center justify-center">
                              {rev.author[0]}
                            </div>
                            <div>
                              <div className="font-semibold text-xs text-slate-900">{rev.author}</div>
                              <div className="text-[10px] text-slate-400">{rev.location}</div>
                            </div>
                          </div>
                          <span className="text-[10px] text-slate-400">{rev.date}</span>
                        </div>

                        <div className="flex text-amber-500">
                          {[...Array(5)].map((_, i) => (
                            <Star key={i} className="w-3 h-3 fill-current" />
                          ))}
                        </div>

                        <p className="text-xs text-slate-700 leading-relaxed italic">
                          "{rev.comment}"
                        </p>
                      </div>

                      {rev.highlight && (
                        <div className="pt-2 border-t border-slate-100 text-[11px] font-semibold text-red-900">
                          ✓ {rev.highlight}
                        </div>
                      )}
                    </div>
                  ))}
                </div>

                {/* Rate on Google CTA */}
                <div className="p-4 bg-red-50/60 rounded-2xl border border-red-100 flex flex-col sm:flex-row items-center justify-between gap-4">
                  <div className="text-center sm:text-left">
                    <span className="text-xs font-bold text-slate-900 block">
                      Have you visited Asha Dresses nx in Civil Lines?
                    </span>
                    <span className="text-xs text-slate-500">
                      Share your review and rating to help fellow shoppers in Bilaspur.
                    </span>
                  </div>
                  <a
                    href={STORE_INFO.googleMapsUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-4 py-2 bg-red-800 hover:bg-red-900 text-white text-xs font-semibold rounded-xl transition-colors shrink-0"
                  >
                    Rate and review on Google
                  </a>
                </div>
              </div>
            )}

            {activeTab === 'photos' && (
              <div className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  <div className="relative rounded-2xl overflow-hidden aspect-[4/3] group">
                    <img
                      src={STORE_INFO.showroomImage}
                      alt="Showroom Gallery"
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-4 text-white text-xs font-semibold">
                      Main Showroom & Designer Racks
                    </div>
                  </div>
                  <div className="relative rounded-2xl overflow-hidden aspect-[4/3] group">
                    <img
                      src={STORE_INFO.heroImage}
                      alt="Bridal Showcase"
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-4 text-white text-xs font-semibold">
                      Bridal Lehengas Section
                    </div>
                  </div>
                  <div className="relative rounded-2xl overflow-hidden aspect-[4/3] bg-red-950 p-6 flex flex-col justify-between text-white">
                    <div>
                      <span className="text-xs text-amber-300 font-semibold uppercase">Exclusive Preview</span>
                      <h4 className="font-serif text-xl font-bold mt-1">Over 500+ Designer Ensembles</h4>
                      <p className="text-xs text-red-200 mt-2">
                        Visit us near Hanuman Mandir to view the complete bridal, festive, and saree collections.
                      </p>
                    </div>
                    <a
                      href={`tel:${STORE_INFO.phoneDial}`}
                      className="px-4 py-2 bg-white text-red-950 rounded-xl text-xs font-semibold w-fit hover:bg-red-50 transition-colors"
                    >
                      Call Showroom
                    </a>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

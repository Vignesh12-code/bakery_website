import React from 'react';
import { Link } from 'react-router-dom';
import { Sparkles, Heart, CheckCircle2, ArrowRight } from 'lucide-react';
import { useStore } from '../context/StoreContext';

export const AboutPage = () => {
  const { storeSettings } = useStore();

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-16 space-y-16">
      {/* Hero Strip */}
      <div className="text-center max-w-3xl mx-auto space-y-4">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-bakery-sand text-bakery-caramel text-xs font-bold uppercase tracking-wider">
          <Sparkles className="w-3.5 h-3.5" />
          <span>Our Artisanal Philosophy</span>
        </div>
        <h1 className="font-serif text-3xl sm:text-5xl font-bold text-bakery-blackberry leading-tight">
          Crafting Moments of Pure Joy, One Loaf &amp; Pastry at a Time
        </h1>
        <p className="text-sm sm:text-base text-bakery-muted leading-relaxed">
          {storeSettings.storeName} is a boutique bakery rooted in the tradition of slow baking, honest ingredients, and patient fermentation.
        </p>
      </div>

      {/* Main Narrative */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center bg-white rounded-3xl p-8 sm:p-14 border border-bakery-border shadow-soft">
        <div className="space-y-5">
          <span className="text-xs font-bold text-bakery-caramel uppercase tracking-widest block">
            Pure Ingredients, No Compromise
          </span>
          <h2 className="font-serif text-2xl sm:text-3xl font-bold text-bakery-blackberry">
            Freshly Baked Every Morning in Bengaluru
          </h2>
          <p className="text-sm text-bakery-muted leading-relaxed">
            Crumb &amp; Co. Bakery offers freshly baked breads, handcrafted European desserts, celebration cakes, and comforting savouries. Our sourdough loaves are fermented over 24 hours to develop depth of flavour, natural aeration, and a delightfully crisp caramelized crust.
          </p>
          <p className="text-sm text-bakery-muted leading-relaxed">
            Every croissant is laminated with care to achieve crisp outer layers and a honeycomb interior. Whether you are picking up daily bread, surprising a friend with a dessert box, or ordering a custom celebration cake, we prepare each batch fresh each morning.
          </p>

          <div className="space-y-3 pt-3">
            <div className="flex items-start gap-3">
              <CheckCircle2 className="w-5 h-5 text-bakery-sage shrink-0 mt-0.5" />
              <div>
                <h4 className="text-sm font-bold text-bakery-blackberry">Slow Natural Fermentation</h4>
                <p className="text-xs text-bakery-muted">Wild sourdough starters cultured and maintained with care.</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <CheckCircle2 className="w-5 h-5 text-bakery-sage shrink-0 mt-0.5" />
              <div>
                <h4 className="text-sm font-bold text-bakery-blackberry">100% European-Style Butter</h4>
                <p className="text-xs text-bakery-muted">Golden lamination without margarine or artificial emulsifiers.</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <CheckCircle2 className="w-5 h-5 text-bakery-sage shrink-0 mt-0.5" />
              <div>
                <h4 className="text-sm font-bold text-bakery-blackberry">Bespoke Custom Cake Studio</h4>
                <p className="text-xs text-bakery-muted">Personalized occasion cakes tailored to your taste and celebrations.</p>
              </div>
            </div>
          </div>
        </div>

        <div className="relative">
          <div className="rounded-3xl overflow-hidden shadow-2xl border-4 border-white aspect-[4/3]">
            <img
              src="https://images.unsplash.com/photo-1509440159596-0249088772ff?auto=format&fit=crop&w=800&q=80"
              alt="Artisan bakery oven"
              className="w-full h-full object-cover"
            />
          </div>
        </div>
      </div>

      {/* CTA Strip */}
      <div className="p-8 sm:p-12 rounded-3xl bg-bakery-blackberry text-white text-center space-y-4">
        <h3 className="font-serif text-2xl sm:text-3xl font-bold">
          Taste the Handcrafted Difference
        </h3>
        <p className="text-xs sm:text-sm text-[#CEC2BF] max-w-md mx-auto">
          Explore our complete 52-product catalogue or build a custom cake for your next celebration.
        </p>
        <div className="pt-2 flex justify-center gap-3">
          <Link
            to="/shop"
            className="px-6 py-3 bg-bakery-caramel hover:bg-bakery-caramelHover text-white text-xs font-bold rounded-xl shadow-md transition-colors"
          >
            Explore Menu
          </Link>
          <Link
            to="/cakes"
            className="px-6 py-3 bg-white/10 hover:bg-white/20 text-white text-xs font-bold rounded-xl border border-white/20 transition-colors"
          >
            Custom Cakes
          </Link>
        </div>
      </div>
    </div>
  );
};

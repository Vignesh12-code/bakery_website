import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  ArrowRight,
  Sparkles,
  Cake,
  Package,
  Award,
  Clock,
  Heart,
  Star,
  ShieldCheck,
  CheckCircle2,
  ChevronRight
} from 'lucide-react';
import { useStore } from '../context/StoreContext';
import { ProductCard } from '../components/product/ProductCard';
import { DEMO_REVIEWS } from '../data/initialData';

export const HomePage = () => {
  const { products, storeSettings } = useStore();
  const navigate = useNavigate();

  // Bestsellers from catalogue
  const bestsellers = products.filter((p) => p.isBestseller).slice(0, 8);

  // Categories with matching imagery
  const categoryCards = [
    {
      name: 'Artisan Breads',
      description: 'Slow-fermented sourdoughs, crusty baguettes & pillowy focaccia',
      image: 'https://images.unsplash.com/photo-1589367920969-ab8e050bbb04?auto=format&fit=crop&w=600&q=80',
      badge: '8 Breads'
    },
    {
      name: 'Viennoiserie & Pastries',
      description: 'Golden flaky French croissants, pain au chocolat & mille-feuilles',
      image: 'https://images.unsplash.com/photo-1555507036-ab1f4038808a?auto=format&fit=crop&w=600&q=80',
      badge: '10 Pastries'
    },
    {
      name: 'Cakes & Cheesecakes',
      description: 'New York baked cheesecakes, Belgian truffles & tiramisu jars',
      image: 'https://images.unsplash.com/photo-1533134242443-d4fd215305ad?auto=format&fit=crop&w=600&q=80',
      badge: '10 Treats'
    },
    {
      name: 'Brownies & Tarts',
      description: 'Gooey dark chocolate brownies, lemon meringue & almond tarts',
      image: 'https://images.unsplash.com/photo-1606313564200-e75d5e30476c?auto=format&fit=crop&w=600&q=80',
      badge: '8 Bakes'
    },
    {
      name: 'Cookies & Tea Cakes',
      description: 'Brown butter chunk cookies, cardamom nankhatai & lemon drizzle loaves',
      image: 'https://images.unsplash.com/photo-1499636136210-6f4ee915583e?auto=format&fit=crop&w=600&q=80',
      badge: '8 Varieties'
    },
    {
      name: 'Indian Bakery Savouries',
      description: 'Flaky masala veg puffs, paneer tikka patties & garlic buns',
      image: 'https://images.unsplash.com/photo-1628088062854-d1870b4553da?auto=format&fit=crop&w=600&q=80',
      badge: '8 Savouries'
    }
  ];

  return (
    <div className="space-y-16 sm:space-y-24 pb-16">
      {/* 1. Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-b from-[#F7ECE4] via-bakery-vanilla to-bakery-vanilla pt-12 pb-16 sm:pt-20 sm:pb-28 border-b border-bakery-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            {/* Left Copy */}
            <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-bakery-caramel/10 border border-bakery-caramel/20 text-bakery-caramel text-xs font-bold tracking-wide uppercase">
                <Sparkles className="w-3.5 h-3.5" />
                <span>Boutique Artisan Bakehouse • Bengaluru</span>
              </div>

              <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl font-extrabold text-bakery-blackberry leading-[1.12]">
                Freshly Baked Happiness, <br />
                <span className="text-bakery-caramel italic">Delivered to Your Door.</span>
              </h1>

              <p className="text-base sm:text-lg text-bakery-muted max-w-2xl mx-auto lg:mx-0 leading-relaxed">
                From handcrafted cakes to flaky croissants, discover freshly prepared treats made with love. Slow-fermented naturally, rolled with real European-style butter, and dispatched fresh every morning.
              </p>

              <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-3.5 pt-2">
                <Link
                  to="/shop"
                  className="w-full sm:w-auto px-8 py-3.5 bg-bakery-caramel hover:bg-bakery-caramelHover text-white text-sm font-bold rounded-xl shadow-hover transition-all duration-200 flex items-center justify-center gap-2 active:scale-95"
                >
                  <span>Explore Our Menu</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>

                <Link
                  to="/cakes"
                  className="w-full sm:w-auto px-7 py-3.5 bg-white hover:bg-bakery-sand text-bakery-blackberry text-sm font-bold rounded-xl border border-bakery-border shadow-soft transition-all duration-200 flex items-center justify-center gap-2"
                >
                  <Cake className="w-4 h-4 text-bakery-caramel" />
                  <span>Customize Your Cake</span>
                </Link>
              </div>

              {/* Highlights badge bar */}
              <div className="pt-6 grid grid-cols-3 gap-4 border-t border-bakery-border/80 max-w-lg mx-auto lg:mx-0 text-left">
                <div>
                  <span className="font-serif text-xl sm:text-2xl font-bold text-bakery-blackberry block">
                    52+
                  </span>
                  <span className="text-xs text-bakery-muted">Artisan Bakes</span>
                </div>
                <div>
                  <span className="font-serif text-xl sm:text-2xl font-bold text-bakery-blackberry block">
                    100%
                  </span>
                  <span className="text-xs text-bakery-muted">Pure Dairy Butter</span>
                </div>
                <div>
                  <span className="font-serif text-xl sm:text-2xl font-bold text-bakery-blackberry block">
                    Same-Day
                  </span>
                  <span className="text-xs text-bakery-muted">Express Dispatch</span>
                </div>
              </div>
            </div>

            {/* Right Visual Image Composition */}
            <div className="lg:col-span-5 relative">
              <div className="relative mx-auto max-w-md lg:max-w-none">
                {/* Decorative background glow */}
                <div className="absolute -inset-4 bg-gradient-to-tr from-bakery-caramel/20 to-bakery-sage/20 rounded-3xl filter blur-2xl opacity-60" />

                <div className="relative rounded-3xl overflow-hidden shadow-2xl border-4 border-white aspect-[4/5]">
                  <img
                    src="https://images.unsplash.com/photo-1509440159596-0249088772ff?auto=format&fit=crop&w=900&q=85"
                    alt="Freshly baked artisan sourdough and pastries"
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-bakery-blackberry/70 via-transparent to-transparent" />

                  {/* Floating card 1: Fresh bread */}
                  <div className="absolute bottom-6 left-6 right-6 p-4 rounded-2xl bg-white/95 backdrop-blur-md border border-white shadow-lg">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-xl bg-bakery-sand flex items-center justify-center text-xl">
                          🥖
                        </div>
                        <div>
                          <p className="text-xs font-bold text-bakery-blackberry">
                            Country Sourdough Boule
                          </p>
                          <span className="text-[11px] text-bakery-sage font-semibold">
                            Natural 24h Cold Ferment
                          </span>
                        </div>
                      </div>
                      <span className="font-serif font-bold text-bakery-caramel text-base">
                        ₹240
                      </span>
                    </div>
                  </div>
                </div>

                {/* Floating pill 2 */}
                <div className="absolute -top-4 -right-4 bg-bakery-raspberry text-white px-4 py-2 rounded-2xl shadow-xl flex items-center gap-2 animate-bounce">
                  <Star className="w-4 h-4 fill-current text-amber-300" />
                  <span className="text-xs font-bold">Bengaluru's Best Sourdough</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. Featured Categories */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-10">
          <div>
            <span className="text-xs uppercase tracking-wider font-bold text-bakery-caramel block">
              Curated Craftsmanship
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl font-bold text-bakery-blackberry mt-1">
              Explore Our Baked Categories
            </h2>
          </div>
          <Link
            to="/shop"
            className="text-sm font-bold text-bakery-caramel hover:text-bakery-caramelHover flex items-center gap-1 group"
          >
            <span>View All 52 Products</span>
            <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {categoryCards.map((cat) => (
            <div
              key={cat.name}
              onClick={() => navigate(`/shop?category=${encodeURIComponent(cat.name)}`)}
              className="group cursor-pointer rounded-2xl overflow-hidden bg-white border border-bakery-border shadow-soft hover:shadow-hover hover:border-bakery-caramel/40 transition-all duration-300 flex flex-col"
            >
              <div className="relative aspect-[16/10] overflow-hidden bg-bakery-sand">
                <img
                  src={cat.image}
                  alt={cat.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-bakery-blackberry/70 via-transparent to-transparent" />
                <span className="absolute top-3 right-3 px-2.5 py-1 rounded-full bg-white/90 backdrop-blur-sm text-[11px] font-bold text-bakery-blackberry shadow-sm">
                  {cat.badge}
                </span>
                <div className="absolute bottom-3 left-4 right-4">
                  <h3 className="font-serif text-xl font-bold text-white group-hover:text-amber-200 transition-colors">
                    {cat.name}
                  </h3>
                </div>
              </div>
              <div className="p-4 flex-1 flex flex-col justify-between">
                <p className="text-xs text-bakery-muted leading-relaxed">
                  {cat.description}
                </p>
                <div className="mt-3 pt-2 border-t border-bakery-border/60 flex items-center justify-between text-xs font-bold text-bakery-caramel">
                  <span>Browse Category</span>
                  <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 3. Best Sellers Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-8">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-bakery-raspberry/10 text-bakery-raspberry text-xs font-bold uppercase tracking-wider mb-2">
              <Star className="w-3.5 h-3.5 fill-current" />
              <span>Oven-Fresh Favorites</span>
            </div>
            <h2 className="font-serif text-3xl sm:text-4xl font-bold text-bakery-blackberry">
              Our Signature Best Sellers
            </h2>
          </div>
          <Link
            to="/shop"
            className="text-sm font-bold text-bakery-caramel hover:text-bakery-caramelHover flex items-center gap-1"
          >
            <span>See entire catalogue</span>
            <ChevronRight className="w-4 h-4" />
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {bestsellers.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>

      {/* 4. Promotional Banner: Custom Cake Studio */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative rounded-3xl overflow-hidden bg-bakery-blackberry text-white border border-[#3A2A4E] shadow-2xl">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center p-8 sm:p-14">
            <div className="lg:col-span-7 space-y-5">
              <span className="px-3 py-1 rounded-full bg-bakery-caramel text-white text-xs font-bold uppercase tracking-wider">
                Bespoke Celebration Studio
              </span>
              <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-white leading-tight">
                Make Every Celebration Sweeter
              </h2>
              <p className="text-sm sm:text-base text-[#D4C7C5] leading-relaxed max-w-xl">
                Design your dream cake in real-time. Choose your preferred size from 500g to 2kg, pick handcrafted flavours like Belgian Dark Truffle or Alphonso Mango, personalize with custom frostings and handwritten celebration messages.
              </p>
              <div className="pt-2 flex flex-wrap gap-4">
                <Link
                  to="/cakes"
                  className="px-8 py-3.5 bg-bakery-caramel hover:bg-bakery-caramelHover text-white font-bold rounded-xl shadow-lg transition-transform active:scale-95 flex items-center gap-2"
                >
                  <Cake className="w-4 h-4" />
                  <span>Customize Your Cake</span>
                </Link>
                <Link
                  to="/build-a-box"
                  className="px-7 py-3.5 bg-white/10 hover:bg-white/20 text-white font-bold rounded-xl border border-white/20 transition-colors flex items-center gap-2"
                >
                  <Package className="w-4 h-4 text-amber-300" />
                  <span>Build a Box (Save up to ₹250)</span>
                </Link>
              </div>
            </div>

            <div className="lg:col-span-5 relative flex justify-center">
              <div className="relative rounded-2xl overflow-hidden border-2 border-white/20 shadow-2xl max-w-sm">
                <img
                  src="https://images.unsplash.com/photo-1578985545062-69928b1d9587?auto=format&fit=crop&w=700&q=80"
                  alt="Belgian Chocolate Truffle Cake with Gold Leaves"
                  className="w-full h-80 object-cover"
                />
                <div className="absolute bottom-4 left-4 right-4 p-3 rounded-xl bg-bakery-blackberry/90 backdrop-blur-md border border-white/10 text-center">
                  <p className="font-serif text-sm font-bold text-white">
                    Belgian Truffle &amp; Red Velvet Specialties
                  </p>
                  <span className="text-[11px] text-amber-300">
                    Handmade fresh for your special moments
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 5. Craftsmanship & Philosophy (About Section) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-3xl p-8 sm:p-14 border border-bakery-border shadow-soft">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-5">
              <span className="text-xs uppercase tracking-wider font-bold text-bakery-caramel block">
                The Crumb &amp; Co. Story
              </span>
              <h2 className="font-serif text-3xl sm:text-4xl font-bold text-bakery-blackberry">
                Honest Ingredients, Patient Fermentation &amp; Warm Oven Smiles
              </h2>
              <p className="text-sm text-bakery-muted leading-relaxed">
                Crumb &amp; Co. Bakery offers freshly baked artisan breads, handcrafted European desserts, celebration cakes, and comforting savouries. Our sourdough loaves are fermented over 24 hours to develop depth of flavour, natural aeration, and a delightfully crisp caramelized crust.
              </p>
              <p className="text-sm text-bakery-muted leading-relaxed">
                Every croissant is laminated with care to achieve crisp outer layers and a honeycomb interior. Whether you are picking up daily bread, surprising a friend with a dessert box, or ordering a custom celebration cake, we prepare each batch fresh each morning.
              </p>

              <div className="grid grid-cols-2 gap-4 pt-4">
                <div className="flex items-start gap-2.5">
                  <CheckCircle2 className="w-5 h-5 text-bakery-sage shrink-0 mt-0.5" />
                  <div>
                    <h4 className="text-xs font-bold text-bakery-blackberry">Pure European Butter</h4>
                    <p className="text-[11px] text-bakery-muted">No hydrogenated fats or margarine</p>
                  </div>
                </div>
                <div className="flex items-start gap-2.5">
                  <CheckCircle2 className="w-5 h-5 text-bakery-sage shrink-0 mt-0.5" />
                  <div>
                    <h4 className="text-xs font-bold text-bakery-blackberry">No Artificial Preservatives</h4>
                    <p className="text-[11px] text-bakery-muted">Baked fresh and best enjoyed same-day</p>
                  </div>
                </div>
                <div className="flex items-start gap-2.5">
                  <CheckCircle2 className="w-5 h-5 text-bakery-sage shrink-0 mt-0.5" />
                  <div>
                    <h4 className="text-xs font-bold text-bakery-blackberry">Provisional Dietary Tags</h4>
                    <p className="text-[11px] text-bakery-muted">Clear vegetarian &amp; eggless labelling</p>
                  </div>
                </div>
                <div className="flex items-start gap-2.5">
                  <CheckCircle2 className="w-5 h-5 text-bakery-sage shrink-0 mt-0.5" />
                  <div>
                    <h4 className="text-xs font-bold text-bakery-blackberry">Express Local Delivery</h4>
                    <p className="text-[11px] text-bakery-muted">Carefully packaged in insulated boxes</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <img
                src="https://images.unsplash.com/photo-1549931319-a545dcf3bc73?auto=format&fit=crop&w=600&q=80"
                alt="Fresh baguettes"
                className="rounded-2xl object-cover h-56 w-full shadow-sm"
              />
              <img
                src="https://images.unsplash.com/photo-1530610476181-d83430b64dcd?auto=format&fit=crop&w=600&q=80"
                alt="Pistachio Rose Croissants"
                className="rounded-2xl object-cover h-56 w-full shadow-sm mt-6"
              />
            </div>
          </div>
        </div>
      </section>

      {/* 6. Customer Reviews (Clearly Labelled Demo Reviews) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-10">
          <div className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-bakery-sand text-bakery-muted text-[11px] font-semibold uppercase tracking-wider mb-2">
            <span>Sample Demo Customer Feedback</span>
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl font-bold text-bakery-blackberry">
            Loved Across Bengaluru
          </h2>
          <p className="text-xs text-bakery-muted mt-2">
            (The reviews below are sample demonstration entries for this client project)
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {DEMO_REVIEWS.map((review) => (
            <div
              key={review.id}
              className="p-6 rounded-2xl bg-white border border-bakery-border shadow-soft flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center gap-1 text-amber-500 mb-3">
                  {[...Array(review.rating)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-current" />
                  ))}
                </div>
                <p className="text-xs sm:text-sm text-bakery-blackberry/90 leading-relaxed italic">
                  "{review.comment}"
                </p>
              </div>

              <div className="mt-5 pt-3 border-t border-bakery-border/70">
                <p className="text-xs font-bold text-bakery-blackberry">{review.name}</p>
                <p className="text-[11px] text-bakery-muted">{review.location}</p>
                <div className="mt-1 flex items-center justify-between text-[10px]">
                  <span className="text-bakery-caramel font-semibold">{review.product}</span>
                  <span className="text-bakery-sage font-bold bg-bakery-sage/10 px-1.5 py-0.5 rounded">
                    Demo
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

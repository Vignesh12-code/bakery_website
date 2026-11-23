import React, { useState, useMemo, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import {
  Search,
  SlidersHorizontal,
  X,
  Filter,
  ArrowUpDown,
  Sparkles,
  ShoppingBag
} from 'lucide-react';
import { useStore } from '../context/StoreContext';
import { ProductCard } from '../components/product/ProductCard';
import { CATEGORIES } from '../data/products';

export const ShopPage = () => {
  const { products } = useStore();
  const [searchParams, setSearchParams] = useSearchParams();

  // Search & filter state
  const initialCategory = searchParams.get('category') || 'All';
  const initialSearch = searchParams.get('search') || '';

  const [selectedCategory, setSelectedCategory] = useState(initialCategory);
  const [searchQuery, setSearchQuery] = useState(initialSearch);
  const [dietaryFilter, setDietaryFilter] = useState('All'); // 'All', 'Vegetarian', 'Non-Vegetarian', 'Eggless'
  const [priceRange, setPriceRange] = useState('All'); // 'All', 'under150', '150-300', '300-600', 'above600'
  const [sortBy, setSortBy] = useState('featured'); // 'featured', 'priceAsc', 'priceDesc', 'nameAsc'
  const [mobileFilterOpen, setMobileFilterOpen] = useState(false);

  // Sync state with URL params if they change
  useEffect(() => {
    const cat = searchParams.get('category');
    if (cat) setSelectedCategory(cat);
    const s = searchParams.get('search');
    if (s !== null) setSearchQuery(s);
  }, [searchParams]);

  // Quick search keywords
  const quickTags = [
    'Croissant',
    'Chocolate',
    'Cheesecake',
    'Eggless',
    'Puff',
    'Brownie'
  ];

  const handleQuickTagClick = (tag) => {
    setSearchQuery(tag);
    setSearchParams({ search: tag });
  };

  const handleClearFilters = () => {
    setSelectedCategory('All');
    setSearchQuery('');
    setDietaryFilter('All');
    setPriceRange('All');
    setSortBy('featured');
    setSearchParams({});
  };

  // Filter and sort products
  const filteredProducts = useMemo(() => {
    return products
      .filter((p) => {
        // Category filter
        if (selectedCategory !== 'All' && p.category !== selectedCategory) {
          return false;
        }

        // Dietary filter
        if (dietaryFilter === 'Vegetarian' && p.dietary !== 'Vegetarian') {
          return false;
        }
        if (dietaryFilter === 'Non-Vegetarian' && p.dietary !== 'Non-Vegetarian') {
          return false;
        }
        if (dietaryFilter === 'Eggless' && !p.isEggless) {
          return false;
        }

        // Price range
        if (priceRange === 'under150' && p.price >= 150) return false;
        if (priceRange === '150-300' && (p.price < 150 || p.price > 300)) return false;
        if (priceRange === '300-600' && (p.price < 300 || p.price > 600)) return false;
        if (priceRange === 'above600' && p.price <= 600) return false;

        // Search query
        if (searchQuery.trim()) {
          const q = searchQuery.toLowerCase().trim();
          const matchName = p.name.toLowerCase().includes(q);
          const matchDesc = p.description.toLowerCase().includes(q);
          const matchCat = p.category.toLowerCase().includes(q);
          const matchDiet = (p.dietary || '').toLowerCase().includes(q);
          const matchEggless = q === 'eggless' && p.isEggless;
          if (!matchName && !matchDesc && !matchCat && !matchDiet && !matchEggless) {
            return false;
          }
        }

        return true;
      })
      .sort((a, b) => {
        if (sortBy === 'priceAsc') return a.price - b.price;
        if (sortBy === 'priceDesc') return b.price - a.price;
        if (sortBy === 'nameAsc') return a.name.localeCompare(b.name);
        // Default featured: featured first, then bestsellers, then by rating
        if (a.isFeatured && !b.isFeatured) return -1;
        if (!a.isFeatured && b.isFeatured) return 1;
        return b.rating - a.rating;
      });
  }, [products, selectedCategory, dietaryFilter, priceRange, searchQuery, sortBy]);

  const hasActiveFilters =
    selectedCategory !== 'All' ||
    searchQuery.trim() !== '' ||
    dietaryFilter !== 'All' ||
    priceRange !== 'All' ||
    sortBy !== 'featured';

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 space-y-8">
      {/* Page Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-bakery-border pb-6">
        <div>
          <span className="text-xs uppercase tracking-widest font-bold text-bakery-caramel block">
            Artisanal Boutique Menu
          </span>
          <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-bakery-blackberry mt-1">
            Fresh From Our Ovens
          </h1>
          <p className="text-sm text-bakery-muted mt-2 max-w-xl">
            Browse our complete 52-product catalogue of naturally fermented sourdoughs, flaky viennoiserie, decadent cakes, fudgy brownies, and savoury puffs.
          </p>
        </div>

        {/* Counter badge */}
        <div className="flex items-center gap-2">
          <span className="px-3 py-1.5 rounded-xl bg-bakery-sand text-xs font-bold text-bakery-blackberry border border-bakery-border">
            Showing {filteredProducts.length} of {products.length} Products
          </span>
          {hasActiveFilters && (
            <button
              onClick={handleClearFilters}
              className="px-3 py-1.5 rounded-xl bg-bakery-raspberry/10 text-bakery-raspberry hover:bg-bakery-raspberry/20 text-xs font-semibold flex items-center gap-1 transition-colors"
            >
              <X className="w-3.5 h-3.5" />
              <span>Reset All</span>
            </button>
          )}
        </div>
      </div>

      {/* Search Bar & Quick Tags */}
      <div className="space-y-3">
        <div className="relative max-w-2xl">
          <Search className="w-5 h-5 absolute left-3.5 top-3 text-bakery-muted" />
          <input
            type="text"
            placeholder="Search by bake name, ingredient, chocolate, croissant, etc..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-11 pr-10 py-2.5 bg-white rounded-2xl border border-bakery-border text-sm shadow-sm focus:outline-none focus:border-bakery-caramel focus:ring-1 focus:ring-bakery-caramel"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              className="absolute right-3.5 top-3 text-bakery-muted hover:text-bakery-blackberry"
            >
              <X className="w-4 h-4" />
            </button>
          )}
        </div>

        {/* Quick Search Tag Pills */}
        <div className="flex items-center gap-2 overflow-x-auto pb-1 text-xs text-bakery-muted">
          <span className="shrink-0 font-medium">Quick search:</span>
          {quickTags.map((tag) => (
            <button
              key={tag}
              onClick={() => handleQuickTagClick(tag)}
              className={`px-3 py-1 rounded-full border transition-colors shrink-0 ${
                searchQuery.toLowerCase() === tag.toLowerCase()
                  ? 'bg-bakery-caramel text-white border-bakery-caramel font-semibold'
                  : 'bg-white border-bakery-border hover:border-bakery-caramel text-bakery-blackberry'
              }`}
            >
              {tag}
            </button>
          ))}
        </div>
      </div>

      {/* Main Filter Bar & Category Tabs */}
      <div className="space-y-4">
        {/* Categories Tab Row */}
        <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              onClick={() => {
                setSelectedCategory(cat);
                setSearchParams(cat === 'All' ? {} : { category: cat });
              }}
              className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold shrink-0 transition-all ${
                selectedCategory === cat
                  ? 'bg-bakery-blackberry text-white shadow-md'
                  : 'bg-white text-bakery-blackberry hover:bg-bakery-sand/70 border border-bakery-border'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Secondary Filter Controls: Dietary, Price, Sorting */}
        <div className="flex flex-wrap items-center justify-between gap-3 p-4 bg-white rounded-2xl border border-bakery-border shadow-soft">
          <div className="flex flex-wrap items-center gap-3">
            {/* Dietary */}
            <div className="flex items-center gap-1.5 text-xs">
              <span className="text-bakery-muted font-medium">Dietary:</span>
              <select
                value={dietaryFilter}
                onChange={(e) => setDietaryFilter(e.target.value)}
                className="bg-bakery-vanilla/60 border border-bakery-border rounded-xl px-2.5 py-1.5 text-xs font-semibold text-bakery-blackberry focus:outline-none focus:border-bakery-caramel"
              >
                <option value="All">All Diets</option>
                <option value="Vegetarian">Vegetarian Only</option>
                <option value="Non-Vegetarian">Non-Vegetarian</option>
                <option value="Eggless">100% Eggless</option>
              </select>
            </div>

            {/* Price Filter */}
            <div className="flex items-center gap-1.5 text-xs">
              <span className="text-bakery-muted font-medium">Price:</span>
              <select
                value={priceRange}
                onChange={(e) => setPriceRange(e.target.value)}
                className="bg-bakery-vanilla/60 border border-bakery-border rounded-xl px-2.5 py-1.5 text-xs font-semibold text-bakery-blackberry focus:outline-none focus:border-bakery-caramel"
              >
                <option value="All">All Prices</option>
                <option value="under150">Under ₹150</option>
                <option value="150-300">₹150 – ₹300</option>
                <option value="300-600">₹300 – ₹600</option>
                <option value="above600">Above ₹600</option>
              </select>
            </div>
          </div>

          {/* Sorting */}
          <div className="flex items-center gap-2 text-xs">
            <ArrowUpDown className="w-3.5 h-3.5 text-bakery-muted" />
            <span className="text-bakery-muted font-medium">Sort By:</span>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="bg-bakery-vanilla/60 border border-bakery-border rounded-xl px-2.5 py-1.5 text-xs font-semibold text-bakery-blackberry focus:outline-none focus:border-bakery-caramel"
            >
              <option value="featured">Featured &amp; Highly Rated</option>
              <option value="priceAsc">Price: Low to High</option>
              <option value="priceDesc">Price: High to Low</option>
              <option value="nameAsc">Name: A to Z</option>
            </select>
          </div>
        </div>
      </div>

      {/* Product Grid */}
      {filteredProducts.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      ) : (
        /* Empty State */
        <div className="bg-white rounded-3xl border border-bakery-border p-12 text-center max-w-lg mx-auto space-y-4 shadow-soft">
          <div className="w-16 h-16 rounded-full bg-bakery-sand flex items-center justify-center text-3xl mx-auto">
            🥐
          </div>
          <div>
            <h3 className="font-serif text-xl font-bold text-bakery-blackberry">
              No matching bakes found
            </h3>
            <p className="text-xs text-bakery-muted mt-1 leading-relaxed">
              We couldn't find any items matching your selected criteria. Try adjusting your search term, clearing dietary filters, or resetting the price range.
            </p>
          </div>
          <button
            onClick={handleClearFilters}
            className="px-6 py-2.5 bg-bakery-caramel hover:bg-bakery-caramelHover text-white text-xs font-bold rounded-xl shadow-md transition-colors"
          >
            Clear All Filters
          </button>
        </div>
      )}
    </div>
  );
};

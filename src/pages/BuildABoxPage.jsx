import React, { useState } from 'react';
import {
  Package,
  Plus,
  X,
  ShoppingBag,
  Sparkles,
  Check,
  Search,
  AlertCircle
} from 'lucide-react';
import { useStore } from '../context/StoreContext';
import { FallbackImage } from '../components/common/FallbackImage';

export const BuildABoxPage = () => {
  const { products, addToCart, setIsCartDrawerOpen, showToast } = useStore();

  // Box options
  const BOX_OPTIONS = [
    { size: 6, price: 899, label: 'Artisan Box of 6', savings: 'Save approx. ₹120' },
    { size: 12, price: 1699, label: 'Celebration Box of 12', savings: 'Save approx. ₹250' }
  ];

  const [selectedBoxOption, setSelectedBoxOption] = useState(BOX_OPTIONS[0]);
  const [selectedItems, setSelectedItems] = useState([]); // array of product objects
  const [shelfFilter, setShelfFilter] = useState('All');
  const [shelfSearch, setShelfSearch] = useState('');

  // Filter eligible box products (pastries, brownies, tarts, cookies, cupcakes)
  const eligibleProducts = products.filter((p) => p.eligibleForBox && p.isAvailable && p.stock > 0);

  const displayedProducts = eligibleProducts.filter((p) => {
    if (shelfFilter !== 'All' && p.category !== shelfFilter) return false;
    if (shelfSearch.trim()) {
      const q = shelfSearch.toLowerCase();
      return p.name.toLowerCase().includes(q) || p.description.toLowerCase().includes(q);
    }
    return true;
  });

  const remainingSlots = selectedBoxOption.size - selectedItems.length;

  const handleBoxOptionChange = (option) => {
    setSelectedBoxOption(option);
    // If reducing from 12 to 6, trim items
    if (selectedItems.length > option.size) {
      setSelectedItems((prev) => prev.slice(0, option.size));
    }
  };

  const handleAddItemToBox = (product) => {
    if (selectedItems.length >= selectedBoxOption.size) {
      showToast(`Your Box of ${selectedBoxOption.size} is already full! Remove an item to replace.`, 'error');
      return;
    }
    setSelectedItems((prev) => [...prev, product]);
    showToast(`Added "${product.name}" to slot ${selectedItems.length + 1}!`, 'success');
  };

  const handleRemoveItemFromSlot = (index) => {
    setSelectedItems((prev) => prev.filter((_, i) => i !== index));
  };

  const handleClearBox = () => {
    setSelectedItems([]);
    showToast('Cleared all slots in your box.', 'info');
  };

  const handleAddBoxToCart = () => {
    if (selectedItems.length < selectedBoxOption.size) {
      showToast(`Please fill all ${selectedBoxOption.size} slots before adding to basket. (${remainingSlots} slots remaining)`, 'error');
      return;
    }

    const customDetails = {
      title: `${selectedBoxOption.label} (Assorted Bakes)`,
      boxSize: selectedBoxOption.size,
      boxItems: selectedItems.map((p) => ({ id: p.id, name: p.name, price: p.price })),
      price: selectedBoxOption.price,
      weight: `${selectedBoxOption.size} Pastries & Desserts`,
      category: 'Build a Box',
      image: selectedItems[0]?.image || 'https://images.unsplash.com/photo-1509440159596-0249088772ff?auto=format&fit=crop&w=600&q=80'
    };

    addToCart(null, 1, customDetails);
    setIsCartDrawerOpen(true);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 space-y-10">
      {/* Page Header */}
      <div className="text-center max-w-3xl mx-auto space-y-3">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-bakery-caramel/10 border border-bakery-caramel/20 text-bakery-caramel text-xs font-bold uppercase tracking-wider">
          <Package className="w-4 h-4" />
          <span>Interactive Box Studio</span>
        </div>
        <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-bakery-blackberry">
          Build Your Own Dessert &amp; Pastry Box
        </h1>
        <p className="text-sm text-bakery-muted leading-relaxed">
          Curate your personal selection of French croissants, fudgy brownies, gourmet tarts, and cookies. Enjoy bundle pricing and boutique packaging.
        </p>
      </div>

      {/* Box Size Toggle Bar */}
      <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
        {BOX_OPTIONS.map((opt) => (
          <button
            key={opt.size}
            onClick={() => handleBoxOptionChange(opt)}
            className={`w-full sm:w-72 p-5 rounded-2xl border text-left transition-all ${
              selectedBoxOption.size === opt.size
                ? 'border-bakery-caramel bg-white ring-2 ring-bakery-caramel/30 shadow-hover'
                : 'border-bakery-border bg-bakery-card hover:bg-white text-bakery-blackberry'
            }`}
          >
            <div className="flex items-center justify-between">
              <span className="font-serif text-lg font-bold text-bakery-blackberry">
                {opt.label}
              </span>
              <span className="font-serif text-xl font-bold text-bakery-caramel">
                ₹{opt.price}
              </span>
            </div>
            <div className="mt-1 flex items-center justify-between text-xs text-bakery-muted">
              <span>{opt.size} handpicked treats</span>
              <span className="text-bakery-sage font-bold">{opt.savings}</span>
            </div>
          </button>
        ))}
      </div>

      {/* Visual Slot Grid Showcase */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-bakery-border shadow-soft space-y-6">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 border-b border-bakery-border pb-4">
          <div>
            <h3 className="font-serif text-xl font-bold text-bakery-blackberry">
              Your {selectedBoxOption.label} Slots ({selectedItems.length}/{selectedBoxOption.size} Filled)
            </h3>
            <span className="text-xs text-bakery-muted">
              {remainingSlots === 0 ? (
                <strong className="text-bakery-sage flex items-center gap-1">
                  <Check className="w-4 h-4" /> All slots filled! Ready to add to basket.
                </strong>
              ) : (
                `Select ${remainingSlots} more treat${remainingSlots > 1 ? 's' : ''} from the shelf below`
              )}
            </span>
          </div>

          <div className="flex items-center gap-3">
            {selectedItems.length > 0 && (
              <button
                onClick={handleClearBox}
                className="text-xs text-bakery-raspberry font-semibold hover:underline"
              >
                Clear Box
              </button>
            )}
            <button
              onClick={handleAddBoxToCart}
              disabled={selectedItems.length < selectedBoxOption.size}
              className={`px-6 py-2.5 rounded-xl text-xs font-bold flex items-center gap-2 transition-all ${
                selectedItems.length >= selectedBoxOption.size
                  ? 'bg-bakery-caramel hover:bg-bakery-caramelHover text-white shadow-md active:scale-95'
                  : 'bg-gray-200 text-gray-400 cursor-not-allowed'
              }`}
            >
              <ShoppingBag className="w-4 h-4" />
              <span>Add Box to Basket (₹{selectedBoxOption.price})</span>
            </button>
          </div>
        </div>

        {/* The Visual Slots */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-3.5">
          {Array.from({ length: selectedBoxOption.size }).map((_, index) => {
            const item = selectedItems[index];
            return (
              <div
                key={index}
                className={`relative rounded-2xl aspect-square flex flex-col items-center justify-center p-3 text-center transition-all ${
                  item
                    ? 'border border-bakery-caramel/40 bg-bakery-sand/40 shadow-sm'
                    : 'border-2 border-dashed border-bakery-border bg-bakery-vanilla/40 text-bakery-muted'
                }`}
              >
                {item ? (
                  <>
                    <button
                      onClick={() => handleRemoveItemFromSlot(index)}
                      className="absolute top-1.5 right-1.5 p-1 rounded-full bg-white/90 text-bakery-muted hover:text-bakery-raspberry hover:bg-white transition-colors shadow-sm"
                      title="Remove from slot"
                    >
                      <X className="w-3.5 h-3.5" />
                    </button>
                    <FallbackImage
                      src={item.image}
                      alt={item.name}
                      title={item.name}
                      category={item.category}
                      className="w-12 h-12 rounded-lg object-cover mb-1.5"
                    />
                    <p className="text-[11px] font-bold text-bakery-blackberry line-clamp-1 leading-tight">
                      {item.name}
                    </p>
                    <span className="text-[10px] text-bakery-muted font-medium mt-0.5">
                      Slot #{index + 1}
                    </span>
                  </>
                ) : (
                  <div className="flex flex-col items-center gap-1">
                    <div className="w-8 h-8 rounded-full bg-bakery-sand flex items-center justify-center text-bakery-muted">
                      <Plus className="w-4 h-4" />
                    </div>
                    <span className="text-[11px] font-bold text-bakery-muted">
                      Slot #{index + 1}
                    </span>
                    <span className="text-[9px] text-bakery-muted">Empty</span>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* Product Shelf: Browse & Pick */}
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h3 className="font-serif text-2xl font-bold text-bakery-blackberry">
              Available Treats For Your Box
            </h3>
            <p className="text-xs text-bakery-muted mt-1">
              Click "+ Add to Box" to place any pastry or dessert into your next open slot.
            </p>
          </div>

          {/* Search Shelf */}
          <div className="relative w-full sm:w-64">
            <Search className="w-4 h-4 absolute left-3 top-2.5 text-bakery-muted" />
            <input
              type="text"
              placeholder="Search bakes..."
              value={shelfSearch}
              onChange={(e) => setShelfSearch(e.target.value)}
              className="w-full pl-9 pr-3 py-1.5 bg-white rounded-xl border border-bakery-border text-xs focus:outline-none focus:border-bakery-caramel"
            />
          </div>
        </div>

        {/* Shelf Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
          {displayedProducts.map((item) => (
            <div
              key={item.id}
              className="bg-white rounded-2xl border border-bakery-border shadow-soft p-3 flex flex-col justify-between hover:border-bakery-sand transition-all group"
            >
              <div className="relative aspect-[4/3] rounded-xl overflow-hidden bg-bakery-sand/40 mb-2.5">
                <FallbackImage
                  src={item.image}
                  alt={item.name}
                  title={item.name}
                  category={item.category}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <span className="absolute bottom-2 left-2 px-1.5 py-0.5 rounded bg-white/90 text-[10px] font-bold text-bakery-blackberry">
                  {item.weight}
                </span>
              </div>

              <div>
                <h4 className="font-serif text-xs sm:text-sm font-bold text-bakery-blackberry line-clamp-1">
                  {item.name}
                </h4>
                <p className="text-[11px] text-bakery-muted line-clamp-1 mt-0.5">
                  {item.description}
                </p>
              </div>

              <div className="mt-3 pt-2 border-t border-bakery-border/60 flex items-center justify-between">
                <span className="text-xs font-bold text-bakery-caramel font-serif">
                  Standard ₹{item.price}
                </span>
                <button
                  onClick={() => handleAddItemToBox(item)}
                  disabled={selectedItems.length >= selectedBoxOption.size}
                  className="px-2.5 py-1.5 rounded-lg bg-bakery-caramel text-white text-[11px] font-bold hover:bg-bakery-caramelHover transition-colors flex items-center gap-1 disabled:opacity-40 disabled:cursor-not-allowed"
                >
                  <Plus className="w-3 h-3" />
                  <span>Add to Box</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

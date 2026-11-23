import React from 'react';
import { Heart, ShoppingBag, Eye, Star } from 'lucide-react';
import { useStore } from '../../context/StoreContext';
import { FallbackImage } from '../common/FallbackImage';

export const ProductCard = ({ product }) => {
  const {
    addToCart,
    wishlist,
    toggleWishlist,
    setQuickViewProduct
  } = useStore();

  const isWishlisted = wishlist.includes(product.id);
  const isOutOfStock = !product.isAvailable || product.stock <= 0;

  return (
    <div className="group bg-bakery-card rounded-2xl border border-bakery-border shadow-soft hover:shadow-hover hover:border-bakery-sand transition-all duration-300 flex flex-col overflow-hidden relative">
      {/* Top Media Container */}
      <div className="relative aspect-[4/3] w-full overflow-hidden bg-bakery-sand/40">
        <FallbackImage
          src={product.image}
          alt={product.name}
          title={product.name}
          category={product.category}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />

        {/* Badges Container */}
        <div className="absolute top-2.5 left-2.5 flex flex-col gap-1.5 z-10">
          {product.isBestseller && (
            <span className="px-2 py-0.5 rounded-full bg-bakery-raspberry text-white text-[10px] font-bold tracking-wide uppercase shadow-sm">
              Bestseller
            </span>
          )}
          {product.isEggless && (
            <span className="px-2 py-0.5 rounded-full bg-bakery-sage text-white text-[10px] font-semibold tracking-wide uppercase shadow-sm">
              Eggless
            </span>
          )}
        </div>

        {/* Veg / Non-Veg Indicator Icon */}
        <div className="absolute bottom-2.5 left-2.5 z-10 bg-white/90 backdrop-blur-sm p-1 rounded border border-bakery-border shadow-sm flex items-center justify-center">
          {product.dietary === 'Non-Vegetarian' ? (
            <div className="w-3 h-3 border border-red-600 flex items-center justify-center p-0.5" title="Non-Vegetarian">
              <div className="w-1.5 h-1.5 rounded-full bg-red-600" />
            </div>
          ) : (
            <div className="w-3 h-3 border border-green-600 flex items-center justify-center p-0.5" title="Vegetarian">
              <div className="w-1.5 h-1.5 rounded-full bg-green-600" />
            </div>
          )}
        </div>

        {/* Action Buttons: Wishlist & Quick View */}
        <div className="absolute top-2.5 right-2.5 flex flex-col gap-1.5 z-10">
          <button
            onClick={() => toggleWishlist(product.id)}
            className={`p-2 rounded-full backdrop-blur-md transition-all shadow-sm ${
              isWishlisted
                ? 'bg-bakery-raspberry text-white'
                : 'bg-white/85 text-bakery-blackberry hover:bg-white hover:text-bakery-raspberry'
            }`}
            aria-label="Wishlist"
            title={isWishlisted ? 'Remove from wishlist' : 'Add to wishlist'}
          >
            <Heart className={`w-4 h-4 ${isWishlisted ? 'fill-current' : ''}`} />
          </button>
          <button
            onClick={() => setQuickViewProduct(product)}
            className="p-2 rounded-full bg-white/85 text-bakery-blackberry hover:bg-white hover:text-bakery-caramel backdrop-blur-md transition-all shadow-sm opacity-90 sm:opacity-0 group-hover:opacity-100"
            aria-label="Quick View"
            title="Quick View"
          >
            <Eye className="w-4 h-4" />
          </button>
        </div>

        {/* Sold Out Overlay */}
        {isOutOfStock && (
          <div className="absolute inset-0 bg-bakery-blackberry/70 backdrop-blur-[2px] flex items-center justify-center z-20">
            <span className="px-3.5 py-1.5 bg-white text-bakery-blackberry font-serif font-bold text-sm rounded-lg shadow-lg">
              Sold Out
            </span>
          </div>
        )}
      </div>

      {/* Content */}
      <div className="p-4 sm:p-5 flex-1 flex flex-col justify-between">
        <div>
          {/* Category & Weight */}
          <div className="flex items-center justify-between text-xs text-bakery-muted mb-1 font-medium">
            <span>{product.category}</span>
            <span>{product.weight}</span>
          </div>

          {/* Product Name */}
          <h3
            onClick={() => setQuickViewProduct(product)}
            className="font-serif text-base sm:text-lg font-bold text-bakery-blackberry group-hover:text-bakery-caramel transition-colors cursor-pointer line-clamp-1"
            title={product.name}
          >
            {product.name}
          </h3>

          {/* Description */}
          <p className="text-xs text-bakery-muted mt-1.5 line-clamp-2 leading-relaxed">
            {product.description}
          </p>

          {/* Rating */}
          <div className="flex items-center gap-1.5 mt-2.5">
            <div className="flex items-center gap-0.5 text-amber-500">
              <Star className="w-3.5 h-3.5 fill-current" />
              <span className="text-xs font-bold text-bakery-blackberry">
                {product.rating}
              </span>
            </div>
            <span className="text-[11px] text-bakery-muted">
              ({product.reviewsCount} reviews)
            </span>
          </div>
        </div>

        {/* Price & Add to Cart */}
        <div className="mt-4 pt-3 border-t border-bakery-border flex items-center justify-between gap-2">
          <div>
            <span className="text-[10px] text-bakery-muted uppercase tracking-wider block font-semibold">
              Price
            </span>
            <span className="text-lg font-bold text-bakery-caramel font-serif">
              ₹{product.price}
            </span>
          </div>

          <button
            onClick={() => addToCart(product, 1)}
            disabled={isOutOfStock}
            className={`px-3.5 py-2 rounded-xl text-xs font-bold flex items-center gap-1.5 transition-all shadow-sm ${
              isOutOfStock
                ? 'bg-gray-200 text-gray-400 cursor-not-allowed'
                : 'bg-bakery-caramel text-white hover:bg-bakery-caramelHover active:scale-95'
            }`}
          >
            <ShoppingBag className="w-3.5 h-3.5" />
            <span>{isOutOfStock ? 'Sold Out' : 'Add to Cart'}</span>
          </button>
        </div>
      </div>
    </div>
  );
};

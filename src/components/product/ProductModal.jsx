import React, { useState } from 'react';
import {
  X,
  Star,
  ShoppingBag,
  Heart,
  Plus,
  Minus,
  AlertCircle,
  Truck,
  ShieldCheck,
  Check
} from 'lucide-react';
import { useStore } from '../../context/StoreContext';
import { FallbackImage } from '../common/FallbackImage';

export const ProductModal = () => {
  const {
    quickViewProduct,
    setQuickViewProduct,
    addToCart,
    wishlist,
    toggleWishlist,
    products
  } = useStore();

  const [quantity, setQuantity] = useState(1);

  if (!quickViewProduct) return null;

  const isWishlisted = wishlist.includes(quickViewProduct.id);
  const isOutOfStock =
    !quickViewProduct.isAvailable || quickViewProduct.stock <= 0;

  const relatedProducts = products
    .filter(
      (p) =>
        p.category === quickViewProduct.category &&
        p.id !== quickViewProduct.id
    )
    .slice(0, 3);

  const handleAddToCart = () => {
    if (addToCart(quickViewProduct, quantity)) {
      setQuickViewProduct(null);
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-bakery-blackberry/70 backdrop-blur-sm transition-opacity"
        onClick={() => setQuickViewProduct(null)}
      />

      <div className="min-h-full flex items-center justify-center p-4 text-center sm:p-6">
        <div className="relative bg-white rounded-3xl max-w-3xl w-full text-left overflow-hidden shadow-2xl border border-bakery-border transform transition-all my-8 animate-fadeIn">
          {/* Close Button */}
          <button
            onClick={() => setQuickViewProduct(null)}
            className="absolute top-4 right-4 z-20 p-2 rounded-full bg-white/90 text-bakery-blackberry hover:bg-bakery-sand transition-colors shadow-md"
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="grid grid-cols-1 md:grid-cols-2">
            {/* Image Section */}
            <div className="relative aspect-[4/3] md:aspect-auto h-full min-h-[300px] bg-bakery-sand/30">
              <FallbackImage
                src={quickViewProduct.image}
                alt={quickViewProduct.name}
                title={quickViewProduct.name}
                category={quickViewProduct.category}
                className="w-full h-full object-cover"
              />
              <div className="absolute top-4 left-4 flex flex-col gap-1.5">
                {quickViewProduct.isBestseller && (
                  <span className="px-2.5 py-1 rounded-full bg-bakery-raspberry text-white text-xs font-bold uppercase shadow-sm">
                    Bestseller
                  </span>
                )}
                {quickViewProduct.isEggless && (
                  <span className="px-2.5 py-1 rounded-full bg-bakery-sage text-white text-xs font-bold uppercase shadow-sm">
                    100% Eggless
                  </span>
                )}
              </div>
            </div>

            {/* Product Details Section */}
            <div className="p-6 sm:p-8 flex flex-col justify-between bg-bakery-vanilla/40">
              <div>
                <div className="flex items-center justify-between text-xs font-semibold text-bakery-muted uppercase tracking-wider">
                  <span>{quickViewProduct.category}</span>
                  <span>{quickViewProduct.weight}</span>
                </div>

                <h2 className="font-serif text-2xl sm:text-3xl font-bold text-bakery-blackberry mt-1">
                  {quickViewProduct.name}
                </h2>

                {/* Rating */}
                <div className="flex items-center gap-2 mt-2">
                  <div className="flex items-center text-amber-500">
                    <Star className="w-4 h-4 fill-current" />
                    <span className="ml-1 text-sm font-bold text-bakery-blackberry">
                      {quickViewProduct.rating}
                    </span>
                  </div>
                  <span className="text-xs text-bakery-muted">
                    ({quickViewProduct.reviewsCount} verified reviews)
                  </span>
                </div>

                {/* Price */}
                <div className="mt-4 flex items-baseline gap-2">
                  <span className="font-serif text-3xl font-extrabold text-bakery-caramel">
                    ₹{quickViewProduct.price}
                  </span>
                  <span className="text-xs text-bakery-muted">
                    (Inclusive of all taxes)
                  </span>
                </div>

                {/* Description */}
                <p className="text-sm text-bakery-blackberry/85 mt-4 leading-relaxed">
                  {quickViewProduct.description}
                </p>

                {/* Provisional Dietary & Allergy Notice */}
                <div className="mt-4 p-3 bg-bakery-sand/60 rounded-xl border border-bakery-border text-xs text-bakery-muted space-y-1">
                  <div className="flex items-center gap-1.5 text-bakery-blackberry font-semibold">
                    <AlertCircle className="w-3.5 h-3.5 text-bakery-caramel" />
                    <span>Dietary &amp; Recipe Disclosure:</span>
                  </div>
                  <p className="text-[11px] leading-tight">
                    Dietary information is provisional for demo purposes. Please contact our bakehouse if you have severe nut, gluten, dairy or egg allergies.
                  </p>
                </div>

                {/* Stock Status Indicator */}
                <div className="mt-4 flex items-center gap-2 text-xs">
                  {isOutOfStock ? (
                    <span className="text-bakery-raspberry font-bold flex items-center gap-1">
                      <X className="w-4 h-4" /> Currently Sold Out
                    </span>
                  ) : (
                    <span className="text-bakery-sage font-bold flex items-center gap-1">
                      <Check className="w-4 h-4" /> In Stock ({quickViewProduct.stock} fresh batches remaining)
                    </span>
                  )}
                </div>
              </div>

              {/* Quantity & CTA */}
              <div className="mt-6 pt-4 border-t border-bakery-border space-y-3">
                <div className="flex items-center gap-4">
                  {/* Quantity selector */}
                  <div className="flex items-center border border-bakery-border rounded-xl bg-white p-1">
                    <button
                      onClick={() => setQuantity(Math.max(1, quantity - 1))}
                      disabled={isOutOfStock}
                      className="p-1.5 hover:bg-bakery-sand rounded-lg text-bakery-blackberry disabled:opacity-40"
                    >
                      <Minus className="w-4 h-4" />
                    </button>
                    <span className="px-4 text-sm font-bold text-bakery-blackberry">
                      {quantity}
                    </span>
                    <button
                      onClick={() =>
                        setQuantity(Math.min(quickViewProduct.stock, quantity + 1))
                      }
                      disabled={isOutOfStock || quantity >= quickViewProduct.stock}
                      className="p-1.5 hover:bg-bakery-sand rounded-lg text-bakery-blackberry disabled:opacity-40"
                    >
                      <Plus className="w-4 h-4" />
                    </button>
                  </div>

                  {/* Add to Cart Button */}
                  <button
                    onClick={handleAddToCart}
                    disabled={isOutOfStock}
                    className="flex-1 py-3 px-6 bg-bakery-caramel hover:bg-bakery-caramelHover text-white text-sm font-bold rounded-xl shadow-md flex items-center justify-center gap-2 transition-transform active:scale-95 disabled:bg-gray-300 disabled:cursor-not-allowed"
                  >
                    <ShoppingBag className="w-4 h-4" />
                    <span>{isOutOfStock ? 'Sold Out' : `Add ${quantity} to Cart (₹${quickViewProduct.price * quantity})`}</span>
                  </button>

                  {/* Wishlist toggle */}
                  <button
                    onClick={() => toggleWishlist(quickViewProduct.id)}
                    className={`p-3 rounded-xl border transition-colors ${
                      isWishlisted
                        ? 'bg-bakery-raspberry text-white border-bakery-raspberry'
                        : 'border-bakery-border text-bakery-blackberry hover:bg-bakery-sand'
                    }`}
                    title={isWishlisted ? 'In Wishlist' : 'Add to Wishlist'}
                  >
                    <Heart className={`w-5 h-5 ${isWishlisted ? 'fill-current' : ''}`} />
                  </button>
                </div>

                <div className="flex items-center justify-between text-[11px] text-bakery-muted pt-1">
                  <span className="flex items-center gap-1">
                    <Truck className="w-3.5 h-3.5 text-bakery-sage" /> Fresh same-day bake
                  </span>
                  <span className="flex items-center gap-1">
                    <ShieldCheck className="w-3.5 h-3.5 text-bakery-caramel" /> Quality guaranteed
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Related Products Bar */}
          {relatedProducts.length > 0 && (
            <div className="p-4 sm:p-6 bg-white border-t border-bakery-border">
              <h4 className="font-serif text-sm font-bold text-bakery-blackberry mb-3">
                Customers Also Indulged In
              </h4>
              <div className="grid grid-cols-3 gap-3">
                {relatedProducts.map((rel) => (
                  <div
                    key={rel.id}
                    onClick={() => {
                      setQuickViewProduct(rel);
                      setQuantity(1);
                    }}
                    className="flex items-center gap-2 p-2 rounded-xl border border-bakery-border hover:bg-bakery-sand/40 cursor-pointer transition-colors"
                  >
                    <FallbackImage
                      src={rel.image}
                      alt={rel.name}
                      title={rel.name}
                      className="w-10 h-10 rounded-lg object-cover"
                    />
                    <div className="overflow-hidden">
                      <p className="text-xs font-semibold text-bakery-blackberry truncate">
                        {rel.name}
                      </p>
                      <p className="text-[11px] font-bold text-bakery-caramel">
                        ₹{rel.price}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

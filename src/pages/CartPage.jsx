import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  ShoppingBag,
  Trash2,
  Plus,
  Minus,
  ArrowRight,
  Tag,
  AlertCircle,
  Truck,
  Sparkles
} from 'lucide-react';
import { useStore } from '../context/StoreContext';
import { FallbackImage } from '../components/common/FallbackImage';

export const CartPage = () => {
  const {
    cart,
    updateCartQuantity,
    removeFromCart,
    clearCart,
    subtotal,
    discount,
    deliveryFee,
    gst,
    grandTotal,
    appliedCoupon,
    applyCoupon,
    removeCoupon,
    storeSettings,
    deliveryType,
    setDeliveryType
  } = useStore();

  const [couponInput, setCouponInput] = useState('');
  const [couponError, setCouponError] = useState('');
  const navigate = useNavigate();

  const freeDeliveryThreshold = storeSettings.freeDeliveryThreshold || 599;
  const remainingForFree = Math.max(0, freeDeliveryThreshold - subtotal);
  const progressPercent = Math.min(100, (subtotal / freeDeliveryThreshold) * 100);

  const handleApplyCoupon = (e) => {
    e.preventDefault();
    setCouponError('');
    if (!couponInput.trim()) return;
    const res = applyCoupon(couponInput);
    if (res.success) {
      setCouponInput('');
    } else {
      setCouponError(res.message);
    }
  };

  if (cart.length === 0) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 text-center space-y-6">
        <div className="w-20 h-20 rounded-full bg-bakery-sand flex items-center justify-center text-4xl mx-auto">
          🥐
        </div>
        <h1 className="font-serif text-3xl font-bold text-bakery-blackberry">
          Your Bakery Basket is Empty
        </h1>
        <p className="text-sm text-bakery-muted max-w-md mx-auto leading-relaxed">
          Looks like you haven't selected any treats yet! Discover our oven-fresh sourdoughs, golden croissants, and celebration cakes.
        </p>
        <Link
          to="/shop"
          className="inline-flex items-center gap-2 px-8 py-3.5 bg-bakery-caramel hover:bg-bakery-caramelHover text-white font-bold rounded-xl shadow-md transition-transform active:scale-95"
        >
          <span>Explore Boutique Menu</span>
          <ArrowRight className="w-4 h-4" />
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 space-y-8">
      {/* Header */}
      <div className="border-b border-bakery-border pb-6 flex items-center justify-between">
        <div>
          <span className="text-xs font-bold text-bakery-caramel uppercase tracking-wider block">
            Checkout Process (Step 1 of 2)
          </span>
          <h1 className="font-serif text-3xl sm:text-4xl font-bold text-bakery-blackberry mt-1">
            Review Your Basket
          </h1>
        </div>
        <button
          onClick={clearCart}
          className="text-xs text-bakery-raspberry font-semibold hover:underline"
        >
          Clear Basket
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Cart Items List */}
        <div className="lg:col-span-8 space-y-4">
          {/* Free delivery bar */}
          <div className="p-4 rounded-2xl bg-white border border-bakery-border shadow-soft">
            <div className="flex items-center justify-between text-xs font-semibold text-bakery-blackberry mb-2">
              <span>
                {remainingForFree > 0 ? (
                  <>
                    Add <strong className="text-bakery-caramel">₹{remainingForFree}</strong> more to unlock{' '}
                    <strong className="text-bakery-sage">FREE Express Delivery</strong>
                  </>
                ) : (
                  <span className="text-bakery-sage flex items-center gap-1.5 font-bold">
                    <Sparkles className="w-4 h-4" /> You've earned FREE Express Delivery!
                  </span>
                )}
              </span>
              <span className="text-bakery-muted">{Math.round(progressPercent)}%</span>
            </div>
            <div className="w-full bg-bakery-sand rounded-full h-2 overflow-hidden">
              <div
                className="bg-bakery-caramel h-2 rounded-full transition-all duration-500"
                style={{ width: `${progressPercent}%` }}
              />
            </div>
          </div>

          {/* Table / List */}
          <div className="bg-white rounded-3xl border border-bakery-border shadow-soft divide-y divide-bakery-border/60 overflow-hidden">
            {cart.map((item) => (
              <div
                key={item.cartItemId}
                className="p-4 sm:p-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4"
              >
                <div className="flex items-center gap-4">
                  <FallbackImage
                    src={item.image}
                    alt={item.name}
                    title={item.name}
                    category={item.category}
                    className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl object-cover shrink-0"
                  />
                  <div>
                    <h3 className="font-serif text-base sm:text-lg font-bold text-bakery-blackberry leading-snug">
                      {item.name}
                    </h3>
                    {item.weight && !item.customDetails && (
                      <span className="text-xs text-bakery-muted block mt-0.5">
                        {item.weight}
                      </span>
                    )}

                    {item.customDetails && (
                      <div className="mt-1 text-xs bg-bakery-sand/40 p-2 rounded-xl text-bakery-blackberry space-y-0.5">
                        {item.customDetails.size && (
                          <p>
                            <strong>Specs:</strong> {item.customDetails.size} • {item.customDetails.flavour}
                          </p>
                        )}
                        {item.customDetails.message && (
                          <p className="italic text-bakery-caramel">
                            "{item.customDetails.message}"
                          </p>
                        )}
                        {item.customDetails.boxItems && (
                          <p className="truncate max-w-sm">
                            <strong>Includes:</strong>{' '}
                            {item.customDetails.boxItems.map((i) => i.name).join(', ')}
                          </p>
                        )}
                      </div>
                    )}
                  </div>
                </div>

                <div className="flex items-center justify-between w-full sm:w-auto gap-6 sm:self-center">
                  {/* Quantity */}
                  <div className="flex items-center border border-bakery-border rounded-xl bg-bakery-vanilla/60 p-1">
                    <button
                      onClick={() =>
                        updateCartQuantity(item.cartItemId, item.quantity - 1)
                      }
                      className="p-1 hover:bg-bakery-sand rounded-lg text-bakery-blackberry"
                    >
                      <Minus className="w-3.5 h-3.5" />
                    </button>
                    <span className="px-3 text-xs font-bold text-bakery-blackberry min-w-[24px] text-center">
                      {item.quantity}
                    </span>
                    <button
                      onClick={() =>
                        updateCartQuantity(item.cartItemId, item.quantity + 1)
                      }
                      className="p-1 hover:bg-bakery-sand rounded-lg text-bakery-blackberry"
                    >
                      <Plus className="w-3.5 h-3.5" />
                    </button>
                  </div>

                  {/* Price */}
                  <div className="text-right min-w-[70px]">
                    <span className="font-serif font-bold text-base text-bakery-blackberry">
                      ₹{item.price * item.quantity}
                    </span>
                    <span className="text-[10px] text-bakery-muted block">
                      ₹{item.price} each
                    </span>
                  </div>

                  {/* Remove */}
                  <button
                    onClick={() => removeFromCart(item.cartItemId)}
                    className="p-2 text-bakery-muted hover:text-bakery-raspberry hover:bg-bakery-sand rounded-full transition-colors"
                    title="Remove item"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>

          <div className="flex items-center justify-between text-xs text-bakery-muted pt-2 px-2">
            <Link to="/shop" className="hover:text-bakery-caramel font-semibold">
              ← Add more delicious bakes
            </Link>
          </div>
        </div>

        {/* Order Summary & Coupon Column */}
        <div className="lg:col-span-4 space-y-6 sticky top-28">
          <div className="bg-white rounded-3xl p-6 border border-bakery-border shadow-soft space-y-6">
            <h3 className="font-serif text-xl font-bold text-bakery-blackberry border-b border-bakery-border pb-3">
              Order Breakdown
            </h3>

            {/* Delivery type picker */}
            <div className="grid grid-cols-2 gap-2 bg-bakery-vanilla p-1.5 rounded-2xl border border-bakery-border">
              <button
                type="button"
                onClick={() => setDeliveryType('delivery')}
                className={`py-2 text-xs font-bold rounded-xl transition-all ${
                  deliveryType === 'delivery'
                    ? 'bg-bakery-caramel text-white shadow-sm'
                    : 'text-bakery-blackberry hover:bg-white'
                }`}
              >
                Home Delivery
              </button>
              <button
                type="button"
                onClick={() => setDeliveryType('pickup')}
                className={`py-2 text-xs font-bold rounded-xl transition-all ${
                  deliveryType === 'pickup'
                    ? 'bg-bakery-caramel text-white shadow-sm'
                    : 'text-bakery-blackberry hover:bg-white'
                }`}
              >
                Store Pickup
              </button>
            </div>

            {/* Coupon Code input */}
            <div>
              {appliedCoupon ? (
                <div className="flex items-center justify-between p-3 bg-bakery-sage/15 border border-bakery-sage/40 rounded-2xl text-xs">
                  <div className="flex items-center gap-2">
                    <Tag className="w-4 h-4 text-bakery-sage" />
                    <div>
                      <strong className="text-bakery-sage">{appliedCoupon.code}</strong> applied!
                      <p className="text-[11px] text-bakery-muted">{appliedCoupon.description}</p>
                    </div>
                  </div>
                  <button
                    onClick={removeCoupon}
                    className="text-bakery-raspberry font-bold hover:underline"
                  >
                    Remove
                  </button>
                </div>
              ) : (
                <form onSubmit={handleApplyCoupon} className="space-y-1.5">
                  <div className="flex gap-2">
                    <input
                      type="text"
                      placeholder="Coupon Code"
                      value={couponInput}
                      onChange={(e) => setCouponInput(e.target.value.toUpperCase())}
                      className="flex-1 px-3 py-2 bg-bakery-vanilla/60 border border-bakery-border rounded-xl text-xs uppercase font-bold focus:outline-none focus:border-bakery-caramel"
                    />
                    <button
                      type="submit"
                      className="px-4 py-2 bg-bakery-blackberry text-white text-xs font-bold rounded-xl hover:bg-black transition-colors"
                    >
                      Apply
                    </button>
                  </div>
                  {couponError && (
                    <p className="text-[11px] text-bakery-raspberry flex items-center gap-1">
                      <AlertCircle className="w-3 h-3" /> {couponError}
                    </p>
                  )}
                  <div className="flex gap-2 pt-1 text-[11px] text-bakery-muted">
                    <button
                      type="button"
                      onClick={() => applyCoupon('WELCOME15')}
                      className="hover:text-bakery-caramel underline"
                    >
                      Use WELCOME15 (15% off)
                    </button>
                    <span>•</span>
                    <button
                      type="button"
                      onClick={() => applyCoupon('SWEET100')}
                      className="hover:text-bakery-caramel underline"
                    >
                      Use SWEET100 (₹100 off)
                    </button>
                  </div>
                </form>
              )}
            </div>

            {/* Price list */}
            <div className="space-y-2 text-xs text-bakery-blackberry/85 border-t border-bakery-border pt-4">
              <div className="flex justify-between">
                <span>Subtotal</span>
                <span className="font-semibold text-bakery-blackberry">₹{subtotal}</span>
              </div>
              {discount > 0 && (
                <div className="flex justify-between text-bakery-sage font-medium">
                  <span>Coupon Discount ({appliedCoupon?.code})</span>
                  <span>-₹{discount}</span>
                </div>
              )}
              <div className="flex justify-between">
                <span>Delivery Fee</span>
                <span className="font-semibold text-bakery-blackberry">
                  {deliveryFee === 0 ? (
                    <span className="text-bakery-sage font-bold">FREE</span>
                  ) : (
                    `₹${deliveryFee}`
                  )}
                </span>
              </div>
              <div className="flex justify-between">
                <span>GST ({storeSettings.gstPercent}%)</span>
                <span className="font-semibold text-bakery-blackberry">₹{gst}</span>
              </div>
              <div className="flex justify-between items-baseline pt-3 border-t border-bakery-border text-base font-bold text-bakery-blackberry">
                <span>Grand Total</span>
                <span className="font-serif text-2xl text-bakery-caramel font-extrabold">
                  ₹{grandTotal}
                </span>
              </div>
            </div>

            <button
              onClick={() => navigate('/checkout')}
              className="w-full py-4 bg-bakery-caramel hover:bg-bakery-caramelHover text-white font-bold rounded-2xl shadow-hover transition-transform active:scale-95 flex items-center justify-center gap-2"
            >
              <span>Proceed to Checkout</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

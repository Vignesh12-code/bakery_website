import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  X,
  Trash2,
  Plus,
  Minus,
  ShoppingBag,
  ArrowRight,
  Sparkles,
  Tag,
  Check,
  AlertCircle
} from 'lucide-react';
import { useStore } from '../../context/StoreContext';
import { FallbackImage } from '../common/FallbackImage';

export const CartDrawer = () => {
  const {
    cart,
    isCartDrawerOpen,
    setIsCartDrawerOpen,
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
    deliveryType
  } = useStore();

  const [couponInput, setCouponInput] = useState('');
  const [couponError, setCouponError] = useState('');
  const navigate = useNavigate();

  if (!isCartDrawerOpen) return null;

  const freeDeliveryThreshold = storeSettings.freeDeliveryThreshold || 599;
  const progressPercent = Math.min(100, (subtotal / freeDeliveryThreshold) * 100);
  const remainingForFree = Math.max(0, freeDeliveryThreshold - subtotal);

  const handleApplyCoupon = (e) => {
    e.preventDefault();
    setCouponError('');
    if (!couponInput.trim()) return;
    const result = applyCoupon(couponInput);
    if (result.success) {
      setCouponInput('');
    } else {
      setCouponError(result.message);
    }
  };

  const handleProceedToCheckout = () => {
    setIsCartDrawerOpen(false);
    navigate('/checkout');
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-bakery-blackberry/60 backdrop-blur-sm transition-opacity"
        onClick={() => setIsCartDrawerOpen(false)}
      />

      <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-white shadow-2xl flex flex-col">
          {/* Header */}
          <div className="p-4 sm:p-6 border-b border-bakery-border flex items-center justify-between bg-bakery-vanilla">
            <div className="flex items-center gap-2">
              <ShoppingBag className="w-5 h-5 text-bakery-caramel" />
              <h2 className="font-serif text-lg sm:text-xl font-bold text-bakery-blackberry">
                Your Bakery Basket ({cart.reduce((s, i) => s + i.quantity, 0)})
              </h2>
            </div>
            <button
              onClick={() => setIsCartDrawerOpen(false)}
              className="p-2 text-bakery-muted hover:text-bakery-blackberry hover:bg-bakery-sand rounded-full transition-colors"
              aria-label="Close cart"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Free Delivery Bar */}
          <div className="bg-[#FFF4EE] px-4 py-2.5 border-b border-bakery-border/60">
            <div className="flex items-center justify-between text-xs mb-1.5 font-medium text-bakery-blackberry">
              <span>
                {remainingForFree > 0 ? (
                  <>
                    Add <strong className="text-bakery-caramel">₹{remainingForFree}</strong> more for{' '}
                    <strong>FREE Delivery</strong>
                  </>
                ) : (
                  <span className="text-bakery-sage font-bold flex items-center gap-1">
                    <Sparkles className="w-3.5 h-3.5" /> Congratulations! You got FREE Delivery
                  </span>
                )}
              </span>
              <span className="text-[11px] text-bakery-muted font-bold">
                {Math.round(progressPercent)}%
              </span>
            </div>
            <div className="w-full bg-bakery-border rounded-full h-1.5 overflow-hidden">
              <div
                className="bg-bakery-caramel h-1.5 rounded-full transition-all duration-500"
                style={{ width: `${progressPercent}%` }}
              />
            </div>
          </div>

          {/* Cart Item List */}
          <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-4">
            {cart.length === 0 ? (
              <div className="h-full flex flex-col items-center justify-center text-center p-6 space-y-4">
                <div className="w-16 h-16 rounded-full bg-bakery-sand flex items-center justify-center text-3xl">
                  🥐
                </div>
                <div>
                  <h3 className="font-serif text-lg font-bold text-bakery-blackberry">
                    Your basket is empty
                  </h3>
                  <p className="text-xs text-bakery-muted mt-1 max-w-xs">
                    Explore our oven-fresh sourdoughs, golden croissants, and handcrafted desserts!
                  </p>
                </div>
                <button
                  onClick={() => {
                    setIsCartDrawerOpen(false);
                    navigate('/shop');
                  }}
                  className="px-6 py-2.5 bg-bakery-caramel hover:bg-bakery-caramelHover text-white text-xs font-semibold rounded-xl shadow-md transition-colors"
                >
                  Explore Bakery Menu
                </button>
              </div>
            ) : (
              cart.map((item) => (
                <div
                  key={item.cartItemId}
                  className="flex gap-3 p-3 rounded-xl border border-bakery-border bg-bakery-card hover:border-bakery-sand transition-all relative group"
                >
                  <FallbackImage
                    src={item.image}
                    alt={item.name}
                    title={item.name}
                    category={item.category}
                    className="w-16 h-16 sm:w-20 sm:h-20 rounded-lg object-cover shrink-0"
                  />

                  <div className="flex-1 flex flex-col justify-between">
                    <div>
                      <div className="flex items-start justify-between gap-1">
                        <h4 className="text-sm font-semibold text-bakery-blackberry leading-tight">
                          {item.name}
                        </h4>
                        <button
                          onClick={() => removeFromCart(item.cartItemId)}
                          className="text-bakery-muted hover:text-bakery-raspberry p-1 transition-colors"
                          title="Remove item"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>

                      {/* Weight or Custom Specs */}
                      {item.weight && !item.customDetails && (
                        <span className="text-[11px] text-bakery-muted">{item.weight}</span>
                      )}

                      {/* Custom Cake or Box Details */}
                      {item.customDetails && (
                        <div className="mt-1 text-[11px] bg-bakery-sand/50 p-1.5 rounded-lg text-bakery-blackberry space-y-0.5">
                          {item.customDetails.size && (
                            <p>
                              <strong>Size:</strong> {item.customDetails.size} •{' '}
                              <strong>Flavour:</strong> {item.customDetails.flavour}
                            </p>
                          )}
                          {item.customDetails.shape && (
                            <p>
                              <strong>Shape:</strong> {item.customDetails.shape} •{' '}
                              <strong>Frosting:</strong> {item.customDetails.frosting}
                            </p>
                          )}
                          {item.customDetails.message && (
                            <p className="italic text-bakery-caramel">
                              "{item.customDetails.message}"
                            </p>
                          )}
                          {item.customDetails.boxItems && (
                            <p className="truncate">
                              <strong>Items:</strong>{' '}
                              {item.customDetails.boxItems.map((i) => i.name).join(', ')}
                            </p>
                          )}
                        </div>
                      )}
                    </div>

                    <div className="flex items-center justify-between mt-2 pt-1 border-t border-bakery-border/50">
                      <div className="flex items-center border border-bakery-border rounded-lg bg-white overflow-hidden">
                        <button
                          onClick={() =>
                            updateCartQuantity(item.cartItemId, item.quantity - 1)
                          }
                          className="p-1 hover:bg-bakery-sand text-bakery-blackberry transition-colors"
                          aria-label="Decrease quantity"
                        >
                          <Minus className="w-3.5 h-3.5" />
                        </button>
                        <span className="px-2.5 py-0.5 text-xs font-bold text-bakery-blackberry min-w-[24px] text-center">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() =>
                            updateCartQuantity(item.cartItemId, item.quantity + 1)
                          }
                          className="p-1 hover:bg-bakery-sand text-bakery-blackberry transition-colors"
                          aria-label="Increase quantity"
                        >
                          <Plus className="w-3.5 h-3.5" />
                        </button>
                      </div>

                      <div className="text-right">
                        <span className="text-xs text-bakery-muted block">
                          ₹{item.price} each
                        </span>
                        <span className="text-sm font-bold text-bakery-blackberry">
                          ₹{item.price * item.quantity}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Footer & Checkout Summary */}
          {cart.length > 0 && (
            <div className="p-4 sm:p-6 border-t border-bakery-border bg-bakery-vanilla/90 space-y-4">
              {/* Coupon Form */}
              <div>
                {appliedCoupon ? (
                  <div className="flex items-center justify-between p-2.5 bg-bakery-sage/15 border border-bakery-sage/40 rounded-xl text-xs text-bakery-blackberry">
                    <div className="flex items-center gap-2">
                      <Tag className="w-4 h-4 text-bakery-sage" />
                      <div>
                        <strong className="text-bakery-sage font-bold">
                          {appliedCoupon.code}
                        </strong>{' '}
                        applied! ({appliedCoupon.description})
                      </div>
                    </div>
                    <button
                      onClick={removeCoupon}
                      className="text-bakery-raspberry font-bold hover:underline text-[11px]"
                    >
                      Remove
                    </button>
                  </div>
                ) : (
                  <form onSubmit={handleApplyCoupon} className="space-y-1">
                    <div className="flex gap-2">
                      <div className="relative flex-1">
                        <Tag className="w-3.5 h-3.5 absolute left-3 top-2.5 text-bakery-muted" />
                        <input
                          type="text"
                          placeholder="Coupon (e.g. WELCOME15)"
                          value={couponInput}
                          onChange={(e) => setCouponInput(e.target.value.toUpperCase())}
                          className="w-full pl-8 pr-3 py-1.5 text-xs rounded-xl border border-bakery-border uppercase font-semibold focus:outline-none focus:border-bakery-caramel"
                        />
                      </div>
                      <button
                        type="submit"
                        className="px-3.5 py-1.5 bg-bakery-blackberry text-white text-xs font-semibold rounded-xl hover:bg-black transition-colors"
                      >
                        Apply
                      </button>
                    </div>
                    {couponError && (
                      <p className="text-[11px] text-bakery-raspberry flex items-center gap-1">
                        <AlertCircle className="w-3 h-3" /> {couponError}
                      </p>
                    )}
                    <div className="flex gap-2 pt-0.5">
                      <button
                        type="button"
                        onClick={() => {
                          setCouponInput('WELCOME15');
                          applyCoupon('WELCOME15');
                        }}
                        className="text-[10px] text-bakery-muted hover:text-bakery-caramel underline"
                      >
                        Try WELCOME15 (15% off)
                      </button>
                      <button
                        type="button"
                        onClick={() => {
                          setCouponInput('SWEET100');
                          applyCoupon('SWEET100');
                        }}
                        className="text-[10px] text-bakery-muted hover:text-bakery-caramel underline"
                      >
                        Try SWEET100 (₹100 off)
                      </button>
                    </div>
                  </form>
                )}
              </div>

              {/* Breakdown */}
              <div className="space-y-1.5 text-xs text-bakery-blackberry/80 pt-2 border-t border-bakery-border/80">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span className="font-semibold text-bakery-blackberry">₹{subtotal}</span>
                </div>
                {discount > 0 && (
                  <div className="flex justify-between text-bakery-sage font-medium">
                    <span>Discount ({appliedCoupon?.code})</span>
                    <span>-₹{discount}</span>
                  </div>
                )}
                <div className="flex justify-between">
                  <span>Estimated Delivery</span>
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
                <div className="flex justify-between text-sm sm:text-base font-bold text-bakery-blackberry pt-2 border-t border-bakery-border">
                  <span>Grand Total</span>
                  <span className="text-bakery-caramel font-serif text-lg">
                    ₹{grandTotal}
                  </span>
                </div>
              </div>

              {/* Actions */}
              <div className="flex flex-col gap-2 pt-1">
                <button
                  onClick={handleProceedToCheckout}
                  className="w-full py-3 bg-bakery-caramel hover:bg-bakery-caramelHover text-white font-bold rounded-xl shadow-md flex items-center justify-center gap-2 transition-transform active:scale-[0.99]"
                >
                  <span>Proceed to Checkout</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
                <div className="flex items-center justify-between text-xs text-bakery-muted px-1">
                  <button
                    onClick={clearCart}
                    className="hover:text-bakery-raspberry transition-colors underline"
                  >
                    Clear Basket
                  </button>
                  <button
                    onClick={() => {
                      setIsCartDrawerOpen(false);
                      navigate('/shop');
                    }}
                    className="hover:text-bakery-blackberry transition-colors"
                  >
                    Continue Shopping
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

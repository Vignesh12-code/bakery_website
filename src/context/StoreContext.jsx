import React, { createContext, useContext, useState, useEffect } from 'react';
import { INITIAL_PRODUCTS } from '../data/products';
import {
  INITIAL_STORE_SETTINGS,
  INITIAL_COUPONS,
  DEMO_REVIEWS,
  INITIAL_CUSTOMER_PROFILE,
  INITIAL_SAMPLE_ORDERS
} from '../data/initialData';
import { storage } from '../utils/localStorage';

const StoreContext = createContext();

export const useStore = () => {
  const context = useContext(StoreContext);
  if (!context) {
    throw new Error('useStore must be used within a StoreProvider');
  }
  return context;
};

export const StoreProvider = ({ children }) => {
  // Store Settings
  const [storeSettings, setStoreSettings] = useState(() =>
    storage.get('crumbco_settings', INITIAL_STORE_SETTINGS)
  );

  // Products
  const [products, setProducts] = useState(() =>
    storage.get('crumbco_products', INITIAL_PRODUCTS)
  );

  // Cart
  const [cart, setCart] = useState(() =>
    storage.get('crumbco_cart', [])
  );

  // Wishlist (Array of product IDs)
  const [wishlist, setWishlist] = useState(() =>
    storage.get('crumbco_wishlist', ['prod-1', 'prod-9', 'prod-21'])
  );

  // Orders
  const [orders, setOrders] = useState(() =>
    storage.get('crumbco_orders', INITIAL_SAMPLE_ORDERS)
  );

  // Customer Profile
  const [customer, setCustomer] = useState(() =>
    storage.get('crumbco_profile', INITIAL_CUSTOMER_PROFILE)
  );

  // Applied Coupon
  const [appliedCoupon, setAppliedCoupon] = useState(() =>
    storage.get('crumbco_coupon', null)
  );

  // Admin Auth Status
  const [isAdminAuthenticated, setIsAdminAuthenticated] = useState(() =>
    storage.get('crumbco_admin_auth', false)
  );

  // UI States
  const [isCartDrawerOpen, setIsCartDrawerOpen] = useState(false);
  const [quickViewProduct, setQuickViewProduct] = useState(null);
  const [toasts, setToasts] = useState([]);
  const [deliveryType, setDeliveryType] = useState('delivery'); // 'delivery' or 'pickup'

  // Persist State Updates to LocalStorage
  useEffect(() => {
    storage.set('crumbco_settings', storeSettings);
  }, [storeSettings]);

  useEffect(() => {
    storage.set('crumbco_products', products);
  }, [products]);

  useEffect(() => {
    storage.set('crumbco_cart', cart);
  }, [cart]);

  useEffect(() => {
    storage.set('crumbco_wishlist', wishlist);
  }, [wishlist]);

  useEffect(() => {
    storage.set('crumbco_orders', orders);
  }, [orders]);

  useEffect(() => {
    storage.set('crumbco_profile', customer);
  }, [customer]);

  useEffect(() => {
    storage.set('crumbco_coupon', appliedCoupon);
  }, [appliedCoupon]);

  useEffect(() => {
    storage.set('crumbco_admin_auth', isAdminAuthenticated);
  }, [isAdminAuthenticated]);

  // Toast Notification System
  const showToast = (message, type = 'success') => {
    const id = Date.now() + Math.random().toString(36).substring(2, 6);
    setToasts((prev) => [...prev, { id, message, type }]);
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 3800);
  };

  const removeToast = (id) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  };

  // Cart Management
  const addToCart = (product, quantity = 1, customDetails = null) => {
    // Check available stock if standard product
    if (!customDetails && product) {
      const currentInCart = cart
        .filter((item) => item.productId === product.id)
        .reduce((sum, item) => sum + item.quantity, 0);

      if (currentInCart + quantity > product.stock) {
        showToast(`Sorry, only ${product.stock} units available in stock.`, 'error');
        return false;
      }
    }

    const cartItemId = customDetails
      ? `custom-${Date.now()}`
      : `item-${product.id}`;

    setCart((prevCart) => {
      // If it's a standard product already in cart, increment quantity
      if (!customDetails) {
        const existingIndex = prevCart.findIndex(
          (item) => item.productId === product.id && !item.customDetails
        );
        if (existingIndex > -1) {
          const updated = [...prevCart];
          const newQty = updated[existingIndex].quantity + quantity;
          updated[existingIndex] = {
            ...updated[existingIndex],
            quantity: newQty
          };
          return updated;
        }
      }

      // Otherwise append new cart item
      const newItem = {
        cartItemId,
        productId: product?.id || null,
        name: customDetails?.title || product.name,
        price: customDetails?.price !== undefined ? customDetails.price : product.price,
        weight: customDetails?.weight || product.weight,
        image: customDetails?.image || product.image,
        category: product?.category || customDetails?.category || 'Boutique Special',
        quantity,
        customDetails: customDetails || null,
        dietary: product?.dietary || 'Vegetarian'
      };

      return [...prevCart, newItem];
    });

    showToast(`Added "${customDetails?.title || product.name}" to your basket!`, 'success');
    return true;
  };

  const updateCartQuantity = (cartItemId, newQty) => {
    if (newQty <= 0) {
      removeFromCart(cartItemId);
      return;
    }

    const itemToUpdate = cart.find((item) => item.cartItemId === cartItemId);
    if (!itemToUpdate) return;

    if (itemToUpdate.productId) {
      const originalProduct = products.find((p) => p.id === itemToUpdate.productId);
      if (originalProduct && newQty > originalProduct.stock) {
        showToast(`Cannot add more than ${originalProduct.stock} units in stock.`, 'error');
        return;
      }
    }

    setCart((prevCart) =>
      prevCart.map((item) =>
        item.cartItemId === cartItemId ? { ...item, quantity: newQty } : item
      )
    );
  };

  const removeFromCart = (cartItemId) => {
    const item = cart.find((i) => i.cartItemId === cartItemId);
    setCart((prevCart) => prevCart.filter((item) => item.cartItemId !== cartItemId));
    if (item) {
      showToast(`Removed "${item.name}" from your basket.`, 'info');
    }
  };

  const clearCart = () => {
    setCart([]);
    setAppliedCoupon(null);
    showToast('Your basket has been cleared.', 'info');
  };

  // Coupons
  const applyCoupon = (code) => {
    const cleanCode = code.trim().toUpperCase();
    const found = INITIAL_COUPONS.find((c) => c.code === cleanCode);

    if (!found) {
      showToast('Invalid coupon code. Try WELCOME15 or SWEET100.', 'error');
      return { success: false, message: 'Invalid coupon code' };
    }

    const currentSubtotal = cart.reduce(
      (sum, item) => sum + item.price * item.quantity,
      0
    );

    if (found.minOrder && currentSubtotal < found.minOrder) {
      const msg = `Coupon ${found.code} is valid only on orders above ₹${found.minOrder}.`;
      showToast(msg, 'error');
      return { success: false, message: msg };
    }

    setAppliedCoupon(found);
    showToast(`Coupon "${found.code}" applied successfully!`, 'success');
    return { success: true };
  };

  const removeCoupon = () => {
    setAppliedCoupon(null);
    showToast('Coupon removed.', 'info');
  };

  // Wishlist
  const toggleWishlist = (productId) => {
    const isWishlisted = wishlist.includes(productId);
    const prod = products.find((p) => p.id === productId);
    const name = prod ? prod.name : 'Product';

    if (isWishlisted) {
      setWishlist((prev) => prev.filter((id) => id !== productId));
      showToast(`Removed "${name}" from your wishlist.`, 'info');
    } else {
      setWishlist((prev) => [...prev, productId]);
      showToast(`Added "${name}" to your wishlist!`, 'success');
    }
  };

  // Financial Totals Calculation
  const subtotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  let discount = 0;
  if (appliedCoupon) {
    if (appliedCoupon.discountPercent) {
      discount = Math.round((subtotal * appliedCoupon.discountPercent) / 100);
    } else if (appliedCoupon.discountFlat) {
      discount = Math.min(appliedCoupon.discountFlat, subtotal);
    }
  }

  const deliveryFee =
    deliveryType === 'pickup'
      ? 0
      : subtotal >= storeSettings.freeDeliveryThreshold || subtotal === 0
      ? 0
      : storeSettings.deliveryCharge;

  const taxableAmount = Math.max(0, subtotal - discount);
  const gst = Math.round((taxableAmount * storeSettings.gstPercent) / 100);
  const grandTotal = Math.max(0, taxableAmount + deliveryFee + gst);

  // Order Placement
  const createOrder = (orderData) => {
    const nextOrderNum = (orders.length + 1).toString().padStart(4, '0');
    const orderId = `BKR-2026-${nextOrderNum}`;

    const newOrder = {
      orderId,
      date: new Date().toISOString(),
      customer: orderData.customer,
      items: [...cart],
      subtotal,
      discount,
      deliveryFee,
      gst,
      grandTotal,
      paymentMethod: orderData.paymentMethod,
      paymentStatus: 'Paid (Simulated Demo)',
      orderStatus: 'Order Confirmed',
      timeline: [
        {
          status: 'Order Confirmed',
          time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
          done: true
        },
        { status: 'Baking & Preparation', time: 'Estimated ~1 hour', done: false },
        { status: 'Packed', time: 'Pending', done: false },
        {
          status: orderData.customer.type === 'pickup' ? 'Ready for Pickup' : 'Out for Delivery',
          time: 'Pending',
          done: false
        },
        { status: 'Delivered', time: 'Pending', done: false }
      ]
    };

    // Deduct stock for ordered items
    setProducts((prevProducts) =>
      prevProducts.map((p) => {
        const cartMatch = cart.find((c) => c.productId === p.id);
        if (cartMatch) {
          const updatedStock = Math.max(0, p.stock - cartMatch.quantity);
          return {
            ...p,
            stock: updatedStock,
            isAvailable: updatedStock > 0
          };
        }
        return p;
      })
    );

    // Save order
    setOrders((prev) => [newOrder, ...prev]);

    // Clear cart
    setCart([]);
    setAppliedCoupon(null);
    showToast(`Order ${orderId} created successfully!`, 'success');

    return newOrder;
  };

  // Admin Actions
  const addProduct = (newProd) => {
    const id = `prod-${Date.now()}`;
    const productWithId = {
      ...newProd,
      id,
      rating: 5.0,
      reviewsCount: 1,
      stock: Number(newProd.stock) || 10,
      price: Number(newProd.price) || 100,
      isAvailable: (Number(newProd.stock) || 10) > 0
    };
    setProducts((prev) => [productWithId, ...prev]);
    showToast(`Added "${productWithId.name}" to catalogue.`, 'success');
  };

  const updateProduct = (id, updatedFields) => {
    setProducts((prev) =>
      prev.map((p) => {
        if (p.id === id) {
          const updated = { ...p, ...updatedFields };
          if (updatedFields.stock !== undefined) {
            updated.stock = Number(updatedFields.stock);
            updated.isAvailable = updated.stock > 0;
          }
          if (updatedFields.price !== undefined) {
            updated.price = Number(updatedFields.price);
          }
          return updated;
        }
        return p;
      })
    );
    showToast('Product updated successfully.', 'success');
  };

  const deleteProduct = (id) => {
    const prod = products.find((p) => p.id === id);
    setProducts((prev) => prev.filter((p) => p.id !== id));
    showToast(`Deleted "${prod?.name || 'Product'}".`, 'info');
  };

  const toggleStockStatus = (id) => {
    setProducts((prev) =>
      prev.map((p) => {
        if (p.id === id) {
          const nextAvailable = !p.isAvailable;
          const nextStock = nextAvailable ? (p.stock > 0 ? p.stock : 10) : 0;
          return { ...p, isAvailable: nextAvailable, stock: nextStock };
        }
        return p;
      })
    );
    showToast('Stock availability updated.', 'info');
  };

  const updateOrderStatus = (orderId, newStatus) => {
    setOrders((prev) =>
      prev.map((ord) => {
        if (ord.orderId === orderId) {
          const stages = [
            'Order Confirmed',
            'Baking & Preparation',
            'Packed',
            ord.customer.type === 'pickup' ? 'Ready for Pickup' : 'Out for Delivery',
            'Delivered'
          ];
          const targetIndex = stages.indexOf(newStatus);

          const updatedTimeline = ord.timeline.map((item, idx) => {
            if (idx <= targetIndex) {
              return {
                ...item,
                done: true,
                time: item.time === 'Pending' || item.time.startsWith('Estimated')
                  ? new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
                  : item.time
              };
            }
            return { ...item, done: false };
          });

          return {
            ...ord,
            orderStatus: newStatus,
            timeline: updatedTimeline
          };
        }
        return ord;
      })
    );
    showToast(`Order ${orderId} status set to "${newStatus}".`, 'success');
  };

  const cancelOrder = (orderId) => {
    setOrders((prev) =>
      prev.map((ord) =>
        ord.orderId === orderId
          ? {
              ...ord,
              orderStatus: 'Cancelled',
              timeline: ord.timeline.map((t) => ({ ...t, done: false }))
            }
          : ord
      )
    );
    showToast(`Order ${orderId} cancelled.`, 'info');
  };

  const updateSettings = (newSettings) => {
    setStoreSettings((prev) => ({ ...prev, ...newSettings }));
    showToast('Bakery settings updated successfully.', 'success');
  };

  const adminLogin = (email, password) => {
    if (email === 'admin@crumbco.com' && password === 'admin123') {
      setIsAdminAuthenticated(true);
      showToast('Admin logged in successfully.', 'success');
      return true;
    }
    showToast('Invalid credentials. Use admin@crumbco.com / admin123', 'error');
    return false;
  };

  const adminLogout = () => {
    setIsAdminAuthenticated(false);
    showToast('Admin signed out.', 'info');
  };

  return (
    <StoreContext.Provider
      value={{
        // Data
        storeSettings,
        products,
        cart,
        wishlist,
        orders,
        customer,
        appliedCoupon,
        isAdminAuthenticated,
        deliveryType,
        setDeliveryType,

        // Totals
        subtotal,
        discount,
        deliveryFee,
        gst,
        grandTotal,

        // UI
        isCartDrawerOpen,
        setIsCartDrawerOpen,
        quickViewProduct,
        setQuickViewProduct,
        toasts,
        showToast,
        removeToast,

        // Cart Actions
        addToCart,
        updateCartQuantity,
        removeFromCart,
        clearCart,

        // Coupon Actions
        applyCoupon,
        removeCoupon,

        // Wishlist Actions
        toggleWishlist,

        // Orders
        createOrder,

        // Customer Profile
        setCustomer,

        // Admin Actions
        addProduct,
        updateProduct,
        deleteProduct,
        toggleStockStatus,
        updateOrderStatus,
        cancelOrder,
        updateSettings,
        adminLogin,
        adminLogout
      }}
    >
      {children}
    </StoreContext.Provider>
  );
};

import React, { useState } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import {
  User,
  ShoppingBag,
  Heart,
  MapPin,
  Clock,
  Printer,
  Trash2,
  Plus,
  CheckCircle2,
  AlertCircle,
  Truck
} from 'lucide-react';
import { useStore } from '../context/StoreContext';
import { FallbackImage } from '../components/common/FallbackImage';

export const CustomerAccountPage = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const currentTab = searchParams.get('tab') || 'profile';

  const {
    customer,
    setCustomer,
    orders,
    wishlist,
    products,
    toggleWishlist,
    addToCart,
    showToast
  } = useStore();

  const [activeTab, setActiveTab] = useState(currentTab);
  const [isEditingProfile, setIsEditingProfile] = useState(false);
  const [profileForm, setProfileForm] = useState({
    name: customer.name || '',
    email: customer.email || '',
    phone: customer.phone || ''
  });

  // New Address Form
  const [showAddressModal, setShowAddressModal] = useState(false);
  const [addressForm, setAddressForm] = useState({
    tag: 'Home',
    street: '',
    city: 'Bengaluru',
    pincode: ''
  });

  const wishlistedProducts = products.filter((p) => wishlist.includes(p.id));

  const handleSaveProfile = (e) => {
    e.preventDefault();
    setCustomer((prev) => ({
      ...prev,
      name: profileForm.name,
      email: profileForm.email,
      phone: profileForm.phone
    }));
    setIsEditingProfile(false);
    showToast('Customer profile updated successfully!', 'success');
  };

  const handleAddAddress = (e) => {
    e.preventDefault();
    if (!addressForm.street.trim() || !addressForm.pincode.trim()) {
      showToast('Please fill all required address fields.', 'error');
      return;
    }

    const newAddr = {
      id: `addr-${Date.now()}`,
      tag: addressForm.tag,
      street: addressForm.street,
      city: addressForm.city,
      pincode: addressForm.pincode,
      isDefault: (customer.addresses || []).length === 0
    };

    setCustomer((prev) => ({
      ...prev,
      addresses: [...(prev.addresses || []), newAddr]
    }));

    setShowAddressModal(false);
    setAddressForm({ tag: 'Home', street: '', city: 'Bengaluru', pincode: '' });
    showToast('New address saved to your profile!', 'success');
  };

  const handleDeleteAddress = (id) => {
    setCustomer((prev) => ({
      ...prev,
      addresses: (prev.addresses || []).filter((a) => a.id !== id)
    }));
    showToast('Address removed.', 'info');
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 space-y-8">
      {/* Top Banner */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-bakery-border shadow-soft flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <div className="w-16 h-16 rounded-full bg-bakery-caramel text-white flex items-center justify-center font-serif text-2xl font-bold shadow-md">
            {customer.name?.charAt(0) || 'P'}
          </div>
          <div>
            <span className="text-[10px] font-bold text-bakery-sage uppercase tracking-wider bg-bakery-sage/10 px-2 py-0.5 rounded-full">
              Demo Customer Account
            </span>
            <h1 className="font-serif text-2xl sm:text-3xl font-bold text-bakery-blackberry mt-0.5">
              Welcome back, {customer.name || 'Priya'}
            </h1>
            <p className="text-xs text-bakery-muted mt-0.5">
              {customer.email} • {customer.phone}
            </p>
          </div>
        </div>

        <div className="text-xs text-bakery-muted bg-bakery-vanilla px-3 py-2 rounded-xl border border-bakery-border">
          <span>Client demo account system. Data persists in LocalStorage.</span>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex border-b border-bakery-border gap-2 overflow-x-auto pb-1">
        {[
          { key: 'profile', label: 'My Profile', icon: User },
          { key: 'orders', label: `Order History (${orders.length})`, icon: ShoppingBag },
          { key: 'addresses', label: `Saved Addresses (${customer.addresses?.length || 0})`, icon: MapPin },
          { key: 'wishlist', label: `My Wishlist (${wishlist.length})`, icon: Heart }
        ].map((tab) => {
          const Icon = tab.icon;
          return (
            <button
              key={tab.key}
              onClick={() => {
                setActiveTab(tab.key);
                setSearchParams({ tab: tab.key });
              }}
              className={`px-4 py-3 text-xs sm:text-sm font-bold flex items-center gap-2 border-b-2 whitespace-nowrap transition-colors ${
                activeTab === tab.key
                  ? 'border-bakery-caramel text-bakery-caramel font-extrabold'
                  : 'border-transparent text-bakery-muted hover:text-bakery-blackberry'
              }`}
            >
              <Icon className="w-4 h-4" />
              <span>{tab.label}</span>
            </button>
          );
        })}
      </div>

      {/* TAB 1: Profile */}
      {activeTab === 'profile' && (
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-bakery-border shadow-soft max-w-2xl space-y-6">
          <div className="flex items-center justify-between border-b border-bakery-border pb-4">
            <h3 className="font-serif text-lg font-bold text-bakery-blackberry">
              Personal Information
            </h3>
            <button
              onClick={() => setIsEditingProfile(!isEditingProfile)}
              className="text-xs font-bold text-bakery-caramel hover:underline"
            >
              {isEditingProfile ? 'Cancel' : 'Edit Profile'}
            </button>
          </div>

          {isEditingProfile ? (
            <form onSubmit={handleSaveProfile} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-bakery-blackberry uppercase tracking-wider mb-1">
                  Full Name
                </label>
                <input
                  type="text"
                  value={profileForm.name}
                  onChange={(e) => setProfileForm({ ...profileForm, name: e.target.value })}
                  className="w-full p-2.5 rounded-xl border border-bakery-border text-xs focus:outline-none focus:border-bakery-caramel"
                  required
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-bakery-blackberry uppercase tracking-wider mb-1">
                  Email Address
                </label>
                <input
                  type="email"
                  value={profileForm.email}
                  onChange={(e) => setProfileForm({ ...profileForm, email: e.target.value })}
                  className="w-full p-2.5 rounded-xl border border-bakery-border text-xs focus:outline-none focus:border-bakery-caramel"
                  required
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-bakery-blackberry uppercase tracking-wider mb-1">
                  Phone Number
                </label>
                <input
                  type="tel"
                  value={profileForm.phone}
                  onChange={(e) => setProfileForm({ ...profileForm, phone: e.target.value })}
                  className="w-full p-2.5 rounded-xl border border-bakery-border text-xs focus:outline-none focus:border-bakery-caramel"
                  required
                />
              </div>

              <button
                type="submit"
                className="px-6 py-2.5 bg-bakery-caramel hover:bg-bakery-caramelHover text-white text-xs font-bold rounded-xl shadow-md transition-colors"
              >
                Save Changes
              </button>
            </form>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
              <div className="p-3 bg-bakery-vanilla rounded-xl border border-bakery-border">
                <span className="text-bakery-muted block text-[11px]">Full Name</span>
                <span className="font-bold text-bakery-blackberry text-sm">{customer.name}</span>
              </div>
              <div className="p-3 bg-bakery-vanilla rounded-xl border border-bakery-border">
                <span className="text-bakery-muted block text-[11px]">Email Address</span>
                <span className="font-bold text-bakery-blackberry text-sm">{customer.email}</span>
              </div>
              <div className="p-3 bg-bakery-vanilla rounded-xl border border-bakery-border">
                <span className="text-bakery-muted block text-[11px]">Phone Number</span>
                <span className="font-bold text-bakery-blackberry text-sm">{customer.phone}</span>
              </div>
              <div className="p-3 bg-bakery-vanilla rounded-xl border border-bakery-border">
                <span className="text-bakery-muted block text-[11px]">City</span>
                <span className="font-bold text-bakery-blackberry text-sm">Bengaluru, Karnataka</span>
              </div>
            </div>
          )}
        </div>
      )}

      {/* TAB 2: Order History */}
      {activeTab === 'orders' && (
        <div className="space-y-4">
          {orders.length === 0 ? (
            <div className="p-10 bg-white rounded-3xl border border-bakery-border text-center space-y-3">
              <ShoppingBag className="w-12 h-12 text-bakery-muted mx-auto" />
              <h3 className="font-serif text-lg font-bold">No Past Orders Found</h3>
              <p className="text-xs text-bakery-muted">Start ordering freshly baked items from our menu.</p>
              <Link
                to="/shop"
                className="inline-block px-5 py-2 bg-bakery-caramel text-white text-xs font-bold rounded-xl"
              >
                Browse Menu
              </Link>
            </div>
          ) : (
            orders.map((ord) => (
              <div
                key={ord.orderId}
                className="bg-white rounded-3xl p-6 border border-bakery-border shadow-soft flex flex-col md:flex-row items-start md:items-center justify-between gap-4"
              >
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="font-serif font-bold text-base text-bakery-blackberry">
                      {ord.orderId}
                    </span>
                    <span className="px-2.5 py-0.5 rounded-full bg-bakery-caramel/10 text-bakery-caramel text-[11px] font-bold">
                      {ord.orderStatus}
                    </span>
                  </div>
                  <p className="text-xs text-bakery-muted">
                    Placed on {new Date(ord.date).toLocaleDateString()} • {ord.items.length} bakes
                  </p>
                  <p className="text-xs font-bold text-bakery-blackberry">
                    Total: ₹{ord.grandTotal} ({ord.paymentMethod})
                  </p>
                </div>

                <div className="flex items-center gap-3">
                  <Link
                    to={`/track-order/${ord.orderId}`}
                    className="px-4 py-2 bg-bakery-sand hover:bg-bakery-border rounded-xl text-xs font-bold text-bakery-blackberry flex items-center gap-1.5 transition-colors"
                  >
                    <Truck className="w-3.5 h-3.5 text-bakery-sage" />
                    <span>Track</span>
                  </Link>

                  <Link
                    to={`/order-confirmation/${ord.orderId}`}
                    className="px-4 py-2 bg-white hover:bg-bakery-sand border border-bakery-border rounded-xl text-xs font-bold text-bakery-blackberry flex items-center gap-1.5 transition-colors"
                  >
                    <Printer className="w-3.5 h-3.5 text-bakery-caramel" />
                    <span>Invoice</span>
                  </Link>
                </div>
              </div>
            ))
          )}
        </div>
      )}

      {/* TAB 3: Saved Addresses */}
      {activeTab === 'addresses' && (
        <div className="space-y-6 max-w-3xl">
          <div className="flex items-center justify-between">
            <h3 className="font-serif text-lg font-bold text-bakery-blackberry">
              Delivery Addresses
            </h3>
            <button
              onClick={() => setShowAddressModal(true)}
              className="px-4 py-2 bg-bakery-caramel hover:bg-bakery-caramelHover text-white text-xs font-bold rounded-xl flex items-center gap-1.5 shadow-sm"
            >
              <Plus className="w-4 h-4" />
              <span>Add New Address</span>
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {(customer.addresses || []).map((addr) => (
              <div
                key={addr.id}
                className="bg-white rounded-2xl p-5 border border-bakery-border shadow-soft flex flex-col justify-between space-y-3"
              >
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="px-2 py-0.5 bg-bakery-sand text-bakery-blackberry text-[11px] font-bold rounded-lg uppercase">
                      {addr.tag}
                    </span>
                    {addr.isDefault && (
                      <span className="text-[10px] text-bakery-sage font-bold">Default</span>
                    )}
                  </div>
                  <p className="text-xs text-bakery-blackberry leading-relaxed">{addr.street}</p>
                  <p className="text-xs text-bakery-muted mt-1">{addr.city} – {addr.pincode}</p>
                </div>

                <div className="flex justify-end pt-2 border-t border-bakery-border/60">
                  <button
                    onClick={() => handleDeleteAddress(addr.id)}
                    className="text-xs text-bakery-raspberry hover:underline flex items-center gap-1"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                    <span>Remove</span>
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Modal to add address */}
          {showAddressModal && (
            <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-bakery-blackberry/70 backdrop-blur-sm animate-fadeIn">
              <div className="bg-white rounded-3xl p-6 sm:p-8 max-w-md w-full shadow-2xl border border-bakery-border space-y-4">
                <h3 className="font-serif text-xl font-bold text-bakery-blackberry">
                  Add Delivery Address
                </h3>
                <form onSubmit={handleAddAddress} className="space-y-3 text-xs">
                  <div>
                    <label className="block font-bold mb-1">Tag (Home / Work / Studio)</label>
                    <select
                      value={addressForm.tag}
                      onChange={(e) => setAddressForm({ ...addressForm, tag: e.target.value })}
                      className="w-full p-2.5 rounded-xl border border-bakery-border"
                    >
                      <option value="Home">Home</option>
                      <option value="Work">Work</option>
                      <option value="Studio">Studio</option>
                      <option value="Other">Other</option>
                    </select>
                  </div>

                  <div>
                    <label className="block font-bold mb-1">Street Address</label>
                    <textarea
                      rows={2}
                      value={addressForm.street}
                      onChange={(e) => setAddressForm({ ...addressForm, street: e.target.value })}
                      placeholder="House/Apartment number, street, landmark"
                      className="w-full p-2.5 rounded-xl border border-bakery-border"
                      required
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-2">
                    <div>
                      <label className="block font-bold mb-1">City</label>
                      <input
                        type="text"
                        value={addressForm.city}
                        readOnly
                        className="w-full p-2.5 rounded-xl border border-bakery-border bg-gray-50 font-bold"
                      />
                    </div>
                    <div>
                      <label className="block font-bold mb-1">PIN Code</label>
                      <input
                        type="text"
                        maxLength={6}
                        value={addressForm.pincode}
                        onChange={(e) => setAddressForm({ ...addressForm, pincode: e.target.value })}
                        placeholder="560038"
                        className="w-full p-2.5 rounded-xl border border-bakery-border"
                        required
                      />
                    </div>
                  </div>

                  <div className="flex gap-2 pt-2">
                    <button
                      type="button"
                      onClick={() => setShowAddressModal(false)}
                      className="flex-1 py-2.5 rounded-xl border border-bakery-border font-bold text-bakery-blackberry hover:bg-bakery-sand"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="flex-1 py-2.5 rounded-xl bg-bakery-caramel hover:bg-bakery-caramelHover text-white font-bold"
                    >
                      Save Address
                    </button>
                  </div>
                </form>
              </div>
            </div>
          )}
        </div>
      )}

      {/* TAB 4: Wishlist */}
      {activeTab === 'wishlist' && (
        <div className="space-y-4">
          {wishlistedProducts.length === 0 ? (
            <div className="p-10 bg-white rounded-3xl border border-bakery-border text-center space-y-3">
              <Heart className="w-12 h-12 text-bakery-muted mx-auto" />
              <h3 className="font-serif text-lg font-bold">Your Wishlist is Empty</h3>
              <p className="text-xs text-bakery-muted">Heart your favorite bakes to save them for later.</p>
              <Link
                to="/shop"
                className="inline-block px-5 py-2 bg-bakery-caramel text-white text-xs font-bold rounded-xl"
              >
                Discover Bakes
              </Link>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {wishlistedProducts.map((p) => (
                <div
                  key={p.id}
                  className="p-4 bg-white rounded-2xl border border-bakery-border shadow-soft flex items-center gap-3 justify-between"
                >
                  <div className="flex items-center gap-3 overflow-hidden">
                    <FallbackImage
                      src={p.image}
                      alt={p.name}
                      title={p.name}
                      category={p.category}
                      className="w-14 h-14 rounded-xl object-cover shrink-0"
                    />
                    <div className="overflow-hidden">
                      <h4 className="text-xs font-bold text-bakery-blackberry truncate">
                        {p.name}
                      </h4>
                      <span className="font-serif text-xs font-bold text-bakery-caramel">
                        ₹{p.price}
                      </span>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 shrink-0">
                    <button
                      onClick={() => addToCart(p, 1)}
                      className="px-2.5 py-1.5 bg-bakery-caramel hover:bg-bakery-caramelHover text-white text-xs font-bold rounded-lg shadow-sm"
                    >
                      Add to Basket
                    </button>
                    <button
                      onClick={() => toggleWishlist(p.id)}
                      className="p-1.5 text-bakery-muted hover:text-bakery-raspberry"
                      title="Remove"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

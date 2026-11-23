import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import {
  LayoutDashboard,
  Package,
  ShoppingBag,
  Settings,
  Plus,
  Edit2,
  Trash2,
  CheckCircle2,
  XCircle,
  AlertCircle,
  LogOut,
  Search,
  Eye,
  TrendingUp,
  Clock,
  Check,
  X,
  ExternalLink
} from 'lucide-react';
import { useStore } from '../context/StoreContext';
import { CATEGORIES } from '../data/products';
import { FallbackImage } from '../components/common/FallbackImage';

export const AdminDashboard = () => {
  const {
    products,
    orders,
    storeSettings,
    isAdminAuthenticated,
    adminLogout,
    addProduct,
    updateProduct,
    deleteProduct,
    toggleStockStatus,
    updateOrderStatus,
    cancelOrder,
    updateSettings
  } = useStore();

  const navigate = useNavigate();

  // If not logged in, redirect to login
  if (!isAdminAuthenticated) {
    navigate('/admin/login');
    return null;
  }

  const [activeTab, setActiveTab] = useState('overview'); // 'overview', 'products', 'orders', 'settings'

  // Product Management States
  const [productSearch, setProductSearch] = useState('');
  const [productCategoryFilter, setProductCategoryFilter] = useState('All');
  const [showProductModal, setShowProductModal] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null); // null if adding new

  const [productFormData, setProductFormData] = useState({
    name: '',
    category: 'Artisan Breads',
    price: 150,
    weight: '350g',
    description: '',
    image: '',
    dietary: 'Vegetarian',
    isEggless: true,
    stock: 20,
    isFeatured: false,
    isBestseller: false,
    eligibleForBox: false
  });

  // Order Management States
  const [orderSearch, setOrderSearch] = useState('');
  const [orderStatusFilter, setOrderStatusFilter] = useState('All');
  const [selectedOrderDetails, setSelectedOrderDetails] = useState(null);

  // Store Settings Form State
  const [settingsForm, setSettingsForm] = useState({
    storeName: storeSettings.storeName || 'Crumb & Co. Bakery',
    tagline: storeSettings.tagline || '',
    phone: storeSettings.phone || '',
    whatsapp: storeSettings.whatsapp || '',
    email: storeSettings.email || '',
    address: storeSettings.address || '',
    openingHours: storeSettings.openingHours || '',
    deliveryCharge: storeSettings.deliveryCharge || 50,
    freeDeliveryThreshold: storeSettings.freeDeliveryThreshold || 599,
    merchantUpiId: storeSettings.merchantUpiId || '',
    gstPercent: storeSettings.gstPercent || 5,
    instagram: storeSettings.instagram || '',
    facebook: storeSettings.facebook || ''
  });

  // Analytics Stats
  const totalDemoSales = orders.reduce((sum, ord) => sum + ord.grandTotal, 0);
  const completedOrders = orders.filter((o) => o.orderStatus === 'Delivered').length;
  const pendingOrders = orders.filter((o) => o.orderStatus !== 'Delivered' && o.orderStatus !== 'Cancelled').length;
  const lowStockProducts = products.filter((p) => p.stock <= 15);

  // Filter products for admin table
  const displayedAdminProducts = products.filter((p) => {
    if (productCategoryFilter !== 'All' && p.category !== productCategoryFilter) return false;
    if (productSearch.trim()) {
      const q = productSearch.toLowerCase();
      return p.name.toLowerCase().includes(q) || p.description.toLowerCase().includes(q);
    }
    return true;
  });

  // Filter orders for admin table
  const displayedAdminOrders = orders.filter((o) => {
    if (orderStatusFilter !== 'All' && o.orderStatus !== orderStatusFilter) return false;
    if (orderSearch.trim()) {
      const q = orderSearch.toLowerCase();
      return (
        o.orderId.toLowerCase().includes(q) ||
        o.customer.name.toLowerCase().includes(q) ||
        o.customer.phone.includes(q)
      );
    }
    return true;
  });

  // Open Edit Product Modal
  const handleOpenEdit = (p) => {
    setEditingProduct(p);
    setProductFormData({
      name: p.name,
      category: p.category,
      price: p.price,
      weight: p.weight,
      description: p.description,
      image: p.image,
      dietary: p.dietary,
      isEggless: p.isEggless,
      stock: p.stock,
      isFeatured: p.isFeatured,
      isBestseller: p.isBestseller,
      eligibleForBox: p.eligibleForBox || false
    });
    setShowProductModal(true);
  };

  // Open Add Product Modal
  const handleOpenAdd = () => {
    setEditingProduct(null);
    setProductFormData({
      name: '',
      category: 'Artisan Breads',
      price: 150,
      weight: '350g',
      description: '',
      image: 'https://images.unsplash.com/photo-1509440159596-0249088772ff?auto=format&fit=crop&w=600&q=80',
      dietary: 'Vegetarian',
      isEggless: true,
      stock: 20,
      isFeatured: false,
      isBestseller: false,
      eligibleForBox: false
    });
    setShowProductModal(true);
  };

  // Save Product (Add or Edit)
  const handleSaveProduct = (e) => {
    e.preventDefault();
    if (editingProduct) {
      updateProduct(editingProduct.id, productFormData);
    } else {
      addProduct(productFormData);
    }
    setShowProductModal(false);
  };

  // Save Store Settings
  const handleSaveSettings = (e) => {
    e.preventDefault();
    updateSettings(settingsForm);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 space-y-8">
      {/* Top Header */}
      <div className="bg-bakery-blackberry text-white rounded-3xl p-6 sm:p-8 flex flex-col md:flex-row items-start md:items-center justify-between gap-4 shadow-xl">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <span className="px-2.5 py-0.5 rounded-full bg-bakery-sage text-white text-[10px] font-bold uppercase tracking-wider">
              Bakehouse Manager
            </span>
            <span className="text-xs text-gray-300">Logged in as admin@crumbco.com</span>
          </div>
          <h1 className="font-serif text-2xl sm:text-3xl font-bold">
            {storeSettings.storeName} Control Center
          </h1>
        </div>

        <div className="flex items-center gap-3">
          <Link
            to="/shop"
            target="_blank"
            className="px-4 py-2 bg-white/10 hover:bg-white/20 text-white rounded-xl text-xs font-bold flex items-center gap-1.5 transition-colors"
          >
            <span>Live Customer Store</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </Link>
          <button
            onClick={adminLogout}
            className="px-4 py-2 bg-bakery-raspberry hover:bg-red-700 text-white rounded-xl text-xs font-bold flex items-center gap-1.5 transition-colors"
          >
            <LogOut className="w-3.5 h-3.5" />
            <span>Sign Out</span>
          </button>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex border-b border-bakery-border gap-2 overflow-x-auto pb-1">
        {[
          { key: 'overview', label: 'Overview & Metrics', icon: LayoutDashboard },
          { key: 'products', label: `Catalogue Management (${products.length})`, icon: Package },
          { key: 'orders', label: `Customer Orders (${orders.length})`, icon: ShoppingBag },
          { key: 'settings', label: 'Store & Payment Settings', icon: Settings }
        ].map((t) => {
          const Icon = t.icon;
          return (
            <button
              key={t.key}
              onClick={() => setActiveTab(t.key)}
              className={`px-4 py-3 text-xs sm:text-sm font-bold flex items-center gap-2 border-b-2 whitespace-nowrap transition-colors ${
                activeTab === t.key
                  ? 'border-bakery-caramel text-bakery-caramel font-extrabold'
                  : 'border-transparent text-bakery-muted hover:text-bakery-blackberry'
              }`}
            >
              <Icon className="w-4 h-4" />
              <span>{t.label}</span>
            </button>
          );
        })}
      </div>

      {/* TAB 1: Overview & Analytics */}
      {activeTab === 'overview' && (
        <div className="space-y-8">
          {/* Key Metric Summary Cards */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="bg-white rounded-2xl p-5 border border-bakery-border shadow-soft">
              <span className="text-xs text-bakery-muted font-bold uppercase tracking-wider block">
                Total Products
              </span>
              <p className="font-serif text-3xl font-bold text-bakery-blackberry mt-2">
                {products.length}
              </p>
              <span className="text-[11px] text-bakery-sage font-semibold">Active in catalogue</span>
            </div>

            <div className="bg-white rounded-2xl p-5 border border-bakery-border shadow-soft">
              <span className="text-xs text-bakery-muted font-bold uppercase tracking-wider block">
                Total Demo Revenue
              </span>
              <p className="font-serif text-3xl font-bold text-bakery-caramel mt-2">
                ₹{totalDemoSales.toLocaleString('en-IN')}
              </p>
              <span className="text-[11px] text-bakery-muted font-semibold">Simulated demo gross</span>
            </div>

            <div className="bg-white rounded-2xl p-5 border border-bakery-border shadow-soft">
              <span className="text-xs text-bakery-muted font-bold uppercase tracking-wider block">
                Active / Pending Orders
              </span>
              <p className="font-serif text-3xl font-bold text-amber-600 mt-2">
                {pendingOrders}
              </p>
              <span className="text-[11px] text-bakery-muted font-semibold">Baking or out for delivery</span>
            </div>

            <div className="bg-white rounded-2xl p-5 border border-bakery-border shadow-soft">
              <span className="text-xs text-bakery-muted font-bold uppercase tracking-wider block">
                Delivered Orders
              </span>
              <p className="font-serif text-3xl font-bold text-bakery-sage mt-2">
                {completedOrders}
              </p>
              <span className="text-[11px] text-bakery-sage font-semibold">Successfully fulfilled</span>
            </div>
          </div>

          {/* Low Stock Alerts Strip */}
          <div className="bg-white rounded-3xl p-6 border border-bakery-border shadow-soft space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="font-serif text-lg font-bold text-bakery-blackberry flex items-center gap-2">
                <AlertCircle className="w-5 h-5 text-amber-500" />
                <span>Low Stock Inventory Alerts (≤ 15 Units)</span>
              </h3>
              <span className="text-xs font-bold bg-amber-100 text-amber-800 px-2.5 py-1 rounded-full">
                {lowStockProducts.length} Bakes Require Restocking
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
              {lowStockProducts.map((p) => (
                <div
                  key={p.id}
                  className="p-3 rounded-xl border border-bakery-border bg-bakery-vanilla/40 flex items-center justify-between text-xs"
                >
                  <div className="overflow-hidden pr-2">
                    <p className="font-bold text-bakery-blackberry truncate">{p.name}</p>
                    <span className="text-[11px] text-bakery-muted">{p.category}</span>
                  </div>
                  <div className="text-right shrink-0">
                    <span className="font-bold text-bakery-raspberry font-mono block">
                      {p.stock} units left
                    </span>
                    <button
                      onClick={() => handleOpenEdit(p)}
                      className="text-[10px] text-bakery-caramel hover:underline font-bold"
                    >
                      Update Stock
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* TAB 2: Catalogue Management */}
      {activeTab === 'products' && (
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-bakery-border shadow-soft space-y-6">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div>
              <h2 className="font-serif text-xl font-bold text-bakery-blackberry">
                Full 52-Product Inventory
              </h2>
              <p className="text-xs text-bakery-muted">
                Changes to prices, stock or descriptions update the customer storefront instantly.
              </p>
            </div>

            <button
              onClick={handleOpenAdd}
              className="px-5 py-2.5 bg-bakery-caramel hover:bg-bakery-caramelHover text-white text-xs font-bold rounded-xl flex items-center gap-1.5 shadow-md transition-colors"
            >
              <Plus className="w-4 h-4" />
              <span>Add New Bake</span>
            </button>
          </div>

          {/* Search & Category Filter */}
          <div className="flex flex-col sm:flex-row items-center gap-3">
            <div className="relative flex-1 w-full">
              <Search className="w-4 h-4 absolute left-3 top-2.5 text-bakery-muted" />
              <input
                type="text"
                placeholder="Search products by title or description..."
                value={productSearch}
                onChange={(e) => setProductSearch(e.target.value)}
                className="w-full pl-9 pr-3 py-2 bg-bakery-vanilla/50 rounded-xl border border-bakery-border text-xs focus:outline-none focus:border-bakery-caramel"
              />
            </div>

            <select
              value={productCategoryFilter}
              onChange={(e) => setProductCategoryFilter(e.target.value)}
              className="w-full sm:w-auto p-2 bg-bakery-vanilla/50 rounded-xl border border-bakery-border text-xs font-semibold focus:outline-none focus:border-bakery-caramel"
            >
              {CATEGORIES.map((c) => (
                <option key={c} value={c}>
                  {c}
                </option>
              ))}
            </select>
          </div>

          {/* Products Table */}
          <div className="border border-bakery-border rounded-2xl overflow-x-auto">
            <table className="w-full text-left text-xs min-w-[750px]">
              <thead className="bg-bakery-sand/70 text-bakery-blackberry font-bold uppercase tracking-wider border-b border-bakery-border">
                <tr>
                  <th className="p-3">Product</th>
                  <th className="p-3">Category</th>
                  <th className="p-3">Price</th>
                  <th className="p-3">Weight</th>
                  <th className="p-3 text-center">Stock</th>
                  <th className="p-3 text-center">Status</th>
                  <th className="p-3 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-bakery-border/70">
                {displayedAdminProducts.map((p) => (
                  <tr key={p.id} className="hover:bg-bakery-vanilla/30">
                    <td className="p-3 flex items-center gap-3">
                      <FallbackImage
                        src={p.image}
                        alt={p.name}
                        title={p.name}
                        category={p.category}
                        className="w-10 h-10 rounded-lg object-cover shrink-0"
                      />
                      <div>
                        <p className="font-bold text-bakery-blackberry">{p.name}</p>
                        <span className="text-[10px] text-bakery-muted">
                          {p.dietary} • {p.isEggless ? 'Eggless' : 'Contains Egg'}
                        </span>
                      </div>
                    </td>
                    <td className="p-3 text-bakery-muted">{p.category}</td>
                    <td className="p-3 font-serif font-bold text-bakery-caramel">₹{p.price}</td>
                    <td className="p-3 text-bakery-muted">{p.weight}</td>
                    <td className="p-3 text-center font-bold">{p.stock}</td>
                    <td className="p-3 text-center">
                      <button
                        onClick={() => toggleStockStatus(p.id)}
                        className={`px-2.5 py-1 rounded-full text-[10px] font-bold ${
                          p.isAvailable && p.stock > 0
                            ? 'bg-bakery-sage/15 text-bakery-sage'
                            : 'bg-red-100 text-red-700'
                        }`}
                        title="Click to toggle availability"
                      >
                        {p.isAvailable && p.stock > 0 ? 'In Stock' : 'Sold Out'}
                      </button>
                    </td>
                    <td className="p-3 text-right">
                      <div className="flex items-center justify-end gap-1.5">
                        <button
                          onClick={() => handleOpenEdit(p)}
                          className="p-1.5 text-bakery-muted hover:text-bakery-caramel hover:bg-bakery-sand rounded-lg transition-colors"
                          title="Edit bake"
                        >
                          <Edit2 className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => {
                            if (window.confirm(`Are you sure you want to delete "${p.name}"?`)) {
                              deleteProduct(p.id);
                            }
                          }}
                          className="p-1.5 text-bakery-muted hover:text-bakery-raspberry hover:bg-bakery-sand rounded-lg transition-colors"
                          title="Delete bake"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* TAB 3: Customer Orders Management */}
      {activeTab === 'orders' && (
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-bakery-border shadow-soft space-y-6">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div>
              <h2 className="font-serif text-xl font-bold text-bakery-blackberry">
                Customer Orders Pipeline
              </h2>
              <p className="text-xs text-bakery-muted">
                Advance order status from Confirmed to Baking, Packed, Out for Delivery, and Delivered.
              </p>
            </div>

            {/* Filter */}
            <div className="flex items-center gap-2">
              <select
                value={orderStatusFilter}
                onChange={(e) => setOrderStatusFilter(e.target.value)}
                className="p-2 bg-bakery-vanilla/50 rounded-xl border border-bakery-border text-xs font-semibold focus:outline-none"
              >
                <option value="All">All Statuses</option>
                <option value="Order Confirmed">Order Confirmed</option>
                <option value="Baking & Preparation">Baking &amp; Preparation</option>
                <option value="Packed">Packed</option>
                <option value="Out for Delivery">Out for Delivery</option>
                <option value="Ready for Pickup">Ready for Pickup</option>
                <option value="Delivered">Delivered</option>
                <option value="Cancelled">Cancelled</option>
              </select>
            </div>
          </div>

          {/* Search bar */}
          <div className="relative">
            <Search className="w-4 h-4 absolute left-3 top-2.5 text-bakery-muted" />
            <input
              type="text"
              placeholder="Search by Order ID (e.g. BKR-2026-0001) or customer name..."
              value={orderSearch}
              onChange={(e) => setOrderSearch(e.target.value)}
              className="w-full pl-9 pr-3 py-2 bg-bakery-vanilla/50 rounded-xl border border-bakery-border text-xs focus:outline-none"
            />
          </div>

          {/* Orders Table */}
          <div className="border border-bakery-border rounded-2xl overflow-x-auto">
            <table className="w-full text-left text-xs min-w-[750px]">
              <thead className="bg-bakery-sand/70 text-bakery-blackberry font-bold uppercase tracking-wider border-b border-bakery-border">
                <tr>
                  <th className="p-3">Order ID</th>
                  <th className="p-3">Customer</th>
                  <th className="p-3">Date</th>
                  <th className="p-3">Amount</th>
                  <th className="p-3">Fulfillment</th>
                  <th className="p-3">Status</th>
                  <th className="p-3 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-bakery-border/70">
                {displayedAdminOrders.map((ord) => (
                  <tr key={ord.orderId} className="hover:bg-bakery-vanilla/30">
                    <td className="p-3 font-mono font-bold text-bakery-caramel">
                      {ord.orderId}
                    </td>
                    <td className="p-3">
                      <p className="font-bold text-bakery-blackberry">{ord.customer.name}</p>
                      <span className="text-[10px] text-bakery-muted">{ord.customer.phone}</span>
                    </td>
                    <td className="p-3 text-bakery-muted">
                      {new Date(ord.date).toLocaleDateString()}
                    </td>
                    <td className="p-3 font-bold font-serif">₹{ord.grandTotal}</td>
                    <td className="p-3">
                      <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-bakery-sand">
                        {ord.customer.type === 'pickup' ? 'Pickup' : 'Delivery'}
                      </span>
                    </td>
                    <td className="p-3">
                      <select
                        value={ord.orderStatus}
                        onChange={(e) => updateOrderStatus(ord.orderId, e.target.value)}
                        className="p-1 rounded-lg border border-bakery-border bg-white text-xs font-semibold focus:outline-none"
                      >
                        <option value="Order Confirmed">Order Confirmed</option>
                        <option value="Baking & Preparation">Baking &amp; Preparation</option>
                        <option value="Packed">Packed</option>
                        <option value="Out for Delivery">Out for Delivery</option>
                        <option value="Ready for Pickup">Ready for Pickup</option>
                        <option value="Delivered">Delivered</option>
                      </select>
                    </td>
                    <td className="p-3 text-right space-x-1.5">
                      <button
                        onClick={() => setSelectedOrderDetails(ord)}
                        className="px-2.5 py-1 bg-bakery-sand hover:bg-bakery-border rounded-lg text-[11px] font-bold"
                      >
                        Details
                      </button>
                      {ord.orderStatus !== 'Cancelled' && ord.orderStatus !== 'Delivered' && (
                        <button
                          onClick={() => {
                            if (window.confirm(`Cancel order ${ord.orderId}?`)) {
                              cancelOrder(ord.orderId);
                            }
                          }}
                          className="px-2 py-1 text-bakery-raspberry hover:bg-red-50 rounded-lg text-[11px] font-semibold"
                        >
                          Cancel
                        </button>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* TAB 4: Store & Payment Settings */}
      {activeTab === 'settings' && (
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-bakery-border shadow-soft max-w-3xl space-y-6">
          <div className="border-b border-bakery-border pb-4">
            <h2 className="font-serif text-xl font-bold text-bakery-blackberry">
              Bakery Brand &amp; Configuration Settings
            </h2>
            <p className="text-xs text-bakery-muted mt-0.5">
              Updates to bakery name, merchant UPI ID, delivery rules and address sync live across all pages.
            </p>
          </div>

          <form onSubmit={handleSaveSettings} className="space-y-4 text-xs">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block font-bold text-bakery-blackberry uppercase tracking-wider mb-1">
                  Store Name
                </label>
                <input
                  type="text"
                  value={settingsForm.storeName}
                  onChange={(e) => setSettingsForm({ ...settingsForm, storeName: e.target.value })}
                  className="w-full p-2.5 rounded-xl border border-bakery-border focus:outline-none focus:border-bakery-caramel font-bold"
                  required
                />
              </div>

              <div>
                <label className="block font-bold text-bakery-blackberry uppercase tracking-wider mb-1">
                  Tagline
                </label>
                <input
                  type="text"
                  value={settingsForm.tagline}
                  onChange={(e) => setSettingsForm({ ...settingsForm, tagline: e.target.value })}
                  className="w-full p-2.5 rounded-xl border border-bakery-border focus:outline-none focus:border-bakery-caramel"
                />
              </div>

              <div>
                <label className="block font-bold text-bakery-blackberry uppercase tracking-wider mb-1">
                  Phone (Displayed on site)
                </label>
                <input
                  type="text"
                  value={settingsForm.phone}
                  onChange={(e) => setSettingsForm({ ...settingsForm, phone: e.target.value })}
                  className="w-full p-2.5 rounded-xl border border-bakery-border focus:outline-none focus:border-bakery-caramel"
                />
              </div>

              <div>
                <label className="block font-bold text-bakery-blackberry uppercase tracking-wider mb-1">
                  WhatsApp Number (For Direct Chat)
                </label>
                <input
                  type="text"
                  value={settingsForm.whatsapp}
                  onChange={(e) => setSettingsForm({ ...settingsForm, whatsapp: e.target.value })}
                  placeholder="e.g. 919876543210"
                  className="w-full p-2.5 rounded-xl border border-bakery-border focus:outline-none focus:border-bakery-caramel"
                />
              </div>

              <div className="sm:col-span-2">
                <label className="block font-bold text-bakery-blackberry uppercase tracking-wider mb-1">
                  Store Address (Bengaluru)
                </label>
                <textarea
                  rows={2}
                  value={settingsForm.address}
                  onChange={(e) => setSettingsForm({ ...settingsForm, address: e.target.value })}
                  className="w-full p-2.5 rounded-xl border border-bakery-border focus:outline-none focus:border-bakery-caramel"
                />
              </div>

              <div>
                <label className="block font-bold text-bakery-blackberry uppercase tracking-wider mb-1">
                  Opening Hours
                </label>
                <input
                  type="text"
                  value={settingsForm.openingHours}
                  onChange={(e) => setSettingsForm({ ...settingsForm, openingHours: e.target.value })}
                  className="w-full p-2.5 rounded-xl border border-bakery-border focus:outline-none focus:border-bakery-caramel"
                />
              </div>

              <div>
                <label className="block font-bold text-bakery-blackberry uppercase tracking-wider mb-1">
                  Merchant UPI ID
                </label>
                <input
                  type="text"
                  value={settingsForm.merchantUpiId}
                  onChange={(e) => setSettingsForm({ ...settingsForm, merchantUpiId: e.target.value })}
                  className="w-full p-2.5 rounded-xl border border-bakery-border focus:outline-none focus:border-bakery-caramel font-mono font-bold"
                />
              </div>

              <div>
                <label className="block font-bold text-bakery-blackberry uppercase tracking-wider mb-1">
                  Standard Delivery Fee (₹)
                </label>
                <input
                  type="number"
                  value={settingsForm.deliveryCharge}
                  onChange={(e) => setSettingsForm({ ...settingsForm, deliveryCharge: Number(e.target.value) })}
                  className="w-full p-2.5 rounded-xl border border-bakery-border focus:outline-none focus:border-bakery-caramel"
                />
              </div>

              <div>
                <label className="block font-bold text-bakery-blackberry uppercase tracking-wider mb-1">
                  Free Delivery Threshold (₹)
                </label>
                <input
                  type="number"
                  value={settingsForm.freeDeliveryThreshold}
                  onChange={(e) => setSettingsForm({ ...settingsForm, freeDeliveryThreshold: Number(e.target.value) })}
                  className="w-full p-2.5 rounded-xl border border-bakery-border focus:outline-none focus:border-bakery-caramel"
                />
              </div>

              <div>
                <label className="block font-bold text-bakery-blackberry uppercase tracking-wider mb-1">
                  GST Percentage (%)
                </label>
                <input
                  type="number"
                  value={settingsForm.gstPercent}
                  onChange={(e) => setSettingsForm({ ...settingsForm, gstPercent: Number(e.target.value) })}
                  className="w-full p-2.5 rounded-xl border border-bakery-border focus:outline-none focus:border-bakery-caramel"
                />
              </div>
            </div>

            <div className="pt-4 border-t border-bakery-border flex justify-end">
              <button
                type="submit"
                className="px-6 py-3 bg-bakery-caramel hover:bg-bakery-caramelHover text-white font-bold rounded-xl shadow-md transition-colors"
              >
                Save Store Settings
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Modal: Add / Edit Product */}
      {showProductModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-bakery-blackberry/70 backdrop-blur-sm animate-fadeIn">
          <div className="bg-white rounded-3xl p-6 sm:p-8 max-w-xl w-full shadow-2xl border border-bakery-border space-y-4 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between border-b border-bakery-border pb-3">
              <h3 className="font-serif text-xl font-bold text-bakery-blackberry">
                {editingProduct ? 'Edit Bake' : 'Add New Bake to Catalogue'}
              </h3>
              <button
                onClick={() => setShowProductModal(false)}
                className="p-1 rounded-full text-bakery-muted hover:text-bakery-blackberry"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSaveProduct} className="space-y-3 text-xs">
              <div>
                <label className="block font-bold mb-1">Product Name *</label>
                <input
                  type="text"
                  value={productFormData.name}
                  onChange={(e) => setProductFormData({ ...productFormData, name: e.target.value })}
                  placeholder="e.g. Pistachio Frangipane Brioche"
                  className="w-full p-2.5 rounded-xl border border-bakery-border"
                  required
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold mb-1">Category *</label>
                  <select
                    value={productFormData.category}
                    onChange={(e) => setProductFormData({ ...productFormData, category: e.target.value })}
                    className="w-full p-2.5 rounded-xl border border-bakery-border"
                  >
                    {CATEGORIES.filter((c) => c !== 'All').map((c) => (
                      <option key={c} value={c}>
                        {c}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block font-bold mb-1">Price (₹) *</label>
                  <input
                    type="number"
                    value={productFormData.price}
                    onChange={(e) => setProductFormData({ ...productFormData, price: Number(e.target.value) })}
                    className="w-full p-2.5 rounded-xl border border-bakery-border font-bold"
                    required
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold mb-1">Weight / Pack Size</label>
                  <input
                    type="text"
                    value={productFormData.weight}
                    onChange={(e) => setProductFormData({ ...productFormData, weight: e.target.value })}
                    placeholder="e.g. 400g or Pack of 4"
                    className="w-full p-2.5 rounded-xl border border-bakery-border"
                  />
                </div>

                <div>
                  <label className="block font-bold mb-1">Stock Units</label>
                  <input
                    type="number"
                    value={productFormData.stock}
                    onChange={(e) => setProductFormData({ ...productFormData, stock: Number(e.target.value) })}
                    className="w-full p-2.5 rounded-xl border border-bakery-border font-bold"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block font-bold mb-1">Description *</label>
                <textarea
                  rows={2}
                  value={productFormData.description}
                  onChange={(e) => setProductFormData({ ...productFormData, description: e.target.value })}
                  className="w-full p-2.5 rounded-xl border border-bakery-border"
                  required
                />
              </div>

              <div>
                <label className="block font-bold mb-1">Image URL</label>
                <input
                  type="url"
                  value={productFormData.image}
                  onChange={(e) => setProductFormData({ ...productFormData, image: e.target.value })}
                  placeholder="https://images.unsplash.com/..."
                  className="w-full p-2.5 rounded-xl border border-bakery-border"
                />
              </div>

              <div className="flex flex-wrap gap-4 pt-1">
                <label className="flex items-center gap-1.5 font-bold cursor-pointer">
                  <input
                    type="checkbox"
                    checked={productFormData.isEggless}
                    onChange={(e) => setProductFormData({ ...productFormData, isEggless: e.target.checked })}
                    className="rounded text-bakery-caramel"
                  />
                  <span>100% Eggless</span>
                </label>

                <label className="flex items-center gap-1.5 font-bold cursor-pointer">
                  <input
                    type="checkbox"
                    checked={productFormData.isBestseller}
                    onChange={(e) => setProductFormData({ ...productFormData, isBestseller: e.target.checked })}
                    className="rounded text-bakery-caramel"
                  />
                  <span>Bestseller Badge</span>
                </label>

                <label className="flex items-center gap-1.5 font-bold cursor-pointer">
                  <input
                    type="checkbox"
                    checked={productFormData.eligibleForBox}
                    onChange={(e) => setProductFormData({ ...productFormData, eligibleForBox: e.target.checked })}
                    className="rounded text-bakery-caramel"
                  />
                  <span>Eligible for Build-a-Box</span>
                </label>
              </div>

              <div className="flex gap-2 pt-4 border-t border-bakery-border">
                <button
                  type="button"
                  onClick={() => setShowProductModal(false)}
                  className="flex-1 py-2.5 rounded-xl border border-bakery-border font-bold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 py-2.5 rounded-xl bg-bakery-caramel hover:bg-bakery-caramelHover text-white font-bold"
                >
                  {editingProduct ? 'Save Updates' : 'Add Bake'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Modal: View Order Details */}
      {selectedOrderDetails && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-bakery-blackberry/70 backdrop-blur-sm animate-fadeIn">
          <div className="bg-white rounded-3xl p-6 sm:p-8 max-w-lg w-full shadow-2xl border border-bakery-border space-y-4 max-h-[90vh] overflow-y-auto text-xs">
            <div className="flex items-center justify-between border-b border-bakery-border pb-3">
              <div>
                <span className="font-mono font-bold text-bakery-caramel text-sm">
                  {selectedOrderDetails.orderId}
                </span>
                <p className="text-bakery-muted">
                  Placed on {new Date(selectedOrderDetails.date).toLocaleString()}
                </p>
              </div>
              <button
                onClick={() => setSelectedOrderDetails(null)}
                className="p-1 rounded-full text-bakery-muted hover:text-bakery-blackberry"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-3 bg-bakery-vanilla rounded-xl space-y-1">
              <p><strong>Customer:</strong> {selectedOrderDetails.customer.name}</p>
              <p><strong>Phone:</strong> {selectedOrderDetails.customer.phone}</p>
              <p><strong>Address:</strong> {selectedOrderDetails.customer.address}</p>
              <p><strong>Scheduled Slot:</strong> {selectedOrderDetails.customer.preferredDate} ({selectedOrderDetails.customer.preferredTime})</p>
              {selectedOrderDetails.customer.giftNote && (
                <p className="italic text-bakery-caramel">Gift Note: "{selectedOrderDetails.customer.giftNote}"</p>
              )}
            </div>

            <div className="space-y-2">
              <h4 className="font-bold uppercase tracking-wider text-[11px]">Items:</h4>
              <div className="divide-y divide-bakery-border border rounded-xl overflow-hidden">
                {selectedOrderDetails.items.map((it, idx) => (
                  <div key={idx} className="p-2.5 flex items-center justify-between">
                    <div>
                      <p className="font-bold">{it.name}</p>
                      <span className="text-[10px] text-bakery-muted">{it.quantity} × ₹{it.price}</span>
                    </div>
                    <span className="font-bold font-serif">₹{it.quantity * it.price}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="p-3 bg-bakery-sand/40 rounded-xl space-y-1 text-right font-bold">
              <p>Subtotal: ₹{selectedOrderDetails.subtotal}</p>
              <p>Discount: -₹{selectedOrderDetails.discount}</p>
              <p>Delivery: ₹{selectedOrderDetails.deliveryFee}</p>
              <p>GST: ₹{selectedOrderDetails.gst}</p>
              <p className="text-sm text-bakery-caramel font-serif pt-1 border-t">
                Grand Total: ₹{selectedOrderDetails.grandTotal}
              </p>
            </div>

            <div className="pt-2 flex justify-end">
              <button
                onClick={() => setSelectedOrderDetails(null)}
                className="px-5 py-2 bg-bakery-blackberry text-white rounded-xl font-bold"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

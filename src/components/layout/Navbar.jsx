import React, { useState } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import {
  ShoppingBag,
  Heart,
  Search,
  User,
  ShieldCheck,
  Menu,
  X,
  Phone,
  Cake,
  Package
} from 'lucide-react';
import { useStore } from '../../context/StoreContext';

export const Navbar = () => {
  const {
    storeSettings,
    cart,
    wishlist,
    setIsCartDrawerOpen,
    products,
    setQuickViewProduct
  } = useStore();

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate();

  const totalCartCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  const searchResults = searchQuery.trim()
    ? products
        .filter(
          (p) =>
            p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            p.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
            p.description.toLowerCase().includes(searchQuery.toLowerCase())
        )
        .slice(0, 5)
    : [];

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      setSearchOpen(false);
      navigate(`/shop?search=${encodeURIComponent(searchQuery.trim())}`);
      setSearchQuery('');
    }
  };

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'Shop Menu', path: '/shop' },
    { name: 'Custom Cakes', path: '/cakes', icon: Cake },
    { name: 'Build a Box', path: '/build-a-box', icon: Package },
    { name: 'About Us', path: '/about' },
    { name: 'Contact', path: '/contact' }
  ];

  return (
    <>
      <header className="sticky top-0 z-40 bg-bakery-vanilla/95 backdrop-blur-md border-b border-bakery-border shadow-soft transition-all duration-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            {/* Mobile Menu Button */}
            <div className="flex items-center lg:hidden">
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="p-2 rounded-lg text-bakery-blackberry hover:bg-bakery-sand transition-colors"
                aria-label="Toggle menu"
              >
                {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>

            {/* Logo & Store Brand */}
            <div className="flex items-center gap-3">
              <Link to="/" className="flex items-center gap-2 group">
                <div className="w-10 h-10 rounded-full bg-bakery-caramel text-white flex items-center justify-center font-serif text-xl shadow-md group-hover:scale-105 transition-transform">
                  🥐
                </div>
                <div className="flex flex-col">
                  <span className="font-serif text-xl sm:text-2xl font-bold tracking-tight text-bakery-blackberry leading-none">
                    {storeSettings.storeName || 'Crumb & Co. Bakery'}
                  </span>
                  <span className="text-[10px] sm:text-xs font-medium text-bakery-muted tracking-widest uppercase mt-0.5">
                    Boutique Artisanal Bakes
                  </span>
                </div>
              </Link>
            </div>

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center gap-1 xl:gap-2">
              {navLinks.map((link) => {
                const Icon = link.icon;
                return (
                  <NavLink
                    key={link.path}
                    to={link.path}
                    className={({ isActive }) =>
                      `px-3 py-2 rounded-lg text-sm font-medium transition-colors flex items-center gap-1.5 ${
                        isActive
                          ? 'text-bakery-caramel bg-bakery-sand/70 font-semibold'
                          : 'text-bakery-blackberry/85 hover:text-bakery-caramel hover:bg-bakery-sand/40'
                      }`
                    }
                  >
                    {Icon && <Icon className="w-4 h-4 text-bakery-caramel" />}
                    {link.name}
                  </NavLink>
                );
              })}
            </nav>

            {/* Right Action Icons */}
            <div className="flex items-center gap-1 sm:gap-2">
              {/* Search Toggle */}
              <button
                onClick={() => setSearchOpen(!searchOpen)}
                className="p-2.5 rounded-full text-bakery-blackberry hover:text-bakery-caramel hover:bg-bakery-sand transition-colors relative"
                aria-label="Search catalogue"
                title="Search catalogue"
              >
                <Search className="w-5 h-5" />
              </button>

              {/* Wishlist */}
              <Link
                to="/account?tab=wishlist"
                className="p-2.5 rounded-full text-bakery-blackberry hover:text-bakery-caramel hover:bg-bakery-sand transition-colors relative"
                aria-label="Wishlist"
                title="Wishlist"
              >
                <Heart className="w-5 h-5" />
                {wishlist.length > 0 && (
                  <span className="absolute top-1 right-1 w-4 h-4 rounded-full bg-bakery-raspberry text-white text-[10px] font-bold flex items-center justify-center animate-pulse">
                    {wishlist.length}
                  </span>
                )}
              </Link>

              {/* Cart Drawer Trigger */}
              <button
                onClick={() => setIsCartDrawerOpen(true)}
                className="p-2.5 rounded-full bg-bakery-caramel text-white hover:bg-bakery-caramelHover transition-all shadow-md flex items-center gap-2 pl-3 pr-3.5 relative"
                aria-label="Shopping Cart"
              >
                <ShoppingBag className="w-5 h-5" />
                <span className="text-xs font-bold hidden sm:inline">Cart</span>
                {totalCartCount > 0 && (
                  <span className="w-5 h-5 rounded-full bg-white text-bakery-caramel text-xs font-extrabold flex items-center justify-center">
                    {totalCartCount}
                  </span>
                )}
              </button>

              {/* Customer Account */}
              <Link
                to="/account"
                className="hidden sm:flex p-2.5 rounded-full text-bakery-blackberry hover:text-bakery-caramel hover:bg-bakery-sand transition-colors"
                aria-label="Customer Account"
                title="Customer Account"
              >
                <User className="w-5 h-5" />
              </Link>

              {/* Admin Dashboard Link */}
              <Link
                to="/admin"
                className="p-2 rounded-lg text-xs font-medium text-bakery-muted hover:text-bakery-blackberry hover:bg-bakery-sand border border-bakery-border flex items-center gap-1 transition-colors"
                title="Bakery Manager Portal"
              >
                <ShieldCheck className="w-4 h-4 text-bakery-sage" />
                <span className="hidden xl:inline">Admin</span>
              </Link>
            </div>
          </div>
        </div>

        {/* Quick Search Dropdown Bar */}
        {searchOpen && (
          <div className="border-t border-bakery-border bg-white px-4 py-3 shadow-lg transition-all animate-fadeIn">
            <div className="max-w-3xl mx-auto">
              <form onSubmit={handleSearchSubmit} className="relative flex items-center">
                <Search className="w-5 h-5 absolute left-3 text-bakery-muted" />
                <input
                  type="text"
                  autoFocus
                  placeholder="Search sourdough, croissants, cheesecakes, brownies, tarts..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-24 py-2.5 bg-bakery-vanilla/60 rounded-xl border border-bakery-border text-sm focus:outline-none focus:border-bakery-caramel focus:ring-1 focus:ring-bakery-caramel"
                />
                <button
                  type="submit"
                  className="absolute right-2 px-3 py-1.5 bg-bakery-caramel text-white text-xs font-semibold rounded-lg hover:bg-bakery-caramelHover transition-colors"
                >
                  Search
                </button>
              </form>

              {/* Instant Suggestions */}
              {searchResults.length > 0 && (
                <div className="mt-2 bg-white rounded-xl border border-bakery-border divide-y divide-bakery-border/60 overflow-hidden shadow-soft">
                  {searchResults.map((item) => (
                    <div
                      key={item.id}
                      onClick={() => {
                        setQuickViewProduct(item);
                        setSearchOpen(false);
                      }}
                      className="p-2.5 flex items-center justify-between hover:bg-bakery-sand/50 cursor-pointer transition-colors"
                    >
                      <div className="flex items-center gap-3">
                        <img
                          src={item.image}
                          alt={item.name}
                          className="w-10 h-10 rounded-lg object-cover"
                          onError={(e) => {
                            e.target.style.display = 'none';
                          }}
                        />
                        <div>
                          <p className="text-sm font-medium text-bakery-blackberry leading-tight">
                            {item.name}
                          </p>
                          <span className="text-xs text-bakery-muted">{item.category}</span>
                        </div>
                      </div>
                      <span className="text-sm font-semibold text-bakery-caramel">
                        ₹{item.price}
                      </span>
                    </div>
                  ))}
                  <div className="p-2 text-center bg-bakery-vanilla/40">
                    <button
                      onClick={handleSearchSubmit}
                      className="text-xs font-semibold text-bakery-caramel hover:underline"
                    >
                      View all results for "{searchQuery}" →
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Mobile Navigation Drawer */}
        {mobileMenuOpen && (
          <div className="lg:hidden border-t border-bakery-border bg-bakery-vanilla px-4 pt-3 pb-6 shadow-xl space-y-2">
            {navLinks.map((link) => {
              const Icon = link.icon;
              return (
                <NavLink
                  key={link.path}
                  to={link.path}
                  onClick={() => setMobileMenuOpen(false)}
                  className={({ isActive }) =>
                    `flex items-center gap-3 px-4 py-3 rounded-xl text-base font-medium ${
                      isActive
                        ? 'bg-bakery-sand text-bakery-caramel font-semibold'
                        : 'text-bakery-blackberry hover:bg-bakery-sand/50'
                    }`
                  }
                >
                  {Icon && <Icon className="w-5 h-5 text-bakery-caramel" />}
                  {link.name}
                </NavLink>
              );
            })}
            <div className="pt-3 border-t border-bakery-border/80 flex flex-col gap-2">
              <Link
                to="/account"
                onClick={() => setMobileMenuOpen(false)}
                className="flex items-center gap-3 px-4 py-2.5 text-sm font-medium text-bakery-blackberry hover:bg-bakery-sand rounded-xl"
              >
                <User className="w-4 h-4 text-bakery-muted" />
                Customer Account / Order Tracking
              </Link>
              <Link
                to="/admin"
                onClick={() => setMobileMenuOpen(false)}
                className="flex items-center gap-3 px-4 py-2.5 text-sm font-medium text-bakery-blackberry hover:bg-bakery-sand rounded-xl"
              >
                <ShieldCheck className="w-4 h-4 text-bakery-sage" />
                Bakery Owner Admin Dashboard
              </Link>
              <a
                href={`tel:${storeSettings.phone}`}
                className="flex items-center gap-3 px-4 py-2 text-xs font-medium text-bakery-muted"
              >
                <Phone className="w-3.5 h-3.5" />
                {storeSettings.phone}
              </a>
            </div>
          </div>
        )}
      </header>
    </>
  );
};

import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  MapPin,
  Phone,
  Mail,
  Clock,
  MessageCircle,
  ArrowRight,
  CheckCircle2,
  ShieldAlert
} from 'lucide-react';
import { useStore } from '../../context/StoreContext';
import { CATEGORIES } from '../../data/products';

const InstagramIcon = () => (
  <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
  </svg>
);

const FacebookIcon = () => (
  <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
  </svg>
);

export const Footer = () => {
  const { storeSettings, showToast } = useStore();
  const [newsletterEmail, setNewsletterEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleNewsletterSubmit = (e) => {
    e.preventDefault();
    if (!newsletterEmail || !newsletterEmail.includes('@')) {
      showToast('Please enter a valid email address.', 'error');
      return;
    }

    // Save demo newsletter subscriber
    try {
      const existing = JSON.parse(localStorage.getItem('crumbco_newsletter') || '[]');
      if (!existing.includes(newsletterEmail)) {
        existing.push(newsletterEmail);
        localStorage.setItem('crumbco_newsletter', JSON.stringify(existing));
      }
    } catch (err) {
      console.warn(err);
    }

    setSubscribed(true);
    showToast('Thank you for subscribing! Check your inbox for sweet updates.', 'success');
    setNewsletterEmail('');
  };

  const whatsappUrl = `https://wa.me/${(storeSettings.whatsapp || '919876543210').replace(/[^0-9]/g, '')}?text=${encodeURIComponent('Hi Crumb & Co. Bakery! I have a question about placing an order.')}`;

  return (
    <footer className="bg-bakery-blackberry text-[#FDF8F5] pt-16 pb-8 border-t border-[#2C1F3D]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Newsletter Banner */}
        <div className="bg-gradient-to-r from-[#291C3A] to-[#1E152A] rounded-2xl p-6 sm:p-10 border border-[#3E2D56] shadow-xl mb-16 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="max-w-xl">
            <span className="text-bakery-caramel text-xs uppercase tracking-wider font-bold">
              Join Our Baker's Circle
            </span>
            <h3 className="font-serif text-2xl sm:text-3xl font-bold mt-1 text-white">
              Get Fresh Treats &amp; Secret Recipes
            </h3>
            <p className="text-sm text-[#D8CECC] mt-2">
              Subscribe to receive weekly seasonal bakes announcements, secret tasting invites, and a ₹100 welcome gift code.
            </p>
          </div>

          <form onSubmit={handleNewsletterSubmit} className="w-full md:w-auto flex flex-col sm:flex-row gap-2 max-w-md">
            <input
              type="email"
              placeholder="Enter your email address"
              value={newsletterEmail}
              onChange={(e) => setNewsletterEmail(e.target.value)}
              className="px-4 py-3 bg-[#170E22] rounded-xl border border-[#3E2D56] text-sm text-white placeholder-gray-400 focus:outline-none focus:border-bakery-caramel w-full sm:w-72"
              required
            />
            <button
              type="submit"
              className="px-6 py-3 bg-bakery-caramel hover:bg-bakery-caramelHover text-white text-sm font-semibold rounded-xl transition-colors shrink-0 flex items-center justify-center gap-2"
            >
              <span>{subscribed ? 'Subscribed!' : 'Subscribe'}</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </form>
        </div>

        {/* Main Footer Links Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-12 border-b border-[#2C1F3D]">
          {/* Col 1: Brand Info */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center gap-2">
              <div className="w-9 h-9 rounded-full bg-bakery-caramel text-white flex items-center justify-center font-serif text-lg">
                🥐
              </div>
              <span className="font-serif text-2xl font-bold text-white">
                {storeSettings.storeName || 'Crumb & Co. Bakery'}
              </span>
            </div>
            <p className="text-sm text-[#CEC2BF] leading-relaxed max-w-sm">
              {storeSettings.description ||
                "Bengaluru's premier boutique bakery offering slow-fermented sourdoughs, laminated French pastries, custom occasion cakes, and nostalgic savouries."}
            </p>

            <div className="pt-2 flex items-center gap-3">
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noreferrer"
                className="p-2.5 rounded-full bg-[#271E36] hover:bg-bakery-sage text-white transition-colors flex items-center gap-2 text-xs font-medium"
                title="Chat on WhatsApp"
              >
                <MessageCircle className="w-4 h-4 text-bakery-sage hover:text-white" />
                <span className="hidden sm:inline">WhatsApp Us</span>
              </a>
              <a
                href={storeSettings.instagram || 'https://instagram.com'}
                target="_blank"
                rel="noreferrer"
                className="p-2.5 rounded-full bg-[#271E36] hover:bg-bakery-caramel text-white transition-colors"
                title="Instagram"
              >
                <InstagramIcon />
              </a>
              <a
                href={storeSettings.facebook || 'https://facebook.com'}
                target="_blank"
                rel="noreferrer"
                className="p-2.5 rounded-full bg-[#271E36] hover:bg-bakery-caramel text-white transition-colors"
                title="Facebook"
              >
                <FacebookIcon />
              </a>
            </div>
          </div>

          {/* Col 2: Quick Links */}
          <div>
            <h4 className="font-serif text-base font-bold text-white mb-4">Explore</h4>
            <ul className="space-y-2.5 text-sm text-[#CEC2BF]">
              <li>
                <Link to="/" className="hover:text-bakery-caramel transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/shop" className="hover:text-bakery-caramel transition-colors">
                  Full Menu (52 Bakes)
                </Link>
              </li>
              <li>
                <Link to="/cakes" className="hover:text-bakery-caramel transition-colors">
                  Custom Cake Studio
                </Link>
              </li>
              <li>
                <Link to="/build-a-box" className="hover:text-bakery-caramel transition-colors">
                  Build Your Own Box
                </Link>
              </li>
              <li>
                <Link to="/account?tab=orders" className="hover:text-bakery-caramel transition-colors">
                  Track Your Order
                </Link>
              </li>
              <li>
                <Link to="/faq" className="hover:text-bakery-caramel transition-colors">
                  Frequently Asked Questions
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 3: Categories */}
          <div>
            <h4 className="font-serif text-base font-bold text-white mb-4">Categories</h4>
            <ul className="space-y-2.5 text-sm text-[#CEC2BF]">
              {CATEGORIES.filter((c) => c !== 'All').map((category) => (
                <li key={category}>
                  <Link
                    to={`/shop?category=${encodeURIComponent(category)}`}
                    className="hover:text-bakery-caramel transition-colors truncate block"
                  >
                    {category}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 4: Contact & Hours */}
          <div className="space-y-3">
            <h4 className="font-serif text-base font-bold text-white mb-4">Bakehouse Info</h4>
            <div className="flex items-start gap-2.5 text-xs sm:text-sm text-[#CEC2BF]">
              <MapPin className="w-4 h-4 text-bakery-caramel shrink-0 mt-0.5" />
              <span>{storeSettings.address}</span>
            </div>
            <div className="flex items-center gap-2.5 text-xs sm:text-sm text-[#CEC2BF]">
              <Phone className="w-4 h-4 text-bakery-sage shrink-0" />
              <a href={`tel:${storeSettings.phone}`} className="hover:underline">
                {storeSettings.phone}
              </a>
            </div>
            <div className="flex items-center gap-2.5 text-xs sm:text-sm text-[#CEC2BF]">
              <Mail className="w-4 h-4 text-bakery-caramel shrink-0" />
              <a href={`mailto:${storeSettings.email}`} className="hover:underline">
                {storeSettings.email}
              </a>
            </div>
            <div className="flex items-center gap-2.5 text-xs sm:text-sm text-[#CEC2BF]">
              <Clock className="w-4 h-4 text-bakery-sage shrink-0" />
              <span>{storeSettings.openingHours}</span>
            </div>
          </div>
        </div>

        {/* Legal & Policies */}
        <div className="pt-8 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-[#9B8F8D]">
          <div className="flex flex-wrap items-center gap-4">
            <Link to="/privacy" className="hover:text-white transition-colors">
              Privacy Policy
            </Link>
            <span>•</span>
            <Link to="/terms" className="hover:text-white transition-colors">
              Terms &amp; Conditions
            </Link>
            <span>•</span>
            <Link to="/refund" className="hover:text-white transition-colors">
              Refund &amp; Cancellation Policy
            </Link>
            <span>•</span>
            <Link to="/delivery" className="hover:text-white transition-colors">
              Delivery Policy
            </Link>
            <span>•</span>
            <Link to="/admin" className="text-bakery-sage hover:underline flex items-center gap-1">
              Admin Portal
            </Link>
          </div>

          <div className="text-center md:text-right">
            <p>© {new Date().getFullYear()} {storeSettings.storeName}. All rights reserved.</p>
            <p className="text-[11px] text-[#7A6B63] mt-0.5">
              Client Demo Application • Prices and dietary details are provisional.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

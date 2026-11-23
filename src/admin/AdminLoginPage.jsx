import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ShieldCheck, Lock, Mail, ArrowRight, AlertCircle } from 'lucide-react';
import { useStore } from '../context/StoreContext';

export const AdminLoginPage = () => {
  const { adminLogin, isAdminAuthenticated } = useStore();
  const navigate = useNavigate();

  const [email, setEmail] = useState('admin@crumbco.com');
  const [password, setPassword] = useState('admin123');
  const [error, setError] = useState('');

  if (isAdminAuthenticated) {
    navigate('/admin');
    return null;
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');
    const success = adminLogin(email, password);
    if (success) {
      navigate('/admin');
    } else {
      setError('Invalid admin credentials. Use admin@crumbco.com / admin123');
    }
  };

  return (
    <div className="min-h-[75vh] flex items-center justify-center p-4">
      <div className="bg-white rounded-3xl p-6 sm:p-10 border border-bakery-border shadow-2xl max-w-md w-full space-y-6">
        <div className="text-center space-y-2">
          <div className="w-14 h-14 rounded-2xl bg-bakery-blackberry text-white flex items-center justify-center mx-auto shadow-md">
            <ShieldCheck className="w-8 h-8 text-bakery-sage" />
          </div>
          <h1 className="font-serif text-2xl sm:text-3xl font-bold text-bakery-blackberry">
            Bakery Owner Portal
          </h1>
          <p className="text-xs text-bakery-muted">
            Manage catalogue, update prices, track orders &amp; configure store settings.
          </p>
        </div>

        {/* Demo Credentials Info Box */}
        <div className="p-3.5 bg-amber-50 rounded-2xl border border-amber-200 text-xs text-amber-900 space-y-1">
          <p className="font-bold flex items-center gap-1.5 text-amber-800">
            <Lock className="w-3.5 h-3.5" /> Client Demo Credentials:
          </p>
          <p>
            Email: <strong className="font-mono">admin@crumbco.com</strong>
          </p>
          <p>
            Password: <strong className="font-mono">admin123</strong>
          </p>
          <p className="text-[10px] text-amber-700 pt-0.5">
            This is a demonstration login to be backed by server-side authentication in production.
          </p>
        </div>

        {error && (
          <div className="p-3 bg-red-50 border border-red-200 text-bakery-raspberry text-xs rounded-xl flex items-center gap-2">
            <AlertCircle className="w-4 h-4 shrink-0" />
            <span>{error}</span>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4 text-xs">
          <div>
            <label className="block font-bold uppercase tracking-wider text-bakery-blackberry mb-1">
              Admin Email
            </label>
            <div className="relative">
              <Mail className="w-4 h-4 absolute left-3 top-2.5 text-bakery-muted" />
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full pl-9 pr-3 py-2.5 rounded-xl border border-bakery-border focus:outline-none focus:border-bakery-caramel font-semibold"
                required
              />
            </div>
          </div>

          <div>
            <label className="block font-bold uppercase tracking-wider text-bakery-blackberry mb-1">
              Admin Password
            </label>
            <div className="relative">
              <Lock className="w-4 h-4 absolute left-3 top-2.5 text-bakery-muted" />
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full pl-9 pr-3 py-2.5 rounded-xl border border-bakery-border focus:outline-none focus:border-bakery-caramel font-semibold"
                required
              />
            </div>
          </div>

          <button
            type="submit"
            className="w-full py-3.5 bg-bakery-blackberry hover:bg-black text-white font-bold rounded-xl shadow-md transition-colors flex items-center justify-center gap-2"
          >
            <span>Sign In to Bakery Dashboard</span>
            <ArrowRight className="w-4 h-4 text-bakery-caramel" />
          </button>
        </form>
      </div>
    </div>
  );
};

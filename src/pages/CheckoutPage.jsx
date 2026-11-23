import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import {
  CreditCard,
  QrCode,
  Banknote,
  Building2,
  Wallet,
  CheckCircle2,
  AlertCircle,
  Truck,
  Store,
  Calendar,
  Clock,
  ShieldCheck,
  Lock,
  Copy,
  Check,
  Sparkles,
  ArrowRight
} from 'lucide-react';
import { useStore } from '../context/StoreContext';

export const CheckoutPage = () => {
  const {
    cart,
    subtotal,
    discount,
    deliveryFee,
    gst,
    grandTotal,
    appliedCoupon,
    storeSettings,
    customer,
    createOrder,
    deliveryType,
    setDeliveryType,
    showToast
  } = useStore();

  const navigate = useNavigate();

  // Redirect if cart is empty
  if (cart.length === 0) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 text-center space-y-4">
        <h2 className="font-serif text-2xl font-bold text-bakery-blackberry">
          Your basket is empty
        </h2>
        <p className="text-sm text-bakery-muted">
          Please add items to your basket before proceeding to checkout.
        </p>
        <Link
          to="/shop"
          className="inline-block px-6 py-2.5 bg-bakery-caramel text-white text-xs font-bold rounded-xl"
        >
          Return to Shop
        </Link>
      </div>
    );
  }

  // Customer & Shipping Form State
  const [formData, setFormData] = useState({
    fullName: customer.name || 'Priya Sundaram',
    email: customer.email || 'priya.sundaram@example.com',
    phone: customer.phone || '9876543210',
    streetAddress: customer.addresses?.[0]?.street || 'Flat 402, Magnolia Orchards, 10th Cross, Indiranagar',
    city: 'Bengaluru',
    pincode: '560038',
    deliveryDate: () => {
      const d = new Date();
      d.setDate(d.getDate() + 1);
      return d.toISOString().split('T')[0];
    },
    deliverySlot: 'Morning (9:00 AM – 12:00 PM)',
    giftNote: '',
    specialInstructions: ''
  });

  // Selected Payment Method
  // 'upi', 'card', 'cod', 'netbanking', 'wallet'
  const [paymentMethod, setPaymentMethod] = useState('upi');
  const [selectedUpiApp, setSelectedUpiApp] = useState('gpay');
  const [selectedBank, setSelectedBank] = useState('HDFC Bank');
  const [selectedWallet, setSelectedWallet] = useState('Amazon Pay');

  // Card Form State
  const [cardData, setCardData] = useState({
    cardholder: 'Priya Sundaram',
    cardNumber: '4532 •••• •••• 8892',
    rawCardNumber: '4532889211248892',
    expiry: '08/28',
    cvv: '321'
  });

  // Test OTP Modal State for Card
  const [showOtpModal, setShowOtpModal] = useState(false);
  const [enteredOtp, setEnteredOtp] = useState('');
  const [otpError, setOtpError] = useState('');

  // Processing state
  const [isProcessing, setIsProcessing] = useState(false);
  const [copiedUpi, setCopiedUpi] = useState(false);
  const [formErrors, setFormErrors] = useState({});

  const isCodAllowed = grandTotal <= 500;

  // Handle Form Change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (formErrors[name]) {
      setFormErrors((prev) => ({ ...prev, [name]: '' }));
    }
  };

  // Copy UPI
  const handleCopyUpi = () => {
    navigator.clipboard.writeText(storeSettings.merchantUpiId || 'crumbandco@okhdfcbank');
    setCopiedUpi(true);
    showToast('Merchant UPI ID copied to clipboard!', 'info');
    setTimeout(() => setCopiedUpi(false), 2500);
  };

  // Validate form
  const validateForm = () => {
    const errors = {};
    if (!formData.fullName.trim()) errors.fullName = 'Full name is required';
    if (!formData.email.trim() || !formData.email.includes('@')) errors.email = 'Valid email is required';

    const cleanPhone = formData.phone.replace(/[^0-9]/g, '');
    if (cleanPhone.length < 10) errors.phone = 'Valid 10-digit mobile number is required';

    if (deliveryType === 'delivery') {
      if (!formData.streetAddress.trim()) errors.streetAddress = 'Delivery address is required';
      if (!formData.pincode.trim() || formData.pincode.replace(/[^0-9]/g, '').length !== 6) {
        errors.pincode = 'Valid 6-digit PIN code is required';
      }
    }

    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  // Card Number Formatting & Detection
  const handleCardNumberChange = (e) => {
    const raw = e.target.value.replace(/[^0-9]/g, '').slice(0, 16);
    const formatted = raw.replace(/(\d{4})/g, '$1 ').trim();
    setCardData((prev) => ({ ...prev, cardNumber: formatted, rawCardNumber: raw }));
  };

  const getCardNetwork = (raw) => {
    if (raw.startsWith('4')) return 'Visa';
    if (raw.startsWith('5')) return 'MasterCard';
    if (raw.startsWith('6') || raw.startsWith('8')) return 'RuPay';
    if (raw.startsWith('3')) return 'American Express';
    return 'Card';
  };

  // Complete Order
  const finalizeOrder = (methodUsed) => {
    const orderData = {
      customer: {
        name: formData.fullName,
        email: formData.email,
        phone: formData.phone,
        type: deliveryType,
        address: deliveryType === 'delivery' ? formData.streetAddress : storeSettings.address,
        city: formData.city,
        pincode: formData.pincode,
        preferredDate: formData.deliveryDate,
        preferredTime: formData.deliverySlot,
        giftNote: formData.giftNote,
        specialInstructions: formData.specialInstructions
      },
      paymentMethod: methodUsed
    };

    const newOrder = createOrder(orderData);
    navigate(`/order-confirmation/${newOrder.orderId}`);
  };

  // Submit Order button clicked
  const handleProceedPayment = (e) => {
    e.preventDefault();
    if (!validateForm()) {
      showToast('Please fix the highlighted form errors before continuing.', 'error');
      return;
    }

    if (paymentMethod === 'cod') {
      if (!isCodAllowed) {
        showToast('Cash on Delivery is available only for orders up to ₹500.', 'error');
        return;
      }
      setIsProcessing(true);
      setTimeout(() => {
        setIsProcessing(false);
        finalizeOrder('Cash on Delivery');
      }, 1500);
      return;
    }

    if (paymentMethod === 'card') {
      if (cardData.rawCardNumber.length < 15 || !cardData.expiry || !cardData.cvv) {
        showToast('Please enter valid test card details.', 'error');
        return;
      }
      // Open Simulated Test OTP modal
      setShowOtpModal(true);
      return;
    }

    // UPI, Netbanking, Wallets
    setIsProcessing(true);
    setTimeout(() => {
      setIsProcessing(false);
      const methodLabel =
        paymentMethod === 'upi'
          ? `UPI (${selectedUpiApp.toUpperCase()})`
          : paymentMethod === 'netbanking'
          ? `Net Banking (${selectedBank})`
          : `Wallet (${selectedWallet})`;
      finalizeOrder(methodLabel);
    }, 2200);
  };

  // Verify Test OTP
  const handleVerifyOtp = (e) => {
    e.preventDefault();
    if (enteredOtp.trim() !== '123456') {
      setOtpError('Invalid OTP! Please enter test OTP: 123456');
      return;
    }
    setShowOtpModal(false);
    setIsProcessing(true);
    setTimeout(() => {
      setIsProcessing(false);
      finalizeOrder(`Card (${getCardNetwork(cardData.rawCardNumber)} ending in ${cardData.rawCardNumber.slice(-4)})`);
    }, 1200);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 space-y-8">
      {/* Header */}
      <div className="border-b border-bakery-border pb-6">
        <span className="text-xs font-bold text-bakery-caramel uppercase tracking-wider block">
          Secure Express Checkout
        </span>
        <h1 className="font-serif text-3xl sm:text-4xl font-bold text-bakery-blackberry mt-1">
          Delivery Details &amp; Payment
        </h1>
      </div>

      {/* Warning Alert: Demo Flow */}
      <div className="p-4 bg-amber-50 border border-amber-200 rounded-2xl flex items-start gap-3 text-xs text-amber-900 shadow-sm">
        <ShieldCheck className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
        <div className="space-y-0.5">
          <p className="font-bold">Demonstration Payment Sandbox Mode</p>
          <p className="text-amber-800 leading-relaxed">
            All payment flows are simulated for this boutique client demo. No real funds are deducted. Ready for server-side integration with Razorpay or Paytm Payment Gateway.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Column: Customer Form & Payment Options */}
        <div className="lg:col-span-7 space-y-8">
          {/* 1. Customer Information Card */}
          <div className="bg-white rounded-3xl p-6 sm:p-8 border border-bakery-border shadow-soft space-y-6">
            <h3 className="font-serif text-xl font-bold text-bakery-blackberry flex items-center gap-2">
              <span className="w-6 h-6 rounded-full bg-bakery-sand text-bakery-caramel text-xs font-bold flex items-center justify-center">
                1
              </span>
              <span>Customer &amp; Contact Details</span>
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-bakery-blackberry uppercase tracking-wider mb-1">
                  Full Name *
                </label>
                <input
                  type="text"
                  name="fullName"
                  value={formData.fullName}
                  onChange={handleChange}
                  placeholder="e.g. Rahul Sharma"
                  className={`w-full p-2.5 rounded-xl border text-xs focus:outline-none ${
                    formErrors.fullName ? 'border-bakery-raspberry bg-red-50/50' : 'border-bakery-border focus:border-bakery-caramel'
                  }`}
                />
                {formErrors.fullName && (
                  <p className="text-[11px] text-bakery-raspberry mt-1">{formErrors.fullName}</p>
                )}
              </div>

              <div>
                <label className="block text-xs font-bold text-bakery-blackberry uppercase tracking-wider mb-1">
                  Mobile Number *
                </label>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  placeholder="10-digit number"
                  className={`w-full p-2.5 rounded-xl border text-xs focus:outline-none ${
                    formErrors.phone ? 'border-bakery-raspberry bg-red-50/50' : 'border-bakery-border focus:border-bakery-caramel'
                  }`}
                />
                {formErrors.phone && (
                  <p className="text-[11px] text-bakery-raspberry mt-1">{formErrors.phone}</p>
                )}
              </div>

              <div className="sm:col-span-2">
                <label className="block text-xs font-bold text-bakery-blackberry uppercase tracking-wider mb-1">
                  Email Address (For Invoice) *
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="your.email@example.com"
                  className={`w-full p-2.5 rounded-xl border text-xs focus:outline-none ${
                    formErrors.email ? 'border-bakery-raspberry bg-red-50/50' : 'border-bakery-border focus:border-bakery-caramel'
                  }`}
                />
                {formErrors.email && (
                  <p className="text-[11px] text-bakery-raspberry mt-1">{formErrors.email}</p>
                )}
              </div>
            </div>
          </div>

          {/* 2. Delivery or Store Pickup Card */}
          <div className="bg-white rounded-3xl p-6 sm:p-8 border border-bakery-border shadow-soft space-y-6">
            <h3 className="font-serif text-xl font-bold text-bakery-blackberry flex items-center gap-2">
              <span className="w-6 h-6 rounded-full bg-bakery-sand text-bakery-caramel text-xs font-bold flex items-center justify-center">
                2
              </span>
              <span>Fulfillment &amp; Delivery Address</span>
            </h3>

            {/* Toggle Delivery vs Pickup */}
            <div className="grid grid-cols-2 gap-3">
              <button
                type="button"
                onClick={() => setDeliveryType('delivery')}
                className={`p-4 rounded-2xl border text-left flex items-start gap-3 transition-all ${
                  deliveryType === 'delivery'
                    ? 'border-bakery-caramel bg-bakery-sand/60 ring-2 ring-bakery-caramel/30 font-bold'
                    : 'border-bakery-border hover:bg-bakery-card'
                }`}
              >
                <Truck className="w-5 h-5 text-bakery-caramel shrink-0 mt-0.5" />
                <div>
                  <span className="text-xs sm:text-sm font-bold block text-bakery-blackberry">
                    Home Delivery
                  </span>
                  <span className="text-[11px] text-bakery-muted block mt-0.5">
                    Fresh doorstep delivery across Bengaluru
                  </span>
                </div>
              </button>

              <button
                type="button"
                onClick={() => setDeliveryType('pickup')}
                className={`p-4 rounded-2xl border text-left flex items-start gap-3 transition-all ${
                  deliveryType === 'pickup'
                    ? 'border-bakery-caramel bg-bakery-sand/60 ring-2 ring-bakery-caramel/30 font-bold'
                    : 'border-bakery-border hover:bg-bakery-card'
                }`}
              >
                <Store className="w-5 h-5 text-bakery-sage shrink-0 mt-0.5" />
                <div>
                  <span className="text-xs sm:text-sm font-bold block text-bakery-blackberry">
                    Bakehouse Pickup
                  </span>
                  <span className="text-[11px] text-bakery-muted block mt-0.5">
                    Collect from Indiranagar bakery (₹0 fee)
                  </span>
                </div>
              </button>
            </div>

            {deliveryType === 'delivery' ? (
              <div className="space-y-4 pt-2">
                <div>
                  <label className="block text-xs font-bold text-bakery-blackberry uppercase tracking-wider mb-1">
                    Street Address &amp; Flat/Building *
                  </label>
                  <textarea
                    rows={2}
                    name="streetAddress"
                    value={formData.streetAddress}
                    onChange={handleChange}
                    placeholder="House/Flat number, building name, street, landmark"
                    className={`w-full p-2.5 rounded-xl border text-xs focus:outline-none ${
                      formErrors.streetAddress ? 'border-bakery-raspberry bg-red-50/50' : 'border-bakery-border focus:border-bakery-caramel'
                    }`}
                  />
                  {formErrors.streetAddress && (
                    <p className="text-[11px] text-bakery-raspberry mt-1">{formErrors.streetAddress}</p>
                  )}
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-bakery-blackberry uppercase tracking-wider mb-1">
                      City
                    </label>
                    <input
                      type="text"
                      name="city"
                      value={formData.city}
                      readOnly
                      className="w-full p-2.5 rounded-xl border border-bakery-border bg-gray-50 text-xs font-semibold text-bakery-blackberry"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-bakery-blackberry uppercase tracking-wider mb-1">
                      PIN Code (6 Digits) *
                    </label>
                    <input
                      type="text"
                      name="pincode"
                      maxLength={6}
                      value={formData.pincode}
                      onChange={handleChange}
                      placeholder="e.g. 560038"
                      className={`w-full p-2.5 rounded-xl border text-xs focus:outline-none ${
                        formErrors.pincode ? 'border-bakery-raspberry bg-red-50/50' : 'border-bakery-border focus:border-bakery-caramel'
                      }`}
                    />
                    {formErrors.pincode && (
                      <p className="text-[11px] text-bakery-raspberry mt-1">{formErrors.pincode}</p>
                    )}
                  </div>
                </div>
              </div>
            ) : (
              <div className="p-4 bg-bakery-sand/50 rounded-2xl border border-bakery-border text-xs space-y-1">
                <span className="font-bold text-bakery-blackberry">Store Pickup Address:</span>
                <p className="text-bakery-muted">{storeSettings.address}</p>
                <p className="text-bakery-sage font-semibold">Ready for collection in 45-60 mins of order confirmation.</p>
              </div>
            )}

            {/* Delivery Date & Time Slot */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2 border-t border-bakery-border/70">
              <div>
                <label className="block text-xs font-bold text-bakery-blackberry uppercase tracking-wider mb-1">
                  Preferred Date
                </label>
                <input
                  type="date"
                  name="deliveryDate"
                  min={new Date().toISOString().split('T')[0]}
                  value={typeof formData.deliveryDate === 'function' ? formData.deliveryDate() : formData.deliveryDate}
                  onChange={handleChange}
                  className="w-full p-2.5 rounded-xl border border-bakery-border text-xs focus:outline-none focus:border-bakery-caramel"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-bakery-blackberry uppercase tracking-wider mb-1">
                  Preferred Time Window
                </label>
                <select
                  name="deliverySlot"
                  value={formData.deliverySlot}
                  onChange={handleChange}
                  className="w-full p-2.5 rounded-xl border border-bakery-border text-xs font-medium focus:outline-none focus:border-bakery-caramel"
                >
                  <option value="Morning (9:00 AM – 12:00 PM)">Morning (9:00 AM – 12:00 PM)</option>
                  <option value="Afternoon (1:00 PM – 4:00 PM)">Afternoon (1:00 PM – 4:00 PM)</option>
                  <option value="Evening (5:00 PM – 8:30 PM)">Evening (5:00 PM – 8:30 PM)</option>
                </select>
              </div>
            </div>

            {/* Gift Note & Special Instructions */}
            <div className="space-y-3 pt-2 border-t border-bakery-border/70">
              <div>
                <label className="block text-xs font-bold text-bakery-blackberry uppercase tracking-wider mb-1">
                  Gift Note (Optional card message)
                </label>
                <input
                  type="text"
                  name="giftNote"
                  value={formData.giftNote}
                  onChange={handleChange}
                  placeholder="e.g. Wishing you a very sweet birthday!"
                  className="w-full p-2.5 rounded-xl border border-bakery-border text-xs focus:outline-none focus:border-bakery-caramel"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-bakery-blackberry uppercase tracking-wider mb-1">
                  Special Delivery Instructions
                </label>
                <input
                  type="text"
                  name="specialInstructions"
                  value={formData.specialInstructions}
                  onChange={handleChange}
                  placeholder="e.g. Leave with security, do not ring doorbell"
                  className="w-full p-2.5 rounded-xl border border-bakery-border text-xs focus:outline-none focus:border-bakery-caramel"
                />
              </div>
            </div>
          </div>

          {/* 3. Payment Methods (Section 13) */}
          <div className="bg-white rounded-3xl p-6 sm:p-8 border border-bakery-border shadow-soft space-y-6">
            <h3 className="font-serif text-xl font-bold text-bakery-blackberry flex items-center gap-2">
              <span className="w-6 h-6 rounded-full bg-bakery-sand text-bakery-caramel text-xs font-bold flex items-center justify-center">
                3
              </span>
              <span>Simulated Payment Gateway</span>
            </h3>

            {/* Payment Method Selector Tabs */}
            <div className="grid grid-cols-2 sm:grid-cols-5 gap-2">
              <button
                type="button"
                onClick={() => setPaymentMethod('upi')}
                className={`p-3 rounded-2xl border text-center transition-all ${
                  paymentMethod === 'upi'
                    ? 'border-bakery-caramel bg-bakery-sand/70 ring-2 ring-bakery-caramel/30 font-bold'
                    : 'border-bakery-border hover:bg-bakery-card'
                }`}
              >
                <QrCode className="w-5 h-5 mx-auto text-bakery-caramel mb-1" />
                <span className="text-xs font-bold block">UPI Apps</span>
              </button>

              <button
                type="button"
                onClick={() => setPaymentMethod('card')}
                className={`p-3 rounded-2xl border text-center transition-all ${
                  paymentMethod === 'card'
                    ? 'border-bakery-caramel bg-bakery-sand/70 ring-2 ring-bakery-caramel/30 font-bold'
                    : 'border-bakery-border hover:bg-bakery-card'
                }`}
              >
                <CreditCard className="w-5 h-5 mx-auto text-bakery-caramel mb-1" />
                <span className="text-xs font-bold block">Card</span>
              </button>

              <button
                type="button"
                onClick={() => setPaymentMethod('cod')}
                className={`p-3 rounded-2xl border text-center transition-all ${
                  paymentMethod === 'cod'
                    ? 'border-bakery-caramel bg-bakery-sand/70 ring-2 ring-bakery-caramel/30 font-bold'
                    : 'border-bakery-border hover:bg-bakery-card'
                }`}
              >
                <Banknote className="w-5 h-5 mx-auto text-bakery-caramel mb-1" />
                <span className="text-xs font-bold block">COD</span>
              </button>

              <button
                type="button"
                onClick={() => setPaymentMethod('netbanking')}
                className={`p-3 rounded-2xl border text-center transition-all ${
                  paymentMethod === 'netbanking'
                    ? 'border-bakery-caramel bg-bakery-sand/70 ring-2 ring-bakery-caramel/30 font-bold'
                    : 'border-bakery-border hover:bg-bakery-card'
                }`}
              >
                <Building2 className="w-5 h-5 mx-auto text-bakery-caramel mb-1" />
                <span className="text-xs font-bold block">NetBanking</span>
              </button>

              <button
                type="button"
                onClick={() => setPaymentMethod('wallet')}
                className={`p-3 rounded-2xl border text-center transition-all ${
                  paymentMethod === 'wallet'
                    ? 'border-bakery-caramel bg-bakery-sand/70 ring-2 ring-bakery-caramel/30 font-bold'
                    : 'border-bakery-border hover:bg-bakery-card'
                }`}
              >
                <Wallet className="w-5 h-5 mx-auto text-bakery-caramel mb-1" />
                <span className="text-xs font-bold block">Wallets</span>
              </button>
            </div>

            {/* TAB CONTENT: 1. UPI */}
            {paymentMethod === 'upi' && (
              <div className="p-5 bg-bakery-vanilla/60 rounded-2xl border border-bakery-border space-y-4">
                <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
                  {/* UPI QR Display */}
                  <div className="flex flex-col items-center p-3 bg-white rounded-2xl border border-bakery-border shadow-sm text-center">
                    <div className="w-32 h-32 bg-bakery-sand/40 rounded-xl flex items-center justify-center p-2 relative overflow-hidden">
                      <QrCode className="w-24 h-24 text-bakery-blackberry" />
                      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-bakery-caramel/20 to-transparent animate-pulse" />
                    </div>
                    <span className="text-[10px] text-bakery-muted mt-1.5 font-bold">
                      Scan with any UPI App
                    </span>
                  </div>

                  {/* Merchant details */}
                  <div className="flex-1 space-y-3 text-center sm:text-left">
                    <div>
                      <span className="text-xs text-bakery-muted block">Merchant VPA (UPI ID):</span>
                      <div className="flex items-center gap-2 mt-0.5 justify-center sm:justify-start">
                        <code className="text-xs font-bold text-bakery-blackberry bg-white px-2.5 py-1 rounded-lg border border-bakery-border">
                          {storeSettings.merchantUpiId || 'crumbandco@okhdfcbank'}
                        </code>
                        <button
                          type="button"
                          onClick={handleCopyUpi}
                          className="p-1.5 bg-white hover:bg-bakery-sand rounded-lg border border-bakery-border text-bakery-muted hover:text-bakery-blackberry transition-colors"
                          title="Copy UPI ID"
                        >
                          {copiedUpi ? <Check className="w-3.5 h-3.5 text-bakery-sage" /> : <Copy className="w-3.5 h-3.5" />}
                        </button>
                      </div>
                    </div>

                    <div className="space-y-1.5">
                      <span className="text-xs font-bold text-bakery-blackberry block">
                        Select Preferred UPI App:
                      </span>
                      <div className="flex flex-wrap gap-2 justify-center sm:justify-start">
                        {['gpay', 'phonepe', 'paytm', 'bhim'].map((app) => (
                          <button
                            type="button"
                            key={app}
                            onClick={() => setSelectedUpiApp(app)}
                            className={`px-3 py-1.5 rounded-xl border text-xs font-bold uppercase ${
                              selectedUpiApp === app
                                ? 'bg-bakery-caramel text-white border-bakery-caramel'
                                : 'bg-white border-bakery-border text-bakery-blackberry'
                            }`}
                          >
                            {app}
                          </button>
                        ))}
                      </div>
                    </div>

                    <p className="text-[11px] text-bakery-muted">
                      Amount to Authorize: <strong className="text-bakery-caramel text-sm">₹{grandTotal}</strong>
                    </p>
                  </div>
                </div>
              </div>
            )}

            {/* TAB CONTENT: 2. Card */}
            {paymentMethod === 'card' && (
              <div className="p-5 bg-bakery-vanilla/60 rounded-2xl border border-bakery-border space-y-4">
                <div className="flex items-center justify-between text-xs text-bakery-muted">
                  <span className="font-semibold text-bakery-blackberry">
                    Card Type: {getCardNetwork(cardData.rawCardNumber)}
                  </span>
                  <span className="flex items-center gap-1 text-[11px] text-bakery-sage font-bold">
                    <Lock className="w-3 h-3" /> Sandbox 256-bit Simulated
                  </span>
                </div>

                <div className="space-y-3">
                  <div>
                    <label className="block text-[11px] font-bold text-bakery-blackberry uppercase tracking-wider mb-1">
                      Cardholder Name
                    </label>
                    <input
                      type="text"
                      value={cardData.cardholder}
                      onChange={(e) => setCardData({ ...cardData, cardholder: e.target.value })}
                      placeholder="Name on card"
                      className="w-full p-2.5 rounded-xl border border-bakery-border bg-white text-xs font-semibold focus:outline-none focus:border-bakery-caramel"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] font-bold text-bakery-blackberry uppercase tracking-wider mb-1">
                      Card Number
                    </label>
                    <div className="relative">
                      <CreditCard className="w-4 h-4 absolute left-3 top-2.5 text-bakery-muted" />
                      <input
                        type="text"
                        value={cardData.cardNumber}
                        onChange={handleCardNumberChange}
                        placeholder="•••• •••• •••• ••••"
                        maxLength={19}
                        className="w-full pl-9 pr-3 py-2.5 rounded-xl border border-bakery-border bg-white text-xs font-mono font-bold focus:outline-none focus:border-bakery-caramel"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-[11px] font-bold text-bakery-blackberry uppercase tracking-wider mb-1">
                        Expiry (MM/YY)
                      </label>
                      <input
                        type="text"
                        maxLength={5}
                        value={cardData.expiry}
                        onChange={(e) => setCardData({ ...cardData, expiry: e.target.value })}
                        placeholder="MM/YY"
                        className="w-full p-2.5 rounded-xl border border-bakery-border bg-white text-xs font-semibold focus:outline-none focus:border-bakery-caramel"
                      />
                    </div>

                    <div>
                      <label className="block text-[11px] font-bold text-bakery-blackberry uppercase tracking-wider mb-1">
                        CVV (3 Digits)
                      </label>
                      <input
                        type="password"
                        maxLength={3}
                        value={cardData.cvv}
                        onChange={(e) => setCardData({ ...cardData, cvv: e.target.value })}
                        placeholder="•••"
                        className="w-full p-2.5 rounded-xl border border-bakery-border bg-white text-xs font-mono font-bold focus:outline-none focus:border-bakery-caramel"
                      />
                    </div>
                  </div>
                </div>

                <p className="text-[10px] text-bakery-muted italic">
                  Note: Card numbers, CVV and test OTP are never stored in LocalStorage for client privacy compliance.
                </p>
              </div>
            )}

            {/* TAB CONTENT: 3. Cash on Delivery (COD) */}
            {paymentMethod === 'cod' && (
              <div className="p-5 bg-bakery-vanilla/60 rounded-2xl border border-bakery-border space-y-3">
                <div className="flex items-center gap-2">
                  <Banknote className="w-5 h-5 text-bakery-caramel" />
                  <h4 className="font-bold text-sm text-bakery-blackberry">
                    Cash on Delivery (COD) Guidelines
                  </h4>
                </div>

                {isCodAllowed ? (
                  <div className="p-3 bg-bakery-sage/15 border border-bakery-sage/40 rounded-xl text-xs text-bakery-blackberry space-y-1">
                    <p className="font-bold text-bakery-sage flex items-center gap-1">
                      <CheckCircle2 className="w-4 h-4" /> COD is eligible for this order (₹{grandTotal} ≤ ₹500)
                    </p>
                    <p className="text-[11px] text-bakery-muted">
                      Please keep exact cash ready upon delivery or scan our delivery executive's UPI QR code.
                    </p>
                  </div>
                ) : (
                  <div className="p-3 bg-red-50 border border-red-200 rounded-xl text-xs text-red-900 space-y-1">
                    <p className="font-bold flex items-center gap-1.5 text-bakery-raspberry">
                      <AlertCircle className="w-4 h-4 shrink-0" />
                      Cash on Delivery is available only for orders up to ₹500. Please select another payment method.
                    </p>
                    <p className="text-[11px] text-red-800">
                      Your current order total is <strong>₹{grandTotal}</strong>. Please select UPI, Card, Net Banking or Wallets to complete your order.
                    </p>
                  </div>
                )}
              </div>
            )}

            {/* TAB CONTENT: 4. Net Banking */}
            {paymentMethod === 'netbanking' && (
              <div className="p-5 bg-bakery-vanilla/60 rounded-2xl border border-bakery-border space-y-3">
                <label className="block text-xs font-bold text-bakery-blackberry">
                  Select Your Indian Banking Partner:
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {['HDFC Bank', 'ICICI Bank', 'SBI', 'Axis Bank', 'Kotak Mahindra Bank'].map((bank) => (
                    <button
                      type="button"
                      key={bank}
                      onClick={() => setSelectedBank(bank)}
                      className={`p-3 rounded-xl border text-left text-xs font-bold flex items-center justify-between ${
                        selectedBank === bank
                          ? 'bg-bakery-caramel text-white border-bakery-caramel'
                          : 'bg-white border-bakery-border text-bakery-blackberry hover:bg-bakery-sand/40'
                      }`}
                    >
                      <span>{bank}</span>
                      {selectedBank === bank && <Check className="w-4 h-4" />}
                    </button>
                  ))}
                </div>
                <p className="text-[11px] text-bakery-muted">
                  Simulated secure redirect to {selectedBank} NetBanking gateway.
                </p>
              </div>
            )}

            {/* TAB CONTENT: 5. Wallets */}
            {paymentMethod === 'wallet' && (
              <div className="p-5 bg-bakery-vanilla/60 rounded-2xl border border-bakery-border space-y-3">
                <label className="block text-xs font-bold text-bakery-blackberry">
                  Select Digital Wallet:
                </label>
                <div className="grid grid-cols-3 gap-2">
                  {['Amazon Pay', 'Mobikwik', 'Freecharge'].map((w) => (
                    <button
                      type="button"
                      key={w}
                      onClick={() => setSelectedWallet(w)}
                      className={`p-3 rounded-xl border text-center text-xs font-bold ${
                        selectedWallet === w
                          ? 'bg-bakery-caramel text-white border-bakery-caramel'
                          : 'bg-white border-bakery-border text-bakery-blackberry hover:bg-bakery-sand/40'
                      }`}
                    >
                      {w}
                    </button>
                  ))}
                </div>
                <p className="text-[11px] text-bakery-muted">
                  One-click simulated authorization with {selectedWallet}.
                </p>
              </div>
            )}
          </div>
        </div>

        {/* Right Column: Order Summary & Place Order Button */}
        <div className="lg:col-span-5 sticky top-28 space-y-6">
          <div className="bg-white rounded-3xl p-6 sm:p-8 border border-bakery-border shadow-soft space-y-6">
            <h3 className="font-serif text-xl font-bold text-bakery-blackberry border-b border-bakery-border pb-3">
              Order Summary ({cart.reduce((s, i) => s + i.quantity, 0)} Items)
            </h3>

            {/* Items snippet */}
            <div className="max-h-60 overflow-y-auto space-y-3 pr-1">
              {cart.map((item) => (
                <div key={item.cartItemId} className="flex items-center justify-between text-xs gap-3">
                  <div className="flex items-center gap-2 overflow-hidden">
                    <span className="w-5 h-5 rounded-md bg-bakery-sand text-bakery-blackberry text-[10px] font-bold flex items-center justify-center shrink-0">
                      {item.quantity}×
                    </span>
                    <span className="font-semibold text-bakery-blackberry truncate">
                      {item.name}
                    </span>
                  </div>
                  <span className="font-bold text-bakery-blackberry shrink-0">
                    ₹{item.price * item.quantity}
                  </span>
                </div>
              ))}
            </div>

            {/* Cost Breakdown */}
            <div className="space-y-2 text-xs text-bakery-blackberry/85 border-t border-bakery-border pt-4">
              <div className="flex justify-between">
                <span>Subtotal</span>
                <span className="font-semibold">₹{subtotal}</span>
              </div>
              {discount > 0 && (
                <div className="flex justify-between text-bakery-sage font-medium">
                  <span>Coupon Discount ({appliedCoupon?.code})</span>
                  <span>-₹{discount}</span>
                </div>
              )}
              <div className="flex justify-between">
                <span>Delivery Charge</span>
                <span className="font-semibold">
                  {deliveryFee === 0 ? <strong className="text-bakery-sage">FREE</strong> : `₹${deliveryFee}`}
                </span>
              </div>
              <div className="flex justify-between">
                <span>Estimated GST ({storeSettings.gstPercent}%)</span>
                <span className="font-semibold">₹{gst}</span>
              </div>

              <div className="flex justify-between items-baseline pt-3 border-t border-bakery-border text-base font-bold text-bakery-blackberry">
                <span>Payable Amount</span>
                <span className="font-serif text-2xl text-bakery-caramel font-extrabold">
                  ₹{grandTotal}
                </span>
              </div>
            </div>

            {/* Submit button */}
            <button
              type="button"
              onClick={handleProceedPayment}
              disabled={isProcessing || (paymentMethod === 'cod' && !isCodAllowed)}
              className={`w-full py-4 rounded-2xl font-bold text-sm shadow-hover flex items-center justify-center gap-2 transition-all ${
                isProcessing
                  ? 'bg-gray-400 text-white cursor-wait'
                  : paymentMethod === 'cod' && !isCodAllowed
                  ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                  : 'bg-bakery-caramel hover:bg-bakery-caramelHover text-white active:scale-95'
              }`}
            >
              {isProcessing ? (
                <span>Authorizing Simulated Payment...</span>
              ) : (
                <>
                  <ShieldCheck className="w-4 h-4" />
                  <span>
                    {paymentMethod === 'cod'
                      ? `Confirm Cash on Delivery Order (₹${grandTotal})`
                      : `Authorize & Pay ₹${grandTotal}`}
                  </span>
                </>
              )}
            </button>

            <div className="text-[11px] text-center text-bakery-muted space-y-1">
              <p>Safe &amp; tested with responsive LocalStorage persistence.</p>
              <p>Upon confirmation, an invoice &amp; 5-stage live tracker will be generated.</p>
            </div>
          </div>
        </div>
      </div>

      {/* Simulated 3D Secure OTP Modal for Card */}
      {showOtpModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-bakery-blackberry/70 backdrop-blur-sm animate-fadeIn">
          <div className="bg-white rounded-3xl p-6 sm:p-8 max-w-md w-full shadow-2xl border border-bakery-border space-y-5">
            <div className="text-center space-y-2">
              <div className="w-12 h-12 rounded-full bg-bakery-sand flex items-center justify-center mx-auto text-bakery-caramel">
                <Lock className="w-6 h-6" />
              </div>
              <h3 className="font-serif text-xl font-bold text-bakery-blackberry">
                Simulated Bank 3D-Secure OTP
              </h3>
              <p className="text-xs text-bakery-muted leading-relaxed">
                For testing purposes, an automated SMS was simulated to {formData.phone}. Enter the test OTP below:
              </p>
              <div className="p-2 bg-amber-50 rounded-xl border border-amber-200 text-xs font-mono font-bold text-amber-800">
                Demo Test OTP: 123456
              </div>
            </div>

            <form onSubmit={handleVerifyOtp} className="space-y-4">
              <div>
                <input
                  type="text"
                  maxLength={6}
                  autoFocus
                  placeholder="Enter 6-digit OTP"
                  value={enteredOtp}
                  onChange={(e) => setEnteredOtp(e.target.value)}
                  className="w-full text-center tracking-widest text-lg font-mono font-bold py-2.5 rounded-xl border border-bakery-border focus:outline-none focus:border-bakery-caramel"
                />
                {otpError && (
                  <p className="text-xs text-bakery-raspberry text-center mt-1 font-semibold">
                    {otpError}
                  </p>
                )}
              </div>

              <div className="flex gap-2">
                <button
                  type="button"
                  onClick={() => setShowOtpModal(false)}
                  className="flex-1 py-2.5 rounded-xl border border-bakery-border text-xs font-bold text-bakery-blackberry hover:bg-bakery-sand"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 py-2.5 rounded-xl bg-bakery-caramel hover:bg-bakery-caramelHover text-white text-xs font-bold shadow-md"
                >
                  Verify &amp; Confirm
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

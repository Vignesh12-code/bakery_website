import React from 'react';

export const PrivacyPolicyPage = () => (
  <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-6 text-xs sm:text-sm text-bakery-blackberry leading-relaxed">
    <h1 className="font-serif text-3xl font-bold">Privacy Policy</h1>
    <p className="text-bakery-muted">Last Updated: November 2026</p>
    <div className="bg-white p-6 sm:p-8 rounded-3xl border border-bakery-border shadow-soft space-y-4">
      <h3 className="font-serif text-lg font-bold">1. Information We Collect</h3>
      <p>
        At Crumb &amp; Co. Bakery, we collect customer delivery details, phone numbers, and email addresses solely to fulfill demo and actual orders. In this demonstration application, your data is securely stored locally in your browser's LocalStorage.
      </p>
      <h3 className="font-serif text-lg font-bold">2. Payment Security</h3>
      <p>
        We do not collect or store actual credit card credentials, CVVs, or bank passwords. All payments in this client build are simulated using demonstration authorization flows.
      </p>
      <h3 className="font-serif text-lg font-bold">3. Contact Inquiries</h3>
      <p>
        Messages submitted through our contact form are stored in local storage for demonstration purposes and are never sold or shared with third parties.
      </p>
    </div>
  </div>
);

export const TermsPage = () => (
  <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-6 text-xs sm:text-sm text-bakery-blackberry leading-relaxed">
    <h1 className="font-serif text-3xl font-bold">Terms &amp; Conditions</h1>
    <p className="text-bakery-muted">Last Updated: November 2026</p>
    <div className="bg-white p-6 sm:p-8 rounded-3xl border border-bakery-border shadow-soft space-y-4">
      <h3 className="font-serif text-lg font-bold">1. Boutique Bakery Orders</h3>
      <p>
        All orders placed on Crumb &amp; Co. Bakery represent handcrafted artisan bakery items prepared fresh on the day of dispatch.
      </p>
      <h3 className="font-serif text-lg font-bold">2. Pricing &amp; Menu Variations</h3>
      <p>
        Suggested prices and provisional dietary markers are subject to recipe verification by bakery management and can be updated anytime through the admin dashboard.
      </p>
      <h3 className="font-serif text-lg font-bold">3. Demonstration Limitations</h3>
      <p>
        This portal operates as a fully functional client demo with LocalStorage state persistence.
      </p>
    </div>
  </div>
);

export const RefundPolicyPage = () => (
  <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-6 text-xs sm:text-sm text-bakery-blackberry leading-relaxed">
    <h1 className="font-serif text-3xl font-bold">Refund &amp; Cancellation Policy</h1>
    <p className="text-bakery-muted">Last Updated: November 2026</p>
    <div className="bg-white p-6 sm:p-8 rounded-3xl border border-bakery-border shadow-soft space-y-4">
      <h3 className="font-serif text-lg font-bold">1. Perishable Goods Policy</h3>
      <p>
        Due to the perishable nature of freshly baked breads, pastries, and custom celebration cakes, orders that have entered the "Baking &amp; Preparation" stage cannot be cancelled.
      </p>
      <h3 className="font-serif text-lg font-bold">2. Damaged or Incorrect Items</h3>
      <p>
        If your baked items arrive damaged in transit or differ from your ordered specification, please notify our team within 2 hours of delivery with photographic evidence for an immediate replacement or full demo credit.
      </p>
    </div>
  </div>
);

export const DeliveryPolicyPage = () => (
  <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-6 text-xs sm:text-sm text-bakery-blackberry leading-relaxed">
    <h1 className="font-serif text-3xl font-bold">Delivery Policy</h1>
    <p className="text-bakery-muted">Last Updated: November 2026</p>
    <div className="bg-white p-6 sm:p-8 rounded-3xl border border-bakery-border shadow-soft space-y-4">
      <h3 className="font-serif text-lg font-bold">1. Delivery Zones &amp; Windows</h3>
      <p>
        We fulfill same-day and scheduled deliveries across Bengaluru in three delivery windows: Morning (9:00 AM – 12:00 PM), Afternoon (1:00 PM – 4:00 PM), and Evening (5:00 PM – 8:30 PM).
      </p>
      <h3 className="font-serif text-lg font-bold">2. Delivery Charges</h3>
      <p>
        Orders of ₹599 or greater enjoy complimentary FREE delivery. For orders below ₹599, a standard delivery fee of ₹50 is applied at checkout. Store pickups from our Indiranagar bakehouse are always free of charge.
      </p>
    </div>
  </div>
);

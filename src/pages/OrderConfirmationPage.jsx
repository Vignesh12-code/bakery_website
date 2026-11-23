import React, { useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import {
  CheckCircle2,
  Printer,
  ShoppingBag,
  ArrowRight,
  Truck,
  Store,
  Calendar,
  Clock,
  MapPin,
  Phone,
  Mail,
  ShieldCheck,
  PackageCheck
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { useStore } from '../context/StoreContext';
import { FallbackImage } from '../components/common/FallbackImage';

export const OrderConfirmationPage = () => {
  const { id } = useParams();
  const { orders, storeSettings } = useStore();

  const order = orders.find((o) => o.orderId === id) || orders[0];

  useEffect(() => {
    // Fire confetti celebration on order creation!
    try {
      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.6 }
      });
    } catch (e) {
      // ignore
    }
  }, []);

  if (!order) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-20 text-center space-y-4">
        <h2 className="font-serif text-2xl font-bold text-bakery-blackberry">
          Order Not Found
        </h2>
        <p className="text-sm text-bakery-muted">
          We could not locate this order ID in the demo registry.
        </p>
        <Link
          to="/"
          className="inline-block px-6 py-2.5 bg-bakery-caramel text-white text-xs font-bold rounded-xl"
        >
          Return Home
        </Link>
      </div>
    );
  }

  const handlePrint = () => {
    window.print();
  };

  const stages = [
    'Order Confirmed',
    'Baking & Preparation',
    'Packed',
    order.customer.type === 'pickup' ? 'Ready for Pickup' : 'Out for Delivery',
    'Delivered'
  ];

  const currentStageIndex = stages.indexOf(order.orderStatus);

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 space-y-8">
      {/* Top Success Banner (Hidden when printing) */}
      <div className="no-print bg-gradient-to-r from-bakery-sage/15 via-bakery-sand/40 to-bakery-caramel/10 border border-bakery-sage/30 rounded-3xl p-6 sm:p-8 text-center space-y-3 shadow-soft">
        <div className="w-14 h-14 rounded-full bg-bakery-sage text-white flex items-center justify-center mx-auto shadow-md">
          <CheckCircle2 className="w-8 h-8" />
        </div>
        <h1 className="font-serif text-2xl sm:text-3xl font-bold text-bakery-blackberry">
          Thank You! Your Order is Freshly Confirmed
        </h1>
        <p className="text-xs sm:text-sm text-bakery-muted max-w-lg mx-auto leading-relaxed">
          We’ve received your order and our artisan bakers are prepping your ingredients. Your digital invoice is below.
        </p>
        <div className="pt-2 flex flex-wrap items-center justify-center gap-3">
          <button
            onClick={handlePrint}
            className="px-5 py-2.5 bg-white hover:bg-bakery-sand border border-bakery-border rounded-xl text-xs font-bold text-bakery-blackberry flex items-center gap-2 shadow-sm transition-colors"
          >
            <Printer className="w-4 h-4 text-bakery-caramel" />
            <span>Print Official Invoice</span>
          </button>
          <Link
            to={`/track-order/${order.orderId}`}
            className="px-5 py-2.5 bg-bakery-blackberry hover:bg-black rounded-xl text-xs font-bold text-white flex items-center gap-2 shadow-sm transition-colors"
          >
            <Truck className="w-4 h-4 text-bakery-sage" />
            <span>Live Order Tracker</span>
          </Link>
        </div>
      </div>

      {/* 5-Stage Visual Progress Tracker (No-print) */}
      <div className="no-print bg-white rounded-3xl p-6 sm:p-8 border border-bakery-border shadow-soft space-y-6">
        <div className="flex items-center justify-between border-b border-bakery-border pb-3">
          <div>
            <span className="text-[10px] text-bakery-muted font-bold uppercase tracking-wider">
              Live Progress
            </span>
            <h3 className="font-serif text-lg font-bold text-bakery-blackberry">
              Order Status: <span className="text-bakery-caramel">{order.orderStatus}</span>
            </h3>
          </div>
          <span className="text-xs font-mono font-bold bg-bakery-sand px-3 py-1 rounded-xl">
            {order.orderId}
          </span>
        </div>

        {/* Timeline Bar */}
        <div className="grid grid-cols-2 sm:grid-cols-5 gap-3">
          {stages.map((st, idx) => {
            const isDone = idx <= currentStageIndex;
            const isCurrent = idx === currentStageIndex;
            return (
              <div
                key={st}
                className={`p-3 rounded-2xl border text-center transition-all ${
                  isCurrent
                    ? 'border-bakery-caramel bg-bakery-sand/70 ring-2 ring-bakery-caramel/30 font-bold'
                    : isDone
                    ? 'border-bakery-sage/40 bg-bakery-sage/10 text-bakery-blackberry font-semibold'
                    : 'border-bakery-border bg-gray-50/60 text-bakery-muted opacity-60'
                }`}
              >
                <div className="w-6 h-6 rounded-full mx-auto mb-1.5 flex items-center justify-center text-xs font-bold font-mono">
                  {isDone ? '✓' : idx + 1}
                </div>
                <span className="text-xs font-bold block">{st}</span>
                <span className="text-[10px] block mt-0.5">
                  {isCurrent ? 'In progress' : isDone ? 'Completed' : 'Upcoming'}
                </span>
              </div>
            );
          })}
        </div>
      </div>

      {/* Printable Digital Invoice Section */}
      <div
        id="printable-invoice"
        className="bg-white rounded-3xl p-6 sm:p-10 border border-bakery-border shadow-soft space-y-8"
      >
        {/* Invoice Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 border-b border-bakery-border pb-6">
          <div>
            <div className="flex items-center gap-2">
              <span className="text-2xl">🥐</span>
              <span className="font-serif text-2xl font-bold text-bakery-blackberry">
                {storeSettings.storeName || 'Crumb & Co. Bakery'}
              </span>
            </div>
            <p className="text-xs text-bakery-muted mt-1 max-w-sm">
              {storeSettings.address}
            </p>
            <p className="text-xs text-bakery-muted">
              Phone: {storeSettings.phone} • Email: {storeSettings.email}
            </p>
          </div>

          <div className="text-left sm:text-right space-y-1">
            <span className="px-3 py-1 bg-bakery-sand text-bakery-blackberry text-xs font-bold uppercase rounded-lg">
              Tax Invoice
            </span>
            <p className="font-serif text-lg font-bold text-bakery-caramel mt-1">
              {order.orderId}
            </p>
            <p className="text-xs text-bakery-muted">
              Date: {new Date(order.date).toLocaleDateString('en-IN', {
                year: 'numeric',
                month: 'short',
                day: 'numeric',
                hour: '2-digit',
                minute: '2-digit'
              })}
            </p>
          </div>
        </div>

        {/* Customer & Fulfillment Info */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 text-xs text-bakery-blackberry">
          <div className="p-4 bg-bakery-vanilla/50 rounded-2xl border border-bakery-border space-y-1">
            <h4 className="font-bold text-bakery-blackberry uppercase tracking-wider text-[11px]">
              Billed &amp; Delivered To:
            </h4>
            <p className="font-bold text-sm">{order.customer.name}</p>
            <p className="text-bakery-muted">{order.customer.phone}</p>
            <p className="text-bakery-muted">{order.customer.email}</p>
            <p className="pt-1">{order.customer.address}, {order.customer.city} {order.customer.pincode}</p>
          </div>

          <div className="p-4 bg-bakery-vanilla/50 rounded-2xl border border-bakery-border space-y-1">
            <h4 className="font-bold text-bakery-blackberry uppercase tracking-wider text-[11px]">
              Fulfillment &amp; Payment:
            </h4>
            <p>
              <strong>Fulfillment Mode:</strong>{' '}
              {order.customer.type === 'pickup' ? 'Store Pickup' : 'Doorstep Home Delivery'}
            </p>
            <p>
              <strong>Scheduled Slot:</strong> {order.customer.preferredDate} ({order.customer.preferredTime})
            </p>
            <p>
              <strong>Payment Method:</strong> {order.paymentMethod}
            </p>
            <p>
              <strong>Payment Status:</strong>{' '}
              <span className="text-bakery-sage font-bold">{order.paymentStatus}</span>
            </p>
            {order.customer.giftNote && (
              <p className="italic text-bakery-caramel pt-1">
                Gift Note: "{order.customer.giftNote}"
              </p>
            )}
          </div>
        </div>

        {/* Itemized Table */}
        <div className="border border-bakery-border rounded-2xl overflow-hidden">
          <table className="w-full text-left text-xs">
            <thead className="bg-bakery-sand/70 text-bakery-blackberry font-bold uppercase tracking-wider border-b border-bakery-border">
              <tr>
                <th className="p-3 sm:p-4">Item Details</th>
                <th className="p-3 sm:p-4 text-center">Unit Price</th>
                <th className="p-3 sm:p-4 text-center">Qty</th>
                <th className="p-3 sm:p-4 text-right">Total</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-bakery-border/70">
              {order.items.map((item, idx) => (
                <tr key={idx} className="hover:bg-bakery-vanilla/30">
                  <td className="p-3 sm:p-4">
                    <p className="font-bold text-bakery-blackberry">{item.name}</p>
                    {item.weight && <span className="text-[11px] text-bakery-muted">{item.weight}</span>}
                    {item.customDetails?.message && (
                      <p className="text-[11px] italic text-bakery-caramel">
                        Message: "{item.customDetails.message}"
                      </p>
                    )}
                  </td>
                  <td className="p-3 sm:p-4 text-center">₹{item.price}</td>
                  <td className="p-3 sm:p-4 text-center font-bold">{item.quantity}</td>
                  <td className="p-3 sm:p-4 text-right font-bold">
                    ₹{item.price * item.quantity}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Totals Breakdown */}
        <div className="flex justify-end pt-2">
          <div className="w-full sm:w-72 space-y-2 text-xs text-bakery-blackberry">
            <div className="flex justify-between">
              <span>Subtotal:</span>
              <span className="font-semibold">₹{order.subtotal}</span>
            </div>
            {order.discount > 0 && (
              <div className="flex justify-between text-bakery-sage font-bold">
                <span>Discount Applied:</span>
                <span>-₹{order.discount}</span>
              </div>
            )}
            <div className="flex justify-between">
              <span>Delivery Fee:</span>
              <span className="font-semibold">
                {order.deliveryFee === 0 ? 'FREE' : `₹${order.deliveryFee}`}
              </span>
            </div>
            <div className="flex justify-between">
              <span>GST ({storeSettings.gstPercent}%):</span>
              <span className="font-semibold">₹{order.gst}</span>
            </div>
            <div className="flex justify-between items-baseline pt-2 border-t border-bakery-border text-base font-bold">
              <span>Grand Total:</span>
              <span className="font-serif text-xl text-bakery-caramel font-extrabold">
                ₹{order.grandTotal}
              </span>
            </div>
          </div>
        </div>

        {/* Invoice Footer Disclaimer */}
        <div className="pt-6 border-t border-bakery-border/80 text-[11px] text-bakery-muted text-center space-y-1">
          <p>This is a computer-generated demonstration invoice issued by {storeSettings.storeName}.</p>
          <p>Goods once dispatched from our bakery undergo strict quality checks. Enjoy your fresh treats!</p>
        </div>
      </div>
    </div>
  );
};

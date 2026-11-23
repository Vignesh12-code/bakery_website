import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import {
  Search,
  Truck,
  CheckCircle2,
  Clock,
  Package,
  Calendar,
  AlertCircle,
  ArrowRight,
  Printer
} from 'lucide-react';
import { useStore } from '../context/StoreContext';

export const OrderTrackingPage = () => {
  const { id } = useParams();
  const { orders } = useStore();

  const [searchOrderId, setSearchOrderId] = useState(id || '');
  const [activeOrder, setActiveOrder] = useState(() => {
    if (id) {
      return orders.find((o) => o.orderId.toLowerCase() === id.toLowerCase()) || null;
    }
    return orders[0] || null;
  });
  const [errorMsg, setErrorMsg] = useState('');

  const handleSearch = (e) => {
    e.preventDefault();
    setErrorMsg('');
    const cleanId = searchOrderId.trim().toUpperCase();
    const found = orders.find((o) => o.orderId.toUpperCase() === cleanId);
    if (found) {
      setActiveOrder(found);
    } else {
      setErrorMsg(`No order found matching "${searchOrderId}". Try BKR-2026-0001.`);
    }
  };

  const stages = [
    { title: 'Order Confirmed', desc: 'Order received and verified' },
    { title: 'Baking & Preparation', desc: 'Fresh dough kneading & oven bake' },
    { title: 'Packed', desc: 'Quality checked & packaged in insulated box' },
    {
      title: activeOrder?.customer?.type === 'pickup' ? 'Ready for Pickup' : 'Out for Delivery',
      desc: activeOrder?.customer?.type === 'pickup' ? 'Awaiting customer pickup at bakehouse' : 'Boutique rider on the way'
    },
    { title: 'Delivered', desc: 'Handed over fresh & delicious' }
  ];

  const currentStageIndex = activeOrder ? stages.findIndex((s) => s.title === activeOrder.orderStatus) : -1;

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 space-y-8">
      {/* Header */}
      <div className="text-center max-w-2xl mx-auto space-y-2">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-bakery-sage/10 text-bakery-sage text-xs font-bold uppercase tracking-wider">
          <Truck className="w-3.5 h-3.5" />
          <span>Live Order Tracking</span>
        </div>
        <h1 className="font-serif text-3xl sm:text-4xl font-bold text-bakery-blackberry">
          Track Your Bakery Delivery
        </h1>
        <p className="text-xs sm:text-sm text-bakery-muted">
          Enter your unique order reference code (e.g. BKR-2026-0001) to view real-time bakehouse progress.
        </p>
      </div>

      {/* Search Bar */}
      <form onSubmit={handleSearch} className="max-w-md mx-auto flex gap-2">
        <div className="relative flex-1">
          <Search className="w-4 h-4 absolute left-3.5 top-3 text-bakery-muted" />
          <input
            type="text"
            placeholder="e.g. BKR-2026-0001"
            value={searchOrderId}
            onChange={(e) => setSearchOrderId(e.target.value)}
            className="w-full pl-10 pr-3 py-2.5 bg-white rounded-xl border border-bakery-border text-xs font-bold tracking-wider uppercase focus:outline-none focus:border-bakery-caramel"
          />
        </div>
        <button
          type="submit"
          className="px-5 py-2.5 bg-bakery-caramel hover:bg-bakery-caramelHover text-white text-xs font-bold rounded-xl shadow-md transition-colors"
        >
          Track
        </button>
      </form>

      {errorMsg && (
        <div className="p-3 bg-red-50 border border-red-200 text-bakery-raspberry text-xs rounded-xl flex items-center gap-2 max-w-md mx-auto">
          <AlertCircle className="w-4 h-4 shrink-0" />
          <span>{errorMsg}</span>
        </div>
      )}

      {/* Active Order Details */}
      {activeOrder && (
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-bakery-border shadow-soft space-y-8">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-bakery-border pb-4">
            <div>
              <span className="text-xs font-bold text-bakery-muted uppercase tracking-wider">
                Order Reference
              </span>
              <h2 className="font-serif text-2xl font-bold text-bakery-blackberry">
                {activeOrder.orderId}
              </h2>
              <p className="text-xs text-bakery-muted mt-0.5">
                Placed on {new Date(activeOrder.date).toLocaleDateString()} for {activeOrder.customer.name}
              </p>
            </div>

            <div className="text-left sm:text-right space-y-1">
              <span className="px-3 py-1 bg-bakery-caramel/10 text-bakery-caramel text-xs font-bold rounded-full">
                {activeOrder.orderStatus}
              </span>
              <p className="text-xs text-bakery-muted">
                Total: <strong className="text-bakery-blackberry">₹{activeOrder.grandTotal}</strong> ({activeOrder.items.length} items)
              </p>
            </div>
          </div>

          {/* Timeline */}
          <div className="space-y-4">
            <h3 className="font-serif text-base font-bold text-bakery-blackberry">
              Fulfillment Timeline
            </h3>

            <div className="relative pl-6 sm:pl-8 space-y-6 before:absolute before:left-2.5 sm:before:left-3.5 before:top-2 before:bottom-2 before:w-0.5 before:bg-bakery-border">
              {stages.map((stage, idx) => {
                const isPassed = idx <= currentStageIndex;
                const isCurrent = idx === currentStageIndex;

                return (
                  <div key={stage.title} className="relative flex items-start gap-4">
                    <div
                      className={`absolute -left-6 sm:-left-8 w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-bold ${
                        isCurrent
                          ? 'bg-bakery-caramel text-white ring-4 ring-bakery-caramel/20'
                          : isPassed
                          ? 'bg-bakery-sage text-white'
                          : 'bg-gray-200 text-gray-500'
                      }`}
                    >
                      {isPassed ? '✓' : idx + 1}
                    </div>

                    <div className="flex-1">
                      <div className="flex items-center justify-between">
                        <h4
                          className={`text-sm font-bold ${
                            isCurrent
                              ? 'text-bakery-caramel'
                              : isPassed
                              ? 'text-bakery-blackberry'
                              : 'text-bakery-muted'
                          }`}
                        >
                          {stage.title}
                        </h4>
                        <span className="text-[11px] text-bakery-muted font-mono">
                          {activeOrder.timeline?.[idx]?.time || (isCurrent ? 'Current' : 'Pending')}
                        </span>
                      </div>
                      <p className="text-xs text-bakery-muted mt-0.5">{stage.desc}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Ordered items overview */}
          <div className="p-4 bg-bakery-vanilla/50 rounded-2xl border border-bakery-border space-y-3">
            <h4 className="text-xs font-bold text-bakery-blackberry uppercase tracking-wider">
              Items in this shipment:
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
              {activeOrder.items.map((item, i) => (
                <div key={i} className="flex items-center justify-between p-2 rounded-xl bg-white border border-bakery-border/60">
                  <span className="font-semibold text-bakery-blackberry truncate">
                    {item.quantity}× {item.name}
                  </span>
                  <span className="font-bold text-bakery-caramel shrink-0">
                    ₹{item.price * item.quantity}
                  </span>
                </div>
              ))}
            </div>
          </div>

          <div className="flex items-center justify-between pt-2">
            <Link
              to={`/order-confirmation/${activeOrder.orderId}`}
              className="text-xs font-bold text-bakery-caramel hover:underline flex items-center gap-1"
            >
              <Printer className="w-4 h-4" />
              <span>View Printable Invoice</span>
            </Link>
            <Link
              to="/shop"
              className="text-xs font-bold text-bakery-blackberry hover:underline"
            >
              Continue Shopping →
            </Link>
          </div>
        </div>
      )}
    </div>
  );
};

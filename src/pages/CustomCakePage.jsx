import React, { useState } from 'react';
import {
  Cake,
  Calendar,
  Clock,
  Upload,
  Sparkles,
  Check,
  AlertCircle,
  ShoppingBag,
  Heart
} from 'lucide-react';
import { useStore } from '../context/StoreContext';

export const CustomCakePage = () => {
  const { addToCart, setIsCartDrawerOpen, showToast } = useStore();

  // Customization Options
  const SIZES = [
    { label: '500g (Serves 4-6)', value: '500g', priceDiff: 0, basePrice: 550 },
    { label: '1kg (Serves 8-12)', value: '1kg', priceDiff: 450, basePrice: 1000 },
    { label: '1.5kg (Serves 14-18)', value: '1.5kg', priceDiff: 850, basePrice: 1400 },
    { label: '2kg (Serves 20-25)', value: '2kg', priceDiff: 1250, basePrice: 1800 }
  ];

  const FLAVOURS = [
    { name: 'Belgian Dark Chocolate', value: 'Chocolate', extra: 50, tag: 'Bestseller' },
    { name: 'Madagascar Vanilla Bean', value: 'Vanilla', extra: 0, tag: 'Classic' },
    { name: 'Classic Red Velvet', value: 'Red Velvet', extra: 100, tag: 'Popular' },
    { name: 'Black Forest Royale', value: 'Black Forest', extra: 80, tag: 'Traditional' },
    { name: 'Butterscotch Crunch', value: 'Butterscotch', extra: 60, tag: 'Sweet' },
    { name: 'Fresh Tropical Pineapple', value: 'Pineapple', extra: 40, tag: 'Fruity' },
    { name: 'Alphonso Mango Cream', value: 'Mango', extra: 90, tag: 'Seasonal' }
  ];

  const FROSTINGS = [
    { name: 'Silky Chocolate Ganache', value: 'Chocolate', extra: 50 },
    { name: 'Light Fresh Whipped Cream', value: 'Whipped Cream', extra: 0 },
    { name: 'Rich Swiss Meringue Buttercream', value: 'Buttercream', extra: 40 },
    { name: 'Tangy Cream Cheese Frosting', value: 'Cream Cheese', extra: 80 }
  ];

  const SHAPES = [
    { name: 'Classic Round', value: 'Round', extra: 0, icon: '⚪' },
    { name: 'Modern Square', value: 'Square', extra: 50, icon: '⬜' },
    { name: 'Romance Heart', value: 'Heart', extra: 100, icon: '💖' }
  ];

  const OCCASIONS = [
    'Birthday',
    'Anniversary',
    'Wedding',
    'Graduation',
    'Other Special Occasion'
  ];

  const TIME_SLOTS = [
    'Morning (9:00 AM – 12:00 PM)',
    'Afternoon (1:00 PM – 4:00 PM)',
    'Evening (5:00 PM – 8:30 PM)'
  ];

  // State
  const [selectedSize, setSelectedSize] = useState(SIZES[0]);
  const [selectedFlavour, setSelectedFlavour] = useState(FLAVOURS[0]);
  const [selectedFrosting, setSelectedFrosting] = useState(FROSTINGS[0]);
  const [selectedShape, setSelectedShape] = useState(SHAPES[0]);
  const [selectedOccasion, setSelectedOccasion] = useState(OCCASIONS[0]);
  const [cakeMessage, setCakeMessage] = useState('Happy Birthday!');
  const [specialInstructions, setSpecialInstructions] = useState('');
  const [deliveryDate, setDeliveryDate] = useState(() => {
    // Tomorrow as minimum default
    const d = new Date();
    d.setDate(d.getDate() + 1);
    return d.toISOString().split('T')[0];
  });
  const [deliveryTimeSlot, setDeliveryTimeSlot] = useState(TIME_SLOTS[0]);
  const [referenceImage, setReferenceImage] = useState(null);
  const [validationError, setValidationError] = useState('');

  // Calculate live price
  const calculateTotal = () => {
    return (
      selectedSize.basePrice +
      selectedFlavour.extra +
      selectedFrosting.extra +
      selectedShape.extra
    );
  };

  const totalPrice = calculateTotal();

  // Handle image upload
  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (file.size > 3 * 1024 * 1024) {
        showToast('Image size should be under 3MB.', 'error');
        return;
      }
      const reader = new FileReader();
      reader.onloadend = () => {
        setReferenceImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleAddToCart = (e) => {
    e.preventDefault();
    setValidationError('');

    if (!deliveryDate) {
      setValidationError('Please select a preferred delivery date.');
      return;
    }
    if (!deliveryTimeSlot) {
      setValidationError('Please select a preferred time slot.');
      return;
    }

    const customDetails = {
      title: `Custom ${selectedOccasion} Cake (${selectedFlavour.name})`,
      size: selectedSize.value,
      flavour: selectedFlavour.name,
      frosting: selectedFrosting.name,
      shape: selectedShape.name,
      occasion: selectedOccasion,
      message: cakeMessage.trim() || 'No Message',
      instructions: specialInstructions.trim() || 'None',
      deliveryDate,
      deliveryTimeSlot,
      price: totalPrice,
      weight: selectedSize.value,
      category: 'Custom Cakes',
      image: referenceImage || 'https://images.unsplash.com/photo-1578985545062-69928b1d9587?auto=format&fit=crop&w=600&q=80',
      hasCustomRefImage: !!referenceImage
    };

    addToCart(null, 1, customDetails);
    setIsCartDrawerOpen(true);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 space-y-10">
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto space-y-3">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-bakery-caramel/10 border border-bakery-caramel/20 text-bakery-caramel text-xs font-bold uppercase tracking-wider">
          <Cake className="w-4 h-4" />
          <span>Boutique Custom Studio</span>
        </div>
        <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-bakery-blackberry">
          Handcraft Your Celebration Cake
        </h1>
        <p className="text-sm text-bakery-muted leading-relaxed">
          Design your personalized cake in real-time. Pick your preferred weight, gourmet sponge flavour, silky frosting, bespoke shape, and handwritten message.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Column: Form Controls */}
        <div className="lg:col-span-7 bg-white rounded-3xl p-6 sm:p-8 border border-bakery-border shadow-soft space-y-8">
          {/* Step 1: Size */}
          <div className="space-y-3">
            <label className="block text-sm font-bold text-bakery-blackberry flex items-center justify-between">
              <span>1. Choose Cake Size &amp; Servings</span>
              <span className="text-xs text-bakery-muted font-normal">Freshly baked sponge</span>
            </label>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
              {SIZES.map((sz) => (
                <button
                  type="button"
                  key={sz.value}
                  onClick={() => setSelectedSize(sz)}
                  className={`p-3 rounded-2xl border text-center transition-all ${
                    selectedSize.value === sz.value
                      ? 'border-bakery-caramel bg-bakery-sand/70 ring-2 ring-bakery-caramel/30 font-bold'
                      : 'border-bakery-border hover:border-bakery-caramel/50 bg-bakery-card text-bakery-blackberry'
                  }`}
                >
                  <span className="text-xs sm:text-sm font-bold block">{sz.value}</span>
                  <span className="text-[10px] text-bakery-muted block mt-0.5">{sz.label.split('(')[1].replace(')', '')}</span>
                  <span className="text-xs font-serif font-bold text-bakery-caramel block mt-1">₹{sz.basePrice}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Step 2: Flavour */}
          <div className="space-y-3">
            <label className="block text-sm font-bold text-bakery-blackberry">
              2. Select Sponge Flavour
            </label>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
              {FLAVOURS.map((fl) => (
                <button
                  type="button"
                  key={fl.value}
                  onClick={() => setSelectedFlavour(fl)}
                  className={`p-3 rounded-2xl border text-left flex items-center justify-between transition-all ${
                    selectedFlavour.value === fl.value
                      ? 'border-bakery-caramel bg-bakery-sand/70 ring-2 ring-bakery-caramel/30 font-bold'
                      : 'border-bakery-border hover:border-bakery-caramel/50 bg-bakery-card'
                  }`}
                >
                  <div>
                    <span className="text-xs sm:text-sm font-semibold text-bakery-blackberry block">
                      {fl.name}
                    </span>
                    <span className="text-[10px] text-bakery-sage font-bold uppercase tracking-wider">
                      {fl.tag}
                    </span>
                  </div>
                  <span className="text-xs font-semibold text-bakery-caramel">
                    {fl.extra > 0 ? `+₹${fl.extra}` : 'Included'}
                  </span>
                </button>
              ))}
            </div>
          </div>

          {/* Step 3: Frosting */}
          <div className="space-y-3">
            <label className="block text-sm font-bold text-bakery-blackberry">
              3. Choose Gourmet Frosting
            </label>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
              {FROSTINGS.map((fr) => (
                <button
                  type="button"
                  key={fr.value}
                  onClick={() => setSelectedFrosting(fr)}
                  className={`p-3 rounded-2xl border text-left flex items-center justify-between transition-all ${
                    selectedFrosting.value === fr.value
                      ? 'border-bakery-caramel bg-bakery-sand/70 ring-2 ring-bakery-caramel/30 font-bold'
                      : 'border-bakery-border hover:border-bakery-caramel/50 bg-bakery-card'
                  }`}
                >
                  <span className="text-xs sm:text-sm font-semibold text-bakery-blackberry">
                    {fr.name}
                  </span>
                  <span className="text-xs font-semibold text-bakery-caramel">
                    {fr.extra > 0 ? `+₹${fr.extra}` : 'Included'}
                  </span>
                </button>
              ))}
            </div>
          </div>

          {/* Step 4: Shape */}
          <div className="space-y-3">
            <label className="block text-sm font-bold text-bakery-blackberry">
              4. Cake Silhouette &amp; Shape
            </label>
            <div className="grid grid-cols-3 gap-3">
              {SHAPES.map((sh) => (
                <button
                  type="button"
                  key={sh.value}
                  onClick={() => setSelectedShape(sh)}
                  className={`p-3.5 rounded-2xl border text-center transition-all ${
                    selectedShape.value === sh.value
                      ? 'border-bakery-caramel bg-bakery-sand/70 ring-2 ring-bakery-caramel/30 font-bold'
                      : 'border-bakery-border hover:border-bakery-caramel/50 bg-bakery-card'
                  }`}
                >
                  <span className="text-xl block">{sh.icon}</span>
                  <span className="text-xs font-bold text-bakery-blackberry block mt-1">{sh.name}</span>
                  <span className="text-[11px] text-bakery-caramel font-semibold block">
                    {sh.extra > 0 ? `+₹${sh.extra}` : 'Included'}
                  </span>
                </button>
              ))}
            </div>
          </div>

          {/* Step 5: Occasion & Message */}
          <div className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-bakery-blackberry uppercase tracking-wider mb-1.5">
                  Occasion
                </label>
                <select
                  value={selectedOccasion}
                  onChange={(e) => setSelectedOccasion(e.target.value)}
                  className="w-full p-2.5 bg-bakery-vanilla/60 border border-bakery-border rounded-xl text-xs font-semibold focus:outline-none focus:border-bakery-caramel"
                >
                  {OCCASIONS.map((occ) => (
                    <option key={occ} value={occ}>
                      {occ}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-bakery-blackberry uppercase tracking-wider mb-1.5">
                  Message on Cake (Max 35 chars)
                </label>
                <input
                  type="text"
                  maxLength={35}
                  value={cakeMessage}
                  onChange={(e) => setCakeMessage(e.target.value)}
                  placeholder="e.g. Happy 30th Birthday Rahul!"
                  className="w-full p-2.5 bg-bakery-vanilla/60 border border-bakery-border rounded-xl text-xs font-medium focus:outline-none focus:border-bakery-caramel"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-bakery-blackberry uppercase tracking-wider mb-1.5">
                Special Chef Instructions (Optional)
              </label>
              <textarea
                rows={2}
                value={specialInstructions}
                onChange={(e) => setSpecialInstructions(e.target.value)}
                placeholder="e.g. Less sugar, extra berries on top, golden edible glitter..."
                className="w-full p-2.5 bg-bakery-vanilla/60 border border-bakery-border rounded-xl text-xs font-medium focus:outline-none focus:border-bakery-caramel"
              />
            </div>
          </div>

          {/* Step 6: Delivery Schedule */}
          <div className="space-y-3">
            <label className="block text-sm font-bold text-bakery-blackberry">
              5. Delivery Schedule
            </label>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <span className="text-xs text-bakery-muted block mb-1">Preferred Date:</span>
                <input
                  type="date"
                  min={new Date().toISOString().split('T')[0]}
                  value={deliveryDate}
                  onChange={(e) => setDeliveryDate(e.target.value)}
                  className="w-full p-2.5 bg-bakery-vanilla/60 border border-bakery-border rounded-xl text-xs font-semibold focus:outline-none focus:border-bakery-caramel"
                  required
                />
              </div>

              <div>
                <span className="text-xs text-bakery-muted block mb-1">Preferred Time Window:</span>
                <select
                  value={deliveryTimeSlot}
                  onChange={(e) => setDeliveryTimeSlot(e.target.value)}
                  className="w-full p-2.5 bg-bakery-vanilla/60 border border-bakery-border rounded-xl text-xs font-semibold focus:outline-none focus:border-bakery-caramel"
                >
                  {TIME_SLOTS.map((slot) => (
                    <option key={slot} value={slot}>
                      {slot}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>

          {/* Step 7: Reference Image Upload */}
          <div className="space-y-2">
            <label className="block text-xs font-bold text-bakery-blackberry uppercase tracking-wider">
              Reference Design Photo (Optional)
            </label>
            <div className="border-2 border-dashed border-bakery-border rounded-2xl p-4 text-center hover:bg-bakery-sand/30 transition-colors">
              {referenceImage ? (
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <img
                      src={referenceImage}
                      alt="Reference design"
                      className="w-14 h-14 rounded-xl object-cover border"
                    />
                    <span className="text-xs font-medium text-bakery-sage flex items-center gap-1">
                      <Check className="w-4 h-4" /> Custom reference attached
                    </span>
                  </div>
                  <button
                    type="button"
                    onClick={() => setReferenceImage(null)}
                    className="text-xs text-bakery-raspberry font-bold hover:underline"
                  >
                    Remove
                  </button>
                </div>
              ) : (
                <label className="cursor-pointer flex flex-col items-center gap-1.5">
                  <Upload className="w-5 h-5 text-bakery-muted" />
                  <span className="text-xs font-semibold text-bakery-blackberry">
                    Upload design reference (JPG, PNG up to 3MB)
                  </span>
                  <span className="text-[11px] text-bakery-muted">
                    Our pastry chefs will match your photo style as closely as possible
                  </span>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageUpload}
                    className="hidden"
                  />
                </label>
              )}
            </div>
          </div>
        </div>

        {/* Right Column: Live Visual Summary Card */}
        <div className="lg:col-span-5 sticky top-28 space-y-6">
          <div className="bg-white rounded-3xl p-6 sm:p-8 border border-bakery-border shadow-soft space-y-6">
            <div className="flex items-center justify-between border-b border-bakery-border pb-4">
              <h3 className="font-serif text-xl font-bold text-bakery-blackberry">
                Bespoke Order Preview
              </h3>
              <span className="px-2.5 py-1 rounded-full bg-bakery-caramel/10 text-bakery-caramel text-xs font-bold">
                Live Calculator
              </span>
            </div>

            {/* Visual Preview Illustration */}
            <div className="relative aspect-video rounded-2xl overflow-hidden bg-gradient-to-br from-[#FDF8F5] to-[#F2E4D8] border border-bakery-border flex flex-col items-center justify-center p-6 text-center">
              <div className="w-20 h-20 rounded-full bg-white shadow-md flex items-center justify-center text-4xl mb-3 border border-bakery-border">
                {selectedShape.value === 'Round' ? '🎂' : selectedShape.value === 'Heart' ? '💝' : '🍰'}
              </div>
              <p className="font-serif text-base font-bold text-bakery-blackberry">
                {selectedSize.value} • {selectedShape.name}
              </p>
              <p className="text-xs text-bakery-muted">
                {selectedFlavour.name} with {selectedFrosting.name}
              </p>
              {cakeMessage && (
                <div className="mt-3 px-3 py-1 bg-white/90 backdrop-blur-sm rounded-lg border border-bakery-border text-xs italic font-serif text-bakery-caramel">
                  "{cakeMessage}"
                </div>
              )}
            </div>

            {/* Spec breakdown table */}
            <div className="space-y-2 text-xs text-bakery-blackberry/85">
              <div className="flex justify-between py-1 border-b border-bakery-border/50">
                <span className="text-bakery-muted">Size &amp; Base Price:</span>
                <span className="font-semibold">{selectedSize.value} (₹{selectedSize.basePrice})</span>
              </div>
              <div className="flex justify-between py-1 border-b border-bakery-border/50">
                <span className="text-bakery-muted">Flavour Modifier:</span>
                <span className="font-semibold">{selectedFlavour.name} ({selectedFlavour.extra > 0 ? `+₹${selectedFlavour.extra}` : '₹0'})</span>
              </div>
              <div className="flex justify-between py-1 border-b border-bakery-border/50">
                <span className="text-bakery-muted">Frosting:</span>
                <span className="font-semibold">{selectedFrosting.name} ({selectedFrosting.extra > 0 ? `+₹${selectedFrosting.extra}` : '₹0'})</span>
              </div>
              <div className="flex justify-between py-1 border-b border-bakery-border/50">
                <span className="text-bakery-muted">Shape:</span>
                <span className="font-semibold">{selectedShape.name} ({selectedShape.extra > 0 ? `+₹${selectedShape.extra}` : '₹0'})</span>
              </div>
              <div className="flex justify-between py-1 border-b border-bakery-border/50">
                <span className="text-bakery-muted">Scheduled Slot:</span>
                <span className="font-semibold">{deliveryDate} • {deliveryTimeSlot.split('(')[0]}</span>
              </div>

              {/* Grand Total */}
              <div className="flex items-center justify-between pt-3 text-base font-bold text-bakery-blackberry">
                <span>Calculated Price:</span>
                <span className="font-serif text-2xl text-bakery-caramel font-extrabold">
                  ₹{totalPrice}
                </span>
              </div>
            </div>

            {validationError && (
              <p className="text-xs text-bakery-raspberry flex items-center gap-1.5 p-2 bg-bakery-raspberry/10 rounded-xl">
                <AlertCircle className="w-4 h-4 shrink-0" />
                <span>{validationError}</span>
              </p>
            )}

            <button
              type="button"
              onClick={handleAddToCart}
              className="w-full py-4 bg-bakery-caramel hover:bg-bakery-caramelHover text-white font-bold rounded-2xl shadow-hover transition-transform active:scale-95 flex items-center justify-center gap-2"
            >
              <ShoppingBag className="w-5 h-5" />
              <span>Add Customized Cake to Cart (₹{totalPrice})</span>
            </button>

            <p className="text-[11px] text-center text-bakery-muted leading-relaxed">
              Every custom cake is baked fresh to order in Bengaluru. Base pricing is configurable by store management.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

import React, { useState } from 'react';
import { ChevronDown, HelpCircle } from 'lucide-react';

export const FaqPage = () => {
  const [openIndex, setOpenIndex] = useState(0);

  const faqs = [
    {
      q: "How far in advance should I order custom cakes?",
      a: "We recommend placing custom celebration cake orders at least 24 hours in advance so our pastry team can bake and decorate your sponge fresh to order. For large tier wedding cakes, 48 hours notice is preferred."
    },
    {
      q: "What are your delivery areas and charges in Bengaluru?",
      a: "We deliver across central and greater Bengaluru, including Indiranagar, Koramangala, HSR Layout, Whitefield, JP Nagar, and CBD. Delivery is FREE on orders above ₹599, and a flat ₹50 applies for orders below that threshold."
    },
    {
      q: "Are all your products vegetarian and eggless?",
      a: "Almost our entire menu is 100% vegetarian, with numerous eggless options clearly highlighted with green badges. Note that a few French items like classic croissants contain dairy butter and traditional egg wash, while our Keema Puff contains chicken. Detailed dietary tags are listed on every product page."
    },
    {
      q: "How should I store and reheat artisan sourdough and croissants?",
      a: "Store sourdough loaves cut-side down on a wooden board or in a paper bag at room temperature for up to 3 days. To refresh crustiness, mist lightly with water and pop into a preheated oven at 180°C for 5 minutes. Do not refrigerate breads as it accelerates staling."
    },
    {
      q: "What is your Cash on Delivery (COD) restriction?",
      a: "To ensure minimal food wastage on freshly prepared artisanal baked goods, Cash on Delivery is strictly available only for orders up to ₹500. Orders above ₹500 can be paid via simulated UPI, Debit/Credit Card, Net Banking or Digital Wallets."
    },
    {
      q: "How does the 'Build Your Own Box' feature work?",
      a: "Our interactive box studio lets you choose either a Box of 6 (₹899) or a Box of 12 (₹1,699). You can handpick any combination of eligible croissants, brownies, tarts, and cookies to fill all visual slots at bundle pricing."
    }
  ];

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-16 space-y-10">
      <div className="text-center space-y-3">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-bakery-sand text-bakery-caramel text-xs font-bold uppercase tracking-wider">
          <HelpCircle className="w-3.5 h-3.5" />
          <span>Got Questions?</span>
        </div>
        <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-bakery-blackberry">
          Frequently Asked Questions
        </h1>
        <p className="text-xs sm:text-sm text-bakery-muted">
          Everything you need to know about ordering, sourdough care, custom cake delivery and ingredients.
        </p>
      </div>

      <div className="space-y-3">
        {faqs.map((faq, idx) => {
          const isOpen = openIndex === idx;
          return (
            <div
              key={idx}
              className="bg-white rounded-2xl border border-bakery-border shadow-soft overflow-hidden transition-all"
            >
              <button
                type="button"
                onClick={() => setOpenIndex(isOpen ? -1 : idx)}
                className="w-full p-5 text-left flex items-center justify-between gap-4 font-serif text-base font-bold text-bakery-blackberry hover:text-bakery-caramel transition-colors"
              >
                <span>{faq.q}</span>
                <ChevronDown
                  className={`w-5 h-5 text-bakery-muted shrink-0 transition-transform duration-300 ${
                    isOpen ? 'rotate-180 text-bakery-caramel' : ''
                  }`}
                />
              </button>

              {isOpen && (
                <div className="px-5 pb-5 text-xs sm:text-sm text-bakery-muted leading-relaxed border-t border-bakery-border/50 pt-3 animate-fadeIn">
                  {faq.a}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

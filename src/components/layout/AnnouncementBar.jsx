import React from 'react';
import { Sparkles, Truck } from 'lucide-react';
import { useStore } from '../../context/StoreContext';

export const AnnouncementBar = () => {
  const { storeSettings } = useStore();
  const freeThreshold = storeSettings.freeDeliveryThreshold || 599;

  return (
    <div className="bg-bakery-blackberry text-[#F7EDE6] py-2 px-4 text-xs sm:text-sm font-medium border-b border-[#2C1F3D]">
      <div className="max-w-7xl mx-auto flex items-center justify-center gap-2 text-center overflow-hidden">
        <Sparkles className="w-3.5 h-3.5 text-bakery-caramel shrink-0" />
        <span className="truncate sm:overflow-visible">
          Fresh from the Oven! Discover our freshly baked breads, croissants, cakes and desserts. Free delivery on orders above ₹{freeThreshold}.
        </span>
        <Truck className="w-3.5 h-3.5 text-bakery-sage shrink-0 hidden md:inline" />
      </div>
    </div>
  );
};

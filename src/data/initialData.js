export const INITIAL_STORE_SETTINGS = {
  storeName: "Crumb & Co. Bakery",
  tagline: "Artisanal Breads, Viennoiserie & Bespoke Celebrations",
  description: "Bengaluru's premier boutique bakery offering slow-fermented sourdoughs, laminated French pastries, custom occasion cakes, and nostalgic savouries baked fresh each morning.",
  logoUrl: "", // Uses bakery icon if empty
  phone: "+91 98765 43210", // Placeholder for demo
  whatsapp: "+919876543210", // For WhatsApp chat link
  email: "hello@crumbandco.in",
  address: "Shop 14, 12th Main Road, Indiranagar, Bengaluru, Karnataka 560038",
  openingHours: "Mon - Sun: 7:30 AM - 10:30 PM",
  deliveryCharge: 50,
  freeDeliveryThreshold: 599,
  merchantUpiId: "crumbandco@okhdfcbank",
  gstPercent: 5,
  instagram: "https://instagram.com/crumbandcobakery",
  facebook: "https://facebook.com/crumbandcobakery"
};

export const INITIAL_COUPONS = [
  {
    code: "WELCOME15",
    discountPercent: 15,
    minOrder: 0,
    description: "15% off on your order"
  },
  {
    code: "SWEET100",
    discountFlat: 100,
    minOrder: 500,
    description: "₹100 flat discount on orders above ₹500"
  }
];

export const DEMO_REVIEWS = [
  {
    id: 1,
    name: "Ananya Sharma",
    location: "Indiranagar, Bengaluru",
    rating: 5,
    date: "12 Nov 2026",
    comment: "The Country Sourdough has the absolute best crust in town. Crisp, caramelized, and chewy on the inside! Delivered fresh and still warm.",
    product: "Country Sourdough Boule",
    badge: "Verified Demo Buyer"
  },
  {
    id: 2,
    name: "Rohan Varma",
    location: "Koramangala, Bengaluru",
    rating: 5,
    date: "18 Nov 2026",
    comment: "Ordered the Belgian Chocolate Truffle Cake for my sister's birthday. The customization was exact, and the rich ganache was outstanding.",
    product: "Belgian Chocolate Truffle Cake",
    badge: "Verified Demo Buyer"
  },
  {
    id: 3,
    name: "Dr. Priyamvada Rao",
    location: "Lavelle Road, Bengaluru",
    rating: 5,
    date: "20 Nov 2026",
    comment: "The Pistachio Rose Croissant is pure poetry. Beautiful lamination and fragrant floral notes without being overwhelming.",
    product: "Pistachio Rose Croissant",
    badge: "Verified Demo Buyer"
  },
  {
    id: 4,
    name: "Karthik Subramanian",
    location: "HSR Layout, Bengaluru",
    rating: 5,
    date: "22 Nov 2026",
    comment: "Build-a-box feature is fantastic! Mixed chocolate brownies and frangipane tarts for our studio team. Packaging was impeccable.",
    product: "Build Your Own Box of 6",
    badge: "Verified Demo Buyer"
  }
];

export const INITIAL_CUSTOMER_PROFILE = {
  name: "Priya Sundaram",
  email: "priya.sundaram@example.com",
  phone: "9876543210",
  addresses: [
    {
      id: "addr-1",
      tag: "Home",
      street: "Flat 402, Magnolia Orchards, 10th Cross, Indiranagar",
      city: "Bengaluru",
      pincode: "560038",
      isDefault: true
    },
    {
      id: "addr-2",
      tag: "Studio",
      street: "Plot 88, 4th Block, Koramangala",
      city: "Bengaluru",
      pincode: "560034",
      isDefault: false
    }
  ]
};

export const INITIAL_SAMPLE_ORDERS = [
  {
    orderId: "BKR-2026-0001",
    date: "2026-11-20T10:30:00.000Z",
    customer: {
      name: "Priya Sundaram",
      email: "priya.sundaram@example.com",
      phone: "9876543210",
      type: "delivery",
      address: "Flat 402, Magnolia Orchards, 10th Cross, Indiranagar",
      city: "Bengaluru",
      pincode: "560038",
      preferredDate: "2026-11-21",
      preferredTime: "10:00 AM - 1:00 PM",
      giftNote: "Happy Housewarming!",
      specialInstructions: "Please ring the side bell"
    },
    items: [
      {
        id: "prod-1",
        name: "Country Sourdough Boule (400g)",
        price: 240,
        quantity: 2,
        weight: "400g",
        image: "https://images.unsplash.com/photo-1589367920969-ab8e050bbb04?auto=format&fit=crop&w=600&q=80"
      },
      {
        id: "prod-9",
        name: "Classic French Butter Croissant",
        price: 160,
        quantity: 3,
        weight: "1 Piece",
        image: "https://images.unsplash.com/photo-1555507036-ab1f4038808a?auto=format&fit=crop&w=600&q=80"
      }
    ],
    subtotal: 960,
    discount: 144,
    deliveryFee: 0,
    gst: 40.8,
    grandTotal: 856.8,
    paymentMethod: "UPI",
    paymentStatus: "Paid (Simulated Demo)",
    orderStatus: "Out for Delivery",
    timeline: [
      { status: "Order Confirmed", time: "2026-11-20 10:30 AM", done: true },
      { status: "Baking & Preparation", time: "2026-11-20 02:15 PM", done: true },
      { status: "Packed", time: "2026-11-21 08:30 AM", done: true },
      { status: "Out for Delivery", time: "2026-11-21 09:45 AM", done: true },
      { status: "Delivered", time: "Pending", done: false }
    ]
  }
];

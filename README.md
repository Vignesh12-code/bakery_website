# Crumb & Co. Bakery — Boutique E-Commerce Web Application

A modern, attractive, fully functional, and responsive boutique bakery e-commerce web application built for **Crumb & Co. Bakery**, an artisanal bakery based in Bengaluru, India.

---

## 🥐 Table of Contents

1. [Project Overview](#project-overview)
2. [Tech Stack & Architecture](#tech-stack--architecture)
3. [Visual Identity & Design System](#visual-identity--design-system)
4. [Complete 52-Product Catalogue](#complete-52-product-catalogue)
5. [Key Features & Capabilities](#key-features--capabilities)
   - [Oven-Fresh Customer Storefront](#oven-fresh-customer-storefront)
   - [Interactive Custom Cake Studio](#interactive-custom-cake-studio)
   - [Interactive Build Your Own Box](#interactive-build-your-own-box)
   - [Slide-Out Basket & Financial Calculations](#slide-out-basket--financial-calculations)
   - [Checkout & Simulated Payment Gateway](#checkout--simulated-payment-gateway)
   - [Order Confirmation, 5-Stage Tracker & Digital Invoice](#order-confirmation-5-stage-tracker--digital-invoice)
   - [Customer Account Portal](#customer-account-portal)
   - [Bakery Owner Admin Dashboard](#bakery-owner-admin-dashboard)
6. [Demo Admin Credentials](#demo-admin-credentials)
7. [Running the Application Locally](#running-the-application-locally)
8. [Features Implemented & Production Readiness](#features-implemented--production-readiness)

---

## 1. Project Overview

**Crumb & Co. Bakery** is a premier boutique online bakehouse specializing in slow-fermented artisanal sourdoughs, delicate French viennoiserie, celebratory cakes, decadent brownies, tarts, and nostalgic Indian bakery savouries. 

All catalogue items, descriptions, weights, dietary classifications, and suggested prices are positioned for a mid-premium Bengaluru boutique bakery. All data is persisted client-side using a robust LocalStorage state management layer, allowing full offline resilience, immediate sync between the admin dashboard and customer store, and ready-to-wire modular endpoints for future backend databases.

---

## 2. Tech Stack & Architecture

- **Core Framework**: React 19 with Vite 6
- **Routing**: React Router v7 (`react-router-dom`)
- **Icons**: Lucide React
- **Styling**: Tailwind CSS v4 with custom bakery theme variables (`@theme`)
- **Animations & Effects**: `canvas-confetti`, CSS keyframe transitions, smooth accordions
- **Persistence Layer**: Custom safe LocalStorage utility layer (`crumbco_settings`, `crumbco_products`, `crumbco_orders`, `crumbco_cart`, `crumbco_wishlist`, `crumbco_profile`)
- **Structure**:
  ```
  src/
  ├── assets/          # Brand media and static assets
  ├── components/
  │   ├── common/      # ToastContainer, FallbackImage
  │   ├── layout/      # Navbar, AnnouncementBar, Footer
  │   ├── product/     # ProductCard, ProductModal (Quick View)
  │   └── cart/        # CartDrawer
  ├── context/         # StoreContext (unified state & actions)
  ├── data/            # products.js (52 items), initialData.js
  ├── pages/           # HomePage, ShopPage, CustomCakePage, BuildABoxPage,
  │                    # CartPage, CheckoutPage, OrderConfirmationPage,
  │                    # OrderTrackingPage, CustomerAccountPage, AboutPage,
  │                    # ContactPage, FaqPage, PoliciesPages
  ├── admin/           # AdminLoginPage, AdminDashboard
  ├── utils/           # localStorage.js, imageFallback.js
  ├── App.jsx          # Route tree and global overlay providers
  ├── main.jsx         # App mounting with BrowserRouter
  └── index.css        # Tailwind styling & print invoice rules
  ```

---

## 3. Visual Identity & Design System

The application implements a warm, inviting visual identity tailored for boutique bakeries:

| Element | Color / Value | Purpose |
| :--- | :--- | :--- |
| **Main Background** | `#FDF8F5` | *Warm Vanilla Silk* — Soft, elegant canvas |
| **Product Cards** | `#FFFDFB` | Clean, raised card surface |
| **Dark Sections** | `#1E152A` | *Midnight Blackberry* — Luxury contrast header/footer |
| **Primary Buttons** | `#D95D39` | *Burnt Caramel* — Warm appetizing CTA |
| **Button Hover** | `#B84625` | Deep caramel hover state |
| **Secondary Accent** | `#5B8C5A` | *Pistachio Sage* — Veg badges & freshness highlights |
| **Badges & Promos** | `#C83E4D` | *Raspberry Glaze* — Bestseller & sale badges |
| **Borders** | `#EFE4DC` | Delicate, subtle bakery separation lines |
| **Typography** | `Playfair Display` (Serif Headings) & `Plus Jakarta Sans` / `Inter` (Body Text) |

### Automatic Image Fallback Guarantee
All images are wrapped in a smart `FallbackImage` component. If any external URL fails or network drops, an SVG vector artwork depicting an artisan croissant with the product name and category is generated on-the-fly via data URI, guaranteeing **zero broken image icons**.

---

## 4. Complete 52-Product Catalogue

Every product includes unique ID, name, category, price in ₹, weight/pack size, detailed description, dietary tags, stock quantity, and bestseller/featured flags:

### Category A — Artisan Breads (8 Products)
1. **Country Sourdough Boule (400g)** — ₹240
2. **French Baguette Tradition** — ₹135
3. **Roasted Garlic & Rosemary Focaccia** — ₹190
4. **Multigrain Seeded Loaf (450g)** — ₹120
5. **Soft Brioche Burger Buns (Pack of 4)** — ₹140
6. **Whole Wheat Ladi Pav (Pack of 6)** — ₹55
7. **Stuffed Cheese & Jalapeño Pull-Apart Bread** — ₹210
8. **Sweet Milk Rusk Toast (250g)** — ₹95

### Category B — Viennoiserie & Pastries (10 Products)
9. **Classic French Butter Croissant** — ₹160
10. **Belgian Pain au Chocolat** — ₹195
11. **Pistachio Rose Croissant** — ₹235
12. **Almond Frangipane Bostock** — ₹210
13. **Spiced Cinnamon Brioche Roll** — ₹180
14. **Dutch Truffle Chocolate Pastry** — ₹145
15. **Classic Black Forest Pastry** — ₹115
16. **Fresh Pineapple Cream Pastry** — ₹95
17. **Butterscotch Crunch Pastry** — ₹105
18. **Strawberry Chantilly Mille-Feuille** — ₹220

### Category C — Cakes & Cheesecakes (10 Products)
19. **New York Baked Cheesecake (500g)** — ₹750
20. **Blueberry Compote Cheesecake (500g)** — ₹875
21. **Lotus Biscoff Bento Cheesecake (320g)** — ₹595
22. **Belgian Chocolate Truffle Cake (500g)** — ₹620
23. **Red Velvet Cream Cheese Cake (500g)** — ₹650
24. **Classic Mascarpone Tiramisu Jar** — ₹295
25. **Velvet Cocoa Cream Cupcake** — ₹145
26. **Salted Caramel & Hazelnut Cupcake** — ₹165
27. **Mango Alphonso Fresh Cream Cake (500g)** — ₹580
28. **Rasmalai Tres Leches Milk Cake Tub** — ₹320

### Category D — Brownies & Tarts (8 Products)
29. **Overload Dark Chocolate Fudge Brownie** — ₹135
30. **Roasted Walnut & Sea Salt Brownie** — ₹150
31. **Nutella Hazelnut Swirl Brownie** — ₹165
32. **Raspberry Almond Frangipane Tart** — ₹260
33. **Sicilian Lemon Meringue Tart** — ₹210
34. **Salted Dark Chocolate Ganache Tart** — ₹225
35. **Banoffee Caramel Cream Tart** — ₹195
36. **Warm Apple Cinnamon Crumble Pie Slice** — ₹185

### Category E — Cookies & Tea Cakes (8 Products)
37. **Brown Butter Choco-Chunk Cookies (Pack of 4)** — ₹220
38. **Double Dark Chocolate & Sea Salt Cookies (Pack of 4)** — ₹240
39. **Oatmeal Raisin & Cinnamon Cookies (Pack of 6)** — ₹180
40. **Cardamom Pistachio Nankhatai (250g)** — ₹210
41. **Roasted Jeera Butter Biscuits (250g)** — ₹160
42. **English Lemon Drizzle Tea Cake Slice** — ₹140
43. **Banana Walnut & Jaggery Loaf Slice** — ₹155
44. **Rich Plum & Spiced Dry Fruit Cake (250g)** — ₹320

### Category F — Indian Bakery Savouries (8 Products)
45. **Flaky Masala Veg Puff** — ₹55
46. **Paneer Tikka Puff Patty** — ₹75
47. **Classic Vanilla Cream Roll (Pack of 2)** — ₹70
48. **Crispy Masala Khari Puff (200g)** — ₹110
49. **Cheesy Corn & Spinach Quiche Tart** — ₹165
50. **Caramelized Onion & Mushroom Croissant** — ₹215
51. **Baked Spicy Chicken Keema Puff** — ₹85 *(Non-Vegetarian)*
52. **Korean Cream Cheese Garlic Bun** — ₹185

---

## 5. Key Features & Capabilities

### Oven-Fresh Customer Storefront
- **Sticky Header**: Real-time cart count badge, wishlist indicator, search bar with live auto-suggestions, and quick link to admin.
- **Announcement Bar**: "Fresh from the Oven! Discover our freshly baked breads, croissants, cakes and desserts. Free delivery on orders above ₹599."
- **Shop Filters**: Filter by 6 categories, dietary preferences (Vegetarian, Non-Vegetarian, Eggless), price ranges, quick keywords (`Croissant`, `Chocolate`, `Cheesecake`, `Eggless`, `Puff`, `Brownie`), and sorting (Price, Name, Featured).
- **Quick View Modal**: Detailed product card with quantity picker, stock count, allergen disclaimer, and customer recommendations.

### Interactive Custom Cake Studio (`/cakes`)
- **Step 1**: Size Selection (500g, 1kg, 1.5kg, 2kg)
- **Step 2**: Gourmet Sponge Flavours (Belgian Dark Chocolate, Vanilla Bean, Red Velvet, Black Forest, Butterscotch, Pineapple, Alphonso Mango)
- **Step 3**: Frostings (Silky Chocolate Ganache, Whipped Cream, Swiss Buttercream, Cream Cheese)
- **Step 4**: Silhouette Shapes (Classic Round, Modern Square, Romance Heart)
- **Step 5**: Occasions & Custom Piped Message (up to 35 characters)
- **Step 6**: Delivery Schedule (Date picker & Time Slot: Morning, Afternoon, Evening)
- **Step 7**: Reference Design Photo Upload (with real-time file preview)
- **Live Dynamic Price Calculator**: Recalculates total price instantly as options are toggled.

### Interactive Build Your Own Box (`/build-a-box`)
- **Box Options**: Box of 6 (₹899) and Box of 12 (₹1,699).
- **Visual Slot Picker**: 6 or 12 numbered slots showing filled and empty spaces.
- **Shelf Selector**: Browse eligible pastries, brownies, tarts, and cookies. Adding an item fills the next available slot.
- **Safety Validations**: Prevents adding beyond box capacity; requires full box before adding bundle to cart.

### Slide-Out Basket & Financial Calculations
- Accessible from any page via the shopping cart button.
- **Free Delivery Progress Bar**: Live indicator showing remaining amount needed to achieve free delivery.
- **Coupons Engine**:
  - `WELCOME15`: 15% discount across the order.
  - `SWEET100`: ₹100 flat discount on orders above ₹500.
- **Financial Breakdown**: Accurate computation of Subtotal, Discount, Delivery Fee (₹0 if above ₹599 threshold or Store Pickup, ₹50 standard), GST (5%), and Grand Total.

### Checkout & Simulated Payment Gateway
- **Customer Details**: Name, 10-digit phone verification, email, street address, city, and 6-digit PIN code.
- **Fulfillment**: Switch between Doorstep Delivery and Store Pickup (with automatic ₹0 delivery charge).
- **5 Payment Methods**:
  1. **UPI**: Google Pay, PhonePe, Paytm, QR Code scan simulation, and one-click Merchant UPI ID copy (`crumbandco@okhdfcbank`).
  2. **Debit/Credit Card**: Formatted card inputs, card network detection (Visa, Mastercard, RuPay, Amex), and a **Simulated Bank 3D-Secure OTP Modal** (test OTP: `123456`). *No card details or OTPs are saved in LocalStorage.*
  3. **Cash on Delivery (COD)**: Strictly enforces the business rule — available **only for orders up to ₹500**. For orders > ₹500, COD is disabled with the warning: *"Cash on Delivery is available only for orders up to ₹500. Please select another payment method."*
  4. **Net Banking**: HDFC, ICICI, SBI, Axis, Kotak Bank simulation.
  5. **Digital Wallets**: Amazon Pay, Mobikwik, Freecharge simulation.

### Order Confirmation, 5-Stage Tracker & Digital Invoice
- **Order ID Generation**: Generates unique reference code (e.g. `BKR-2026-0002`).
- **5-Stage Live Progress Tracker**:
  1. Order Confirmed
  2. Baking & Preparation
  3. Packed
  4. Out for Delivery / Ready for Pickup
  5. Delivered
- **Digital Invoice**: Complete printable layout with invoice number, date, customer details, tax computation, and functional `window.print()` Print Invoice action.
- **Confetti Blast**: Instant celebration animation on order completion.

### Bakery Owner Admin Dashboard (`/admin`)
- **Analytics Overview**: Total Products (52+), Demo Sales Volume, Active Pending Orders, Delivered Orders, and Low Stock inventory alerts (≤ 15 units).
- **Catalogue Management**:
  - Add new bakes with photo, price, category, weight, and tags.
  - Edit existing product prices, descriptions, images, or stock.
  - Delete products with confirmation.
  - Toggle stock availability (In Stock / Sold Out).
  - *All changes immediately update the live customer catalogue.*
- **Orders Pipeline**:
  - View all customer orders with itemized breakdowns.
  - Advance order status through fulfillment stages.
  - Cancel orders.
  - Inspect full customer address and gift notes.
- **Store & Payment Settings**:
  - Configure Store Name, Tagline, Logo URL.
  - Update Contact Phone, WhatsApp chat link, Email, Address, Opening Hours.
  - Adjust Delivery Fee and Free Delivery Threshold.
  - Update Merchant UPI ID.
  - Configure GST percentage.
  - Changes instantly synchronize across all customer pages.

---

## 6. Demo Admin Credentials

The administrative dashboard is accessible at `/admin`:

- **Admin Login URL**: `/admin/login`
- **Email**: `admin@crumbco.com`
- **Password**: `admin123`

*(These demo credentials are provided for testing purposes and are clearly marked as sandbox credentials).*

---

## 7. Running the Application Locally

### Prerequisites
- Node.js (v18 or higher; tested on v24.21.0)
- npm (v9 or higher)

### Installation & Startup

```bash
# 1. Clone or navigate to the project directory
cd c:/Users/VIGHNESH/Documents/Bakery

# 2. Install dependencies (if not already installed)
npm install

# 3. Start the development server
npm run dev
```

The application will be live at:
- **Local**: `http://localhost:5173/`

### Production Build

```bash
npm run build
npm run preview
```

---

## 8. Features Implemented & Production Readiness

### Implemented Client Features
- [x] Complete 52-product catalogue with authentic descriptions and prices
- [x] Search with instant suggestions and quick search keywords
- [x] Category, price, and dietary filtering (Vegetarian, Non-Veg, Eggless)
- [x] Product quick-view modal and related product recommendations
- [x] Interactive Custom Cake Studio with live price calculation and photo upload
- [x] Interactive Build Your Own Box with visual 6/12 slots
- [x] Responsive slide-out basket drawer and dedicated cart page
- [x] Working coupon validator (`WELCOME15`, `SWEET100`)
- [x] Delivery vs. Store pickup toggles
- [x] Cash on Delivery ₹500 threshold restriction
- [x] 5-option demo payment interface (UPI, Card with 3D Secure OTP, COD, Net Banking, Wallets)
- [x] Order generation (`BKR-2026-XXXX`) with 5-stage fulfillment tracker
- [x] Printable digital invoice
- [x] Customer account portal (profile, orders, addresses, wishlist)
- [x] Admin dashboard (analytics, inventory CRUD, order pipeline, store settings)
- [x] Responsive layout across mobile, tablet, and desktop
- [x] Offline fallback SVG generation for media assets
- [x] Toast notification system

### Production Integration Roadmap (Future Backend)
For production deployment with actual monetary collection:
1. **Payment Gateway Integration**: Connect server-side Razorpay, Stripe, or Paytm webhooks to handle real card processing, signature verification, and automated refund triggers.
2. **Database & API**: Replace LocalStorage with PostgreSQL/MongoDB and Express/FastAPI for multi-user transactional data integrity.
3. **Authentication**: Replace client demo authentication with JWT/OAuth2.0 and bcrypt password hashing.
4. **Cloud Media Storage**: Store custom cake reference uploads and product images on AWS S3 or Cloudinary.
5. **SMS & Email Notifications**: Connect Twilio or SendGrid for real-time customer dispatch updates.

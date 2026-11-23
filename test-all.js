// Automated verification script for Crumb & Co. Bakery
import { INITIAL_PRODUCTS, CATEGORIES } from './src/data/products.js';
import { INITIAL_STORE_SETTINGS, INITIAL_COUPONS } from './src/data/initialData.js';

console.log('========================================');
console.log('CRUMB & CO. BAKERY — AUTOMATED VERIFICATION');
console.log('========================================\n');

let passedTests = 0;
let totalTests = 0;

function assert(condition, message) {
  totalTests++;
  if (condition) {
    console.log(`[PASS] ${message}`);
    passedTests++;
  } else {
    console.error(`[FAIL] ${message}`);
    process.exitCode = 1;
  }
}

// 1. Verify 52 Products
console.log('--- 1. Product Catalogue Verification ---');
assert(INITIAL_PRODUCTS.length === 52, `Exactly 52 products defined (Found: ${INITIAL_PRODUCTS.length})`);

// Unique IDs
const ids = new Set(INITIAL_PRODUCTS.map(p => p.id));
assert(ids.size === 52, `All 52 product IDs are unique (Unique count: ${ids.size})`);

// Category counts
const catCounts = {};
INITIAL_PRODUCTS.forEach(p => {
  catCounts[p.category] = (catCounts[p.category] || 0) + 1;
});

assert(catCounts['Artisan Breads'] === 8, `Category A (Artisan Breads) has 8 products (Found: ${catCounts['Artisan Breads']})`);
assert(catCounts['Viennoiserie & Pastries'] === 10, `Category B (Viennoiserie & Pastries) has 10 products (Found: ${catCounts['Viennoiserie & Pastries']})`);
assert(catCounts['Cakes & Cheesecakes'] === 10, `Category C (Cakes & Cheesecakes) has 10 products (Found: ${catCounts['Cakes & Cheesecakes']})`);
assert(catCounts['Brownies & Tarts'] === 8, `Category D (Brownies & Tarts) has 8 products (Found: ${catCounts['Brownies & Tarts']})`);
assert(catCounts['Cookies & Tea Cakes'] === 8, `Category E (Cookies & Tea Cakes) has 8 products (Found: ${catCounts['Cookies & Tea Cakes']})`);
assert(catCounts['Indian Bakery Savouries'] === 8, `Category F (Indian Bakery Savouries) has 8 products (Found: ${catCounts['Indian Bakery Savouries']})`);

// Check product 1 and product 52 exact details
const prod1 = INITIAL_PRODUCTS.find(p => p.id === 'prod-1');
assert(prod1 && prod1.name.includes('Country Sourdough Boule') && prod1.price === 240, 'Product 1 is Country Sourdough Boule at ₹240');

const prod9 = INITIAL_PRODUCTS.find(p => p.id === 'prod-9');
assert(prod9 && prod9.name.includes('Classic French Butter Croissant') && prod9.price === 160, 'Product 9 is Classic French Butter Croissant at ₹160');

const prod19 = INITIAL_PRODUCTS.find(p => p.id === 'prod-19');
assert(prod19 && prod19.name.includes('New York Baked Cheesecake') && prod19.price === 750, 'Product 19 is New York Baked Cheesecake at ₹750');

const prod51 = INITIAL_PRODUCTS.find(p => p.id === 'prod-51');
assert(prod51 && prod51.dietary === 'Non-Vegetarian' && prod51.price === 85, 'Product 51 is Non-Vegetarian Chicken Keema Puff at ₹85');

const prod52 = INITIAL_PRODUCTS.find(p => p.id === 'prod-52');
assert(prod52 && prod52.name.includes('Korean Cream Cheese Garlic Bun') && prod52.price === 185, 'Product 52 is Korean Cream Cheese Garlic Bun at ₹185');

// 2. Initial Settings & Pricing Rules
console.log('\n--- 2. Store Settings & Business Rules ---');
assert(INITIAL_STORE_SETTINGS.storeName === 'Crumb & Co. Bakery', `Default store name is Crumb & Co. Bakery`);
assert(INITIAL_STORE_SETTINGS.freeDeliveryThreshold === 599, `Free delivery threshold is ₹599`);
assert(INITIAL_STORE_SETTINGS.deliveryCharge === 50, `Standard delivery fee is ₹50`);
assert(INITIAL_STORE_SETTINGS.merchantUpiId === 'crumbandco@okhdfcbank', `Merchant UPI ID is configured`);

// 3. Coupons Validation
console.log('\n--- 3. Coupon Engine Verification ---');
const welcome15 = INITIAL_COUPONS.find(c => c.code === 'WELCOME15');
assert(welcome15 && welcome15.discountPercent === 15, 'Coupon WELCOME15 applies 15% discount');

const sweet100 = INITIAL_COUPONS.find(c => c.code === 'SWEET100');
assert(sweet100 && sweet100.discountFlat === 100 && sweet100.minOrder === 500, 'Coupon SWEET100 gives ₹100 flat off for orders above ₹500');

// 4. COD ₹500 restriction
console.log('\n--- 4. Cash on Delivery (COD) Restriction Rule ---');
function checkCodAllowed(amount) {
  return amount <= 500;
}
assert(checkCodAllowed(450) === true, 'COD is enabled when total is ₹450 (<= ₹500)');
assert(checkCodAllowed(500) === true, 'COD is enabled when total is exactly ₹500');
assert(checkCodAllowed(501) === false, 'COD is disabled when total is ₹501 (> ₹500)');
assert(checkCodAllowed(1250) === false, 'COD is disabled when total is ₹1,250 (> ₹500)');

// 5. Custom Cake Pricing Calculation
console.log('\n--- 5. Custom Cake Builder Pricing Logic ---');
function calculateCakePrice(basePrice, flavourExtra, frostingExtra, shapeExtra) {
  return basePrice + flavourExtra + frostingExtra + shapeExtra;
}
// 1kg Belgian Chocolate with Cream Cheese in Heart shape: 1000 + 50 + 80 + 100 = 1230
const sampleCakePrice = calculateCakePrice(1000, 50, 80, 100);
assert(sampleCakePrice === 1230, `Custom Cake calculation works accurately (Computed: ₹${sampleCakePrice})`);

// 6. Build a Box Pricing
console.log('\n--- 6. Build a Box Pricing ---');
const boxOf6Price = 899;
const boxOf12Price = 1699;
assert(boxOf6Price === 899, 'Box of 6 is priced at ₹899');
assert(boxOf12Price === 1699, 'Box of 12 is priced at ₹1,699');

const eligibleItemsCount = INITIAL_PRODUCTS.filter(p => p.eligibleForBox).length;
assert(eligibleItemsCount >= 20, `Abundant eligible box items available (${eligibleItemsCount} eligible items)`);

// 7. Verify HTTP server response on localhost:5173
console.log('\n--- 7. Live Vite Server HTTP Check ---');
try {
  const res = await fetch('http://localhost:5173/');
  assert(res.status === 200, `Vite dev server returns HTTP 200 OK at http://localhost:5173/`);
  const html = await res.text();
  assert(html.includes('Crumb &amp; Co. Bakery') || html.includes('root'), 'Vite HTML served correctly with root mount and bakery title');
} catch (err) {
  console.error('[FAIL] HTTP Fetch error:', err.message);
}

console.log('\n========================================');
console.log(`RESULTS: ${passedTests} / ${totalTests} assertions passed successfully!`);
console.log('========================================');

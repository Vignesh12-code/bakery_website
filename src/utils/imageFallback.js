// Generates a beautiful SVG data URI fallback if an image fails to load
export const getFallbackImage = (title = 'Artisan Bake', category = 'Bakery') => {
  const cleanTitle = encodeURIComponent(title.length > 28 ? title.slice(0, 26) + '...' : title);
  const cleanCategory = encodeURIComponent(category.toUpperCase());
  
  return `data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="600" height="400" viewBox="0 0 600 400">
    <defs>
      <linearGradient id="g" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stop-color="%23FDF8F5"/>
        <stop offset="100%" stop-color="%23F4E6DC"/>
      </linearGradient>
    </defs>
    <rect width="600" height="400" fill="url(%23g)"/>
    <circle cx="300" cy="160" r="60" fill="%23D95D39" opacity="0.12"/>
    <text x="300" y="175" font-family="serif" font-size="52" fill="%23D95D39" text-anchor="middle">🥐</text>
    <text x="300" y="245" font-family="'Playfair Display', Georgia, serif" font-weight="bold" font-size="20" fill="%231E152A" text-anchor="middle">${cleanTitle}</text>
    <text x="300" y="275" font-family="'Plus Jakarta Sans', sans-serif" font-weight="600" font-size="12" fill="%235B8C5A" letter-spacing="2" text-anchor="middle">${cleanCategory}</text>
    <text x="300" y="305" font-family="'Plus Jakarta Sans', sans-serif" font-size="11" fill="%237A6B63" text-anchor="middle">Crumb &amp; Co. Artisanal Bakery</text>
  </svg>`;
};

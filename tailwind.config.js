/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        bakery: {
          vanilla: '#FDF8F5',       // Warm Vanilla Silk (Main background)
          card: '#FFFDFB',          // Product cards
          blackberry: '#1E152A',    // Midnight Blackberry (Dark sections)
          caramel: '#D95D39',       // Burnt Caramel (Main buttons)
          caramelHover: '#B84625',  // Button hover
          sage: '#5B8C5A',          // Pistachio Sage (Secondary accent)
          raspberry: '#C83E4D',     // Raspberry Glaze (Cart and badges)
          border: '#EFE4DC',        // Borders
          sand: '#F7EDE6',          // Warm light sand accent
          muted: '#7A6B63',         // Muted descriptive text
          cream: '#FFF9F5'          // Ultra soft cream
        }
      },
      fontFamily: {
        serif: ['Playfair Display', 'Georgia', 'serif'],
        sans: ['Plus Jakarta Sans', 'Inter', 'system-ui', 'sans-serif'],
      },
      boxShadow: {
        'soft': '0 4px 20px -2px rgba(30, 21, 42, 0.05), 0 2px 6px -1px rgba(30, 21, 42, 0.03)',
        'hover': '0 12px 30px -4px rgba(217, 93, 57, 0.12), 0 4px 10px -2px rgba(30, 21, 42, 0.06)',
        'modal': '0 25px 50px -12px rgba(30, 21, 42, 0.25)',
      }
    },
  },
  plugins: [],
}

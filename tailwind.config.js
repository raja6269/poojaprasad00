/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        saffron: '#FF9933',
        amber: '#FFA500',
        crimson: '#C41E3A',
        gold: '#FFD700',
        warmwhite: '#FFF8F0',
      },
    },
  },
  plugins: [],
}

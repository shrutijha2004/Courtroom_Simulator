/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        legalNavy: '#0B1A2E',
        legalGold: '#D4A85A',
        cardPurple: '#6D28D9',
        cardTeal: '#0F766E',
        cardCoral: '#BE123C',
        cardAmber: '#B45309',
      },
      fontFamily: {
        serif: ['Georgia', 'ui-serif', 'serif'],
        sans: ['Inter', 'ui-sans-serif', 'system-ui'],
      }
    },
  },
  plugins: [],
}

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {},
    fontFamily: {
      poppins: ["Poppins", "sans-serif"],
      adelia: ["ADELIA", "cursive"],
    }
  },
  plugins: [
    require('tailwind-scrollbar-hide')
  ]

} 
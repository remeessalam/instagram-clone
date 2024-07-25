/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}", "./public/**/*.{svg}"],
  theme: {
    extend: {
      colors: {
        inputfieldbg: "#FAFAFA",
        newinputfieldbg: "#EFEFEF",
        borderColor: "#dbdbdb",
      },
    },
    fontFamily: {
      poppins: ["Poppins", "sans-serif"],
      adelia: ["ADELIA", "cursive"],
      logo: [
        "-apple-system, 'system-ui', 'Segoe UI', Roboto, Helvetica, Arial, sans-serif",
      ],
    },
  },
  plugins: [require("tailwind-scrollbar-hide")],
};

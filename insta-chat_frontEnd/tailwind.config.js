/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}", "./public/**/*.{svg}"],
  theme: {
    extend: {
      colors: {
        inputfieldbg: "#FAFAFA",
        newinputfieldbg: "#EFEFEF",
        borderColor: "#dbdbdb",
        sideBarMenuBorderColor: "rgb(244, 244, 244, 1)",
      },
      boxShadow: {
        custom: "0px 0px 10px 1px rgba(199,199,199,1)",
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

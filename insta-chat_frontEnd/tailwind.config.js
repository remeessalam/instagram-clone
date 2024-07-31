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
        addcommentText: "#9da4b0",
      },
      boxShadow: {
        custom: "0px 0px 10px 1px rgba(0,0,0,0.1)",
      },
      spacing: {
        width: "calc(100% - 244px)",
      },
      keyframes: {
        bouncing: {
          "0%, 100%": {
            transform: "scale(1)",
          },
          "50%": {
            transform: "scale(1.25)",
          },
        },
      },
      animation: {
        bouncing: "bouncing 0.35s ease-in-out",
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

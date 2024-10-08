/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}", "./public/**/*.{svg}"],
  theme: {
    extend: {
      zIndex: {
        100: "10000",
        500: "500",
      },
      borderImageColor: {
        "gradient-violet-orange-red-yellow":
          "linear-gradient(to right, violet, orange, red, yellow)",
      },
      borderColor: {
        story:
          "linear-gradient(25deg, rgba(251,202,65,1) 0%, rgba(194,60,144,1) 82%, rgba(144,55,173,1) 100%)",
      },
      colors: {
        inputfieldbg: "#FAFAFA",
        newinputfieldbg: "#EFEFEF",
        borderColor: "#dbdbdb",
        sideBarMenuBorderColor: "rgb(244, 244, 244, 1)",
        addcommentText: "#9da4b0",
        imageDotColor: "#a89b93",
        c7: "#c7c7c7",
      },
      boxShadow: {
        custom: "0px 0px 10px 1px rgba(0,0,0,0.1)",
      },
      spacing: {
        width: "calc(100% - 244px)",
        chatPageContainer: "calc(100wv - 50px)",
        chatPageMsgContentHight: "calc(100vh - 130px)",
        chatPageMsgContentHightMedium: "calc(100vh - 176px)",
        postUploadChildContainer: "calc(666px - 32px)",
        postUploadImageMaxHeight: "calc(675px - 41px)",
        postUploadImageFilterArea: "calc(974px - 630px)",
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
      aspectRatio: {
        "4 / 5": "4 / 5",
        "16 / 10": "16 / 10",
        " 1 / 1": "1 / 1",
        "16 : 9": "16 / 9",
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
  plugins: [
    require("@tailwindcss/line-clamp"),
    require("tailwind-scrollbar-hide"),
  ],
};

/** @type {import('tailwindcss').Config} */

const plugin = require("tailwindcss/plugin");

export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      backgroundImage: {
        "hero-image": "url('./src/assets/striped-bass-school.png')",
        "callout-image": "url('./src/assets/boat.png')",
        "signup-image": "url('./src/assets/red-drum.png')",
        "transparent-shadow": "linear-gradient(rgb(0 0 0/40%) 0 0)",
      },
      fontFamily: {
        rubik: ["Rubik", "sans-serif"],
        caveat: ["Caveat", "sans-serif"],
        montserrat: ["Montserrat", "sans-serif"],
      },
      textShadow: {
        DEFAULT:
          "-1px -1px 0 #000, 1px -1px 0 #000, -1px 1px 0 #000, 1px 1px 0 #000",
      },
    },
  },
  plugins: [
    plugin(function ({ matchUtilities, theme }) {
      matchUtilities(
        {
          "text-shadow": (value) => ({
            textShadow: value,
          }),
        },
        { values: theme("textShadow") }
      );
    }),
  ],
};

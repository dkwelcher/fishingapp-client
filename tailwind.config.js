/** @type {import('tailwindcss').Config} */

const plugin = require("tailwindcss/plugin");

export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      backgroundImage: {
        "hero-image": "url('/src/assets/hero-bass.png')",
        "callout-image": "url('/src/assets/boat.png')",
        "signup-image": "url('/src/assets/red-drum.png')",
        "login-image": "url('/src/assets/trout.png')",
        "home-image": "url('/src/assets/home-lake.png')",
        "feedback-image-mobile": "url('/src/assets/IMG_3576.JPG')",
        "feedback-image-desktop": "url('/src/assets/IMG_0091.JPG')",
        "managetrips-image": "url('/src/assets/mountain-lake.png')",
        "transparent-shadow": "linear-gradient(rgb(0 0 0/40%) 0 0)",
        "transparent-shadow-darker": "linear-gradient(rgb(0 0 0/70%) 0 0)",
        "transparent-shadow-feedback-success":
          "linear-gradient(rgb(255 255 255/40%) 0 0)",
      },
      fontFamily: {
        title: ["Rubik", "sans-serif"],
        cursive: ["Protest Strike", "sans-serif"],
        paragraph: ["Montserrat", "sans-serif"],
      },
      textShadow: {
        DEFAULT:
          "-1px -1px 0 rgb(30 41 59), 1px -1px 0 rgb(30 41 59), -1px 1px 0 #000, 1px 1px 0 rgb(30 41 59)",
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

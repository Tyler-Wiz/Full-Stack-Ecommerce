/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        hero: "url('/img/client/sliderOne.png')",
        men: "url('/img/client/men.jpg')",
        children: "url('/img/client/children.jpg')",
        women: "url('/img/client/women.png')",
        mountain: "url('/img/client/mountain.png')",
      },
      colors: {
        transparent: "transparent",
        current: "currentColor",
        white: "#ffffff",
        purple: "#3f3cbb",
        midnight: "#121063",
        metal: "#565584",
        tahiti: "#3ab7bf",
        silver: "#ecebff",
        "bubble-gum": "#ff77e9",
        bermuda: "#78dcca",
        secondary: "#3A4658",
        background: "#EEF2F8",
        button: "#00ba9d",
        primary: "#C1032F",
      },
    },
  },
  plugins: [],
};

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
        hero: "url('https://tooxclusive.com/wp-content/uploads/2024/01/SliderOne-1.jpg')",
        men: "url('/img/client/men.jpg')",
        children: "url('/img/client/children.jpg')",
        women:
          "url('https://tooxclusive.com/wp-content/uploads/2024/01/Women.png')",
        mountain: "url('/img/client/mountain.png')",
        cart: "url('/img/client/cart.png')",
        login: "url('/img/client/login-promo.png')",
      },
      colors: {
        transparent: "transparent",
        current: "currentColor",
        white: "#ffffff",
        silver: "#ecebff",
        secondary: "#3A4658",
        background: "#EEF2F8",
        button: "#00ba9d",
        primary: "#C1032F",
        heroBg: "#F2F2F2",
      },
      keyframes: {
        slideIn: {
          "0%": { transform: "translateX(500px)", opacity: "0" },
          "100% ": { transform: "translateX(0)", opacity: "1" },
        },
      },
      animation: {
        slide: "slideIn 500ms ease-in-out",
      },
    },
  },
  plugins: [],
};

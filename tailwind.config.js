/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        "theme-red": "rgb(180 31 27)",
        "theme-yellow": "rgb(211 157 53)",
        "theme-white": "rgb(255 255 255)",
        "theme-black": "rgb(25 25 25)",
        "theme-pink": "rgb(248 226 231)",
        "theme-beige": "rgb(252 242 214)",
        "theme-gray": "rgb(204 204 204)",
      },
    },
  },
  plugins: [],
};

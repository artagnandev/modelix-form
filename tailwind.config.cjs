/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      container: {
        center: true,
        padding: '16px',
      },

      fontFamily: {
        inter: ["Inter", "sans-serif"],
        jakarta: ["Plus Jakarta Sans", 'sans-serif'],
      },

      screens: {
        'sm': {'max': '640px'},

        'xs': {'max': '400px'},
      }
    },
  },
  plugins: [],
}

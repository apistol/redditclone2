/** @type {import('tailwindcss').Config} */
module.exports = {
  purge:  [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      spacing:{
        70:'17.5rem'
      }
    },
  },
  plugins: [],
}

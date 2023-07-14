/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js}"],
  theme: {
    extend: {
      colors: {
        'custom-grey' : '#b5becc',
        'custom-light-blue': "#77b4d6",
        'custom-medium-blue': "#6387bb",
        'custom-dark-blue': "#5360ab",
      }
    },
  },
  plugins: [],
}


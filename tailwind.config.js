// eslint-disable-next-line
const colors = require('tailwindcss/colors')

module.exports = {
  mode: 'jit',
  purge: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      colors: {
        purple: '#677bc4',
        gray: colors.gray
      },
      textColor: {
        primary: 'rgba(255, 255, 255, 0.92)'
      },
      borderColor: {
        primary: 'rgba(255, 255, 255, 0.16)'
      },
      backgroundColor: {
        primary: '#1b1c1d',
        'blue-light': 'rgb(144, 205, 244)',
        'blue-dark': 'rgb(99, 179, 237)'
      }
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
}

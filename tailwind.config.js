// eslint-disable-next-line
const colors = require('tailwindcss/colors')

module.exports = {
  mode: 'jit',
  purge: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      colors: {
        purple: '#5865F2',
        'purple-dark': 'rgb(73, 84, 202)',
        gray: colors.gray,
      },
      textColor: {
        primary: '#b9bbbe',
        hover: '#dcddde',
        muted: '#72767b',
        link: 'rgb(0, 175, 244)',
      },
      borderColor: {
        primary: 'rgba(255, 255, 255, 0.16)',
      },
      backgroundColor: {
        primary: '#36393f',
        secondary: '#2f3136',
        'secondary-alt': '#292b2f',
        tertiary: '#202225',
        floating: '#18191c',
        textarea: '#40444b',
        divider: 'hsla(0, 0%, 100%, 0.06)',
        active: 'rgba(79, 84, 92, 0.32)',
        'blue-light': 'rgb(144, 205, 244)',
        'blue-dark': 'rgb(99, 179, 237)',
        'modifier-hover': 'rgba(79, 84, 92, 0.16)',
        'modifier-selected': 'rgba(79, 84, 92, 0.32)',
      },
      spacing: {
        0.25: '0.0625rem',
        13: '3.25rem',
        15: '3.75rem',
        18: '4.5rem',
      },
      boxShadow: {
        msg: '0 0 0 1px rgba(32,34,37,.6),0 2px 10px 0 rgba(0,0,0,.2)',
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
}

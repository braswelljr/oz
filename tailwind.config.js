/* eslint-disable @typescript-eslint/no-var-requires */
const defaultTheme = require('tailwindcss/defaultTheme')

module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  //darkMode: false, // or 'media' or 'class'
  theme: {
    screens: {
      xs: '475px',
      '3xl': '1920px',
      ...defaultTheme.screens
    },
    fontFamily: {
      sans: ["'Ubuntu'", ...defaultTheme.fontFamily.sans],
      serif: ["'Montserrat Alternates'", ...defaultTheme.fontFamily.serif]
    },
    extend: {
      backgroundImage: {},
      animation: {},
      keyframes: {}
    }
  },
  variants: {
    extend: {}
  },
  plugins: [
    require('@tailwindcss/line-clamp'),
    require('@tailwindcss/aspect-ratio')
  ]
}

const defaultTheme = require('tailwindcss/defaultTheme')

module.exports = {
  darkMode: 'class',
  content: [
    "./index.html",
    "./src/**/*.{js,jsx}",
  ],
  theme: {
    screens: {
      'xs': '360px',
      ...defaultTheme.screens,
    },
    extend: {
      boxShadow: {

        custom: "0 1px 5px rgb(0 0 0 / 20%), 0 2px 2px rgb(0 0 0 / 14%), 0 3px 1px -2px rgb(0 0 0 / 12%)",
        header: "-14px 8px 16px rgb(0 0 0 / 20%), 0 2px 0px rgb(0 0 0 / 14%), 0 3px 1px -2px rgb(0 0 0 / 12%)"
      },
    },
  },
  plugins: [
    'postcss-nesting',
  ]
  ,
  important: true
}
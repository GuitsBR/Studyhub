/* eslint-disable global-require */
module.exports = {
  content: [
    './index.html',
    './src/**/*.{ts,tsx}'
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#e8f0fe',
          100: '#d0e1fd',
          200: '#a2c3fa',
          300: '#74a5f7',
          400: '#4787f4',
          500: '#1a6af1',
          600: '#1555c1',
          700: '#104191',
          800: '#0a2c60',
          900: '#051630'
        }
      }
    }
  },
  plugins: [require('@tailwindcss/typography')]
};
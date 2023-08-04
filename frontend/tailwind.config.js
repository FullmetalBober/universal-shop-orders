/** @type {import('tailwindcss').Config} */

const headerHeight = 64;
const mainMarginY = 8 * 2;
const sumHeight = headerHeight + mainMarginY;
const newScreenHeight = `calc(100vh - ${sumHeight}px)`;

export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      minHeight: {
        'new-screen': newScreenHeight,
      },
    },
  },
  plugins: [
    require('daisyui'),
    function ({ addVariant }) {
      addVariant('child', '& > *');
    },
  ],
};

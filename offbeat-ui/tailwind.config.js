/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './index.html',
    './src/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {

    extend: {
      colors: {
        'celestial': '#4D9DE0',
        'indian-red': '#c81f1f',
        'saffron': '#E1BC29',
        'jade': '#66CC96',
        'royal-purple': '#7768AE',
      },
    },
  },
  plugins: ['tailwindcss-3d'],
};


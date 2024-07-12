/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './index.html',
    './src/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    fontFamily: {
      'sans': ['Roboto Condensed'],
    },
    extend: {
      colors: {
        'celestial': '#4D9DE0',
        'indian-red': '#c81f1f',
        'saffron': '#E1BC29',
        'jade': '#66CC96',
        'royal-purple': '#EAF2E3',
        'caledon': '#56A3A6',
        'peach': '#F4C095',
        'orange': '#fdd42f',
        'avocado': '#F44708',
        'timber': '#DAD2D8',
        'gunmetal': '#143642'
      },
    },
  },
  plugins: ['tailwindcss-3d'],
};


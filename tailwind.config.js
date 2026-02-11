/** @type {import('tailwindcss').Config} */
import lineClamps from '@tailwindcss/line-clamp';
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {},
  },
  plugins: [lineClamps],
};

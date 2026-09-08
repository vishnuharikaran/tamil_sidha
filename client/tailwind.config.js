/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        saffron: {
          50: '#fff7ed',
          100: '#ffedd5',
          200: '#fed7aa',
          300: '#fdba74',
          400: '#fb923c',
          500: '#f97316',
          600: '#C45508', // Deep saffron
          700: '#a34204',
          800: '#833407',
          900: '#692b09',
        },
        forest: {
          50: '#f0fdf4',
          100: '#dcfce7',
          200: '#bbf7d0',
          300: '#86efac',
          400: '#4ade80',
          500: '#22c55e',
          600: '#16a34a',
          700: '#2D6A4F', // Forest green
          800: '#1e4b37',
          900: '#143527',
          950: '#0b2017',
        },
        cream: {
          50: '#FDF6EC', // Cream off-white
          100: '#f9ecd7',
          200: '#f3d9b0',
          300: '#ebc082',
        },
      },
      fontFamily: {
        serif: ['Lora', 'Georgia', 'serif'],
        tamil: ['"Tiro Tamil"', 'Georgia', 'serif'],
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
    },
  },
  plugins: [
    require('@tailwindcss/forms'),
  ],
};

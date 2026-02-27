/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        // Markenfarben für energiekosten-sinken.de
        brand: {
          50:  '#eefbf3',
          100: '#d6f5e1',
          200: '#b0eac8',
          300: '#7cd9a8',
          400: '#46c284',
          500: '#22a366',  // Hauptfarbe: Energetisches Grün
          600: '#158551',
          700: '#116a43',
          800: '#105437',
          900: '#0e452e',
          950: '#06271a',
        },
        energy: {
          yellow: '#fbbf24', // Strom/Energie-Akzent
          orange: '#f97316', // Wärme/Gas-Akzent
          dark:   '#0f172a', // Dunkler Hintergrund
        },
      },
      fontFamily: {
        sans: ['var(--font-outfit)', 'system-ui', 'sans-serif'],
        display: ['var(--font-cabinet)', 'var(--font-outfit)', 'system-ui', 'sans-serif'],
      },
    },
  },
  plugins: [],
}

/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'ui-sans-serif', 'system-ui', 'sans-serif'],
      },
      keyframes: {
        flow: {
          to: { strokeDashoffset: '-20' },
        },
      },
      animation: {
        flow: 'flow 1s linear infinite',
      },
    },
  },
  plugins: [],
};

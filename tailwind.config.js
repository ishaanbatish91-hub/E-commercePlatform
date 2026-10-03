/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'ui-sans-serif', 'system-ui', 'sans-serif'],
      },
      boxShadow: {
        soft: '0 24px 60px -24px rgba(15, 23, 42, 0.35)',
      },
      colors: {
        canvas: '#f7f7f5',
        ink: '#101828',
        accent: '#0f172a',
        muted: '#667085',
        glow: '#7c3aed',
        success: '#16a34a',
      },
    },
  },
  plugins: [],
}

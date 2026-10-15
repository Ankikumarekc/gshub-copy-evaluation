import type { Config } from 'tailwindcss';
const config: Config = {
  content: ['./src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        maroon: { 950: '#3A0F18', 900: '#4A1420', 800: '#5E1A28', 700: '#76222F', 600: '#8E2C3B' },
        cream: { 50: '#FBF8F1', 100: '#F6F0E2', 200: '#EBE1CB' },
        gold: { 400: '#C9A55C', 500: '#B8924A', 600: '#9A7A3A' },
      },
      fontFamily: {
        display: ['var(--font-display)', 'Georgia', 'serif'],
        sans: ['var(--font-sans)', 'system-ui', 'sans-serif'],
      },
    },
  },
  plugins: [],
};
export default config;

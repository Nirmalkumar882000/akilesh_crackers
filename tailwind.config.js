/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#FFF5F2',
          100: '#FFEAE3',
          200: '#FFD5C6',
          300: '#FFB8A8',
          400: '#FF9A8B',
          500: '#FF7459', // Primary color
          600: '#E85A40',
          700: '#D14124',
          800: '#B32918',
          900: '#8A1E10',
        },
        secondary: {
          50: '#F2F8FE',
          100: '#E3F0FC',
          200: '#C6E0F9',
          300: '#A8CFF6',
          400: '#8BBEF2',
          500: '#5AA6EE', // Secondary color
          600: '#4084C6',
          700: '#2A62A4',
          800: '#174482',
          900: '#0A2C5F',
        },
        accent: {
          50: '#FFFDF2',
          100: '#FFF9E3',
          200: '#FFF2C6',
          300: '#FFEBA8',
          400: '#FFE48B',
          500: '#FFD659', // Accent color
          600: '#E6B840',
          700: '#CC9A28',
          800: '#A37C14',
          900: '#7A5E08',
        }
      },
      animation: {
        'spark': 'spark 1s ease-in-out infinite',
        'float': 'float 3s ease-in-out infinite',
        'pulse-slow': 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
      },
      keyframes: {
        spark: {
          '0%, 100%': { transform: 'scale(1) rotate(0deg)', opacity: '0.4' },
          '50%': { transform: 'scale(1.2) rotate(20deg)', opacity: '1' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-10px)' },
        }
      }
    },
  },
  plugins: [],
};
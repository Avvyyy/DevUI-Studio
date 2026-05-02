/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        // Deep Blues/Navies - Professional dark mode
        navy: {
          50: '#e8eaed',
          100: '#c5cad1',
          200: '#9ea7b3',
          300: '#778495',
          400: '#5a697e',
          500: '#3d4f67',
          600: '#37485f',
          700: '#2f3f54',
          800: '#27364a',
          900: '#1E1E2E', // Deep navy
          950: '#121418', // Darkest navy
        },
        // Charcoal/Near-Blacks - Maximum contrast
        charcoal: {
          50: '#f5f5f5',
          100: '#e0e0e0',
          200: '#c2c2c2',
          300: '#a3a3a3',
          400: '#858585',
          500: '#666666',
          600: '#4d4d4d',
          700: '#333333',
          800: '#2A3132', // Charcoal
          900: '#1A1A1A', // Near-black
          950: '#0a0a0a',
        },
        // Cool Grays/Muted Slate - Calming UI
        slate: {
          50: '#f8fafc',
          100: '#f1f5f9',
          200: '#e2e8f0',
          300: '#cbd5e1',
          400: '#94a3b8',
          500: '#64748b',
          600: '#475569',
          700: '#334155',
          800: '#1e293b',
          900: '#0f172a',
          950: '#020617',
        },
        // Accent colors for UI elements
        accent: {
          blue: '#3b82f6',
          cyan: '#06b6d4',
          green: '#10b981',
          yellow: '#f59e0b',
          red: '#ef4444',
          purple: '#8b5cf6',
        },
      },
      backgroundColor: {
        'dark-primary': '#121418',
        'dark-secondary': '#1E1E2E',
        'dark-tertiary': '#2A3132',
        'dark-hover': '#334155',
      },
      textColor: {
        'dark-primary': '#f8fafc',
        'dark-secondary': '#cbd5e1',
        'dark-muted': '#94a3b8',
      },
      borderColor: {
        'dark-border': '#334155',
        'dark-border-light': '#475569',
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        mono: ['Fira Code', 'Consolas', 'Monaco', 'monospace'],
      },
      boxShadow: {
        'dark-sm': '0 1px 2px 0 rgba(0, 0, 0, 0.5)',
        'dark-md': '0 4px 6px -1px rgba(0, 0, 0, 0.5), 0 2px 4px -1px rgba(0, 0, 0, 0.3)',
        'dark-lg': '0 10px 15px -3px rgba(0, 0, 0, 0.5), 0 4px 6px -2px rgba(0, 0, 0, 0.3)',
        'dark-xl': '0 20px 25px -5px rgba(0, 0, 0, 0.5), 0 10px 10px -5px rgba(0, 0, 0, 0.3)',
      },
    },
  },
  plugins: [],
}



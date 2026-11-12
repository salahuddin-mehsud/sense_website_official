/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        sense: {
          darkest: '#081726',
          dark: '#0c2338',
          navy: '#10334e',
          deep: '#15456b',
          blue: '#1b6ca8',
          cyan: '#0284c7',
          lightCyan: '#38bdf8',
          paleCyan: '#e0f2fe',
          accent: '#f59e0b',
          accentHover: '#d97706',
          circuit: '#22d3ee',
        }
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', '-apple-system', 'sans-serif'],
        mono: ['JetBrains Mono', 'Fira Code', 'monospace'],
      },
      boxShadow: {
        'glow': '0 0 25px -5px rgba(56, 189, 248, 0.25)',
        'glow-accent': '0 0 25px -5px rgba(245, 158, 11, 0.35)',
        'nav': '0 4px 20px -2px rgba(12, 35, 56, 0.08)',
      }
    },
  },
  plugins: [],
}


/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'lightred': '#E63946',
        'cream': '#F1FAEE',
        'skyblue': '#A8DADC',
        'seablue': '#457B9D',
        'darkblue': '#1D3557',
      },
      keyframes: {
        shake: {
          '0%, 100%': { transform: 'rotate(0deg)' },
          '25%': { transform: 'rotate(-3deg)' },
          '50%': { transform: 'rotate(3deg)' },
          '75%': { transform: 'rotate(-3deg)' },
        },
      },
      animation: {
        shake: 'shake 0.2s linear',
      },
    },
  },
  plugins: [],
}


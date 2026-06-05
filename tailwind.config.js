/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        bg: {
          base: '#08090E',
          surface: '#0F1117',
          elevated: '#161820',
        },
        accent: {
          violet: '#6C63FF',
          teal: '#00D4AA',
          danger: '#FF4D6A',
        },
        text: {
          primary: '#F0F0F5',
          secondary: '#7B7D8E',
        },
        border: {
          subtle: 'rgba(255,255,255,0.06)',
          medium: 'rgba(255,255,255,0.10)',
        },
      },
      fontFamily: {
        syne: ['Syne', 'sans-serif'],
        display: ['Syne', 'sans-serif'],
        dm: ['Plus Jakarta Sans', 'sans-serif'],
        body: ['Plus Jakarta Sans', 'sans-serif'],
      },
      boxShadow: {
        'glow-violet': '0 0 24px rgba(108,99,255,0.35)',
        'glow-teal': '0 0 24px rgba(0,212,170,0.35)',
        'glow-danger': '0 0 24px rgba(255,77,106,0.35)',
        'card': '0 4px 24px rgba(0,0,0,0.4)',
      },
      keyframes: {
        shake: {
          '0%, 100%': { transform: 'translateX(0)' },
          '15%': { transform: 'translateX(-6px)' },
          '30%': { transform: 'translateX(6px)' },
          '45%': { transform: 'translateX(-4px)' },
          '60%': { transform: 'translateX(4px)' },
          '75%': { transform: 'translateX(-2px)' },
          '90%': { transform: 'translateX(2px)' },
        },
        'glow-pulse': {
          '0%, 100%': { boxShadow: '0 0 0px rgba(0,212,170,0)' },
          '50%': { boxShadow: '0 0 32px rgba(0,212,170,0.6)' },
        },
        'slide-in': {
          '0%': { transform: 'translateX(100%)' },
          '100%': { transform: 'translateX(0)' },
        },
        'fade-in': {
          '0%': { opacity: '0', transform: 'translateY(8px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        'count-up': {
          '0%': { opacity: '0', transform: 'translateY(10px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        'progress-fill': {
          '0%': { width: '0%' },
          '100%': { width: 'var(--progress-width)' },
        },
      },
      animation: {
        shake: 'shake 0.5s ease-in-out',
        'glow-pulse': 'glow-pulse 0.8s ease-in-out',
        'slide-in': 'slide-in 0.35s cubic-bezier(0.16,1,0.3,1)',
        'fade-in': 'fade-in 0.3s ease-out',
        'count-up': 'count-up 0.4s ease-out',
      },
    },
  },
  plugins: [],
}

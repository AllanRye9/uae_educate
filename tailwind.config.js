/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'uae-red': '#CE1126',
        'uae-green': '#009A44',
        'uae-gold': '#C8A840',
        'uae-sand': '#F5E6C8',
        'uae-dark': '#0D1B2A',
        'uae-navy': '#1a2744',
      },
      fontFamily: {
        'display': ['Georgia', 'serif'],
      },
      backgroundImage: {
        'desert-gradient': 'linear-gradient(180deg, #0D1B2A 0%, #1a3a5c 40%, #C8A840 100%)',
      },
      animation: {
        'float': 'float 3s ease-in-out infinite',
        'pulse-slow': 'pulse 3s ease-in-out infinite',
        'spin-slow': 'spin 8s linear infinite',
        'bounce-slow': 'bounce 2s infinite',
        'shimmer': 'shimmer 2s linear infinite',
        'glow': 'glow 2s ease-in-out infinite alternate',
        'star-pop': 'starPop 0.5s ease-out forwards',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        shimmer: {
          '0%': { backgroundPosition: '-200% center' },
          '100%': { backgroundPosition: '200% center' },
        },
        glow: {
          '0%': { boxShadow: '0 0 5px #C8A840, 0 0 10px #C8A840' },
          '100%': { boxShadow: '0 0 20px #C8A840, 0 0 40px #C8A840, 0 0 60px #C8A840' },
        },
        starPop: {
          '0%': { transform: 'scale(0) rotate(-30deg)', opacity: '0' },
          '60%': { transform: 'scale(1.3) rotate(10deg)', opacity: '1' },
          '100%': { transform: 'scale(1) rotate(0deg)', opacity: '1' },
        },
      },
    },
  },
  plugins: [],
}


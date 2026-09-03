/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          50: '#eff6ff',
          100: '#dbeafe',
          500: '#00c3ff',
          600: '#2563eb',
          700: '#1d4ed8',
          900: '#0f172a',
        },
        logo: {
          cyan: '#00c3ff',
          blue: '#2563eb',
          amber: '#f59e0b',
          orange: '#f97316',
          pink: '#e11d48',
          magenta: '#d946ef',
          dark: '#1f2937',
        },
        accent: {
          blue: '#2563eb',
          cyan: '#00c3ff',
          amber: '#f59e0b',
          orange: '#f97316',
          pink: '#e11d48',
          violet: '#7c3aed',
          sky: '#38bdf8',
        },
        surface: {
          base: '#f8fafc',
          card: '#ffffff',
          glass: 'rgba(255, 255, 255, 0.85)',
          muted: '#f1f5f9',
          border: 'rgba(226, 232, 240, 0.8)',
        }
      },
      borderWidth: {
        '3': '3px',
      },
      fontFamily: {
        sans: ['"Plus Jakarta Sans"', 'Inter', 'system-ui', 'sans-serif'],
        display: ['Outfit', '"Plus Jakarta Sans"', 'sans-serif'],
        montserrat: ['Montserrat', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'monospace'],
      },
      animation: {
        'float-slow': 'float 8s ease-in-out infinite',
        'float-reverse': 'floatReverse 7s ease-in-out infinite',
        'pulse-subtle': 'pulseSubtle 4s ease-in-out infinite',
        'pulse-slow': 'pulseSubtle 6s ease-in-out infinite',
        'spin-slow': 'spin 20s linear infinite',
        'radar-sweep': 'radarSweep 4s linear infinite',
        'scanline': 'scanline 6s ease-in-out infinite',
        'shimmer': 'shimmer 2.5s infinite',
        'laser-beam': 'laserBeam 3s ease-in-out infinite',
        'pulse-glow': 'pulseGlow 2s ease-in-out infinite',
        'gradient-shift': 'gradientShift 10s ease infinite',
        'page-in': 'pageIn 0.35s ease-out forwards',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px) rotate(0deg)' },
          '50%': { transform: 'translateY(-12px) rotate(1deg)' },
        },
        floatReverse: {
          '0%, 100%': { transform: 'translateY(0px) rotate(0deg)' },
          '50%': { transform: 'translateY(10px) rotate(-1deg)' },
        },
        pulseSubtle: {
          '0%, 100%': { opacity: '0.6', transform: 'scale(1)' },
          '50%': { opacity: '0.9', transform: 'scale(1.03)' },
        },
        radarSweep: {
          '0%': { transform: 'rotate(0deg)' },
          '100%': { transform: 'rotate(360deg)' },
        },
        scanline: {
          '0%': { transform: 'translateY(-100%)' },
          '50%': { transform: 'translateY(100%)' },
          '100%': { transform: 'translateY(-100%)' },
        },
        shimmer: {
          '100%': { transform: 'translateX(100%)' },
        },
        laserBeam: {
          '0%, 100%': { opacity: '0.3', transform: 'scaleX(0.95)' },
          '50%': { opacity: '1', transform: 'scaleX(1.05)' },
        },
        pulseGlow: {
          '0%, 100%': { filter: 'drop-shadow(0 0 15px rgba(0,195,255,0.3))' },
          '50%': { filter: 'drop-shadow(0 0 30px rgba(0,195,255,0.7))' },
        },
        gradientShift: {
          '0%, 100%': { 'background-position': '0% 50%' },
          '50%': { 'background-position': '100% 50%' },
        },
        pageIn: {
          '0%': { opacity: '0', transform: 'translateY(8px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        }
      }
    },
  },
  plugins: [],
}

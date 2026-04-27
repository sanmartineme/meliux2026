/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        brand: {
          yellow: '#FFE600',
          'yellow-hover': '#FFF066',
          'yellow-active': '#E6CF00',
        },
        surface: {
          page:  '#0A0A0A',
          1:     '#141414',
          2:     '#1C1C1C',
          3:     '#242424',
          4:     '#2E2E2E',
          5:     '#3A3A3A',
        },
        text: {
          primary:   '#FFFFFF',
          secondary: '#E0E0E0',
          muted:     '#B0B0B0',
          subtle:    '#888888',
          disabled:  '#555555',
        },
        badge: {
          new:       '#FFE600',
          last:      '#FF6B35',
          free:      '#2E7D32',
          exclusive: '#1565C0',
          live:      '#E53935',
        }
      },
      fontFamily: {
        sans: ['"Helvetica Neue"', 'Arial', 'sans-serif'],
      },
      borderRadius: {
        badge:  '2px',
        btn:    '4px',
        card:   '6px',
        modal:  '8px',
        pill:   '20px',
      },
      animation: {
        'fade-in':    'fadeIn 300ms ease forwards',
        'slide-up':   'slideUp 300ms ease forwards',
        'pulse-dot':  'pulseDot 1.2s infinite',
        'shimmer':    'shimmer 1.5s infinite',
      },
      keyframes: {
        fadeIn:   { from: { opacity: 0 }, to: { opacity: 1 } },
        slideUp:  { from: { opacity: 0, transform: 'translateY(16px)' }, to: { opacity: 1, transform: 'translateY(0)' } },
        pulseDot: { '0%,100%': { opacity: 1 }, '50%': { opacity: 0.3 } },
        shimmer:  { '0%': { backgroundPosition: '200% 0' }, '100%': { backgroundPosition: '-200% 0' } },
      }
    }
  },
  plugins: []
}

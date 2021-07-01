module.exports = {
  mode: "jit",
  purge: ['./pages/**/*.{js,ts,jsx,tsx}', './components/**/*.{js,ts,jsx,tsx}'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    screens: {
      '2xl': { 'max': '1535px' },
      // => @media (max-width: 1535px) { ... }

      'xl': { 'max': '1279px' },
      // => @media (max-width: 1279px) { ... }

      'lg': { 'max': '1023px' },
      // => @media (max-width: 1023px) { ... }

      'md': { 'max': '767px' },
      // => @media (max-width: 767px) { ... }

      'sm': { 'max': '639px' },
      // => @media (max-width: 639px) { ... }
    },
    extend: {
      keyframes: {
        landing: {
          '0%': { transform: 'scale(1.2)', opacity: '0' },
          '100%': { transform: 'scale(1)', opacity: '1' },
        },
        "fade-in": {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        "image-loading": {
          '0%': { 'background-color': 'gray' },
          '50%': { 'background-color': '#ccc' },
          '100%': { 'background-color': 'gray' },
        },
        "error-shake": {
          '0%': { transform: 'translate(30px)' },
          '20%': { transform: 'translate(-30px)' },
          '40%': { transform: 'translate(15px)' },
          '60%': { transform: ' translate(-15px)' },
          '80%': { transform: 'translate(8px)' },
          '100%': { transform: ' translate(0px)' }
        }
      },
      animation: {
        "landing-loaded": 'landing 450ms ease-in',
        "fade-in": "fade-in 250ms ease-in",
        "error-shake": "error-shake 0.4s 1 linear",
        "image-loading": "image-loading 2s infinite"
      }
    },
  },
  variants: {
    extend: {},
  },
  plugins: [
    require('@tailwindcss/line-clamp'),
    require("tailwind-scrollbar-hide")
  ],
}

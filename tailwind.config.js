/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      keyframes: {
        scroll: {
          '0%': { transform: 'translateX(0)' },
          '100%': { transform: 'translateX(-50%)' }
        },
        scrollReverse: {
          '0%': { transform: 'translateX(-50%)' },
          '100%': { transform: 'translateX(0)' }
        }
      },
      animation: {
        'scroll': 'scroll 10s linear infinite',
        'scroll-reverse': 'scrollReverse 10s linear infinite'
      },
      fontFamily: {
        roboto: ['Roboto', 'sans-serif'], // Add your custom font
        poppins: ['Poppins', 'sans-serif'],
        inter: ['Inter', 'sans-serif'],
      },
    }
  },
  variants: {
    extend: {
      animation: ['hover', 'group-hover']
    }
  },
  plugins: []
}
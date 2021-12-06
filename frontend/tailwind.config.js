module.exports = {
  purge: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    screens: {
      xs: '200px',
      sm: '480px',
      md: '708px',
      lg: '976px',
      xl: '1440px',
    },
    container: {
      center: true,
    },
    fontFamily: {
      main: ['Readex Pro', 'sans-serif'],
    },
    extend: {},
  },
  variants: {
    extend: {},
  },
  plugins: [],
};

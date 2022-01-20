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
    extend: {
      colors: {
        primary: '#C6B1F7',
        secondary: '#581C87',
        lightgray: '#c0c6d1',
        success: '#7dce82',
        failed: '#f25b5bff',
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
};

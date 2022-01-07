// craco.config.js
const path = require('path');
module.exports = {
  style: {
    postcss: {
      plugins: [require('tailwindcss'), require('autoprefixer')],
    },
  },
  webpack: {
    alias: {
      '@components': path.resolve(__dirname, 'src/components'),
      '@icons': path.resolve(__dirname, 'src/icons'),
      '@admin': path.resolve(__dirname, 'src/admin'),
      '@api': path.resolve(__dirname, 'src/api'),
      '@user': path.resolve(__dirname, 'src/user'),
      '@middleware': path.resolve(__dirname, 'src/middleware'),
      '@categories': path.resolve(__dirname, 'src/categories'),
      '@store': path.resolve(__dirname, 'src/store')
    },
  },
};

module.exports = {
  mode: 'jit',
  purge: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  darkMode: 'class', // or 'media' or 'class'
  theme: {
    extend: {
      height: theme => ({
        'homeHeight': 'calc(100vh - 14.25rem)'
      })
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
}

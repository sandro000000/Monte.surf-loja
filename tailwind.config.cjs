module.exports = {
  content: ["./index.html","./src/**/*.{js,jsx,ts,tsx}"] ,
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        sand: {
          50: '#fbf6f0',
          100: '#f6efe6'
        },
        teal: {
          400: '#2dd4bf',
          500: '#14b8a6'
        }
      },
      boxShadow: {
        'card': '0 4px 12px rgba(2,6,23,0.08)'
      }
    }
  },
  plugins: [],
}

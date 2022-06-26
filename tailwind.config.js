/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      colors: {
        headerBg: '#F1F4F8',
        borderTable: '#F1F4F8',
        borderRow: '#CBD2E1',

        activeTabText: '#004FB4',
        headingText: '#4F6C92',
        mainText: '#A4B8D3',
        labelText: '#CBD2E1',

        confirmText: '#55CB82',
        alertText: '#E2006A',
      },
    },
  },
  plugins: [],
};

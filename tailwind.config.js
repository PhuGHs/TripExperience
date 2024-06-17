/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./App.{js,jsx,ts,tsx}', './src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        nunitoBlack: ['NunitoSans-Black'],
        nunitoBold: ['NunitoSans-Bold'],
        nunitoBoldItalic: ['NunitoSans-BoldItalic'],
        nunitoItalic: ['NunitoSans-Italic'],
        nunitoLight: ['NunitoSans-Light'],
        nunitoMedium: ['NunitoSans-Medium'],
        nunitoRegular: ['NunitoSans-Regular'],
        nunitoSemiBold: ['NunitoSans-SemiBold'],
        nunitoSemiBoldItalic: ['NunitoSans-SemiBoldItalic'],
      },
      textColor: {
        primary: '#1E1E1E',
        secondary: '#7F7F81',
        main: '#FF6F61'
      },
      backgroundColor: {
        main: '#FF6F61',
        background: '#F4F4F4'
      }
    },
  },
  plugins: [],
};

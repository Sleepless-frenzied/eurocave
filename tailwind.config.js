/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',
  content: ["./src/**/*.{html,js,jsx,ts,tsx}", "./public/index.html"],
  theme: {
    extend: {

      animation: {
        'spin-slow': 'spin 3s linear infinite',
      },
      colors:{
        'light': '#f1f2f4',
        'lightNav':"#fdfdfe",
        'lightTxt':'#000000',
        'lightButton':'#e2e4e7',
        'lightModule':'#fdfdfe',
        'lightDivi':'#d6d8db',
        'lightHR':'#413b3b',



        'dark':'#282a2e',
        'darkNav':"#070707",
        'darkTxt':'#ffffff',
        'darkButton':'#2b2d31',
        'darkModule':'#313338',
        'darkDivi':'#3b3d44',
        'darkHR':'#1677ff'

      },
    },
  },
  plugins: [],
}


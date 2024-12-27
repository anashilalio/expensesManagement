/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,jsx,ts,tsx}",
    "./components/**/*.{js,jsx,ts,tsx}"
  ],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {
      colors: {
        title: "#17202A",
        subtitle: "#808B96",
        buttPrimary: "#7F3DFF",
        buttSecondary: "#EEE5FF",        
        text:{
          primary: "#FCFCFC",
          dark: "#212325",
          gray: "#91919f"
        },
        category:{
          transport: {
            primary: "#1982c4",
            secondary: "#e5f3fc"
          },
          food: {
            primary: "#8ac926",
            secondary: "#f4fbe8"
          },
          shopping: {
            primary: "#ff595e",
            secondary: "#ffeeef"
          },
          entertainment: {
            primary: "#6a4c93",
            secondary: "#f0ecf5"
          }
        },
        borderInactive: "#F1F1FA",
        borderActive: "#7F3DFF",
        violet: "#7F3DFF",
        tomato: {
          primary: "#ee6856",
          secondary: "#fdf0ee"
        },
        lightGray: "#FCFCFC",
      },
      fontFamily: {
        pthin: ["Poppins-Thin", "sans-serif"],
        pextralight: ["Poppins-ExtraLight", "sans-serif"],
        plight: ["Poppins-Light", "sans-serif"],
        pregular: ["Poppins-Regular", "sans-serif"],
        pmedium: ["Poppins-Medium", "sans-serif"],
        psemibold: ["Poppins-SemiBold", "sans-serif"],
        pbold: ["Poppins-Bold", "sans-serif"],
        pextrabold: ["Poppins-ExtraBold", "sans-serif"],
        pblack: ["Poppins-Black", "sans-serif"],
      },
    },
  },
  plugins: [],
}
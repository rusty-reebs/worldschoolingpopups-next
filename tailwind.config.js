/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
    "./app/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      aspectRatio: {
        "4/3": "4 / 3",
      },
      colors: {
        yellow: "#FBE8A6",
        orange: "#F4976C",
        darkblue: "#303C6C",
        lightblue: "#B4DFE5",
        lighterblue: "#D2FDFF",
        black: "#000000",
        white: "#f0f8ff",
        red: "#ef3038",
        green: "#228b22",
      },
    },
    fontFamily: {
      source: ['"Source Sans Pro"', "sans-serif"],
      merriweather: ['"Merriweather Sans"', "sans-serif"],
    },
  },
  plugins: [],
};

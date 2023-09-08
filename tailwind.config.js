/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    colors: {
      "Misty-Grey": "#c9c4c3",
      "Midnight-Blue": "#282f4a",
      "Deep-Blue": "#2f3d4b",
      "Dusty-Rose": "#a28686",
      Black: "#000",
    },

    plugins: [require("tailwindcss-animated")],
  },
};

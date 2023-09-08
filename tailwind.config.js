/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    colors: {
      sand: "#f8f2ed",
      denim: "#1b2139",
      blurple: "#4c4c8c",
      cherry: "#d74e38",
    },
    plugins: [require("tailwindcss-animated")],
  },
};

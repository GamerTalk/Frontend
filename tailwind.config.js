/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      colors: {
        background: "#F0F2F5",
        buttonBackground: "#6D67E4",
        errorMessage: "#ff0000",
        successMessage: "#00cc00",
      },
      fontFamily: {},
    },
  },
  plugins: [],
};


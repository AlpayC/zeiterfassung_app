/** @type {import('tailwindcss').Config} */

export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    fontFamily: {
      "poppins-bold": ['"Poppins-Bold"'],
      "poppins-regular": ['"Poppins-Regular"'],
      "poppins-semibold": ['"Poppins-SemiBold"'],
    },
  },
  daisyui: {
    themes: ["night", "nord"],
  },
  plugins: [require("@tailwindcss/typography"), require("daisyui")],
};

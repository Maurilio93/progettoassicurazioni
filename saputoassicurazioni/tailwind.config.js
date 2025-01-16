/** @type {import('tailwindcss').Config} */
import withMT from "@material-tailwind/react/utils/withMT";

export default withMT({
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      screens: {
        mobile: "378px",
        smalltablet: "768px",
        tablet: "1024px",
        desktop: "1025px",
      },
      fontFamily: {
        sans: ["Quicksand", "sans-serif"],
        quicksand: ["Quicksand", "sans-serif"],
      },
    },
  },
  plugins: [],
});

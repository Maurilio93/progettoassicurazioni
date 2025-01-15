/** @type {import('tailwindcss').Config} */
import withMT from "@material-tailwind/react/utils/withMT";

export default withMT({
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      screens: {
        mobile: "378px", // Breakpoint personalizzato per dispositivi mobili
        tablet: "1024px", // Breakpoint per tablet
        desktop: "1025px", // Breakpoint per desktop
      },
      fontFamily: {
        sans: ["Quicksand", "sans-serif"], // Font predefinito sans
        quicksand: ["Quicksand", "sans-serif"], // Font quicksand personalizzato
      },
    },
  },
  plugins: [],
});

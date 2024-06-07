/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./views/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          primary: "#07689F",
          secondary: "#003451",
          tertiary: "#002A42",
          primary_light: "rgba(7, 104, 159, 0.30)",
        },
        black: {
          600: "#000000", // main
          500: "#040707",
          400: "#5D5E65",
          300: "#757575",
        },
        white: {
          600: "#FFFFFF", // main
          300: "#F7F7F7",
        },
        success: {
          600: "#0BC51D",
          300: "#5f7d62",
        },
        error: {
          600: "#723029",
          300: "#C82E1E",
        },
      },
      boxShadow: {
        light: "0px 4px 36px rgba(0, 0, 0, 0.07)",
      },
      screens: {
        xs: "350px",
        sm: "640px", // Default small screen breakpoint
        md: "768px", // Default medium screen breakpoint
        lg: "1024px", // Default large screen breakpoint
        xl: "1280px", // Default extra large screen breakpoint
        "2xl": "1536px", // Default 2x large screen breakpoint
        custom: "400px", // New custom breakpoint at 400px
      },
    },
  },
  plugins: [],
};

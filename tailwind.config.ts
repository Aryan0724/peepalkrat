import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "#FAF8F5",
        surface: "#FFFFFF",
        sandstone: "#F4EFEA",
        khadi: "#EBE5DC",
        border: "#E7DFD5",
        charcoal: {
          DEFAULT: "#1C1917",
          light: "#292524",
          muted: "#57534E",
          subtle: "#78716C",
        },
        terracotta: {
          50: "#FDF5F2",
          100: "#F9E8E2",
          200: "#F3D0C4",
          300: "#E9B09D",
          400: "#DA846A",
          500: "#C85A32",
          600: "#B84824",
          700: "#9A381C",
          800: "#7C2F1A",
          900: "#652818",
        },
        peepal: {
          50: "#F4F7F4",
          100: "#E5ECE6",
          500: "#4A6B52",
          700: "#2D4433",
          800: "#223527",
          900: "#1A281E",
        },
        mustard: {
          100: "#FEF7E6",
          500: "#D4A338",
          600: "#B58525",
        },
        henna: {
          500: "#8B3A2B",
          700: "#6B271A",
        }
      },
      fontFamily: {
        serif: ["Playfair Display", "Georgia", "Cambria", "serif"],
        sans: ["Inter", "-apple-system", "BlinkMacSystemFont", "Segoe UI", "Roboto", "sans-serif"],
      },
      boxShadow: {
        editorial: "0 20px 40px -15px rgba(28, 25, 23, 0.07)",
        card: "0 4px 20px -2px rgba(28, 25, 23, 0.04)",
      },
      animation: {
        "fade-in": "fadeIn 0.5s ease-out forwards",
        "slide-up": "slideUp 0.6s cubic-bezier(0.16, 1, 0.3, 1) forwards",
      },
      keyframes: {
        fadeIn: {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        slideUp: {
          "0%": { opacity: "0", transform: "translateY(16px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
      },
    },
  },
  plugins: [],
};

export default config;

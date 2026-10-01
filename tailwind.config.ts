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
        background: "#E8D1A7",
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
          600: "#743014",
          700: "#743014",
          800: "#84592B",
          900: "#652818",
        },
        peepal: {
          50: "#F4F7F4",
          100: "#E5ECE6",
          500: "#9D9167",
          700: "#2D4433",
          800: "#223527",
          900: "#1A281E",
        },
        mustard: {
          100: "#FEF7E6",
          500: "#84592B",
          600: "#84592B",
        },
        swadeshi: {
          950: "#442D1C",
          900: "#442D1C",
          800: "#132247",
          700: "#1C2E56",
          600: "#273D72",
        },
        parchment: {
          50: "#E8D1A7",
          100: "#E8D1A7",
          200: "#F4ECE0",
          300: "#EAE0CE",
          400: "#DDD0B8",
        },
        rebellion: {
          50: "#FDF4F2",
          500: "#C73822",
          600: "#A72618",
          700: "#743014",
          800: "#68140B",
          900: "#4D0E07",
        },
        gold: {
          200: "#F7E7B4",
          300: "#EED891",
          400: "#84592B",
          500: "#C8A253",
          600: "#A67C2E",
          700: "#84621E",
        },
        henna: {
          500: "#8B3A2B",
          700: "#743014",
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
        "spin-slow": "spin 12s linear infinite",
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

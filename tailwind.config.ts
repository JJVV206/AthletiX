import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: ["class"],
  content: ["./index.html", "./src/**/*.{ts,tsx}"],
  theme: {
    container: {
      center: true,
      padding: "1rem",
      screens: {
        "2xl": "1280px",
      },
    },
    extend: {
      colors: {
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        card: "hsl(var(--card))",
        "card-foreground": "hsl(var(--card-foreground))",
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        ring: "hsl(var(--ring))",
        success: "hsl(var(--success))",
        lime: "hsl(var(--lime))",
        sky: "hsl(var(--sky))",
        sand: "hsl(var(--sand))",
      },
      borderRadius: {
        xl: "1.25rem",
        "2xl": "1.75rem",
        "3xl": "2rem",
      },
      boxShadow: {
        glow: "0 18px 60px rgba(95, 126, 177, 0.18)",
        float: "0 24px 80px rgba(2, 4, 8, 0.56)",
        soft: "0 14px 44px rgba(2, 4, 8, 0.34)",
      },
      backgroundImage: {
        halo:
          "radial-gradient(circle at center, rgba(95, 126, 177, 0.22), rgba(95, 126, 177, 0) 66%)",
        aurora:
          "radial-gradient(circle at top left, rgba(95, 126, 177, 0.16), transparent 34%), radial-gradient(circle at 82% 18%, rgba(56, 87, 140, 0.14), transparent 26%), linear-gradient(180deg, rgba(11,19,31,1) 0%, rgba(7,12,20,0.98) 100%)",
      },
      fontFamily: {
        sans: ["Manrope", "sans-serif"],
        display: ["Space Grotesk", "sans-serif"],
      },
      keyframes: {
        float: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-8px)" },
        },
      },
      animation: {
        float: "float 7s ease-in-out infinite",
      },
    },
  },
  plugins: [],
};

export default config;

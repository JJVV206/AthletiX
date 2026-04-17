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
        glow: "0 18px 60px rgba(17, 143, 100, 0.18)",
        float: "0 30px 80px rgba(12, 20, 33, 0.12)",
        soft: "0 14px 45px rgba(27, 46, 60, 0.08)",
      },
      backgroundImage: {
        halo:
          "radial-gradient(circle at center, rgba(108, 255, 155, 0.28), rgba(108, 255, 155, 0) 66%)",
        aurora:
          "radial-gradient(circle at top left, rgba(151, 245, 211, 0.45), transparent 42%), radial-gradient(circle at 80% 20%, rgba(191, 255, 107, 0.25), transparent 30%), linear-gradient(180deg, rgba(247,252,249,1) 0%, rgba(241,247,244,0.92) 100%)",
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

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
        matrix: {
          bg: "#0a0e0a",
          surface: "#1a1f1a",
          accent: "#00ff41",
          text: "#00ff41",
        },
        cosmic: {
          bg: "#0d0221",
          surface: "#1a0437",
          accent: "#b565d8",
          text: "#f5f5f5",
        },
        neon: {
          bg: "#0a0a1a",
          surface: "#1a1a2e",
          accent: "#00d9ff",
          accent2: "#ff00d9",
          text: "#ffffff",
        },
      },
      fontFamily: {
        heading: ["ui-sans-serif", "system-ui", "sans-serif"],
        body: ["ui-sans-serif", "system-ui", "sans-serif"],
        mono: ["ui-monospace", "monospace"],
      },
      animation: {
        "fade-in": "fadeIn 0.3s ease-in-out",
        "slide-in": "slideIn 0.3s ease-in-out",
      },
      keyframes: {
        fadeIn: {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        slideIn: {
          "0%": { transform: "translateY(10px)", opacity: "0" },
          "100%": { transform: "translateY(0)", opacity: "1" },
        },
      },
    },
  },
  plugins: [],
};

export default config;

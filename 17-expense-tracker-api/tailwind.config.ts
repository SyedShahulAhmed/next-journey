import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        void: "#2b2b2d",
        abyss: "#2f3034",
        nebula: "#34353a",
        star: "#cfd0d4",
        constellation: "#e4e5e8",
        probability: "#9da0a6",
        crimson: "#8a7b7b",
        galaxy: "#26272b",
        fog: "#6b6d73",
        mist: "#b2b4b9",
        pearl: "#f2f2f3",
      },
      fontFamily: {
        display: [
          "var(--font-display)",
          "Space Grotesk",
          "Inter",
          "system-ui",
          "sans-serif",
        ],
        body: [
          "var(--font-body)",
          "Inter",
          "Space Grotesk",
          "system-ui",
          "sans-serif",
        ],
        mono: [
          "var(--font-mono)",
          "JetBrains Mono",
          "ui-monospace",
          "SFMono-Regular",
          "Menlo",
          "monospace",
        ],
      },
      boxShadow: {
        aura: "0 14px 28px rgba(0, 0, 0, 0.32)",
        "aura-strong": "0 20px 40px rgba(0, 0, 0, 0.38)",
        nebula: "0 24px 50px rgba(0, 0, 0, 0.45)",
        cosmic: "0 18px 36px rgba(0, 0, 0, 0.34)",
        star: "0 10px 24px rgba(0, 0, 0, 0.28)",
        constellation: "0 12px 28px rgba(0, 0, 0, 0.34)",
      },
      dropShadow: {
        glow: "0 2px 6px rgba(0, 0, 0, 0.32)",
      },
      backgroundImage: {
        "nebula-core":
          "radial-gradient(circle at top, rgba(255, 255, 255, 0.06), transparent 55%)",
        "cosmic-grid":
          "linear-gradient(rgba(255, 255, 255, 0.06) 1px, transparent 1px), linear-gradient(90deg, rgba(255, 255, 255, 0.06) 1px, transparent 1px)",
        hologram:
          "linear-gradient(120deg, rgba(255, 255, 255, 0.14), rgba(255, 255, 255, 0.08), rgba(0, 0, 0, 0.1))",
      },
      keyframes: {
        "probability-pulse": {
          "0%, 100%": { boxShadow: "0 12px 24px rgba(0, 0, 0, 0.3)" },
          "50%": { boxShadow: "0 18px 40px rgba(0, 0, 0, 0.45)" },
        },
        float: {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-12px)" },
        },
        "nebula-shift": {
          "0%": { transform: "translate3d(0, 0, 0)" },
          "50%": { transform: "translate3d(-4%, 2%, 0)" },
          "100%": { transform: "translate3d(0, 0, 0)" },
        },
        "star-twinkle": {
          "0%, 100%": { opacity: "0.5" },
          "50%": { opacity: "1" },
        },
        hologram: {
          "0%": { backgroundPosition: "0% 50%", opacity: "0.6" },
          "50%": { opacity: "1" },
          "100%": { backgroundPosition: "100% 50%", opacity: "0.6" },
        },
        "pulse-glow": {
          "0%, 100%": { boxShadow: "0 12px 28px rgba(0, 0, 0, 0.32)" },
          "50%": { boxShadow: "0 20px 44px rgba(0, 0, 0, 0.42)" },
        },
        "grid-scan": {
          "0%": { transform: "translateY(-100%)", opacity: "0" },
          "40%": { opacity: "0.5" },
          "100%": { transform: "translateY(100%)", opacity: "0" },
        },
      },
      animation: {
        "probability-pulse": "probability-pulse 5s ease-in-out infinite",
        float: "float 10s ease-in-out infinite",
        "nebula-shift": "nebula-shift 18s ease-in-out infinite",
        "star-twinkle": "star-twinkle 6s ease-in-out infinite",
        hologram: "hologram 10s ease-in-out infinite",
        "pulse-glow": "pulse-glow 4.5s ease-in-out infinite",
        "grid-scan": "grid-scan 6s linear infinite",
      },
    },
  },
  plugins: [],
};

export default config;

import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/data/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        night: "#0a0e17",
        carbon: "#0f131c",
        panel: "#181d29",
        panelHigh: "#222838",
        poker: "#88d982",
        action: "#00c853",
        gold: "#e9c349",
        ink: "#dfe2ef",
        muted: "#aeb7c7",
      },
      fontFamily: {
        sans: ["Inter", "ui-sans-serif", "system-ui", "Segoe UI", "Arial", "sans-serif"],
        display: ["Montserrat", "Inter", "ui-sans-serif", "system-ui", "sans-serif"],
      },
      boxShadow: {
        glow: "0 0 28px rgba(0, 200, 83, 0.16)",
      },
      backgroundImage: {
        "site-radial": "radial-gradient(circle at top left, rgba(136,217,130,0.12), transparent 34%), radial-gradient(circle at 80% 10%, rgba(233,195,73,0.08), transparent 28%)",
      },
    },
  },
  plugins: [],
};

export default config;

import type { Config } from "tailwindcss";
import tokens from "./styles/tokens";

const config: Config = {
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./lib/**/*.{ts,tsx}",
    "./content/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        paper: tokens.paper,
        ink: tokens.ink,
        heading: tokens.heading,
        primary: tokens.primaryBg,
        primaryfg: tokens.primaryFg,
        secondary: tokens.secondaryBg,
        secondaryfg: tokens.secondaryFg,
        outline: tokens.outline,
        panel: tokens.panel,
      },
      borderRadius: {
        xl: "1rem",
        "2xl": "1.25rem",
      },
    },
  },
  plugins: [require("@tailwindcss/forms")],
};

export default config;


import type { Config } from "tailwindcss";

export default {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        magnitude: {
          micro: "#009600",
          minor: "#52BC01",
          light: "#A9DB00",
          moderate: "#F5FF54",
          strong: "#F7D822",
          major: "#FE9A02",
          great: "#FF0002",
        },
      },
    },
  },
  plugins: [],
} satisfies Config;

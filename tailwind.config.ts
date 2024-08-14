import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}"
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic": "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))"
      },
      colors: {
        // Define custom colors here
        "logo-orange": "#EB836B",
        "comp-black": "#040404",
        "light-brown": "#7B4434",
        "comp-mauve": "#6C5C55",
        "dark-brown": "#743C2C",
        "mustard-yellow": "#DCA54C"
      }
    }
  },
  plugins: [require("daisyui")],
  daisyui: {
    themes: ["luxury"]
  }
};
export default config;

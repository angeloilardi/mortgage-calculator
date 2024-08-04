import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      colors: {
        "lime": "#d7da2f",
        "red": "#D73328",
        "slate": {
          100: "hsl(202,86%,94%)",
          300: "hsl(203,41%,72%)",
          500: "hsl(200,26%,54%)",
          700: "hsl(200,24%,40%)",
          900: "hsl(202,55%,16%)"
        }
      }
    },
  },
  plugins: [],
};
export default config;

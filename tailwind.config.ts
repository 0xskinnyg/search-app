import type { Config } from "tailwindcss";

export default {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    screens: {
      'xs': '375px',
      'sm': '640px',
      'md': '768px',
      'lg': '1024px',
      'xl': '1280px',
      '2xl': '1536px',
    },
    fontFamily: {
      PlusJakartaSans: ["PlusJakartaSans", "sans-serif"],
      VCHenrietta: ["VCHenrietta", "sans-serif"],
    },
    extend: {
      colors: {
        primary: "#A540F3",
        secondary: "#787878",
        primaryLight: "rgba(165, 64, 243, 0.5)",
        background: "var(--background)",
        foreground: "var(--foreground)",
      },
    },
    plugins: [],
  }
} satisfies Config;

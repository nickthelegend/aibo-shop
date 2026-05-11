import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        display: ['"Cabinet Grotesk"', 'sans-serif'],
        body: ['Satoshi', 'sans-serif'],
      },
      colors: {
        primary:  '#FFE17C',
        charcoal: '#171E19',
        sage:     '#B7C6C2',
        purple:   '#5B30F6',
        pink:     '#FF6FD8',
        green:    '#1A9E3F',
        orange:   '#FF5C00',
      },
      screens: {
        sm: '640px',
        md: '768px',
        lg: '1024px',
        xl: '1280px',
      },
    },
  },
  plugins: [],
};

export default config;

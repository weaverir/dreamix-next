import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  darkMode: 'class', // Enable class-based dark mode
  theme: {
    extend: {
      fontFamily: {
        'awsome': ['awsome', 'sans-serif'],
        'awsome_b': ['awsome_b', 'sans-serif'],
        'sans': ['Iranian Sans', 'sans-serif'],
        'sans_m': ['Iranian Sans_medium', 'sans-serif'],
        'sans_b': ['Iranian Sans_bold', 'sans-serif'],
      },
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        mygblue : '#508EB1',
        navblueD : '#33395D',
        myblue : '#505DB1' ,
        mypurple : '#7350B1' ,
        navblue : "#E8ECFF" ,
        text_b : "#6D6D6D" ,
        text_w : "#ECECEC" ,
        bgdark : '#171C38' ,
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic": "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
    },
  },
  plugins: [],
};

export default config;

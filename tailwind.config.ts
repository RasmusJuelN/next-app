import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },

    },
  },
  plugins: [require("daisyui")],
  daisyui: {
    themes: [
      {
        retro: {
          ...require("daisyui/src/theming/themes")["retro"],
          "primary": "#99f6e4",
          "secondary": "#7dd3fc",
          "accent": "#bae6fd",
          "neutral": "#c4b5fd",
          "ghost": "#cffafe",
          "base-100": "#fef2f2",

          "--rounded-btn": "20px",
          "--btn-focus-scale": "0.9",
          

    },
  },
      
],
  },
}
export default config

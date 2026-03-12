import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        'brand-black': '#020202',
        'brand-light-black': '#0F0F0F',
        'brand-grey': '#3B3C3E',
        'brand-red': '#E70000',
        'brand-green': '#79F3B6',
      },
    },
  },
  plugins: [],
}

export default config

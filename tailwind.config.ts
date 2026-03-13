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
        'brand-charcoal': '#1C1C1E',
        'brand-surface': '#252527',
        'brand-grey': '#4A4A4D',
        'brand-green': '#9AB55C',
        'brand-dark-green': '#0F6424',
        'brand-off-white': '#E1D7C9',
      },
    },
  },
  plugins: [],
}

export default config

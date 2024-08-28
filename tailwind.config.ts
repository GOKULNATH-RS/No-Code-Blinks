import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}'
  ],
  theme: {
    extend: {
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))'
      }
    },
    colors: {
      jaguar: {
        '50': '#f6f3fc',
        '100': '#ebe5f9',
        '200': '#d1c6f1',
        '300': '#a693e6',
        '400': '#755ad6',
        '500': '#5435c2',
        '600': '#4425a4',
        '700': '#3a1f85',
        '800': '#321d6f',
        '900': '#2f1d5d',
        '950': '#0a0613'
      },
      black: '#040207',
      white: '#f2f2f3'
    },
    fontFamily: {
      powerGrotesk: ['var(--font-powerGrotesk)']
    }
  },
  plugins: []
}
export default config

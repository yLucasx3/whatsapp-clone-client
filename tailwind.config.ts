import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}'
  ],
  theme: {
    extend: {
      colors: {
        'dark-level-1': '#0c1317',
        'dark-level-2': '#202C33',
        'dark-level-3': '#111B21',
        'dark-level-3-opacity': '#111b216f',
        'dark-level-4': '#202C33',
        'dark-level-5': '#2A3942',
        'green-text': '#008069',
        notification: '#00A884'
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))'
      }
    }
  },
  plugins: []
};
export default config;

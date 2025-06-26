import type { Config } from 'tailwindcss';

const config: Config = {
    content: ['./src/**/*.{js,jsx,ts,tsx,html}','./public/**/*.{js,jsx,ts,tsx,html}'],
    safelist: [
    'bg-green-500',
    'bg-red-500',
    'bg-gray-400',
  ],
    theme: {
        extend: {
            colors: {
                primary: '#1DA1F2',
                secondary: '#14171A',
            },
            fontFamily: {
                sans: ['Inter', 'ui-sans-serif', 'system-ui'],
            },
        },
    },
    plugins: [],
};

export default config;


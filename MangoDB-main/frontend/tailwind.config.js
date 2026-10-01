/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            colors: {
                brand: {
                    50: '#F0F7FF',
                    100: '#E0EFFE',
                    200: '#BAE0FD',
                    300: '#7CD0FC',
                    400: '#36BAF8',
                    500: '#0C9EE9',
                    600: '#0280C6',
                    700: '#0366A1',
                    800: '#075685',
                    900: '#0C476E',
                    950: '#082D49',
                },
                trust: {
                    50: '#ECFDF5',
                    100: '#D1FAE5',
                    500: '#10B981',
                    600: '#059669',
                    700: '#047857',
                },
                emergency: {
                    50: '#FEF2F2',
                    100: '#FEE2E2',
                    500: '#EF4444',
                    600: '#DC2626',
                    700: '#B91C1C',
                }
            },
            fontFamily: {
                sans: ['Inter', 'system-ui', '-apple-system', 'sans-serif'],
            },
        },
    },
    plugins: [],
}

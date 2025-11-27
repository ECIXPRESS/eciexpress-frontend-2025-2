/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            colors: {
                foregroundBackground: '#f6f6f6',
                primary: '#262626'
            },
            fontFamily: {
                sans: ['ArialRoundedMT', 'sans-serif'],
                custom: ['ArialRoundedMT', 'Arial', 'sans-serif'],
            },
        },
    },
    plugins: [],
}

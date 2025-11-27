/* jshint esversion: 8, node: true, browser: false */
module.exports = {
    mode: 'jit',
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            colors: {
                foregroundBackground: '#f6f6f6',
                primary: '#262626',
                acento: 'rgba(90, 199, 225, 1)',
                background: 'rgba(253, 223, 101, 1)',
                'background-home': 'rgba(246, 246, 246, 1)',
                'blanco-eciexpress': 'rgba(255, 255, 255, 1)',
                'coleccion-de-variables-color-seleccion': 'rgba(238, 135, 32, 0.31)',
                primario: 'rgba(38, 38, 38, 1)'
            },
            fontFamily: {
                sans: ['ArialRoundedMT', 'sans-serif'],
                custom: ['ArialRoundedMT', 'Arial', 'sans-serif'],
            },
            borderRadius: {
                '4xl': '2rem',
                '5xl': '2.5rem',
            },
        },
    },
    variants: {
        extend: {
            opacity: ['disabled'],
            backgroundColor: ['disabled'],
            cursor: ['disabled'],
        },
    },
    plugins: [],
}

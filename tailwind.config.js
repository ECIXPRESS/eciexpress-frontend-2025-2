module.exports = {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            colors: {
                acento: '#5AC7E1',
                'acento-hover': '#4AB5CF',
                background: '#FDDF65',
                'background-home': '#F6F6F6',
                primary: '#262626',
                'blanco-eciexpress': '#FFFFFF',
                seleccion: 'rgba(238, 135, 32, 0.31)',
                'gray-text': '#6B7280',
            },
            fontFamily: {
                sans: ['OpenSans', 'system-ui', 'Avenir', 'Helvetica', 'Arial', 'sans-serif'],
                heading: ['ArialRoundedMT', 'Arial', 'sans-serif'],
            },
            fontSize: {
                'heading-lg': '24px',
                'button': '16px',
                'label': '18px',
            },
            borderRadius: {
                'standard': '10px',
                'card': '24px',
            },
            boxShadow: {
                'card': '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
            },
        },
    },
    plugins: [],
}
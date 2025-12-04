/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#FFFCF8',
          100: '#FDFDFB',
          200: '#FAFBFC',
          500: '#FFB44D',
          600: '#FFCC4D',
          700: '#FDDF65',
        },
        secondary: {
          500: '#5AC7E1',
        },
        // Nuevos colores para estados
        status: {
          completado: '#10B981',    // Verde
          pendiente: '#EF4444',     // Rojo  
          total: '#F59E0B',         // Amarillo
          preparacion: '#8B5CF6',   // Violeta para "En preparación"
        }
      },
      fontFamily: {
        'title': ['"Arial Rounded MT Bold"', 'system-ui', 'sans-serif'],
        'body': ['"Open Sans"', 'system-ui', 'sans-serif'],
      },
      animation: {
        'flip': 'flip 0.6s ease-in-out',
      },
      keyframes: {
        flip: {
          '0%': { transform: 'rotateY(0deg)' },
          '100%': { transform: 'rotateY(180deg)' },
        }
      }
    },
  },
  plugins: [],
}
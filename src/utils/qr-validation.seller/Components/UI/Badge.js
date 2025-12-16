import { jsx as _jsx } from "react/jsx-runtime";
/** Configuración de estilos por estado */
const config = {
    preparacion: {
        bg: 'bg-gradient-to-br from-red-600 to-red-700',
        text: 'text-white',
        label: 'En Preparación'
    },
    completado: {
        bg: 'bg-gradient-to-br from-green-500 to-green-600',
        text: 'text-white',
        label: 'Completado'
    },
    cancelado: {
        bg: 'bg-gradient-to-br from-gray-500 to-gray-600',
        text: 'text-white',
        label: 'Cancelado'
    },
    validado: {
        bg: 'bg-gradient-to-br from-blue-500 to-blue-600',
        text: 'text-white',
        label: 'Validado'
    }
};
export const Badge = ({ estado, className = '' }) => {
    const estilo = config[estado];
    return (_jsx("span", { className: `
      inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold
      ${estilo.bg} ${estilo.text} ${className}
      shadow-md
    `, children: estilo.label }));
};

import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { X, FileText, FileSpreadsheet } from 'lucide-react';
import { useState } from 'react';
export default function ExportModal({ isOpen, onClose, onExport }) {
    const [selectedFormat, setSelectedFormat] = useState('pdf');
    if (!isOpen)
        return null;
    const handleExport = () => {
        onExport(selectedFormat);
        onClose();
    };
    const currentDate = new Date().toLocaleString('es-ES', {
        day: 'numeric',
        month: 'short',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
    });
    return (_jsx("div", { className: "fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4", children: _jsxs("div", { className: "bg-white rounded-3xl w-full max-w-md overflow-hidden shadow-2xl", children: [_jsxs("div", { className: "bg-yellow-400 px-6 py-5 relative", children: [_jsx("button", { onClick: onClose, className: "absolute top-4 left-4 w-10 h-10 rounded-full bg-white/20 hover:bg-white/30 flex items-center justify-center transition-colors", children: _jsx(X, { className: "w-5 h-5 text-[#262626]" }) }), _jsx("h2", { className: "text-2xl font-bold text-[#262626] text-center pt-2", children: "Exportar Reporte" })] }), _jsxs("div", { className: "p-6 space-y-6", children: [_jsxs("div", { className: "flex items-center justify-between", children: [_jsx("span", { className: "text-sm font-medium text-gray-700", children: "Fecha del reporte:" }), _jsx("span", { className: "text-sm text-yellow-400 font-medium", children: currentDate })] }), _jsxs("div", { children: [_jsx("h3", { className: "text-lg font-bold text-[#262626] mb-4 text-center", children: "Formato" }), _jsxs("div", { className: "space-y-3", children: [_jsxs("button", { onClick: () => setSelectedFormat('pdf'), className: `w-full flex items-start gap-4 p-4 rounded-2xl border-2 transition-all ${selectedFormat === 'pdf'
                                                ? 'border-[#5AC7E1] bg-[#5AC7E1]/5'
                                                : 'border-gray-200 hover:border-gray-300'}`, children: [_jsx("div", { className: "w-12 h-12 rounded-xl bg-[#5AC7E1] flex items-center justify-center flex-shrink-0", children: _jsx(FileText, { className: "w-6 h-6 text-white" }) }), _jsxs("div", { className: "flex-1 text-left", children: [_jsx("p", { className: "font-bold text-[#262626] mb-1", children: "PDF" }), _jsx("p", { className: "text-xs text-gray-500", children: "Documento port\u00E1til, ideal para imprimir" })] })] }), _jsxs("button", { onClick: () => setSelectedFormat('excel'), className: `w-full flex items-start gap-4 p-4 rounded-2xl border-2 transition-all ${selectedFormat === 'excel'
                                                ? 'border-[#5AC7E1] bg-[#5AC7E1]/5'
                                                : 'border-gray-200 hover:border-gray-300'}`, children: [_jsx("div", { className: "w-12 h-12 rounded-xl bg-[#5AC7E1] flex items-center justify-center flex-shrink-0", children: _jsx(FileSpreadsheet, { className: "w-6 h-6 text-white" }) }), _jsxs("div", { className: "flex-1 text-left", children: [_jsx("p", { className: "font-bold text-[#262626] mb-1", children: "Excel" }), _jsx("p", { className: "text-xs text-gray-500", children: "Hoja de c\u00E1lculo, ideal para an\u00E1lisis de datos" })] })] })] })] }), _jsx("button", { onClick: handleExport, className: "w-full bg-yellow-400 hover:bg-yellow-500 text-[#262626] font-bold py-4 rounded-2xl transition-colors shadow-md hover:shadow-lg", children: "Descargar" })] })] }) }));
}

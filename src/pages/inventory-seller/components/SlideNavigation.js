import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { ChevronLeft, ChevronRight } from 'lucide-react';
export const SlideNavigation = ({ currentPage, totalPages, onPageChange, }) => {
    return (_jsxs("div", { className: "flex items-center justify-between mt-4", children: [_jsx("button", { onClick: () => onPageChange(currentPage - 1), disabled: currentPage === 1, className: "group p-3 rounded-full bg-white border-2 border-gray-300 hover:border-yellow-400 hover:bg-yellow-50 disabled:opacity-30 disabled:cursor-not-allowed transition-all duration-200 shadow-md hover:shadow-lg", title: "Anterior", children: _jsx(ChevronLeft, { className: "w-6 h-6 text-gray-700 group-hover:text-yellow-500 transition-colors duration-200" }) }), _jsx("div", { className: "flex items-center gap-2", children: Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (_jsx("button", { onClick: () => onPageChange(page), className: `
              h-2 rounded-full transition-all duration-300
              ${page === currentPage
                        ? 'w-8 bg-yellow-400'
                        : 'w-2 bg-gray-300 hover:bg-gray-400'}
            `, title: `Página ${page}` }, page))) }), _jsx("button", { onClick: () => onPageChange(currentPage + 1), disabled: currentPage === totalPages, className: "group p-3 rounded-full bg-white border-2 border-gray-300 hover:border-yellow-400 hover:bg-yellow-50 disabled:opacity-30 disabled:cursor-not-allowed transition-all duration-200 shadow-md hover:shadow-lg", title: "Siguiente", children: _jsx(ChevronRight, { className: "w-6 h-6 text-gray-700 group-hover:text-yellow-500 transition-colors duration-200" }) })] }));
};

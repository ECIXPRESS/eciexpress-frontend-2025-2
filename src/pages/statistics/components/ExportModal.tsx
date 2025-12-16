import { X, FileText, FileSpreadsheet } from 'lucide-react';
import { useState } from 'react';

interface ExportModalProps {
  isOpen: boolean;
  onClose: () => void;
  onExport: (format: 'pdf' | 'excel') => void;
}

export default function ExportModal({ isOpen, onClose, onExport }: ExportModalProps) {
  const [selectedFormat, setSelectedFormat] = useState<'pdf' | 'excel'>('pdf');

  if (!isOpen) return null;

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

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-3xl w-full max-w-md overflow-hidden shadow-2xl">
        {/* Header */}
        <div className="bg-yellow-400 px-6 py-5 relative">
          <button
            onClick={onClose}
            className="absolute top-4 left-4 w-10 h-10 rounded-full bg-white/20 hover:bg-white/30 flex items-center justify-center transition-colors"
          >
            <X className="w-5 h-5 text-[#262626]" />
          </button>
          <h2 className="text-2xl font-bold text-[#262626] text-center pt-2">
            Exportar Reporte
          </h2>
        </div>

        {/* Content */}
        <div className="p-6 space-y-6">
          {/* Fecha del reporte */}
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium text-gray-700">Fecha del reporte:</span>
            <span className="text-sm text-yellow-400 font-medium">{currentDate}</span>
          </div>

          {/* Formato */}
          <div>
            <h3 className="text-lg font-bold text-[#262626] mb-4 text-center">Formato</h3>
            
            <div className="space-y-3">
              {/* Opción PDF */}
              <button
                onClick={() => setSelectedFormat('pdf')}
                className={`w-full flex items-start gap-4 p-4 rounded-2xl border-2 transition-all ${
                  selectedFormat === 'pdf'
                    ? 'border-[#5AC7E1] bg-[#5AC7E1]/5'
                    : 'border-gray-200 hover:border-gray-300'
                }`}
              >
                <div className="w-12 h-12 rounded-xl bg-[#5AC7E1] flex items-center justify-center flex-shrink-0">
                  <FileText className="w-6 h-6 text-white" />
                </div>
                <div className="flex-1 text-left">
                  <p className="font-bold text-[#262626] mb-1">PDF</p>
                  <p className="text-xs text-gray-500">Documento portátil, ideal para imprimir</p>
                </div>
              </button>

              {/* Opción Excel */}
              <button
                onClick={() => setSelectedFormat('excel')}
                className={`w-full flex items-start gap-4 p-4 rounded-2xl border-2 transition-all ${
                  selectedFormat === 'excel'
                    ? 'border-[#5AC7E1] bg-[#5AC7E1]/5'
                    : 'border-gray-200 hover:border-gray-300'
                }`}
              >
                <div className="w-12 h-12 rounded-xl bg-[#5AC7E1] flex items-center justify-center flex-shrink-0">
                  <FileSpreadsheet className="w-6 h-6 text-white" />
                </div>
                <div className="flex-1 text-left">
                  <p className="font-bold text-[#262626] mb-1">Excel</p>
                  <p className="text-xs text-gray-500">Hoja de cálculo, ideal para análisis de datos</p>
                </div>
              </button>
            </div>
          </div>

          {/* Botón Descargar */}
          <button
            onClick={handleExport}
            className="w-full bg-yellow-400 hover:bg-yellow-500 text-[#262626] font-bold py-4 rounded-2xl transition-colors shadow-md hover:shadow-lg"
          >
            Descargar
          </button>
        </div>
      </div>
    </div>
  );
}
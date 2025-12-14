import {ChevronRight, ArrowDown} from "lucide-react";
import {Receipt} from "@/pages/user-settings/components/types";

interface ReceiptItemProps {
    receipt: Receipt;
    onViewDetails?: () => void;
}

const HistorialItem: React.FC<ReceiptItemProps> = ({receipt, onViewDetails}) => {
    const description = "Reggio- Hamburguesa";
    const date = receipt.timeStamps.updatedAt ? new Date(receipt.timeStamps.updatedAt) : null;

    return (
        <li className="flex h-16 items-center px-4 p-2 lg:px-5 lg:py-4 bg-snow rounded-3xl">
            <button
                className="grid grid-cols-12 w-full h-full items-center hover:opacity-70 transition-opacity"
                aria-label={`Ver detalles de ${description}`}
                onClick={onViewDetails}
            >
                {/* Columna Tipo (alineada con el encabezado) */}
                <div className="col-span-8 flex items-center gap-2.5">
                    <div className={`w-6 h-6 text-red-500 flex-shrink-0`}>
                        <ArrowDown className="w-full h-full"/>
                    </div>
                    <div className="text-neutral-800 text-base truncate">
                        {description}
                    </div>
                </div>

                {/* Columna Fecha (alineada con el encabezado) */}
                <div className="col-span-3 text-right">
                    <time className="text-neutral-800 text-sm whitespace-nowrap">
                        {date ? date.toLocaleDateString('es-ES', {day: '2-digit', month: '2-digit'}) : ''}
                    </time>
                </div>

                {/* Columna para la flecha */}
                <div className="col-span-1 flex justify-end">
                    <ChevronRight className="w-5 h-5 text-neutral-800"/>
                </div>
            </button>
        </li>
    );
};

export default HistorialItem;
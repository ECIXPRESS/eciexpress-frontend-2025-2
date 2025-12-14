import {ChevronRight, TrendingUp, TrendingDown} from "lucide-react";
import {Receipt} from "@/pages/user-settings/components/types";

interface ReceiptItemProps {
    receipt: Receipt;
    onViewDetails?: () => void;
}

const HistorialItem: React.FC<ReceiptItemProps> = ({ receipt, onViewDetails }) => {
    const isExpense = receipt.receiptStatus === "REFUNDED";
    const description = "Reggio- Hamburguesa";
    const date = receipt.timeStamps.updatedAt?.toISOString().split('T')[0];
    return (
        <li className="flex h-16 items-center gap-2.5 px-5 py-4 bg-snow rounded-3xl">
            <div className={`w-6 h-6 ${isExpense ? 'text-red-500' : 'text-green-500'}`}>
                {isExpense ? <TrendingDown className="w-full h-full" /> : <TrendingUp className="w-full h-full" />}
            </div>

            <div className="flex-1 font-['Open_Sans'] text-neutral-800 text-base truncate">
                {description}
            </div>

            <time className="font-['Open_Sans'] text-neutral-800 text-sm whitespace-nowrap" dateTime={date}>
                {date}
            </time>

            <button
                className="w-6 h-6 hover:opacity-70 transition-opacity"
                aria-label={`Ver detalles de ${description}`}
                onClick={onViewDetails}
            >
                <ChevronRight className="w-full h-full text-neutral-800" />
            </button>
        </li>
    );
};

export default HistorialItem;
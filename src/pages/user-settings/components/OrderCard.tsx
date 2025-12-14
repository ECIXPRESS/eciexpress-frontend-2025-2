import {ChevronRight, Clock} from "lucide-react";
import {Order} from "@/pages/user-settings/components/types";
import {time} from "framer-motion";

interface OrderCardProps {
    order: Order;
    onViewDetails?: () => void;
}

const OrderCard: React.FC<OrderCardProps> = ({ order, onViewDetails }) => {
    const statusConfig = {
        PENDING: {
            bg: 'bg-[#ddf8ff]',
            text: 'text-[#5ac7e1]',
            label: 'Pendiente'
        },
        COMPLETED: {
            bg: 'bg-green-100',
            text: 'text-green-600',
            label: 'Completado'
        },
        CANCELLED: {
            bg: 'bg-red-100',
            text: 'text-red-600',
            label: 'Cancelado'
        }
    };

    const pickupTime = order.scheduledPickup.getTime() - time.now();
    const orderName = order.items[0].productName;

    const config = statusConfig[order.status];

    return (
        <article className="flex h-28 bg-snow rounded-3xl shadow-sm overflow-hidden">
            <div className={`flex flex-col items-center justify-center w-28 gap-2.5 p-2.5 ${config.bg}`}>
                <Clock className={`w-8 h-8 ${config.text}`} />
                <div className={`font-['Arial_Rounded_MT_Bold'] text-base ${config.text}`}>
                    {config.label}
                </div>
            </div>

            <div className="flex flex-col justify-center flex-1 gap-1 py-2.5 px-4">
                <h3 className="font-['Arial_Rounded_MT_Bold'] text-neutral-800 text-xl">
                    {orderName}
                </h3>
                <div className="flex items-center gap-2.5">
                    <div className="w-8 h-8 rounded-full bg-gray-200" />
                    <div className="font-['Arial_Rounded_MT_Bold'] text-neutral-800 text-base">
                        {order.store}
                    </div>
                </div>
                <p className="font-['Open_Sans'] text-neutral-800 text-sm">
                    Pagado - Recoge en {pickupTime}
                </p>
            </div>

            <button
                className="flex items-center justify-center px-2.5 hover:bg-gray-50 transition-colors"
                aria-label={`Ver detalles de ${orderName}`}
                onClick={onViewDetails}
            >
                <ChevronRight className="w-6 h-6 text-neutral-800" />
            </button>
        </article>
    );
};

export default OrderCard;
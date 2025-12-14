import HistorialItem from "@/pages/user-settings/components/HistorialItem";
import {Receipt} from "@/pages/user-settings/components/types";

interface TransactionsPanelProps {
    historial: Receipt[];
}

const HistorialPanel: React.FC<TransactionsPanelProps> = ({ historial }) => {
    return (
        <section className="flex flex-col gap-2.5 px-6 py-6 flex-1">
            <h2 className="font-['Arial_Rounded_MT_Bold'] text-neutral-800 text-2xl">
                Movimientos
            </h2>

            <div className="flex flex-col flex-1 bg-snow rounded-3xl shadow-inner overflow-hidden">
                <div className="flex items-center gap-2.5 px-16 py-5 bg-gradient-to-r from-[#fddf65] via-[#ffcc4d] to-[#ffb44d]">
                    <div className="flex-1 font-['Arial_Rounded_MT_Bold'] text-snow text-xl">
                        Tipo
                    </div>
                    <div className="flex-1 text-right font-['Arial_Rounded_MT_Bold'] text-snow text-xl">
                        Fecha
                    </div>
                </div>

                <div className="flex gap-2.5 p-2.5 flex-1 overflow-hidden">
                    <ul className="flex flex-col gap-2.5 flex-1 overflow-y-auto">
                        {historial.map((historial) => (
                            <HistorialItem
                                key={historial.receiptId}
                                receipt={historial}
                                onViewDetails={() => console.log('View historial:', historial.receiptId)}
                            />
                        ))}
                    </ul>

                    <div
                        className="w-3 h-10 bg-gray-500 rounded-full flex-shrink-0"
                        role="scrollbar"
                        aria-orientation="vertical"
                    />
                </div>
            </div>
        </section>
    );
};

export default HistorialPanel;
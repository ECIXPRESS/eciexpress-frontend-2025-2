import HistorialItem from "@/pages/user-settings/components/HistorialItem";
import {Receipt} from "@/pages/user-settings/components/types";

interface TransactionsPanelProps {
    historial: Receipt[];
}

const HistorialPanel: React.FC<TransactionsPanelProps> = ({ historial }) => {
    return (
        <section className="flex flex-col gap-2.5 px-6 py-6 flex-1">
            <h2 className="text-neutral-800 text-xl lg:text-2xl">
                Movimientos
            </h2>

            <div className="flex flex-col flex-1 rounded-3xl shadow-inner overflow-hidden">
                <div className="grid grid-cols-12 items-center gap-2.5 px-4 py-3 lg:px-5 lg:py-5 bg-gradient-to-r from-[#fddf65] via-[#ffcc4d] to-[#ffb44d]">
                    <
                    <h5 className="col-span-8 text-lg lg:text-xl">
                        Tipo
                    </h5>
                    <h5 className="col-span-4 text-lg lg:text-xl text-right pr-4">
                        Fecha
                    </h5>
                </div>

                <div className="flex gap-2.5 p-0 lg:p-2.5 flex-1 overflow-hidden">
                    <ul className="flex flex-col gap-1 lg:gap-2.5 flex-1 overflow-y-auto">
                        {historial.map((historial) => (
                            <HistorialItem
                                key={historial.receiptId}
                                receipt={historial}
                                onViewDetails={() => console.log('View historial:', historial.receiptId)}
                            />
                        ))}
                    </ul>
                </div>
            </div>
        </section>
    );
};

export default HistorialPanel;
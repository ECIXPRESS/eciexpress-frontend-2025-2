import React from "react";
import {CirclePlus} from "lucide-react";
import {useNavigate} from "react-router-dom";

export const BalanceCard = () => {
    const navigate = useNavigate();

    const handleAddBalance = () => {
        console.log("Agregar saldo");
        navigate("/user-settings");
    };

    return (
        <div className="flex h-40 items-center gap-4 p-4 relative rounded-3xl overflow-hidden bg-gradient-to-br from-[#ffcc4d] to-[#fddf65] shadow-lg">
            <div className="flex flex-col items-start p-4 flex-1 self-stretch bg-white/40 backdrop-blur-sm rounded-2xl overflow-hidden flex-grow gap-3">
                <div className="flex flex-col items-start justify-center self-stretch w-full gap-1">
                    <div className="font-medium text-gray-800 text-lg">
                        Balance disponible
                    </div>
                </div>

                <div className="flex items-center justify-center self-stretch w-full gap-2">
                    <div className="font-bold text-gray-800 text-3xl">
                        $
                    </div>
                    <div className="font-bold text-gray-800 text-3xl">
                        1,200.00
                    </div>
                </div>

                <div className="text-sm text-gray-600 mt-1">
                    Última actualización: Hoy
                </div>
            </div>

            <button
                onClick={handleAddBalance}
                className="flex flex-col w-16 h-16 items-center justify-center p-1 bg-white/40 backdrop-blur-sm rounded-2xl overflow-hidden gap-2 hover:bg-white/60 transition-colors hover:shadow-md"
            >
                <div className="flex flex-col w-14 h-14 items-center justify-center gap-2 p-0.5 w-full text-gray-800">
                    <CirclePlus className="w-8 h-8" />
                </div>
                <span className="text-xs text-gray-700 font-medium">Agregar</span>
            </button>
        </div>
    );
};
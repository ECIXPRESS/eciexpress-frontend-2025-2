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
        <div className="flex h-40 items-center gap-4 p-4 relative rounded-3xl overflow-hidden bg-[url(@/assets/balanceCard.svg)] shadow-lg">
            <div className="flex flex-col items-start p-4 flex-1 self-stretch bg-black/20 backdrop-blur-sm rounded-2xl overflow-hidden flex-grow gap-2">
                <div className="flex flex-col items-start justify-center self-stretch w-full gap-1">
                    <div className="font-medium text-gray-800 text-lg">
                        Balance
                    </div>
                </div>

                <div className="flex items-center justify-center self-stretch w-full gap-2">
                    <h1 className="font-bold text-white text-3xl">
                        $
                    </h1>
                    <h1 className="font-bold text-white text-3xl">
                        1,200
                    </h1>
                </div>

                <div className="text-xs text-white mt-1">
                    Actualizado: Hoy
                </div>
            </div>

            <button
                onClick={handleAddBalance}
                className="flex flex-col w-16 h-16 items-center justify-center p-1 bg-black/20 backdrop-blur-sm rounded-2xl overflow-hidden gap-2 hover:bg-black/20 transition-colors hover:shadow-md"
            >
                <div className="flex flex-col w-14 h-14 items-center justify-center gap-2 p-0.5 w-full text-white">
                    <CirclePlus className="w-8 h-8" strokeWidth={2.5} />
                </div>
            </button>
        </div>
    );
};
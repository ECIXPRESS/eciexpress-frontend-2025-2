import {CirclePlus} from "lucide-react";
import Isotipo from "@/assets/isotipo.svg";
import TriangleColor from "@/assets/TriangleColor.svg";

interface WalletCardProps {
    balance: number;
    cardholderName: string;
    cardNumber: string;
    onAddFunds?: () => void;
}

const WalletCard: React.FC<WalletCardProps> = ({ balance, cardholderName, cardNumber, onAddFunds }) => {
    return (
        <article className="flex flex-col gap-2.5">
            <h2 className="text-neutral-800 text-xl lg:text-2xl">
                Billetera
            </h2>

            <div className="flex flex-col lg:flex-row gap-2.5">
                <div className="relative flex flex-col flex-1 p-5 pt-8 lg:pt-12 rounded-2xl overflow-hidden shadow-md bg-gradient-to-r from-[#fddf65] via-[#ffcc4d] to-[#ffb44d]">
                    <div className="absolute bottom-0 left-20 w-64 h-56 opacity-20">
                        <svg viewBox="0 0 272 220" fill="none" className="w-full h-full">
                            <image href={TriangleColor} width="120%" height="120%" />
                        </svg>
                    </div>

                    <div className="flex py-3 items-end justify-end flex-1 z-10">
                        <h1 className="text-4xl text-white">
                            $ {balance.toLocaleString('es-CO')}
                        </h1>
                    </div>

                    <div className="flex flex-col items-end z-10">
                        <div className="font-semibold text-snow text-xl">
                            {cardholderName}
                        </div>
                        <div className="font-semibold text-snow text-xl">
                            {cardNumber}
                        </div>
                    </div>

                    <div className="flex max-w-16 w-1/6 gap-2 z-10">
                        <img src={Isotipo} alt="Isotipo" />
                    </div>
                </div>

                <button
                    className="flex items-center justify-center h-20 w-full lg:max-w-24 lg:h-full bg-[#CAFFDF] rounded-2xl shadow-md hover:opacity-90 transition-opacity text-[#4EBEA8]"
                    aria-label="Agregar fondos"
                    onClick={onAddFunds}
                >
                    <CirclePlus className="w-11 h-11" />
                </button>
            </div>
        </article>
    );
};

export default WalletCard;

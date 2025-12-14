import {Plus} from "lucide-react";

interface WalletCardProps {
    balance: number;
    cardholderName: string;
    cardNumber: string;
    onAddFunds?: () => void;
}

const WalletCard: React.FC<WalletCardProps> = ({ balance, cardholderName, cardNumber, onAddFunds }) => {
    return (
        <article className="flex flex-col gap-2.5">
            <h2 className="font-['Arial_Rounded_MT_Bold'] text-neutral-800 text-2xl">
                Billetera
            </h2>

            <div className="flex gap-2.5 shadow-inner">
                <div className="relative flex flex-col flex-1 gap-2.5 p-5 rounded-3xl overflow-hidden shadow-md bg-gradient-to-r from-[#fddf65] via-[#ffcc4d] to-[#ffb44d]">
                    <div className="absolute top-2.5 left-20 w-64 h-56 opacity-20">
                        <svg viewBox="0 0 272 220" fill="none">
                            <polygon points="136,0 272,220 0,220" fill="white" />
                        </svg>
                    </div>

                    <div className="flex items-end justify-end flex-1 z-10">
                        <div className="font-['Arial_Rounded_MT_Bold'] text-4xl text-snow">
                            $ {balance.toLocaleString('es-CO')}
                        </div>
                    </div>

                    <div className="flex flex-col items-end z-10">
                        <div className="font-['Open_Sans'] font-semibold text-snow text-xl">
                            {cardholderName}
                        </div>
                        <div className="font-['Open_Sans'] font-semibold text-snow text-xl">
                            {cardNumber}
                        </div>
                    </div>

                    <div className="flex gap-2 z-10">
                        <div className="w-5 h-5 rounded-full bg-white opacity-60" />
                        <div className="w-5 h-5 rounded-full bg-white opacity-60" />
                    </div>
                </div>

                <button
                    className="flex items-center justify-center w-24 bg-[#caffdf] rounded-3xl shadow-md hover:opacity-90 transition-opacity"
                    aria-label="Agregar fondos"
                    onClick={onAddFunds}
                >
                    <Plus className="w-11 h-11 text-[#5ac7e1]" />
                </button>
            </div>
        </article>
    );
};

export default WalletCard;

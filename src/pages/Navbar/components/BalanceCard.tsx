import React, {JSX} from "react";
import BalanceBackground from "@/assets/balanceCard.svg";

export const BalanceCard = (): JSX.Element => {
    return (
        <div className="flex h-48 items-center gap-5 p-[30px] relative rounded-[40px] overflow-hidden">
            <div className="flex-col items-start p-[15px] flex-1 self-stretch grow bg-[#ed86204f] rounded-[20px] overflow-hidden backdrop-blur-[2px] backdrop-brightness-[100%] [-webkit-backdrop-filter:blur(2px)_brightness(100%)] flex gap-2.5 relative">
                <div className="flex-col items-start justify-center self-stretch w-full flex-[0_0_auto] flex gap-2.5 relative">
                    <div className="relative w-fit mt-[-1.00px] [font-family:'Open_Sans-Regular',Helvetica] font-normal text-[#fffafa] text-2xl tracking-[0] leading-[normal]">
                        Balance:
                    </div>
                </div>

                <div className="items-center justify-center self-stretch w-full flex-[0_0_auto] flex gap-2.5 relative">
                    <div className="relative w-fit mt-[-1.00px] [font-family:'Arial_Rounded_MT_Bold-Regular',Helvetica] font-normal text-[#fffafa] text-[40px] tracking-[0] leading-[normal] whitespace-nowrap">
                        $
                    </div>

                    <div className="relative w-fit mt-[-1.00px] [font-family:'Arial_Rounded_MT_Bold-Regular',Helvetica] font-normal text-[#fffafa] text-[40px] tracking-[0] leading-[normal] whitespace-nowrap">
                        1.200
                    </div>
                </div>
            </div>

            <div className="flex-col max-w-[75px] h-[76px] items-center justify-center p-[15px] flex-1 grow bg-[#ed86204f] rounded-[20px] overflow-hidden backdrop-blur-[2px] backdrop-brightness-[100%] [-webkit-backdrop-filter:blur(2px)_brightness(100%)] flex gap-2.5 relative">
                <div className="flex flex-col max-w-[50px] max-h-[50px] h-[45px] items-center justify-center gap-2.5 p-0.5 relative w-full">
                    <img
                        className="relative flex-1 self-stretch w-full grow mt-[-2.50px] mb-[-2.50px] ml-[-2.50px] mr-[-2.50px]"
                        alt="Vector"
                        src={BalanceBackground}
                    />
                </div>
            </div>
        </div>
    );
};

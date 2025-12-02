import React, { JSX } from "react";
import triangleInf from "@/assets/passwordRecovery/triangleInf.png";
import triangleSup from "@/assets/passwordRecovery/triangleSup.png";
import {ToastContainer} from "react-toastify";
import {AnimatePresence, motion} from "framer-motion";
import {VerificationCodeForm} from "@/pages/password-recovery/components/verificationCodeForm";
import PasswordChangeForm from "@/pages/password-recovery/components/passwordChangeForm";

export const PasswordRecoveryContainer = (): JSX.Element => {

    return (
        <div className="flex h-screen w-screen items-center justify-center relative bg-[url(@/assets/lightBackground.png)] bg-cover bg-center overflow-hidden">
            <ToastContainer
                position="top-right"
                autoClose={3000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="colored"
                toastClassName="rounded-lg shadow-md"
            />

            {/* Triángulo superior */}
            <AnimatePresence mode="wait">
                <motion.div
                    key="bg-triangleSup"
                    className="flex-1 w-1/3 self-stretch flex justify-end items-end"
                    initial={{ width: 0 }}
                    animate={{ width: "33.33%" }}
                    exit={{ width: 0 }}
                    transition={{ duration: 0.5, ease: "easeInOut" }}
                >
                    <motion.img
                        src={triangleSup}
                        alt="triangleSup"
                        className="w-full h-full object-cover"
                        initial={{ x: "-50%" }}
                        animate={{ x: 1 }}
                        transition={{ duration: 0.7 }}
                    />
                </motion.div>
            </AnimatePresence>

            <VerificationCodeForm/>


            {/* Triángulo inferior */}
            <AnimatePresence mode="wait">
                <motion.div
                    key="bg-triangleSup"
                    className="flex-1 w-1/3 self-stretch flex justify-end items-end"
                    initial={{ width: 0 }}
                    animate={{ width: "33.33%" }}
                    exit={{ width: 0 }}
                    transition={{ duration: 0.5, ease: "easeInOut" }}
                >
                    <motion.img
                        src={triangleInf}
                        alt="triangleInf"
                        className="w-full h-full object-cover"
                        initial={{ x: "50%" }}
                        animate={{ x: "0%"}}
                        transition={{ duration: 0.7 }}
                    />
                </motion.div>
            </AnimatePresence>
        </div>
    );
};
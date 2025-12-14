import React, {JSX, useState} from "react";
import triangleInf from "@/assets/passwordRecovery/triangleInf.png";
import triangleSup from "@/assets/passwordRecovery/triangleSup.png";
import {toast, ToastContainer} from "react-toastify";
import {AnimatePresence, motion} from "framer-motion";
import {VerificationCodeForm} from "@/pages/password-recovery/components/verificationCodeForm";
import PasswordChangeForm from "@/pages/password-recovery/components/passwordChangeForm";
import EmailForm from "@/pages/password-recovery/components/emailForm";

export const PasswordRecoveryContainer = (): JSX.Element => {
    const [currentStep, setCurrentStep] = useState<'email' | 'verification' | 'password'>('email');
    const [userToken, setUserToken] = useState('');
    const [userEmail, setUserEmail] = useState('');

    const handleEmailSent = (email: string) => {
        toast.success('Código de verificación enviado exitosamente');
        setUserEmail(email);
        setCurrentStep('verification');
    };

    const handleCodeVerified = (token:string) => {
        setUserToken(token);
        setCurrentStep('password');
    };

    const handlePasswordChanged = () => {
        toast.success('Contraseña cambiada exitosamente');
        console.log('Contraseña cambiada exitosamente');
    };

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

            <div className="flex flex-col w-1/3 h-full justify-end items-end">
                <AnimatePresence mode="wait">
                    {currentStep === 'email' && (
                        <motion.div
                            key="email-form"
                            className="flex-1 w-full self-stretch flex justify-end items-end"
                            initial={{ opacity: 0, y: 20, scale: 0.95 }}
                            animate={{ opacity: 1, y: 0, scale: 1 }}
                            exit={{ opacity: 0, y: -20, scale: 0.95 }}
                            transition={{
                                duration: 0.5,
                                ease: [0.4, 0, 0.2, 1]
                            }}
                        >
                            <EmailForm onEmailSent={handleEmailSent} />
                        </motion.div>
                    )}

                    {currentStep === 'verification' && (
                        <motion.div
                            key="verification-form"
                            className="flex-1 w-full self-stretch flex justify-end items-end"
                            initial={{ opacity: 0, y: 20, scale: 0.95 }}
                            animate={{ opacity: 1, y: 0, scale: 1 }}
                            exit={{ opacity: 0, y: -20, scale: 0.95 }}
                            transition={{
                                duration: 0.5,
                                ease: [0.4, 0, 0.2, 1]
                            }}
                        >
                            <VerificationCodeForm
                                email={userEmail}
                                onCodeVerified={handleCodeVerified} />
                        </motion.div>
                    )}

                    {currentStep === 'password' && (
                        <motion.div
                            key="password-form"
                            className="flex-1 w-full self-stretch flex justify-end items-end"
                            initial={{ opacity: 0, y: 20, scale: 0.95 }}
                            animate={{ opacity: 1, y: 0, scale: 1 }}
                            exit={{ opacity: 0, y: -20, scale: 0.95 }}
                            transition={{
                                duration: 0.5,
                                ease: [0.4, 0, 0.2, 1]
                            }}
                        >
                            <PasswordChangeForm
                                email={userEmail}
                                token={userToken}
                                onPasswordChanged={handlePasswordChanged} />
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>

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
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from "react";
import triangleInf from "@/assets/passwordRecovery/triangleInf.png";
import triangleSup from "@/assets/passwordRecovery/triangleSup.png";
import { toast, ToastContainer } from "react-toastify";
import { AnimatePresence, motion } from "framer-motion";
import { VerificationCodeForm } from "@/pages/password-recovery/components/verificationCodeForm";
import PasswordChangeForm from "@/pages/password-recovery/components/passwordChangeForm";
import EmailForm from "@/pages/password-recovery/components/emailForm";
import { useNavigate } from "react-router-dom";
export const PasswordRecoveryContainer = () => {
    const navigate = useNavigate();
    const [currentStep, setCurrentStep] = useState('email');
    const [userToken, setUserToken] = useState('');
    const [userEmail, setUserEmail] = useState('');
    const handleEmailSent = (email) => {
        toast.success('Código de verificación enviado exitosamente');
        setUserEmail(email);
        setCurrentStep('verification');
    };
    const handleCodeVerified = (token) => {
        setUserToken(token);
        setCurrentStep('password');
    };
    const handlePasswordChanged = () => {
        toast.success('Contraseña cambiada exitosamente');
        console.log('Contraseña cambiada exitosamente');
        navigate("/auth");
    };
    return (_jsxs("div", { className: "flex h-screen w-screen items-center justify-center relative bg-[url(@/assets/lightBackground.png)] bg-cover bg-center overflow-hidden", children: [_jsx(ToastContainer, { position: "top-right", autoClose: 3000, hideProgressBar: false, newestOnTop: false, closeOnClick: true, rtl: false, pauseOnFocusLoss: true, draggable: true, pauseOnHover: true, theme: "colored", toastClassName: "rounded-lg shadow-md" }), _jsx(AnimatePresence, { mode: "wait", children: _jsx(motion.div, { className: "flex-1 w-1/3 self-stretch flex justify-end items-end", initial: { width: 0 }, animate: { width: "33.33%" }, exit: { width: 0 }, transition: { duration: 0.5, ease: "easeInOut" }, children: _jsx(motion.img, { src: triangleSup, alt: "triangleSup", className: "w-full h-full object-cover object-right", initial: { x: "-50%" }, animate: { x: 1 }, transition: { duration: 0.7 } }) }, "bg-triangleSup") }), _jsx("div", { className: "flex flex-col w-1/3 h-full justify-end items-end", children: _jsxs(AnimatePresence, { mode: "wait", children: [currentStep === 'email' && (_jsx(motion.div, { className: "flex-1 w-full self-stretch flex justify-end items-end", initial: { opacity: 0, y: 20, scale: 0.95 }, animate: { opacity: 1, y: 0, scale: 1 }, exit: { opacity: 0, y: -20, scale: 0.95 }, transition: {
                                duration: 0.5,
                                ease: [0.4, 0, 0.2, 1]
                            }, children: _jsx(EmailForm, { onEmailSent: handleEmailSent }) }, "email-form")), currentStep === 'verification' && (_jsx(motion.div, { className: "flex-1 w-full self-stretch flex justify-end items-end", initial: { opacity: 0, y: 20, scale: 0.95 }, animate: { opacity: 1, y: 0, scale: 1 }, exit: { opacity: 0, y: -20, scale: 0.95 }, transition: {
                                duration: 0.5,
                                ease: [0.4, 0, 0.2, 1]
                            }, children: _jsx(VerificationCodeForm, { email: userEmail, onCodeVerified: handleCodeVerified }) }, "verification-form")), currentStep === 'password' && (_jsx(motion.div, { className: "flex-1 w-full self-stretch flex justify-end items-end", initial: { opacity: 0, y: 20, scale: 0.95 }, animate: { opacity: 1, y: 0, scale: 1 }, exit: { opacity: 0, y: -20, scale: 0.95 }, transition: {
                                duration: 0.5,
                                ease: [0.4, 0, 0.2, 1]
                            }, children: _jsx(PasswordChangeForm, { email: userEmail, token: userToken, onPasswordChanged: handlePasswordChanged }) }, "password-form"))] }) }), _jsx(AnimatePresence, { mode: "wait", children: _jsx(motion.div, { className: "flex-1 w-1/3 self-stretch flex justify-end items-end", initial: { width: 0 }, animate: { width: "33.33%" }, exit: { width: 0 }, transition: { duration: 0.5, ease: "easeInOut" }, children: _jsx(motion.img, { src: triangleInf, alt: "triangleInf", className: "w-full h-full object-cover object-left", initial: { x: "50%" }, animate: { x: "0%" }, transition: { duration: 0.7 } }) }, "bg-triangleSup") })] }));
};

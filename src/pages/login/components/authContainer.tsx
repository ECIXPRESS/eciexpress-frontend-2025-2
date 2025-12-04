import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ToastContainer } from "react-toastify";
import loginBanner from '@/assets/auth/loginBanner.png';
import signupBanner from '@/assets/auth/signupBanner.png';
import lightBackground from '@/assets/lightBackground.png';
interface AuthContainerProps {
    children: React.ReactNode;
    isLogin: boolean;
}

const AuthContainer: React.FC<AuthContainerProps> = ({ children, isLogin }) => {
    return (
        <div className="h-screen w-screen flex bg-cover overflow-hidden bg-[url(@/assets/lightBackground.png)]">
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

            {/*SignUp form*/}
            <AnimatePresence mode="wait">
                {!isLogin && (
                    <motion.div
                        key="signup-form-container"
                        className="flex flex-col items-center justify-center"
                        initial={{ width: 0, opacity: 0 }}
                        animate={{ width: "50%", opacity: 1 }}
                        exit={{ width: 0, opacity: 0 }}
                        transition={{ duration: 0.5, ease: "easeInOut" }}
                    >
                        <motion.div
                            initial={{ opacity: 0, x: -50 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: 50 }}
                            transition={{ duration: 0.4, delay: 0.1 }}
                            className="w-full max-w-lg flex flex-col justify-center items-center gap-4 p-6"
                        >
                            {children}
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/*SignUp banner*/}
            <AnimatePresence mode="wait">
                {!isLogin && (
                    <motion.div
                        key="signup-banner"
                        className="bg-cover bg-center overflow-hidden relative"
                        initial={{ width: 0 }}
                        animate={{ width: "50%" }}
                        exit={{ width: 0 }}
                        transition={{ duration: 0.5, ease: "easeInOut" }}
                    >
                        <motion.img
                            src={signupBanner}
                            alt="signupBanner"
                            className="w-full h-full object-cover"
                            initial={{ scale: 1.1 }}
                            animate={{ scale: 1 }}
                            transition={{ duration: 0.7 }}
                        />
                    </motion.div>
                )}
            </AnimatePresence>

            {/*Login banner*/}
            <AnimatePresence mode="wait">
                {isLogin && (
                    <motion.div
                        key="login-banner"
                        className="bg-cover bg-center overflow-hidden relative"
                        initial={{ width: 0 }}
                        animate={{ width: "50%" }}
                        exit={{ width: 0 }}
                        transition={{ duration: 0.5, ease: "easeInOut" }}
                    >
                        <motion.img
                            src={loginBanner}
                            alt="loginBanner"
                            className="w-full h-full object-cover"
                            initial={{ scale: 1.1 }}
                            animate={{ scale: 1 }}
                            transition={{ duration: 0.7 }}
                        />
                    </motion.div>
                )}
            </AnimatePresence>

            {/*Login form*/}
            <AnimatePresence mode="wait">
                {isLogin && (
                    <motion.div
                        key="login-form-container"
                        className="flex flex-col items-center justify-center"
                        initial={{ width: 0, opacity: 0 }}
                        animate={{ width: "50%", opacity: 1 }}
                        exit={{ width: 0, opacity: 0 }}
                        transition={{ duration: 0.5, ease: "easeInOut" }}
                    >
                        <motion.div
                            initial={{ opacity: 0, x: 50 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: -50 }}
                            transition={{ duration: 0.4, delay: 0.1 }}
                            className="w-full max-w-lg flex flex-col justify-center items-center gap-4 p-6"
                        >
                            {children}
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>

        </div>
    );
};

export default AuthContainer;
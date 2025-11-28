import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ToastContainer } from "react-toastify";
import loginBanner from '@/assets/login/loginBanner.png';
import signupBanner from '@/assets/login/signupBanner.png';

interface AuthContainerProps {
    children: React.ReactNode;
    isLogin: boolean;
}

const AuthContainer: React.FC<AuthContainerProps> = ({ children, isLogin }) => {
    return (
        <div className="max-h-screen w-screen flex bg-[url(@/assets/lightBackground.png)] bg-cover overflow-hidden">
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

            <AnimatePresence>
                {isLogin && (
                    <motion.div
                        key="login-banner"
                        className="flex-1 bg-cover bg-center overflow-hidden"
                        initial={{ width: 0}}
                        animate={{ width: "50%"}}
                        exit={{ width: "50%"}}
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

            <motion.div
                className="flex flex-col items-center justify-center"
                initial={{ width: "50%", x: "0%" }}
                animate={{
                    width: "50%",
                    x: isLogin ? "0%" : "50%"
                }}
                transition={{ duration: 0.5, ease: "easeInOut" }}
            >
                <AnimatePresence mode="wait">
                    <motion.div
                        key={isLogin ? "login-form" : "signup-form"}
                        initial={{
                            opacity: 0,
                            x: isLogin ? 100 : -100
                        }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{
                            opacity: 0,
                            x: isLogin ? -100 : 100
                        }}
                        transition={{ duration: 0.4 }}
                        className="w-full max-w-md h-screen flex flex-col justify-center items-center gap-4 p-6"
                    >
                        {children}
                    </motion.div>
                </AnimatePresence>
            </motion.div>

            <AnimatePresence>
                {!isLogin && (
                    <motion.div
                        key="signup-banner"
                        className="flex-1 bg-cover bg-center overflow-hidden"
                        initial={{ width: 0}}
                        animate={{ width: "50%"}}
                        exit={{ width: "50%" }}
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
        </div>
    );
};

export default AuthContainer;
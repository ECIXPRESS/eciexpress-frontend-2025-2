import React from 'react';
import {motion, AnimatePresence} from 'framer-motion';
import {ToastContainer} from "react-toastify";
import loginBanner from '@/assets/auth/loginBanner.png';
import signupBanner from '@/assets/auth/signupBanner.png';
import signUpHeader from '@/assets/auth/headerSignup.png';
import logInHeader from '@/assets/auth/headerLogin.png';
import {useMediaQuery} from "react-responsive";

interface AuthContainerProps {
    children: React.ReactNode;
    isLogin: boolean;
}

const AuthContainer: React.FC<AuthContainerProps> = ({children, isLogin}) => {
    const isMobile = useMediaQuery({maxWidth: 770});

    return (
        <div
            className="h-screen w-screen flex flex-col md:flex-row bg-cover overflow-hidden bg-[url(@/assets/lightBackgroundVertical.png)] md:bg-[url(@/assets/lightBackground.png)]">
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
                className="z-50 position-relative"
            />

            {/*SignUp header*/}
            <AnimatePresence mode="wait">
                {!isLogin && isMobile && (
                    <motion.div
                        key="signup-banner"
                        className="h-1/4 bg-cover bg-center relative flex items-start mb-8"
                        initial={{width: 0, opacity: 0}}
                        animate={{width: "100%", opacity: 1}}
                        exit={{width: 0, opacity: 0}}
                        transition={{duration: 0.5, ease: "easeInOut"}}
                    >
                        <motion.img
                            src={signUpHeader}
                            alt="signUpHeader"
                            className="w-full h-full object-cover object-top"
                            initial={{scale: 1.1}}
                            animate={{scale: 1}}
                            transition={{duration: 0.7}}
                        />
                    </motion.div>
                )}
            </AnimatePresence>

            {/*Login header*/}
            <AnimatePresence mode="wait">
                {isLogin && isMobile && (
                    <motion.div
                        key="login-banner"
                        className="h-1/4 bg-cover bg-center relative flex items-start mb-8"
                        initial={{width: 0, opacity: 0}}
                        animate={{width: "100%", opacity: 1}}
                        exit={{width: 0, opacity: 0}}
                        transition={{duration: 0.5, ease: "easeInOut"}}
                    >
                        <motion.img
                            src={logInHeader}
                            alt="logInHeader"
                            className="w-full h-full object-cover object-top"
                            initial={{scale: 1.1}}
                            animate={{scale: 1}}
                            transition={{duration: 0.7}}
                        />
                    </motion.div>
                )}
            </AnimatePresence>

            {/*SignUp form*/}
            <AnimatePresence mode="wait">
                {!isLogin && (
                    <motion.div
                        key="signup-form-container"
                        className="flex flex-col items-center justify-center"
                        initial={{width: 0, opacity: 0}}
                        animate={{width: "100%", opacity: 1}}
                        exit={{width: 0, opacity: 0}}
                        transition={{duration: 0.5, ease: "easeInOut"}}
                    >
                        <motion.div
                            initial={{opacity: 0, x: -50}}
                            animate={{opacity: 1, x: 0}}
                            exit={{opacity: 0, x: 50}}
                            transition={{duration: 0.4, delay: 0.1}}
                            className="w-full md:w-2/3 text-sm flex flex-col px-9"
                        >
                            {children}
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/*SignUp banner*/}
            <AnimatePresence mode="wait">
                {!isLogin && !isMobile && (
                    <motion.div
                        key="signup-banner"
                        className="bg-cover bg-center overflow-hidden relative"
                        initial={{width: 0}}
                        animate={{width: "100%"}}
                        exit={{width: 0}}
                        transition={{duration: 0.5, ease: "easeInOut"}}
                    >
                        <motion.img
                            src={signupBanner}
                            alt="signupBanner"
                            className="w-1/2 h-1/2 object-cover object-left"
                            initial={{scale: 1.1}}
                            animate={{scale: 1}}
                            transition={{duration: 0.7}}
                        />
                    </motion.div>
                )}
            </AnimatePresence>

            {/*Login banner*/}
            <AnimatePresence mode="wait">
                {isLogin && !isMobile && (
                    <motion.div
                        key="login-banner"
                        className="bg-cover bg-center overflow-hidden relative"
                        initial={{width: 0}}
                        animate={{width: "100%"}}
                        exit={{width: 0}}
                        transition={{duration: 0.5, ease: "easeInOut"}}
                    >
                        <motion.img
                            src={loginBanner}
                            alt="loginBanner"
                            className="w-full md:w-2/3 h-full object-cover object-right"
                            initial={{scale: 1.1}}
                            animate={{scale: 1}}
                            transition={{duration: 0.7}}
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
                        initial={{width: 0, opacity: 0}}
                        animate={{width: "100%", opacity: 1}}
                        exit={{width: 0, opacity: 0}}
                        transition={{duration: 0.5, ease: "easeInOut"}}
                    >
                        <motion.div
                            initial={{opacity: 0, x: 50}}
                            animate={{opacity: 1, x: 0}}
                            exit={{opacity: 0, x: -50}}
                            transition={{duration: 0.4, delay: 0.1}}
                            className="w-full md:w-2/3 max-w-lg text-sm flex flex-col px-9"
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
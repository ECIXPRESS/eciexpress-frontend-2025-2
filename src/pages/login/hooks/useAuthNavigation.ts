import { useState } from 'react';

export const useAuthNavigation = (initialState: boolean = true) => {
    const [isLogin, setIsLogin] = useState(initialState);

    const switchToLogin = () => setIsLogin(true);
    const switchToSignup = () => setIsLogin(false);

    return {
        isLogin,
        switchToLogin,
        switchToSignup
    };
};
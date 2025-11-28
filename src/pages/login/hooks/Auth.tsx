// pages/Auth.tsx
import React from 'react';
import {useAuthNavigation} from "@/pages/login/hooks/useAuthNavigation";
import {useLogin} from "@/pages/login/hooks/useLogin";
import {useSignUp} from "@/pages/login/hooks/useSignUp";
import AuthContainer from "@/pages/login/authContainer";
import LoginForm from "@/pages/login/components/LoginForm";
import SignUpForm from "@/pages/login/components/SignUpForm";


const Auth = () => {
    const { isLogin, switchToLogin, switchToSignup } = useAuthNavigation(true);

    const loginProps = useLogin();
    const signupProps = useSignUp();

    return (
        <AuthContainer isLogin={isLogin}>
            {!isLogin ? (
                <SignUpForm
                    {...signupProps}
                    onSubmit={signupProps.handleSubmit}
                    onSwitchToLogin={switchToLogin}
                />
            ) : (
                <LoginForm
                    {...loginProps}
                    onSubmit={loginProps.handleSubmit}
                    onSwitchToSignup={switchToSignup}
                />

            )}
        </AuthContainer>
    );
};

export default Auth;
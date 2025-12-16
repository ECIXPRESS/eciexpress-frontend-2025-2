import { jsx as _jsx } from "react/jsx-runtime";
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuthNavigation } from "@/pages/login/hooks/useAuthNavigation";
import { useLogin } from "@/pages/login/hooks/useLogin";
import { useSignUp } from "@/pages/login/hooks/useSignUp";
import { useAuth } from "@/pages/login/hooks/useAuth";
import AuthContainer from "@/pages/login/components/authContainer";
import LoginForm from "@/pages/login/components/LoginForm";
import SignUpForm from "@/pages/login/components/SignUpForm";
const Auth = () => {
    const { isLogin, switchToLogin, switchToSignup } = useAuthNavigation(true);
    const { user } = useAuth();
    const navigate = useNavigate();
    const loginProps = useLogin();
    const signupProps = useSignUp();
    useEffect(() => {
        if (user) {
            console.log("Auth - Usuario ya autenticado, redirigiendo según rol");
            // Redirigir según el rol del usuario
            const roleRoutes = {
                user: "/catalog-user",
                seller: "/orders-seller",
                admin: "/dashboard",
            };
            const redirectPath = roleRoutes[user.role] || "/catalog-user";
            console.log("Auth - Navegando a:", redirectPath);
            navigate(redirectPath, { replace: true });
        }
    }, [user, navigate]);
    return (_jsx(AuthContainer, { isLogin: isLogin, children: !isLogin ? (_jsx(SignUpForm, { ...signupProps, onSubmit: signupProps.handleSubmit, onSwitchToLogin: switchToLogin })) : (_jsx(LoginForm, { ...loginProps, onSubmit: loginProps.handleSubmit, onSwitchToSignup: switchToSignup })) }));
};
export default Auth;

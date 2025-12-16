import { jsx as _jsx } from "react/jsx-runtime";
import { useAuthNavigation } from "@/pages/login/hooks/useAuthNavigation";
import { useLogin } from "@/pages/login/hooks/useLogin";
import { useSignUp } from "@/pages/login/hooks/useSignUp";
import AuthContainer from "@/pages/login/components/authContainer";
import LoginForm from "@/pages/login/components/LoginForm";
import SignUpForm from "@/pages/login/components/SignUpForm";
const Auth = () => {
    const { isLogin, switchToLogin, switchToSignup } = useAuthNavigation(true);
    const loginProps = useLogin();
    const signupProps = useSignUp();
    return (_jsx(AuthContainer, { isLogin: isLogin, children: !isLogin ? (_jsx(SignUpForm, { ...signupProps, onSubmit: signupProps.handleSubmit, onSwitchToLogin: switchToLogin })) : (_jsx(LoginForm, { ...loginProps, onSubmit: loginProps.handleSubmit, onSwitchToSignup: switchToSignup })) }));
};
export default Auth;

import { useState } from 'react';
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useAuth } from "@/pages/login/hooks/useAuth";
import apiClient from "@/lib/interceptors/apiClient";
const roleRoutes = {
    CUSTOMER: "/home",
    TEACHER: "/dashboard",
    DEAN: "/dashboard",
};
export const useLogin = () => {
    const { login } = useAuth();
    const navigate = useNavigate();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        if (!email || !password) {
            toast.error("Please fill in all fields");
            setLoading(false);
            return;
        }
        try {
            const response = await apiClient.post("/auth/login", { email, password });
            const { accessToken, refreshToken, userInfo } = response.data;
            const user = {
                userId: userInfo.userId,
                email: userInfo.email,
                role: userInfo.role,
                pfpURL: userInfo.pfpURL || ''
            };
            login(accessToken, user);
            const redirectPath = roleRoutes[user.role] || "/home";
            navigate(redirectPath, { replace: true });
        }
        catch (err) {
            console.error('Error en login:', err);
            if (err.message === 'Network Error') {
                toast.error('Error de conexión. Verifica tu conexión a internet');
                return;
            }
            const errorMessage = err.response?.data?.message ||
                err.response?.data?.error ||
                err.message ||
                'Error desconocido al iniciar sesión';
            if (err.response) {
                console.error('Detalles del error:', {
                    status: err.response.status,
                    statusText: err.response.statusText,
                    data: err.response.data,
                    headers: err.response.headers
                });
            }
            toast.error(`Error: ${errorMessage}`);
        }
        finally {
            setLoading(false);
        }
    };
    return {
        email,
        setEmail,
        password,
        setPassword,
        loading,
        handleSubmit
    };
};

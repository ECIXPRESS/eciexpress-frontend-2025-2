import { useState } from 'react';
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useAuth } from "@/pages/login/hooks/useAuth";
import apiClient from "@/lib/interceptors/apiClient";

const roleRoutes: Record<string, string> = {
    STUDENT: "/dashboard",
    TEACHER: "/dashboard",
    DEAN: "/dashboard",
};

export const useLogin = () => {
    const { login } = useAuth();
    const navigate = useNavigate();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);

        if (!email || !password) {
            toast.error("Please fill in all fields");
            setLoading(false);
            return;
        }

        try {
            const response = await apiClient.post("/auth/login", { email, password});
            const { token, user } = response.data;

            login(token, user);
            const redirectPath = roleRoutes[user.role] || "/dashboard";
            navigate(redirectPath, { replace: true });
        } catch (err: unknown) {
            const error = err as { response?: { data?: { message?: string } } };
            toast.error(error.response?.data?.message || "Error al iniciar sesión");
        } finally {
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
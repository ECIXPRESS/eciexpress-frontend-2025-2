import { useState } from 'react';
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useAuth } from "@/pages/login/hooks/useAuth";
import apiClient from "@/lib/interceptors/apiClient";

const roleRoutes: Record<string, string> = {
    STUDENT: "/home",
    TEACHER: "/home",
    DEAN: "/home",
};

export const useLogin = () => {
    const { login } = useAuth();
    const navigate = useNavigate();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);
    
    // Mock user for development
    const mockUser = {
        userId: '1',
        email: 'test@example.com',
        role: 'STUDENT',
        pfpURL: ''
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);

        // Skip validation for development
        // if (!email || !password) {
        //     toast.error("Please fill in all fields");
        //     setLoading(false);
        //     return;
        // }

        // For development, use mock user and skip API call
        if (process.env.NODE_ENV === 'development') {
            console.log('Using mock user for development');
            const mockUser = {
                userId: '1',
                email: 'mock@example.com',
                role: 'user',
                pfpURL: ''
            };
            const mockToken = 'mock-jwt-token-for-development';
            login(mockToken, mockUser);
            const redirectPath = roleRoutes[mockUser.role] || "/home";
            navigate(redirectPath, { replace: true });
            return;
        }

        try {
            // Try to login normally (for production)
            const response = await apiClient.post("/auth/login", { email, password });
            const { token, user } = response.data;
            login(token, user);
            const redirectPath = roleRoutes[user.role] || "/home";
            navigate(redirectPath, { replace: true });
        } catch (err: unknown) {
            // Fallback to mock user in development if API fails
            if (process.env.NODE_ENV === 'development') {
                console.warn('API login failed, using mock user for development');
                const mockToken = 'mock-jwt-token-for-development';
                login(mockToken, mockUser);
                navigate("/home", { replace: true });
            } else {
                const error = err as { response?: { data?: { message?: string } } };
                toast.error(error.response?.data?.message || "Error al iniciar sesión");
            }
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
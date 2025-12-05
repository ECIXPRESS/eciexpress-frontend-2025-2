import {useState} from 'react';
import {useNavigate} from "react-router-dom";
import {toast} from "react-toastify";
import {useAuth} from "@/pages/login/hooks/useAuth";
import apiClient from "@/lib/interceptors/apiClient";

export const useSignUp = () => {
    const {login} = useAuth();
    const navigate = useNavigate();
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [loading, setLoading] = useState(false);

    const validateEmail = (email: string): boolean => {
        const emailRegex = /^[^\s@]+@(mail\.)?escuelaing\.edu\.co$/;
        return emailRegex.test(email);
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);

        if (!name || !email || !password || !confirmPassword) {
            toast.error("Por favor completa todos los campos");
            setLoading(false);
            return;
        }

        if (!validateEmail(email)) {
            toast.error("El email debe ser @mail.escuelaing.edu.co o @escuelaing.edu.co");
            setLoading(false);
            return;
        }

        if (password !== confirmPassword) {
            toast.error("Las contraseñas no coinciden");
            setLoading(false);
            return;
        }

        if (password.length < 6) {
            toast.error("La contraseña debe tener al menos 6 caracteres");
            setLoading(false);
            return;
        }

        try {
            const response = await apiClient.post("/auth/register", {
                name,
                email,
                password
            });
            const {token, user} = response.data;

            login(token, user);
            navigate("/dashboard", {replace: true});
        } catch (err: unknown) {
            const error = err as { response?: { data?: { message?: string } }};
            toast.error(error.response?.data?.message || "Error al crear la cuenta");
        } finally {
            setLoading(false);
        }
    };

    return {
        name,
        setName,
        email,
        setEmail,
        password,
        setPassword,
        confirmPassword,
        setConfirmPassword,
        loading,
        handleSubmit
    };
};
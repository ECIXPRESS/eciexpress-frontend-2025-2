import { useState } from 'react';
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useAuth } from "@/pages/login/hooks/useAuth";
import apiClient from "@/lib/interceptors/apiClient";
export const useSignUp = () => {
    const { login } = useAuth();
    const navigate = useNavigate();
    const [fullName, setFullName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [identityDocument, setIdentityDocument] = useState("");
    const [loading, setLoading] = useState(false);
    const validateEmail = (email) => {
        const emailRegex = /^[^\s@]+@(mail\.)?escuelaing\.edu\.co$/;
        return emailRegex.test(email);
    };
    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        if (!fullName || !email || !password || !confirmPassword || !identityDocument) {
            toast.error("Por favor completa todos los campos obligatorios");
            setLoading(false);
            return;
        }
        if (identityDocument.length < 8 || identityDocument.length > 15) {
            toast.error("El documento de identidad debe tener entre 8 y 15 caracteres");
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
            const phoneNumber = 1234567890;
            const response = await apiClient.post("/users/customers", {
                email,
                fullName,
                password,
                identityDocument,
                phoneNumber
            });
            console.log("Número de teléfono generado para el registro:", phoneNumber);
            const { token, user } = response.data;
            login(token, user);
            navigate("/dashboard", { replace: true });
        }
        catch (err) {
            const error = err;
            toast.error(error.response?.data?.message || "Error al crear la cuenta");
        }
        finally {
            setLoading(false);
        }
    };
    return {
        fullName,
        setFullName,
        identityDocument,
        setIdentityDocument,
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

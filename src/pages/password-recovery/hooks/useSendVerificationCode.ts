import { useState } from 'react';
import { toast } from "react-toastify";
import apiClient from "@/lib/interceptors/apiClient";

export const useSendVerificationCode = () => {
    const [email, setEmail] = useState("");
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);

        if (!email) {
            toast.error("Please fill in all fields");
            setLoading(false);
            return;
        }

        try {
             await apiClient.post("/users/password/reset-request", { email});
             toast.success("Verification code sent successfully");
        } catch (err: any) {
            toast.error(err.response?.data?.message || "Error al enviar la solicitud, intentelo mas tarde.");
        } finally {
            setLoading(false);
        }
    };

    return {
        email,
        setEmail,
        loading,
        handleSubmit
    };
};
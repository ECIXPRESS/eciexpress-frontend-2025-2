import apiClient from "@/lib/interceptors/apiClient";
import {toast} from "react-toastify";
import {useState} from "react";

export const useSendVerificationCode = () => {
    const [loading, setLoading] = useState(false);

    const sendVerificationCode = async (email: string) => {
        setLoading(true);

        if (!email) {
            toast.error("Ingresa un correo válido");
            setLoading(false);
            return { success: false, error: "Ingresa un correo válido" };
        }

        try {
            await apiClient.post("/users/password/reset-request", { email });
            return { success: true };
        } catch (err: unknown) {
            const error = err as { response?: { data?: { message?: string } }};
            const errorMessage = error.response?.data?.message || "Error al enviar la solicitud, intente nuevamente más tarde.";
            return {
                success: false,
                error: errorMessage
            };
        } finally {
            setLoading(false);
        }
    };

    return {
        loading,
        sendVerificationCode
    };
};
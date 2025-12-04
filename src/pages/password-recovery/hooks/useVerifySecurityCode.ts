import { useState } from 'react';
import { toast } from "react-toastify";
import apiClient from "@/lib/interceptors/apiClient";

export const useVerifySecurityCode = () => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const verifyCode = async (email: string, code: string) => {
        setLoading(true);
        setError(null);

        try {
            const response = await apiClient.post("/users/password/verify-code", {
                email,
                code
            });

            if (response.data.token) {
                toast.success("Código verificado correctamente");
                return response.data.token;
            }

            return null
        } catch (err: any) {
            const errorMessage = err.response?.data?.message || "Error al verificar el código";
            toast.error(errorMessage);
            setError(errorMessage);
            throw err;
        } finally {
            setLoading(false);
        }
    };

    return {
        verifyCode,
        loading,
        error
    };
};
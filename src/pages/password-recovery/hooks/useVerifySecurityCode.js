import { useState } from 'react';
import { toast } from "react-toastify";
import apiClient from "@/lib/interceptors/apiClient";
export const useVerifySecurityCode = () => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const verifyCode = async (email, code) => {
        setLoading(true);
        setError(null);
        try {
            const response = await apiClient.post("/users/password/verify-code", {
                email,
                code
            });
            if (response.data.success) {
                toast.success("Código verificado correctamente");
                return code;
            }
            throw new Error(response.data.message || "Error al verificar el código");
        }
        catch (err) {
            const error = err;
            const errorMessage = error.response?.data?.message || "Error al verificar el código";
            toast.error(errorMessage);
            setError(errorMessage);
            throw err;
        }
        finally {
            setLoading(false);
        }
    };
    return { verifyCode, loading, error };
};

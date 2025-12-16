import apiClient from "@/lib/interceptors/apiClient";
import { useState } from "react";
export const useChangePassword = () => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const changePassword = async ({ email, newPassword, code }) => {
        setLoading(true);
        setError(null);
        try {
            const response = await apiClient.put("/users/password/reset", {
                email,
                code: code,
                newPassword: newPassword,
            });
            throw new Error(response.data.message || "Error al cambiar la contraseña");
        }
        catch (err) {
            const error = err;
            const errorMessage = error.response?.data?.message ||
                "Error al cambiar la contraseña, intente nuevamente más tarde.";
            setError(errorMessage);
            throw err;
        }
        finally {
            setLoading(false);
        }
    };
    return { changePassword, loading, error };
};

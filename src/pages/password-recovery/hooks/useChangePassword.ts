import { useState } from 'react';
import { toast } from "react-toastify";
import apiClient from "@/lib/interceptors/apiClient";

interface ChangePasswordParams {
    email: string;
    password: string;
    token: string;
}

export const useChangePassword = () => {
    const [loading, setLoading] = useState(false);

    const changePassword = async ({ email, password, token }: ChangePasswordParams) => {
        setLoading(true);

        try {
            const response = await apiClient.post("/users/password/reset", {
                email,
                password,
                token
            });

            return response.data;
        } catch (err: any) {
            const errorMessage = err.response?.data?.message || "Error al cambiar la contraseña, intente nuevamente más tarde.";
            toast.error(errorMessage);
            throw err;
        } finally {
            setLoading(false);
        }
    };

    return {
        loading,
        changePassword
    };
};
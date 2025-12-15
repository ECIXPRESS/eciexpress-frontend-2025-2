import {toast} from "react-toastify";
import apiClient from "@/lib/interceptors/apiClient";
import {useState} from "react";

interface ChangePasswordParams {
    email: string;
    newPassword: string;
    code: string;
}

export const useChangePassword = () => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const changePassword = async ({ email, newPassword, code }: ChangePasswordParams) => {
        setLoading(true);
        setError(null);

        try {
            const response = await apiClient.put("/users/password/reset", {
                email,
                code: code,
                newPassword: newPassword,
            });

            throw new Error(response.data.message || "Error al cambiar la contraseña");
        } catch (err: unknown) {
            const error = err as { response?: { data?: { message?: string } }};
            const errorMessage = error.response?.data?.message ||
                "Error al cambiar la contraseña, intente nuevamente más tarde.";
            setError(errorMessage);
            throw err;
        } finally {
            setLoading(false);
        }
    };

    return { changePassword, loading, error };
};
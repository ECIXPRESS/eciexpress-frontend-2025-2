import {useState} from 'react';
import {useNavigate} from "react-router-dom";
import {toast} from "react-toastify";
import {useAuth} from "@/pages/login/hooks/useAuth";
import apiClient from "@/lib/interceptors/apiClient";

const roleMapping: Record<string, string> = {
    CUSTOMER: "user",
    TEACHER: "seller",
    SELLER: "seller",
    DEAN: "admin",
};

const roleRoutes: Record<string, string> = {
    user: "/catalog-user",
    seller: "/orders-seller",
    admin: "/dashboard",
};

export const useLogin = () => {
    const {login} = useAuth();
    const navigate = useNavigate();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);

        if (!email || !password) {
            toast.error("Please fill in all fields");
            setLoading(false);
            return;
        }

        try {
            const response = await apiClient.post("/auth/login", {email, password});
            const {accessToken, refreshToken, userInfo} = response.data;

            console.log("Login exitoso - Datos recibidos:", {accessToken, userInfo});

            // Mapear el rol del backend al rol del frontend
            const mappedRole = roleMapping[userInfo.role] || "user";

            const user = {
                userId: userInfo.userId,
                email: userInfo.email,
                role: mappedRole,
                pfpURL: userInfo.pfpURL || ''
            };

            console.log("Usuario a guardar:", user);

            login(accessToken, user);
            console.log("Login ejecutado, navegando según rol:", mappedRole);
            
            // Navegar a la ruta específica según el rol
            const redirectPath = roleRoutes[mappedRole] || "/catalog-user";
            console.log("Navegando a:", redirectPath);
            navigate(redirectPath, {replace: true});
        } catch (err: any) {
            console.error('Error en login:', err);

            if (err.message === 'Network Error') {
                toast.error('Error de conexión. Verifica tu conexión a internet');
                return;
            }

            const errorMessage = err.response?.data?.message ||
                err.response?.data?.error ||
                err.message ||
                'Error desconocido al iniciar sesión';

            if (err.response) {
                console.error('Detalles del error:', {
                    status: err.response.status,
                    statusText: err.response.statusText,
                    data: err.response.data,
                    headers: err.response.headers
                });
            }

            toast.error(`Error: ${errorMessage}`);
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
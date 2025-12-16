import {Navigate, Outlet} from "react-router-dom";
import {useAuth} from "@/pages/login/hooks/useAuth";

export const ProtectedRoute = () => {
    const {user} = useAuth();

    console.log("ProtectedRoute - Usuario actual:", user);

    if (!user) {
        console.log("ProtectedRoute - No hay usuario, redirigiendo a /Auth");
        return <Navigate to="/Auth" replace/>;
    }

    console.log("ProtectedRoute - Usuario autenticado, permitiendo acceso");
    return <Outlet/>;
};

import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useAuth } from "../pages/login/hooks/useAuth";

export const ProtectedRoute = () => {
    const { user } = useAuth();
    const location = useLocation();

    if (!user) {
        return <Navigate to="/login" replace />;
    }

    if (location.pathname === "/") {
        return <Navigate to="/dashboard" replace />;
    }

    return <Outlet/>;
};

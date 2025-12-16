import { jsx as _jsx } from "react/jsx-runtime";
import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useAuth } from "@/pages/login/hooks/useAuth";
export const ProtectedRoute = () => {
    const { user } = useAuth();
    const location = useLocation();
    if (!user) {
        return _jsx(Navigate, { to: "/login", replace: true });
    }
    if (location.pathname === "/") {
        return _jsx(Navigate, { to: "/dashboard", replace: true });
    }
    return _jsx(Outlet, {});
};

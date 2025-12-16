import {Navigate, Outlet, useLocation} from "react-router-dom";
import {useState} from "react";

const ProtectedRoute = () => {
    const location = useLocation();
    const [user] = useState(true);
    const [loading] = useState(false);

    if (loading) {
        return (
            <div className="flex items-center justify-center h-screen">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
            </div>
        );
    }

    if (!user) {
        return <Navigate to="/auth" state={{ from: location }} replace />;
    }

    return <Outlet />;
};

export default ProtectedRoute;
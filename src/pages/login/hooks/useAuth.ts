import { useContext } from "react";
import { AuthContext } from '../../../../../squad-genesis-frontend-2025-2/src/context/AuthContext';

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error("useAuth must be used within an AuthProvider");
    }
    return context;
};

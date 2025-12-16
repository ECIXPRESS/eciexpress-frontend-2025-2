import { useState, useEffect, type ReactNode, useMemo } from "react";
import { AuthContext } from "./AuthContext";
import type {User} from "./AuthContext";

export const AuthProvider = ({ children }: { children: ReactNode }) => {
    const [user, setUser] = useState<User | null>(null);
    const [token, setToken] = useState<string | null>(null);
    const [refreshToken, setRefreshToken] = useState<string | null>(null);
    const [expiresAt, setExpiresAt] = useState<number | null>(null);

    useEffect(() => {
        const storedToken = localStorage.getItem("token");
        const storedUser = localStorage.getItem("user");
        const storedRefreshToken = localStorage.getItem("refreshToken");
        const storedExpiresAt = localStorage.getItem("expiresAt");

        if (storedToken && storedUser) {
            try {
                const parsedUser = JSON.parse(storedUser);
                setToken(storedToken);
                setUser(parsedUser);
                if (storedRefreshToken) {
                    setRefreshToken(storedRefreshToken);
                }
                if (storedExpiresAt) {
                    setExpiresAt(Number(storedExpiresAt));
                }
            } catch (error) {
                console.error("Error al parsear el usuario:", error);
                localStorage.removeItem("user");
            }
        }
    }, []);

    const login = (token: string, user: User, refreshToken?: string, expiresIn?: number) => {
        const expirationTime = expiresIn ? Date.now() + expiresIn * 1000 : Date.now() + 3600 * 1000; // Default 1 hour
        
        setToken(token);
        setUser(user);
        if (refreshToken) {
            setRefreshToken(refreshToken);
            localStorage.setItem("refreshToken", refreshToken);
        }
        setExpiresAt(expirationTime);
        
        localStorage.setItem("token", token);
        localStorage.setItem("user", JSON.stringify(user));
        localStorage.setItem("expiresAt", expirationTime.toString());
    };

    const logout = () => {
        setToken(null);
        setUser(null);
        setRefreshToken(null);
        setExpiresAt(null);
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        localStorage.removeItem("refreshToken");
        localStorage.removeItem("expiresAt");
    };

    const authValue = useMemo(() => ({
        token: token || '',
        refreshToken: refreshToken || '',
        user: user as User,
        expiresAt: expiresAt || 0,
        login,
        logout
    }), [token, refreshToken, user, expiresAt]);

    return (
        <AuthContext.Provider value={authValue}>
            {children}
        </AuthContext.Provider>
    );
};

import { jsx as _jsx } from "react/jsx-runtime";
import { useState, useEffect, useMemo } from "react";
import { AuthContext } from "./AuthContext";
export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [token, setToken] = useState(null);
    const [refreshToken, setRefreshToken] = useState(null);
    const [expiresAt, setExpiresAt] = useState(null);
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
            }
            catch (error) {
                console.error("Error al parsear el usuario:", error);
                localStorage.removeItem("user");
            }
        }
    }, []);
    const login = (token, user, refreshToken, expiresIn) => {
        console.log("AuthProvider.login - Iniciando login con:", { token: token?.substring(0, 20) + '...', user });
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
        console.log("AuthProvider.login - Login completado. Usuario guardado:", user);
        console.log("AuthProvider.login - localStorage:", {
            token: localStorage.getItem("token")?.substring(0, 20) + '...',
            user: localStorage.getItem("user")
        });
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
        token: token || null,
        refreshToken: refreshToken || null,
        user: user,
        expiresAt: expiresAt || 0,
        login,
        logout
    }), [token, refreshToken, user, expiresAt]);
    return (_jsx(AuthContext.Provider, { value: authValue, children: children }));
};

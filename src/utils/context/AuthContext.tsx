import { createContext } from "react";

export interface User {
    userId: string | null,
    email: string,
    role: string,
    pfpURL: string;
    balance?: number;
}

export interface AuthContextType {
    token: string | null;
    refreshToken: string | null;
    user: User | null;
    expiresAt: number;
    login: (token: string, user: User) => void;
    logout: () => void;
}

export const AuthContext = createContext<AuthContextType | undefined>(undefined);

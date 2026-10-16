"use client";

import { createContext, useContext, useState, type ReactNode } from "react";
import type { User, UpdateProfileInput } from "@/app/types/user";
import { loginAction, logoutAction } from "@/app/actions/auth";
import { updateProfileAction } from "../actions/profile";



type AuthContextType = {
    user: User | null;
    isLoggedIn: boolean;
    login: (username: string, password: string) => Promise<string | null>;
    logout: () => Promise<void>;
    updateProfile: (input: UpdateProfileInput) => Promise<string | null>;
};

interface AuthProviderProps {
    children: ReactNode;
    initialUser: User | null;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children, initialUser }: AuthProviderProps) => {
    const [user, setUser] = useState<User | null>(initialUser);

    const login = async (username: string, password: string) => {
        const result = await loginAction(username, password);
        if (result.user) {
            setUser(result.user);
            return null;
        }
        return result.error;
    };

    const logout = async () => {
        await logoutAction();
        setUser(null);
    };

    const updateProfile = async (input: UpdateProfileInput) => {
        const result = await updateProfileAction(input);
        if (result.user) {
            setUser(result.user);
            return null;
        }
        return result.error;
    };

    return (
        <AuthContext.Provider value={{ user, isLoggedIn: user !== null, login, logout, updateProfile }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) throw new Error("useAuth must be used inside AuthProvider");
    return context;
};
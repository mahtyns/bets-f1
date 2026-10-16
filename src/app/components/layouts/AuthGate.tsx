"use client";

import { ReactNode } from "react";
import { useAuth } from "@/app/context/AuthContext";

interface AuthGateProps {
    loggedIn: ReactNode;
    loggedOut: ReactNode;
}

const AuthGate = ({ loggedIn, loggedOut }: AuthGateProps) => {
    const { isLoggedIn } = useAuth();

    return isLoggedIn ? loggedIn : loggedOut;
};

export default AuthGate;
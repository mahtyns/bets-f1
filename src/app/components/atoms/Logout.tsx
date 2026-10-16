"use client"
import { useAuth } from "@/app/context/AuthContext";

export const Logout = () => {
    const { logout } = useAuth();

    return (
        <button className="button button--underline" onClick={() => logout()}>
            Log out
        </button>
    )
}

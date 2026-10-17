import { Suspense } from "react";
import { AuthProvider } from "@/app/context/AuthContext";
import { getCurrentUser } from "@/app/lib/getCurrentUser";

async function AuthLoader({ children }: { children: React.ReactNode }) {
    const user = await getCurrentUser();
    return <AuthProvider initialUser={user}>{children}</AuthProvider>;
}

export default function AuthBoundary({ children }: { children: React.ReactNode }) {
    return (
        <Suspense fallback={null}>
            <AuthLoader>{children}</AuthLoader>
        </Suspense>
    );
}
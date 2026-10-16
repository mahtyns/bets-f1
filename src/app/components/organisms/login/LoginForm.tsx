"use client";

import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/app/context/AuthContext";
import Button from "../../atoms/Button";
import LoginField from "../../molecules/login/LoginField";

interface LoginFormProps {
    mainClass: string;
}

const LoginForm = (props: LoginFormProps) => {
    const { login } = useAuth();
    const router = useRouter();
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState(false);

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setIsLoading(true);
        setError(null);

        const loginError = await login(username, password);

        if (loginError) {
            setError(loginError);
            setIsLoading(false);
            return;
        }

        router.push("/");
    };

    return (
        <form className={`${props.mainClass}__form`} onSubmit={handleSubmit}>
            <LoginField
                mainClass={props.mainClass}
                id="username"
                label="Username"
                type="text"
                value={username}
                onChange={setUsername}
                autoComplete="username"
            />
            <LoginField
                mainClass={props.mainClass}
                id="password"
                label="Password"
                type="password"
                value={password}
                onChange={setPassword}
                autoComplete="current-password"
            />
            {error && <p className={`${props.mainClass}__error`} role="alert">{error}</p>}
            <Button text={isLoading ? "Logging in..." : "Log in"} variant="primary" type="submit" disabled={isLoading} />
        </form>
    )
}

export default LoginForm
"use client";

import { FormEvent, useState } from 'react';
import { useAuth } from '@/app/context/AuthContext';
import { Subtitle } from '../../atoms/Subtitle';
import Button from '../../atoms/Button';
import LoginField from '../../molecules/login/LoginField';

interface EditPasswordProps {
    mainClass: string
}

export const EditPassword = (props: EditPasswordProps) => {
    const { updateProfile } = useAuth();
    const [current, setCurrent] = useState("");
    const [next, setNext] = useState("");
    const [repeat, setRepeat] = useState("");
    const [error, setError] = useState<string | null>(null);
    const [success, setSuccess] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState(false);

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setError(null);
        setSuccess(null);

        if (!current || !next || !repeat) {
            setError("Fill in all the password fields");
            return;
        }
        if (next !== repeat) {
            setError("The new passwords do not match");
            return;
        }

        setIsLoading(true);
        const updateError = await updateProfile({ currentPassword: current, newPassword: next });
        setIsLoading(false);

        if (updateError) {
            setError(updateError);
            return;
        }

        setCurrent("");
        setNext("");
        setRepeat("");
        setSuccess("Password updated");
    };

    return (
        <form className={`${props.mainClass}__form`} onSubmit={handleSubmit} noValidate>
            <Subtitle isH3={true} title="Update your password" />
            <LoginField
                mainClass={props.mainClass}
                id="password_current"
                label="Current password"
                type="password"
                value={current}
                onChange={setCurrent}
                autoComplete="current-password" />
            <LoginField
                mainClass={props.mainClass}
                id="password_new"
                label="New password"
                type="password"
                value={next}
                onChange={setNext}
                autoComplete="new-password" />
            <LoginField
                mainClass={props.mainClass}
                id="password_repeat"
                label="Repeat new password"
                type="password"
                value={repeat}
                onChange={setRepeat}
                autoComplete="new-password" />
            {error && <p className={`${props.mainClass}__error`} role="alert">{error}</p>}
            {success && <p className={`${props.mainClass}__success`} role="status">{success}</p>}
            <Button text={isLoading ? "Saving..." : "Update password"} variant="primary" type="submit" disabled={isLoading} />
        </form>
    )
}
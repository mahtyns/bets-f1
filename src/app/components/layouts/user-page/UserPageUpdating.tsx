"use client";

import { FormEvent, useState } from "react";
import { useAuth } from "@/app/context/AuthContext";
import Title from "../../atoms/Title";
import Button from "../../atoms/Button";
import { EditAvatar } from "../../organisms/user-page/EditAvatar";
import { EditPassword, type PasswordValues } from "../../organisms/user-page/EditPasswordForm";

const emptyPasswords: PasswordValues = { current: "", next: "", repeat: "" };

export const UserPageUpdating = () => {
    const mainClass = 'user-page-profile'
    const { user, updateProfile } = useAuth();
    const [avatarId, setAvatarId] = useState<number | null>(user?.avatar_id ?? null);
    const [passwords, setPasswords] = useState<PasswordValues>(emptyPasswords);
    const [error, setError] = useState<string | null>(null);
    const [success, setSuccess] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState(false);

    const handlePasswordChange = (field: keyof PasswordValues, value: string) => {
        setPasswords((prev) => ({ ...prev, [field]: value }));
    };

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setError(null);
        setSuccess(null);

        const changesAvatar = avatarId !== null && avatarId !== user?.avatar_id;
        const changesPassword = Boolean(passwords.current || passwords.next || passwords.repeat);

        if (changesPassword) {
            if (!passwords.current || !passwords.next || !passwords.repeat) {
                setError("Fill in all the password fields");
                return;
            }
            if (passwords.next !== passwords.repeat) {
                setError("The new passwords do not match");
                return;
            }
        }

        if (!changesAvatar && !changesPassword) {
            setError("You haven't changed anything");
            return;
        }

        setIsLoading(true);

        const updateError = await updateProfile({
            avatarId: changesAvatar ? avatarId : undefined,
            currentPassword: changesPassword ? passwords.current : undefined,
            newPassword: changesPassword ? passwords.next : undefined,
        });

        setIsLoading(false);

        if (updateError) {
            setError(updateError);
            return;
        }

        setPasswords(emptyPasswords);
        setSuccess("Profile updated");
    };

    return (
        <section id="edit-profile" className={mainClass}>
            <Title isH1={false} title="Update your profile" />
            <form className={`${mainClass}__form`} onSubmit={handleSubmit}>
                <EditAvatar mainClass={mainClass} selectedId={avatarId} onSelect={setAvatarId} />
                <EditPassword mainClass={mainClass} values={passwords} onChange={handlePasswordChange} />
                {error && <p className={`${mainClass}__error`} role="alert">{error}</p>}
                {success && <p className={`${mainClass}__success`} role="status">{success}</p>}
                <Button text={isLoading ? "Saving..." : "Confirm changes"} variant="primary" type="submit" disabled={isLoading} />
            </form>
        </section>
    )
}
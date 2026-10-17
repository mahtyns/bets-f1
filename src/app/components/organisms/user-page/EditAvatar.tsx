"use client";

import { FormEvent, useState } from 'react';
import { useAuth } from '@/app/context/AuthContext';
import { avatarOptions } from '@/app/content/helper-values';
import { Subtitle } from '../../atoms/Subtitle';
import Button from '../../atoms/Button';
import AvatarList from '../../molecules/user-page/AvatarList';

interface EditAvatarProps {
    mainClass: string
}

export const EditAvatar = (props: EditAvatarProps) => {
    const { user, updateProfile } = useAuth();
    const [avatarId, setAvatarId] = useState<number | null>(user?.avatar_id ?? null);
    const [error, setError] = useState<string | null>(null);
    const [success, setSuccess] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState(false);

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setError(null);
        setSuccess(null);

        if (avatarId === null || avatarId === user?.avatar_id) {
            setError("Pick a different avatar first");
            return;
        }

        setIsLoading(true);
        const updateError = await updateProfile({ avatarId });
        setIsLoading(false);

        if (updateError) {
            setError(updateError);
            return;
        }

        setSuccess("Avatar updated");
    };

    return (
        <form className={`${props.mainClass}__form`} onSubmit={handleSubmit} noValidate>
            <Subtitle isH3={true} title="Choose your avatar" />
            <AvatarList
                avatars={avatarOptions.filter((avatar) => avatar.id !== 1)}
                mainClass={props.mainClass}
                selectedId={avatarId}
                onSelect={setAvatarId}
            />
            {error && <p className={`${props.mainClass}__error`} role="alert">{error}</p>}
            {success && <p className={`${props.mainClass}__success`} role="status">{success}</p>}
            <Button text={isLoading ? "Saving..." : "Update avatar"} variant="primary" type="submit" disabled={isLoading} />
        </form>
    )
}
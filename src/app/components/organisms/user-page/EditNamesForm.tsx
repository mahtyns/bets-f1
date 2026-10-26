"use client"
import { useAuth } from "@/app/context/AuthContext";
import { Subtitle } from "../../atoms/Subtitle";
import LoginField from "../../molecules/login/LoginField";
import { useState, FormEvent } from "react";
import Button from "../../atoms/Button";

interface FormNamesProps {
    mainClass: string
}

export const EditNamesForm = (props: FormNamesProps) => {
    const { updateProfile } = useAuth();
    const [displayName, setDisplayName] = useState("");
    const [teamName, setTeamName] = useState("")
    const [error, setError] = useState<string | null>(null);
    const [success, setSuccess] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState(false);

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        setError(null);
        setSuccess(null);

        if (!displayName && !teamName) {
            setError("Fill the fields you want to update");
            return;
        }

        if (displayName) {
            setIsLoading(!isLoading);
            const updateError = await updateProfile({ displayName: displayName });
            setIsLoading(false);
            if (updateError) {
                setError(updateError);
                return;
            }
        }

        if (teamName) {
            setIsLoading(!isLoading);
            const updateError = await updateProfile({ teamName: teamName });
            setIsLoading(false);
            if (updateError) {
                setError(updateError);
                return;
            }
        }

        setDisplayName("");
        setTeamName("");
        setSuccess("User info updated");
    }

    return (
        <form className={`${props.mainClass}__form form--names`} onSubmit={handleSubmit} noValidate>
            <Subtitle isH3={true} title="Update your display name and team name" />
            <LoginField
                mainClass={props.mainClass}
                id="display-name"
                label="Display name"
                value={displayName}
                type="text"
                onChange={setDisplayName} />
            <LoginField
                mainClass={props.mainClass}
                id="team-name"
                label="Team name"
                value={teamName}
                type="text"
                onChange={setTeamName} />
            {error && <p className={`${props.mainClass}__error`} role="alert">{error}</p>}
            {success && <p className={`${props.mainClass}__success`} role="status">{success}</p>}
            <Button text={isLoading ? "Saving..." : "Update user information"} variant="primary" type="submit" disabled={isLoading} />
        </form>
    )
}

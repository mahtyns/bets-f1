export type User = {
    id: number;
    username: string;
    display_name: string;
    team: string;
    role: "admin" | "player";
    avatar_id: number
};

export type UpdateProfileInput = {
    avatarId?: number;
    currentPassword?: string;
    newPassword?: string;
};
"use server";

import bcrypt from "bcryptjs";
import { createAdminClient } from "@/app/lib/supabase/admin";
import { getSessionUserId } from "@/app/lib/session";
import { avatars } from "@/app/content/helper-values";
import type { User, UpdateProfileInput } from "@/app/types/user";

type UpdateProfileResult = { user: User | null; error: string | null };

export const updateProfileAction = async (input: UpdateProfileInput): Promise<UpdateProfileResult> => {
    const userId = await getSessionUserId();
    if (!userId) return { user: null, error: "You need to be logged in" };

    const supabase = createAdminClient();
    const changes: { avatar_id?: number; password_hash?: string } = {};

    if (input.avatarId !== undefined) {
        if (input.avatarId === 1 || !avatars[input.avatarId]) {
            return { user: null, error: "Invalid avatar" };
        }
        changes.avatar_id = input.avatarId;
    }

    if (input.newPassword) {
        const { data: current } = await supabase
            .from("users")
            .select("password_hash")
            .eq("id", userId)
            .maybeSingle();

        const isValid =
            !!current?.password_hash &&
            !!input.currentPassword &&
            (await bcrypt.compare(input.currentPassword, current.password_hash));

        if (!isValid) return { user: null, error: "Current password is incorrect" };

        changes.password_hash = await bcrypt.hash(input.newPassword, 10);
    }

    if (Object.keys(changes).length === 0) {
        return { user: null, error: "Nothing to update" };
    }

    const { data, error } = await supabase
        .from("users")
        .update(changes)
        .eq("id", userId)
        .select("id, username, display_name, team, role, avatar_id")
        .single();

    if (error || !data) return { user: null, error: "Could not update your profile" };

    return { user: data as User, error: null };
};
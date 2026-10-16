"use server";

import bcrypt from "bcryptjs";
import { createAdminClient } from "@/app/lib/supabase/admin";
import { createSession, deleteSession } from "@/app/lib/session";
import type { User } from "@/app/types/user";

type LoginResult = { user: User | null; error: string | null };

const INVALID_CREDENTIALS = "Invalid username or password";

export const loginAction = async (username: string, password: string): Promise<LoginResult> => {
    const supabase = createAdminClient();

    const { data } = await supabase
        .from("users")
        .select("id, username, display_name, team, role, password_hash, avatar_id")
        .eq("username", username.trim())
        .maybeSingle();

    if (!data || !data.password_hash) {
        return { user: null, error: INVALID_CREDENTIALS };
    }

    const isValid = await bcrypt.compare(password, data.password_hash);
    if (!isValid) {
        return { user: null, error: INVALID_CREDENTIALS };
    }

    await createSession(data.id);

    return {
        user: {
            id: data.id,
            username: data.username,
            display_name: data.display_name,
            team: data.team,
            role: data.role,
            avatar_id: data.avatar_id
        },
        error: null,
    };
};

export const logoutAction = async () => {
    await deleteSession();
};
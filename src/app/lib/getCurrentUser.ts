import "server-only";
import { createAdminClient } from "@/app/lib/supabase/admin";
import { getSessionUserId } from "@/app/lib/session";
import type { User } from "@/app/types/user";

export const getCurrentUser = async (): Promise<User | null> => {
    const userId = await getSessionUserId();
    if (!userId) return null;

    const supabase = createAdminClient();
    const { data } = await supabase
        .from("users")
        .select("id, username, display_name, team, role, avatar_id")
        .eq("id", userId)
        .maybeSingle();

    return data as User | null;
};
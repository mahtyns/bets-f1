import "server-only";
import { createAdminClient } from "@/app/lib/supabase/admin";
import { CHAMPIONSHIP_YEAR } from "../content/helper-values";
import { connection } from "next/server";

export interface CurrentRace {
    id: number;
    isSprint: boolean;
}

export const getCurrentRace = async (): Promise<CurrentRace | null> => {
    await connection();
    const supabase = createAdminClient();

    const { data, error } = await supabase
        .from("races")
        .select("id, is_sprint")
        .eq("season", CHAMPIONSHIP_YEAR)
        .gt("race_start", new Date().toISOString())
        .order("race_start")
        .limit(1)
        .maybeSingle();

    if (error) console.error(error);
    if (!data) return null;

    return { id: data.id, isSprint: data.is_sprint };
};
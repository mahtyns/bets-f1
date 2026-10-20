import "server-only";
import { createAdminClient } from "@/app/lib/supabase/admin";
import { CHAMPIONSHIP_YEAR } from "../content/helper-values";
import { toBetSummary, type BetSummary } from "./bet-summary";

export interface LastRound {
    raceName: string;
    bet: BetSummary | null;
    result: BetSummary | null;
    points: number | null;
}

export const getLastRound = async (userId: number | string | null): Promise<LastRound | null> => {
    const supabase = createAdminClient();

    const { data: race } = await supabase
        .from("races")
        .select("id, name, is_sprint")
        .eq("season", CHAMPIONSHIP_YEAR)
        .lt("race_start", new Date().toISOString())
        .order("race_start", { ascending: false })
        .limit(1)
        .maybeSingle();

    if (!race) return null;

    const [resultsRes, driversRes, betRes, scoreRes] = await Promise.all([
        supabase
            .from("race_results")
            .select("category, position, driver_id, safety_car, dnf, red_flags")
            .eq("race_id", race.id),
        supabase.from("drivers").select("id, name"),
        userId
            ? supabase.from("bets").select("id").eq("race_id", race.id).eq("user_id", userId).maybeSingle()
            : null,
        userId
            ? supabase.from("scores").select("points").eq("race_id", race.id).eq("user_id", userId).maybeSingle()
            : null,
    ]);

    const results = resultsRes.data ?? [];
    const nameById = new Map((driversRes.data ?? []).map((driver) => [driver.id, driver.name]));

    let bet: BetSummary | null = null;
    if (betRes?.data) {
        const { data: picks } = await supabase
            .from("bet_picks")
            .select("category, position, driver_id, safety_car, dnf, red_flags")
            .eq("bet_id", betRes.data.id);

        bet = toBetSummary(picks ?? [], nameById, race.is_sprint);
    }

    return {
        raceName: race.name,
        bet,
        result: results.length > 0 ? toBetSummary(results, nameById, race.is_sprint) : null,
        points: scoreRes?.data?.points ?? null,
    };
};
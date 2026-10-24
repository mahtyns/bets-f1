
import { cacheLife } from "next/cache";
import { CHAMPIONSHIP_YEAR } from "../content/helper-values";
import { createAdminClient } from "../lib/supabase/admin";

export interface NextRace {
    id: number;
    circuitKey: number;
    circuit: string;
    start: string;
    end: string;
    round: number;
    totalRounds: number;
    meetingKey: number;
    betsOpensAt: string | null;
    betsClosesAt: string | null;
    isSprint: boolean;
}

interface RaceRow {
    id: number;
    season: number | null;
    round: number | null;
    name: string | null;
    circuit: string | null;
    race_start: string | null;
    bets_opens_at: string | null;
    bets_lock_at: string | null;
    external_id: number | null;
    is_sprint: boolean | null;
}

const RACE_DURATION_MS = 4 * 60 * 60 * 1000;

export async function getNextRace(): Promise<NextRace | null> {
    "use cache"
    cacheLife("hours")
    const supabase = createAdminClient()
    const { data, error } = await supabase
        .from("races")
        .select(`
            id,
            season,
            round,
            name,
            circuit,
            race_start,
            bets_opens_at,
            bets_lock_at,
            external_id,
            is_sprint
        `)
        .eq("season", CHAMPIONSHIP_YEAR)
        .order("round", { ascending: true });

    if (error) {
        console.error("Failed to fetch races from database:", error);
        return null;
    }

    const races = (data ?? []) as RaceRow[];
    const now = Date.now();

    const next = races.find(
        (race) =>
            race.race_start !== null &&
            new Date(race.race_start).getTime() + RACE_DURATION_MS > now
    );

    if (!next) {
        return null;
    }

    return {
        id: next.id,
        circuitKey: next.external_id ?? 0,
        circuit: next.circuit ?? next.name ?? "Unknown circuit",
        start: next.race_start!,
        end: next.bets_lock_at ?? next.race_start!,
        round: next.round ?? 0,
        totalRounds: races.length,
        meetingKey: next.external_id ?? 0,
        betsOpensAt: next.bets_opens_at,
        betsClosesAt: next.bets_lock_at,
        isSprint: next.is_sprint ?? false,
    };
}

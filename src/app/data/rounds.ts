import { cacheLife } from "next/cache";
import { CHAMPIONSHIP_YEAR } from "../content/helper-values";
import { createAdminClient } from "../lib/supabase/admin";

const RACE_DURATION_MS = 4 * 60 * 60 * 1000;

export type RoundStatus = 'completed' | 'next' | 'upcoming' | 'ongoing';

export interface Round {
    meetingKey: number;
    circuitKey: number;
    round: number;
    status: RoundStatus;
    name: string;
    circuit: string;
    country: string;
    flag: string;
    image: string;
    type: string;
    start: string;
    end: string;
    isSprint: boolean;
    totalRounds: number;
}

interface RaceRow {
    round: number | null;
    name: string | null;
    circuit: string | null;
    country: string | null;
    race_start: string;
    external_id: number | null;
    is_sprint: boolean | null;
    type: string,
    image: string,
    flag: string,
    circuit_key: number
}

export const getRoundsOverview = async (): Promise<Round[]> => {
    "use cache";
    cacheLife("hours");

    const supabase = createAdminClient();

    const { data, error } = await supabase
        .from("races")
        .select("round, name, circuit, country, race_start, external_id, is_sprint, type, image, circuit_key, flag")
        .eq("season", CHAMPIONSHIP_YEAR)
        .not("race_start", "is", null)
        .order("round", { ascending: true });

    if (error) {
        console.error(error);
        return [];
    }

    const races = (data ?? []) as RaceRow[];
    const now = Date.now();

    const currentIndex = races.findIndex(
        (race) => new Date(race.race_start).getTime() + RACE_DURATION_MS >= now
    );

    if (currentIndex === -1) return [];

    const toRound = (race: RaceRow, index: number, status: RoundStatus): Round => ({
        meetingKey: race.external_id ?? 0,
        circuitKey: race.circuit_key ?? 0,
        round: race.round ?? index + 1,
        totalRounds: races.length,
        status,
        name: race.name ?? "",
        circuit: race.circuit ?? race.name ?? "",
        country: race.country ?? "",
        flag: race.flag ?? "",
        image: race.image ?? "",
        type: race.type ?? "",
        start: race.race_start,
        end: new Date(new Date(race.race_start).getTime() + RACE_DURATION_MS).toISOString(),
        isSprint: race.is_sprint ?? false,
    });

    const rounds: Round[] = [];
    const current = races[currentIndex];
    const isOngoing = new Date(current.race_start).getTime() <= now;
    const previous = races[currentIndex - 1];
    const following = races[currentIndex + 1];


    if (previous) rounds.push(toRound(previous, currentIndex - 1, 'completed'));
    rounds.push(toRound(current, currentIndex, isOngoing ? 'ongoing' : 'next'));
    if (following) rounds.push(toRound(following, currentIndex + 1, 'upcoming'));

    return rounds;
};
import "server-only";
import { createAdminClient } from "@/app/lib/supabase/admin";
import {
    BET_CATEGORIES,
    DNF_FROM_NUMBER,
    red_flags_FROM_NUMBER,
    SAFETY_CAR_FROM_NUMBER,
} from "../content/bet-categories";

export interface ResultRow {
    label: string;
    pick: string;
    official: string;
    points?: number;
}

export interface CategoryResult {
    title: string;
    points: number;
    rows: ResultRow[];
}

export interface UserRaceResult {
    raceId: number;
    round: number;
    name: string;
    totalPoints: number;
    categories: CategoryResult[];
}

interface Breakdown {
    qualifying?: number;
    race?: number;
    sprint?: number;
    fastestLap?: number;
    driverOfTheDay?: number;
    safetyCar?: number;
    dnf?: number;
    redFlag?: number;
}

interface PickRow {
    category: string;
    position: number | null;
    driver_id: number | null;
    safety_car: number | null;
    dnf: number | null;
    red_flags: number | null;
}

const LIST_SIZE = 10;
const NONE = "-";

const DEFAULT_POINTS = { exact_position: 5, near_position: 3, in_table: 1 } as const;
type MatchType = keyof typeof DEFAULT_POINTS;

const choice = (map: Record<number, string>, value: number | null | undefined): string =>
    value == null ? NONE : map[value] ?? NONE;

export const getUserResults = async (userId: number): Promise<UserRaceResult[]> => {
    const supabase = createAdminClient();

    const { data: scores, error: scoresError } = await supabase
        .from("scores")
        .select("race_id, points, breakdown")
        .eq("user_id", userId);

    if (scoresError || !scores || scores.length === 0) {
        if (scoresError) console.error(scoresError);
        return [];
    }

    const raceIds = scores.map((score) => score.race_id);

    const [racesRes, betsRes, resultsRes, driversRes, rulesRes] = await Promise.all([
        supabase.from("races").select("id, round, name, race_start, is_sprint").in("id", raceIds),
        supabase.from("bets").select("id, race_id").eq("user_id", userId).in("race_id", raceIds),
        supabase
            .from("race_results")
            .select("race_id, category, position, driver_id, safety_car, dnf, red_flags")
            .in("race_id", raceIds),
        supabase.from("drivers").select("id, name"),
        supabase.from("scoring_rules").select("category, match_type, points"),
    ]);

    const failed = [racesRes, betsRes, resultsRes, driversRes, rulesRes].find((res) => res.error);
    if (failed?.error) {
        console.error(failed.error);
        return [];
    }

    const betIds = (betsRes.data ?? []).map((bet) => bet.id);
    const { data: picksData, error: picksError } = betIds.length
        ? await supabase
            .from("bet_picks")
            .select("bet_id, category, position, driver_id, safety_car, dnf, red_flags")
            .in("bet_id", betIds)
        : { data: [], error: null };

    if (picksError) {
        console.error(picksError);
        return [];
    }

    const nameById = new Map((driversRes.data ?? []).map((driver) => [driver.id, driver.name]));
    const driverName = (id: number | null | undefined): string =>
        id ? nameById.get(id) ?? NONE : NONE;

    const rulePoints = new Map(
        (rulesRes.data ?? []).map((rule) => [`${rule.category}:${rule.match_type}`, rule.points])
    );
    const pointsFor = (category: string, type: MatchType): number =>
        rulePoints.get(`${category}:${type}`) ?? DEFAULT_POINTS[type];

    const races = [...(racesRes.data ?? [])].sort(
        (a, b) => new Date(b.race_start).getTime() - new Date(a.race_start).getTime()
    );

    return races.flatMap((race): UserRaceResult[] => {
        const score = scores.find((item) => item.race_id === race.id);
        if (!score) return [];

        const breakdown = (score.breakdown ?? {}) as Breakdown;
        const bet = (betsRes.data ?? []).find((item) => item.race_id === race.id);
        const picks: PickRow[] = (picksData ?? []).filter((pick) => pick.bet_id === bet?.id);
        const results: PickRow[] = (resultsRes.data ?? []).filter((item) => item.race_id === race.id);

        const find = (rows: PickRow[], category: string) =>
            rows.find((row) => row.category === category);

        const positions = (category: string, title: string, total = 0): CategoryResult => {
            const officialPosition = new Map(
                results
                    .filter((row) => row.category === category && row.position !== null)
                    .map((row) => [row.driver_id, row.position as number])
            );

            return {
                title,
                points: total,
                rows: Array.from({ length: LIST_SIZE }, (_, index) => {
                    const position = index + 1;
                    const pick = picks.find((row) => row.category === category && row.position === position);
                    const official = results.find((row) => row.category === category && row.position === position);

                    const actual = pick?.driver_id ? officialPosition.get(pick.driver_id) : undefined;
                    const match: MatchType | null =
                        actual === undefined ? null
                            : actual === position ? "exact_position"
                                : Math.abs(actual - position) === 1 ? "near_position"
                                    : "in_table";

                    return {
                        label: `P${position}`,
                        pick: driverName(pick?.driver_id),
                        official: driverName(official?.driver_id),
                        points: match ? pointsFor(category, match) : 0,
                    };
                }),
            };
        };

        const single = (title: string, points: number, pick: string, official: string): CategoryResult => ({
            title,
            points,
            rows: [{ label: "", pick, official }],
        });

        const categories: CategoryResult[] = [
            positions(BET_CATEGORIES.qualifying, "Qualifying", breakdown.qualifying),
            positions(BET_CATEGORIES.race, "Race", breakdown.race),
        ];

        if (race.is_sprint) {
            categories.push(positions(BET_CATEGORIES.sprint, "Sprint", breakdown.sprint));
        }

        categories.push(
            single(
                "Fastest lap",
                breakdown.fastestLap ?? 0,
                driverName(find(picks, BET_CATEGORIES.fastestLap)?.driver_id),
                driverName(find(results, BET_CATEGORIES.fastestLap)?.driver_id)
            ),
            single(
                "Driver of the day",
                breakdown.driverOfTheDay ?? 0,
                driverName(find(picks, BET_CATEGORIES.driverOfTheDay)?.driver_id),
                driverName(find(results, BET_CATEGORIES.driverOfTheDay)?.driver_id)
            ),
            single(
                "Safety car",
                breakdown.safetyCar ?? 0,
                choice(SAFETY_CAR_FROM_NUMBER, find(picks, BET_CATEGORIES.safetyCar)?.safety_car),
                choice(SAFETY_CAR_FROM_NUMBER, find(results, BET_CATEGORIES.safetyCar)?.safety_car)
            ),
            single(
                "DNF",
                breakdown.dnf ?? 0,
                choice(DNF_FROM_NUMBER, find(picks, BET_CATEGORIES.dnf)?.dnf),
                choice(DNF_FROM_NUMBER, find(results, BET_CATEGORIES.dnf)?.dnf)
            ),
            single(
                "Red flags",
                breakdown.redFlag ?? 0,
                choice(red_flags_FROM_NUMBER, find(picks, BET_CATEGORIES.redFlag)?.red_flags),
                choice(red_flags_FROM_NUMBER, find(results, BET_CATEGORIES.redFlag)?.red_flags)
            )
        );

        return [{
            raceId: race.id,
            round: race.round,
            name: race.name,
            totalPoints: score.points,
            categories,
        }];
    });
};
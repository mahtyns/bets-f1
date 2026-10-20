import { createClient } from "@supabase/supabase-js";
import { BET_CATEGORIES } from "../content/bet-categories";
import { CHAMPIONSHIP_YEAR } from "../content/helper-values";


const POSITION_CATEGORIES = [
    BET_CATEGORIES.qualifying,
    BET_CATEGORIES.race,
    BET_CATEGORIES.sprint,
];

interface Pick {
    bet_id: number;
    category: string;
    position: number | null;
    driver_id: number | null;
    safety_car: number | null;
}

const run = async () => {
    const round = Number(process.argv[2]);
    if (!round) throw new Error("Usage: calculate-scores.ts <round number>");

    const supabase = createClient(
        process.env.NEXT_PUBLIC_SUPABASE_URL!,
        process.env.SUPABASE_SECRET_KEY!
    );

    const { data: race } = await supabase
        .from("races")
        .select("id, name")
        .eq("season", CHAMPIONSHIP_YEAR)
        .eq("round", round)
        .maybeSingle();
    if (!race) throw new Error(`Round ${round} not found in races`);

    const [rulesRes, resultsRes, betsRes, driversRes] = await Promise.all([
        supabase.from("scoring_rules").select("category, match_type, points"),
        supabase
            .from("race_results")
            .select("category, position, driver_id, team_id, safety_car")
            .eq("race_id", race.id),
        supabase.from("bets").select("id, user_id").eq("race_id", race.id),
        supabase.from("drivers").select("id, team_id"),
    ]);

    const failed = [rulesRes, resultsRes, betsRes, driversRes].find((res) => res.error);
    if (failed?.error) throw failed.error;

    const rules = rulesRes.data ?? [];
    const results = resultsRes.data ?? [];
    const bets = betsRes.data ?? [];
    const drivers = driversRes.data ?? [];

    if (!results.some((result) => result.category === BET_CATEGORIES.race)) {
        throw new Error("No race results yet, run sync-results first");
    }
    if (!results.some((result) => result.category === BET_CATEGORIES.driverOfTheDay)) {
        console.warn("Driver of the Day is not set for this race, it will score 0");
    }
    if (bets.length === 0) {
        console.log("No bets for this race, nothing to calculate");
        return;
    }

    const pointsFor = (category: string, matchType: string): number => {
        const rule = rules.find(
            (item) => item.category === category && item.match_type === matchType
        );
        if (!rule) throw new Error(`Missing scoring rule: ${category} / ${matchType}`);
        return rule.points;
    };

    POSITION_CATEGORIES.forEach((category) =>
        ["exact_position", "near_position", "in_table"].forEach((type) => pointsFor(category, type))
    );
    [BET_CATEGORIES.fastestLap, BET_CATEGORIES.driverOfTheDay, BET_CATEGORIES.safetyCar, BET_CATEGORIES.redFlag, BET_CATEGORIES.dnf].forEach(
        (category) => pointsFor(category, "correct")
    );

    const picksRes = await supabase
        .from("bet_picks")
        .select("bet_id, category, position, driver_id, safety_car")
        .in("bet_id", bets.map((bet) => bet.id));
    if (picksRes.error) throw picksRes.error;
    const allPicks: Pick[] = picksRes.data ?? [];

    const teamByDriver = new Map(drivers.map((driver) => [driver.id, driver.team_id]));

    const scorePositions = (category: string, picks: Pick[]): number => {
        const actual = results.filter((result) => result.category === category);
        if (actual.length === 0) return 0;

        const byPosition = new Map(actual.map((result) => [result.position, result]));
        const inTable = new Set(actual.map((result) => result.driver_id));

        return picks
            .filter((pick) => pick.category === category && pick.position !== null)
            .reduce((total, pick) => {
                const real = byPosition.get(pick.position);

                if (real && real.driver_id === pick.driver_id) {
                    return total + pointsFor(category, "exact_position");
                }
                if (
                    real &&
                    pick.driver_id !== null &&
                    real.team_id === teamByDriver.get(pick.driver_id)
                ) {
                    return total + pointsFor(category, "near_position");
                }
                if (inTable.has(pick.driver_id)) {
                    return total + pointsFor(category, "in_table");
                }
                return total;
            }, 0);
    };

    const scoreDriverSpecial = (category: string, picks: Pick[]): number => {
        const real = results.find((result) => result.category === category);
        const pick = picks.find((item) => item.category === category);
        return real && pick && real.driver_id === pick.driver_id
            ? pointsFor(category, "correct")
            : 0;
    };

    const scoreSafetyCar = (picks: Pick[]): number => {
        const real = results.find((result) => result.category === BET_CATEGORIES.safetyCar);
        const pick = picks.find((item) => item.category === BET_CATEGORIES.safetyCar);
        return real && pick && real.safety_car === pick.safety_car
            ? pointsFor(BET_CATEGORIES.safetyCar, "correct")
            : 0;
    };

    const scored = bets.map((bet) => {
        const picks = allPicks.filter((pick) => pick.bet_id === bet.id);

        const breakdown = {
            qualifying: scorePositions(BET_CATEGORIES.qualifying, picks),
            race: scorePositions(BET_CATEGORIES.race, picks),
            sprint: scorePositions(BET_CATEGORIES.sprint, picks),
            fastestLap: scoreDriverSpecial(BET_CATEGORIES.fastestLap, picks),
            driverOfTheDay: scoreDriverSpecial(BET_CATEGORIES.driverOfTheDay, picks),
            safetyCar: scoreSafetyCar(picks),
        };
        const points = Object.values(breakdown).reduce((sum, value) => sum + value, 0);

        return { user_id: bet.user_id, breakdown, points };
    });

    console.table(
        scored.map((item) => ({ user_id: item.user_id, ...item.breakdown, total: item.points }))
    );

    const { error: deleteError } = await supabase
        .from("scores")
        .delete()
        .eq("race_id", race.id);
    if (deleteError) throw deleteError;

    const { error: insertError } = await supabase.from("scores").insert(
        scored.map((item) => ({
            user_id: item.user_id,
            race_id: race.id,
            points: item.points,
            breakdown: item.breakdown,
        }))
    );
    if (insertError) throw insertError;



    console.log(`Saved scores for ${scored.length} bets in ${race.name}`);
};

run().catch((error) => {
    console.error(error);
    process.exit(1);
});
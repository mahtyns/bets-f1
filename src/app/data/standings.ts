import "server-only";
import { createAdminClient } from "@/app/lib/supabase/admin";
import type { Result, Standing, PointsBreakdown } from "@/app/types/standings";
import { BET_CATEGORIES } from "../content/bet-categories";
import { cacheLife } from "next/cache";

const FORM_LENGTH = 4;

export const getStandings = async (): Promise<Standing[]> => {
    "use cache";
    cacheLife("minutes");
    const supabase = createAdminClient();

    const [usersRes, scoresRes, racesRes, betsRes, picksRes, polesRes] = await Promise.all([
        supabase.from("users").select("id, display_name, team, avatar_id"),
        supabase.from("scores").select("user_id, race_id, points, breakdown"),
        supabase.from("races").select("id, race_start"),
        supabase.from("bets").select("id, user_id, race_id"),
        supabase
            .from("bet_picks")
            .select("bet_id, driver_id")
            .eq("category", BET_CATEGORIES.qualifying)
            .eq("position", 1),
        supabase
            .from("race_results")
            .select("race_id, driver_id")
            .eq("category", BET_CATEGORIES.qualifying)
            .eq("position", 1),

    ]);


    const failed = [usersRes, scoresRes, racesRes, betsRes, picksRes, polesRes].find(
        (res) => res.error
    );
    if (failed?.error) {
        console.error(failed.error);
        return [];
    }

    const users = usersRes.data ?? [];
    const scores = scoresRes.data ?? [];
    const races = racesRes.data ?? [];
    const bets = betsRes.data ?? [];
    const polePicks = picksRes.data ?? [];
    const poleResults = polesRes.data ?? [];

    const raceStartById = new Map(
        races.map((race) => [race.id, new Date(race.race_start).getTime()])
    );

    const oldestFirst = [...new Set(scores.map((score) => score.race_id))].sort(
        (a, b) => (raceStartById.get(a) ?? 0) - (raceStartById.get(b) ?? 0)
    );
    const lastRaceId = oldestFirst[oldestFirst.length - 1];
    const totalRaces = oldestFirst.length;

    const resultInRace = (userId: number, raceId: number): Result => {
        const raceScores = scores.filter((score) => score.race_id === raceId);
        const own = raceScores.find((score) => score.user_id === userId);
        if (!own || own.points <= 0) return "L";

        const rank = 1 + raceScores.filter((score) => score.points > own.points).length;
        return rank === 1 ? "W" : rank <= 3 ? "P" : "L";
    };

    const poleDriverByRace = new Map(poleResults.map((item) => [item.race_id, item.driver_id]));
    const betById = new Map(bets.map((bet) => [bet.id, bet]));
    const polesByUser = new Map<number, number>();

    polePicks.forEach((pick) => {
        const bet = betById.get(pick.bet_id);
        if (!bet || !oldestFirst.includes(bet.race_id)) return;
        if (poleDriverByRace.get(bet.race_id) !== pick.driver_id) return;

        polesByUser.set(bet.user_id, (polesByUser.get(bet.user_id) ?? 0) + 1);
    });

    const rows = users.map((user) => {
        const own = scores.filter((score) => score.user_id === user.id);
        const lastScore = own.find((score) => score.race_id === lastRaceId);

        return {
            user,
            totalPoints: own.reduce((sum, score) => sum + score.points, 0),
            lastGpPoints: lastScore?.points ?? 0,
            lastGpBreakdown: (lastScore?.breakdown ?? null) as PointsBreakdown | null,
        };
    });

    const nameOf = (row: { user: { display_name: string | null } }) =>
        row.user.display_name ?? "";

    const current = [...rows].sort(
        (a, b) => b.totalPoints - a.totalPoints || nameOf(a).localeCompare(nameOf(b))
    );

    const previous = [...rows].sort(
        (a, b) =>
            b.totalPoints - b.lastGpPoints - (a.totalPoints - a.lastGpPoints) ||
            nameOf(a).localeCompare(nameOf(b))
    );
    const previousRank = new Map(previous.map((row, index) => [row.user.id, index + 1]));

    return current.map((row, index): Standing => {
        const rank = index + 1;
        const results = oldestFirst.map((raceId) => resultInRace(row.user.id, raceId));
        const wins = results.filter((result) => result === "W").length;
        const podiums = results.filter((result) => result !== "L").length;
        const before = previousRank.get(row.user.id) ?? rank;

        return {
            userId: String(row.user.id),
            rank,
            trend: totalRaces < 2 || before === rank ? "same" : before > rank ? "up" : "down",
            name: row.user.display_name,
            team: row.user.team,
            avatarId: row.user.avatar_id,
            totalPoints: row.totalPoints,
            lastGpPoints: row.lastGpPoints,
            poles: polesByUser.get(row.user.id) ?? 0,
            podiums,
            races: totalRaces,
            winRate: totalRaces > 0 ? (wins / totalRaces) * 100 : 0,
            form: results.slice(-FORM_LENGTH),
            lastGpBreakdown: row.lastGpBreakdown,
        };
    });
};
import "server-only";
import { createAdminClient } from "@/app/lib/supabase/admin";
import type { Standing, Result } from "@/app/types/standings";

const FORM_LENGTH = 4;

export const getStandings = async (): Promise<Standing[]> => {
    const supabase = createAdminClient();

    const [usersRes, scoresRes, racesRes] = await Promise.all([
        supabase.from("users").select("id, display_name, team, avatar_id"),
        supabase.from("scores").select("user_id, race_id, points"),
        supabase.from("races").select("id, race_start"),
    ]);

    if (usersRes.error || scoresRes.error || racesRes.error) {
        console.error(usersRes.error ?? scoresRes.error ?? racesRes.error);
        return [];
    }

    const users = usersRes.data ?? [];
    const scores = scoresRes.data ?? [];
    const races = racesRes.data ?? [];

    const raceStartById = new Map(races.map((race) => [race.id, new Date(race.race_start).getTime()]));

    const scoredRaceIds = [...new Set(scores.map((score) => score.race_id))];
    const newestFirst = [...scoredRaceIds].sort(
        (a, b) => (raceStartById.get(b) ?? 0) - (raceStartById.get(a) ?? 0)
    );
    const lastRaceId = newestFirst[0];
    const formRaceIds = newestFirst.slice(0, FORM_LENGTH).reverse();

    const resultInRace = (userId: number, raceId: number): Result => {
        const raceScores = scores.filter((score) => score.race_id === raceId);
        const own = raceScores.find((score) => score.user_id === userId);
        if (!own) return "L";

        const rank = 1 + raceScores.filter((score) => score.points > own.points).length;
        return rank === 1 ? "W" : rank <= 3 ? "P" : "L";
    };

    return users
        .map((user) => {
            const own = scores.filter((score) => score.user_id === user.id);

            return {
                user,
                totalPoints: own.reduce((sum, score) => sum + score.points, 0),
                lastGpPoints: own.find((score) => score.race_id === lastRaceId)?.points ?? 0,
            };
        })
        .sort(
            (a, b) =>
                b.totalPoints - a.totalPoints ||
                (a.user.display_name ?? "").localeCompare(b.user.display_name ?? "")
        )
        .map((row, index): Standing => ({
            userId: String(row.user.id),
            rank: index + 1,
            trend: "same",
            name: row.user.display_name,
            team: row.user.team,
            avatarId: row.user.avatar_id,
            totalPoints: row.totalPoints,
            lastGpPoints: row.lastGpPoints,
            poles: 0,
            podiums: 0,
            races: scoredRaceIds.length,
            winRate: 0,
            form: formRaceIds.map((raceId) => resultInRace(row.user.id, raceId)),
        }));
};
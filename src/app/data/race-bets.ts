import "server-only";
import { createAdminClient } from "@/app/lib/supabase/admin";
import { toBetSummary, type BetSummary } from "./bet-summary";

export interface PlayerBet {
    userId: string;
    name: string;
    team: string;
    avatarId: number;
    summary: BetSummary;
}

export const getRaceBets = async (meetingKey: number): Promise<PlayerBet[]> => {
    const supabase = createAdminClient();

    const { data: race } = await supabase
        .from("races")
        .select("id, is_sprint, bets_lock_at")
        .eq("external_id", meetingKey)
        .maybeSingle();

    if (!race || Date.now() < new Date(race.bets_lock_at).getTime()) return [];

    const { data: bets } = await supabase
        .from("bets")
        .select("id, user_id")
        .eq("race_id", race.id);
    if (!bets || bets.length === 0) return [];

    const [usersRes, picksRes, driversRes] = await Promise.all([
        supabase
            .from("users")
            .select("id, display_name, team, avatar_id")
            .in("id", bets.map((bet) => bet.user_id)),
        supabase
            .from("bet_picks")
            .select("bet_id, category, position, driver_id, safety_car, dnf, red_flags")
            .in("bet_id", bets.map((bet) => bet.id)),
        supabase.from("drivers").select("id, name"),
    ]);

    const failed = [usersRes, picksRes, driversRes].find((res) => res.error);
    if (failed?.error) {
        console.error(failed.error);
        return [];
    }

    const users = usersRes.data ?? [];
    const picks = picksRes.data ?? [];
    const nameById = new Map((driversRes.data ?? []).map((driver) => [driver.id, driver.name]));

    return bets
        .flatMap((bet): PlayerBet[] => {
            const user = users.find((item) => item.id === bet.user_id);
            if (!user) return [];

            return [
                {
                    userId: String(user.id),
                    name: user.display_name,
                    team: user.team,
                    avatarId: user.avatar_id,
                    summary: toBetSummary(
                        picks.filter((pick) => pick.bet_id === bet.id),
                        nameById,
                        race.is_sprint
                    ),
                },
            ];
        })
        .sort((a, b) => a.name.localeCompare(b.name));
};
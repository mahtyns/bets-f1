import { getRoundsOverview } from "@/app/data/rounds";
import { getStandings } from "@/app/data/standings";
import { getCurrentUser } from "@/app/lib/getCurrentUser";
import GeneralStandings from "../layouts/GeneralStandings";
import { StandingsDetailed } from "../layouts/StandingsDetailed";
import { DriverTeamStandings } from "../layouts/DriverTeamStandings";

export const HomeContent = async () => {
    const rounds = await getRoundsOverview();
    const [standings, user] = await Promise.all([getStandings(), getCurrentUser()]);
    const currentUserId = user ? String(user.id) : "";
    return (
        <>
            <GeneralStandings standings={standings} currentUserId={currentUserId} rounds={rounds} />
            <StandingsDetailed standings={standings} currentUserId={currentUserId} />
            <DriverTeamStandings />
        </>
    )
}

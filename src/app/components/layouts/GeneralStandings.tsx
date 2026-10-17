import type { Standing } from "@/app/types/standings";
import GeneralStandingsTopBar from "../organisms/general-standings/GeneralStandingsTopBar";
import PlayersGeneralStandings from "../organisms/general-standings/PlayersGeneralStandings";
import WeekWinner from "../organisms/general-standings/WeekWinner";

interface GeneralStandingsProps {
    standings: Standing[];
    currentUserId: string;
}

const GeneralStandings = (props: GeneralStandingsProps) => {
    const mainClass = "general-standings"

    return (
        <section id="general-standings" className={mainClass}>
            <GeneralStandingsTopBar mainClass={mainClass} />
            <PlayersGeneralStandings
                mainClass={mainClass}
                standings={props.standings}
                currentUserId={props.currentUserId}
            />
            <WeekWinner mainClass={mainClass} standings={props.standings} />
        </section>
    )
}

export default GeneralStandings
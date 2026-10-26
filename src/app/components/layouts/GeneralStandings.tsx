import type { Standing } from "@/app/types/standings";
import GeneralStandingsTopBar from "../organisms/general-standings/GeneralStandingsTopBar";
import PlayersGeneralStandings from "../organisms/general-standings/PlayersGeneralStandings";
import WeekWinner from "../organisms/general-standings/WeekWinner";
import { Round } from "@/app/data/rounds";

interface GeneralStandingsProps {
    standings: Standing[];
    currentUserId: string;
    rounds: Round[]
}

const GeneralStandings = async (props: GeneralStandingsProps) => {
    const mainClass = "general-standings"

    return (
        <section id="general-standings" className={mainClass}>
            <GeneralStandingsTopBar mainClass={mainClass} rounds={props.rounds} />
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
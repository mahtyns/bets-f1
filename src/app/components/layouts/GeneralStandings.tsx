import { mockStandings, CURRENT_USER_ID } from "@/app/data/mockStandings";
import GeneralStandingsTopBar from "../organisms/general-standings/GeneralStandingsTopBar";
import PlayersGeneralStandings from "../organisms/general-standings/PlayersGeneralStandings";
import WeekWinner from "../organisms/general-standings/WeekWinner";

const GeneralStandings = () => {

    const mainClass = "general-standings"

    return (
        <section id="general-standings" className={mainClass}>
            <GeneralStandingsTopBar mainClass={mainClass} />
            <PlayersGeneralStandings
                mainClass={mainClass}
                standings={mockStandings}
                currentUserId={CURRENT_USER_ID}
            />
            <WeekWinner mainClass={mainClass} standings={mockStandings} />
        </section>
    )
}

export default GeneralStandings
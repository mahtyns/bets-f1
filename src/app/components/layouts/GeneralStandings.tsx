import GeneralStandingsTopBar from "../organisms/general-standings/GeneralStandingsTopBar";
import PlayersGeneralStandings from "../organisms/general-standings/PlayersGeneralStandings";
import WeekWinner from "../organisms/general-standings/WeekWinner";

const GeneralStandings = () => {

    const mainClass = "general-standings"

    return (
        <section id="general-standings" className={mainClass}>
            <GeneralStandingsTopBar mainClass={mainClass} />
            <PlayersGeneralStandings mainClass={mainClass} />
            <WeekWinner mainClass={mainClass} />
        </section>
    )
}

export default GeneralStandings
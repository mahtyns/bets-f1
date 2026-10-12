import Title from "../atoms/Title";
import DetailedTableStandings from "../organisms/detailed-standings/DetailedTableStandings";
import { mockStandings, CURRENT_USER_ID } from "@/app/data/mockStandings";

export const StandingsDetailed = () => {

    const mainClass = "standings-table"

    return (
        <section id="standings-table" className={mainClass}>
            <header>
                <Title isH1={false} title={"Paddock Crew Championship Standings"} />
            </header>
            <DetailedTableStandings standings={mockStandings} currentUserId={CURRENT_USER_ID} mainClass={mainClass} />
        </section>
    )
}

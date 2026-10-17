import type { Standing } from "@/app/types/standings";
import Title from "../atoms/Title";
import DetailedTableStandings from "../organisms/detailed-standings/DetailedTableStandings";

interface StandingsDetailedProps {
    standings: Standing[];
    currentUserId: string;
}

export const StandingsDetailed = (props: StandingsDetailedProps) => {
    const mainClass = "standings-table"

    return (
        <section id="standings-table" className={mainClass}>
            <header>
                <Title isH1={false} title={"Paddock Crew Championship Standings"} />
            </header>
            <DetailedTableStandings
                standings={props.standings}
                currentUserId={props.currentUserId}
                mainClass={mainClass}
            />
        </section>
    )
}
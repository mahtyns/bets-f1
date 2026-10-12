import type { TeamStanding } from "@/app/types/championship";
import Title from "../../atoms/Title";
import TeamRow from "../../molecules/driver-team-standings/TeamRow";

interface TeamsChampionshipProps {
    mainClass: string;
    year: number;
    teams: TeamStanding[];
}

const TeamsChampionship = (props: TeamsChampionshipProps) => {
    return (
        <div className={`${props.mainClass}__card`}>
            <header className={`${props.mainClass}__card-header`}>
                <Title isH1={false} title={`${props.year} Constructors Championship`} />
                <p>Teams delta</p>
            </header>
            <ul className={`${props.mainClass}__list`}>
                {props.teams.map((team) => (
                    <TeamRow key={team.name} mainClass={props.mainClass} team={team} />
                ))}
            </ul>
        </div>
    )
}

export default TeamsChampionship
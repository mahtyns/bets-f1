import Title from "../../atoms/Title";
import PlayerCard from "../../molecules/general-standings/PlayerCard";

interface PlayerStandingsProps {
    mainClass: string;
}

const PlayersGeneralStandings = (props: PlayerStandingsProps) => {
    return (
        <div>
            <Title isH1={false} title="Player Standings" />
            <div className={`${props.mainClass}__players`}>
                <PlayerCard mainClass={props.mainClass} />
                <PlayerCard mainClass={props.mainClass} />
                <PlayerCard mainClass={props.mainClass} />
            </div></div>

    )
}

export default PlayersGeneralStandings
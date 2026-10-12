import type { Standing } from "@/app/types/standings";
import Title from "../../atoms/Title";
import PlayerCard from "../../molecules/general-standings/PlayerCard";

interface PlayerStandingsProps {
    mainClass: string;
    standings: Standing[];
    currentUserId: string;
}

const PlayersGeneralStandings = (props: PlayerStandingsProps) => {
    const leaderPoints = props.standings[0]?.totalPoints ?? 0;

    return (
        <div>
            <Title isH1={false} title="Player Standings" />
            <div className={`${props.mainClass}__players`}>
                {props.standings.slice(0, 3).map((standing) => (
                    <PlayerCard
                        key={standing.userId}
                        mainClass={props.mainClass}
                        standing={standing}
                        leaderPoints={leaderPoints}
                        isMe={standing.userId === props.currentUserId}
                    />
                ))}
            </div>
        </div>
    )
}

export default PlayersGeneralStandings
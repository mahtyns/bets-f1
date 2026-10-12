import type { Standing } from "@/app/types/standings";
import Title from "../../atoms/Title";
import PlayerCell from "../../molecules/PlayerCell";

interface WeekWinnerProps {
    mainClass: string;
    standings: Standing[];
}

const WeekWinner = (props: WeekWinnerProps) => {
    const winner = props.standings.reduce<Standing | undefined>(
        (best, current) =>
            !best || current.lastGpPoints > best.lastGpPoints ? current : best,
        undefined
    );

    if (!winner) return null;

    return (
        <div className={`${props.mainClass}__week-winner`}>
            <Title isH1={false} title="Winner of the Week" />
            <div className={`${props.mainClass}__week-winner__card`} >
                <PlayerCell
                    mainClass={props.mainClass}
                    name={winner.name}
                    team={winner.team}
                    avatarId={winner.avatarId}
                />
            </div>
        </div>
    )
}

export default WeekWinner
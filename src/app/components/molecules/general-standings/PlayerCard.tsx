import type { Standing } from "@/app/types/standings";
import { mainPageContent } from "@/app/content/main";
import PlayerCell from "../PlayerCell";

interface PlayerCardProps {
    mainClass: string;
    standing: Standing;
    leaderPoints: number;
    isMe: boolean;
}

const { p1, p2, p3 } = mainPageContent.mainStandings;

const topbarByRank: Record<number, { name: string; label: string }> = {
    1: p1,
    2: p2,
    3: p3,
};

const PlayerCard = (props: PlayerCardProps) => {
    const { standing } = props;
    const delta = standing.totalPoints - props.leaderPoints;
    const topbar = topbarByRank[standing.rank];

    return (
        <div className={`${props.mainClass}__player-card ${props.isMe ? `${props.mainClass}__player-card--me` : ""}`}>
            <div className={`${props.mainClass}__player-card__topbar`}>
                {topbar.name} · {topbar.label}
            </div>
            <PlayerCell
                mainClass={props.mainClass}
                name={standing.name}
                team={standing.team}
                avatarId={standing.avatarId}
                isMe={props.isMe}
            />
            <div className={`${props.mainClass}__player-card__points`}>
                <div className={`${props.mainClass}__player-card__total`}>
                    <p>TOTAL PTS</p>
                    <p>{standing.totalPoints}</p>
                </div>
                {standing.rank !== 1 && (
                    <div className={`${props.mainClass}__player-card__delta`}>
                        <p>DELTA P1</p>
                        <p>{delta} PTS</p>
                    </div>
                )}
                <div className={`${props.mainClass}__player-card__accuracy`}>
                    <p>Accuracy</p>
                    <p>{standing.winRate.toFixed(1)}%</p>
                </div>
            </div>
        </div>
    )
}

export default PlayerCard
import type { CSSProperties } from "react";
import type { TeamStanding } from "@/app/types/championship";

interface TeamRowProps {
    mainClass: string;
    team: TeamStanding;
}

const TeamRow = (props: TeamRowProps) => {
    const { team } = props;
    const style = { "--team-colour": `#${team.teamColour}` } as CSSProperties;

    return (
        <li className={`${props.mainClass}__team-row`} style={style}>
            <div className={`${props.mainClass}__team-head`}>
                <span className={`${props.mainClass}__position`}>P{team.position}</span>
                <span className={`${props.mainClass}__colour-dot`} />
                <p className={`${props.mainClass}__team-name`}>{team.name}</p>
                <p className={`${props.mainClass}__team-points`}>{team.points} PTS</p>
            </div>
            <div className={`${props.mainClass}__progress`}>
                <div
                    className={`${props.mainClass}__progress-bar`}
                    style={{ width: `${team.progress}%` }}
                />
            </div>
        </li>
    )
}

export default TeamRow
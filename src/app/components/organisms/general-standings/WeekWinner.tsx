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

    const className = `${props.mainClass}__week-winner`;
    const points = winner.lastGpBreakdown;

    const groups = points
        ? [
            {
                title: "Points from races",
                total: points.qualifying + points.race + points.sprint,
                rows: [
                    { label: "Qualifying", value: points.qualifying },
                    { label: "Race", value: points.race },
                    ...(points.sprint > 0 ? [{ label: "Sprint", value: points.sprint }] : []),
                ],
            },
            {
                title: "Points from specials",
                total: points.fastestLap + points.driverOfTheDay + points.safetyCar + points.redFlag + points.dnf,
                rows: [
                    { label: "Fastest lap", value: points.fastestLap },
                    { label: "Driver of the day", value: points.driverOfTheDay },
                    { label: "Safety car", value: points.safetyCar },
                    { label: "DNF", value: points.dnf },
                    { label: "Red Flags", value: points.redFlag },
                ],
            },
        ]
        : [];

    return (
        <div className={className}>
            <Title isH1={false} title="Winner of the Week" />
            <div className={`${className}__card`} >
                <div className={`${className}__user`}>
                    <PlayerCell
                        mainClass={props.mainClass}
                        name={winner.name}
                        team={winner.team}
                        avatarId={winner.avatarId}
                    />
                    <p className={`${className}__total`}>
                        <span>Total points</span>
                        <span>{winner.lastGpPoints}</span>
                    </p>
                </div>
                {groups.map((group) => (
                    <div key={group.title} className={`${className}__group`}>
                        <p className={`${className}__group-head`}>
                            <span>{group.title}</span>
                            <span>{group.total}</span>
                        </p>
                        <ul className={`${className}__rows`}>
                            {group.rows.map((row) => (
                                <li key={row.label} className={`${className}__row`}>
                                    <span>{row.label}</span>
                                    <span>{row.value}</span>
                                </li>
                            ))}
                        </ul>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default WeekWinner
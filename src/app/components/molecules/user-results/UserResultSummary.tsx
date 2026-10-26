import type { Standing } from "@/app/types/standings";

interface UserResultsSummaryProps {
    mainClass: string;
    standing: Standing;
}

const UserResultsSummary = (props: UserResultsSummaryProps) => {
    const { mainClass, standing } = props;
    const points = standing.lastGpBreakdown;

    if (!points) return <p>No scored races yet.</p>;

    const rows = [
        { label: "Qualifying", value: points.qualifying },
        { label: "Race", value: points.race },
        ...(points.sprint > 0 ? [{ label: "Sprint", value: points.sprint }] : []),
        { label: "Fastest lap", value: points.fastestLap },
        { label: "Driver of the day", value: points.driverOfTheDay },
        { label: "Safety car", value: points.safetyCar },
        { label: "DNF", value: points.dnf },
        { label: "Red flags", value: points.redFlag },
    ];

    return (
        <article className={`${mainClass}__card`}>
            <p className={`${mainClass}__total`}>
                <span>Last race points</span>
                <span>{standing.lastGpPoints}</span>
            </p>
            <ul className={`${mainClass}__rows`}>
                {rows.map((row) => (
                    <li key={row.label} className={`${mainClass}__row`}>
                        <span>{row.label}</span>
                        <span>{row.value}</span>
                    </li>
                ))}
            </ul>
        </article>
    );
};

export default UserResultsSummary;
import { predictionHubContent } from "@/app/content/prediction-hub";
import type { BetSummary } from "@/app/data/bet-summary";
import SlipRow from "./SlipRow";

interface BetSummaryListProps {
    mainClass: string;
    summary: BetSummary;
}

const BetSummaryList = (props: BetSummaryListProps) => {
    const { slip, specials } = predictionHubContent;
    const { summary } = props;

    const positionRows = (names: (string | null)[]) =>
        names.map((name, index) => ({
            label: `P${index + 1}`,
            value: name ?? slip.empty,
            empty: !name,
        }));

    const groups = [
        { title: "Qualifying", rows: positionRows(summary.qualifying) },
        { title: "Race", rows: positionRows(summary.race) },
        ...(summary.sprint ? [{ title: "Sprint", rows: positionRows(summary.sprint) }] : []),
        {
            title: specials.title,
            rows: [
                { label: slip.fastestLap, value: summary.fastestLap ?? slip.empty, empty: !summary.fastestLap },
                { label: slip.driverOfTheRace, value: summary.driverOfTheDay ?? slip.empty, empty: !summary.driverOfTheDay },
                { label: slip.safetyCar, value: summary.safetyCar ?? slip.empty, empty: !summary.safetyCar },
            ],
        },
    ];

    return (
        <>
            {groups.map((group) => (
                <div key={group.title} className={`${props.mainClass}__slip-group`}>
                    <div className={`${props.mainClass}__slip-group-head`}>
                        <p>{group.title}</p>
                    </div>
                    <ul className={`${props.mainClass}__slip-list`}>
                        {group.rows.map((row) => (
                            <SlipRow
                                key={`${group.title}-${row.label}`}
                                mainClass={props.mainClass}
                                label={row.label}
                                value={row.value}
                                empty={row.empty}
                            />
                        ))}
                    </ul>
                </div>
            ))}
        </>
    );
};

export default BetSummaryList;
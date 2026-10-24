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
                { label: slip.fastestLap, value: summary.fastestLap ?? slip.emptySpecials, empty: !summary.fastestLap },
                { label: slip.driverOfTheRace, value: summary.driverOfTheDay ?? slip.emptySpecials, empty: !summary.driverOfTheDay },
                { label: slip.safetyCar, value: summary.safetyCar ?? slip.emptySpecials, empty: !summary.safetyCar },
                { label: slip.dnf, value: summary.dnf ?? slip.emptySpecials, empty: !summary.dnf },
                { label: slip.redFlag, value: summary.redFlag ?? slip.emptySpecials, empty: !summary.redFlag },
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
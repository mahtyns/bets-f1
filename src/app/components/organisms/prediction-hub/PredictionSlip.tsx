import type { PredictionDriver, PredictionSlot, SafetyCarChoice } from "@/app/types/predictions";
import { predictionHubContent } from "@/app/content/prediction-hub";
import { PREDICTION_SLOT_COUNT, pickedCount } from "@/app/utils/helpers/predictionSlots";
import Title from "../../atoms/Title";
import Text from "../../atoms/Text";
import SlipRow from "../../molecules/prediction-hub/SlipRow";
import Button from "../../atoms/Button";

interface PredictionSlipProps {
    mainClass: string;
    drivers: PredictionDriver[];
    qualifying: PredictionSlot[];
    race: PredictionSlot[];
    sprint: PredictionSlot[];
    fastestLap: number | null;
    driverOfTheRace: number | null;
    safetyCar: SafetyCarChoice | null;
    hasSprint: boolean
}

const slotValue = (slot: PredictionSlot, emptyLabel: string): string =>
    slot ? slot.name : emptyLabel;

const namedDriver = (
    drivers: PredictionDriver[],
    driverNumber: number | null,
    emptyLabel: string,
): string =>
    drivers.find((driver) => driver.driverNumber === driverNumber)?.name ?? emptyLabel;

const PredictionSlip = (props: PredictionSlipProps) => {
    const { slip } = predictionHubContent;
    const emptyLabel = slip.empty;
    const safetyLabel =
        predictionHubContent.specials.safetyCar.options.find(
            (option) => option.value === props.safetyCar
        )?.label ?? emptyLabel;

    const groups = [
        {
            title: slip.qualifying,
            picked: pickedCount(props.qualifying),
            rows: props.qualifying.map((slot, index) => ({
                label: `P${index + 1}`,
                value: slotValue(slot, emptyLabel),
                empty: !slot,
            })),
        },
        {
            title: slip.race,
            picked: pickedCount(props.race),
            rows: props.race.map((slot, index) => ({
                label: `P${index + 1}`,
                value: slotValue(slot, emptyLabel),
                empty: !slot,
            })),
        },
        ...(props.hasSprint
            ? [
                {
                    title: slip.sprint,
                    picked: pickedCount(props.sprint),
                    rows: props.sprint.map((slot, index) => ({
                        label: `P${index + 1}`,
                        value: slotValue(slot, emptyLabel),
                        empty: !slot,
                    })),
                },
            ]
            : []),
        {
            title: predictionHubContent.specials.title,
            picked: [props.fastestLap, props.driverOfTheRace, props.safetyCar].filter(Boolean).length,
            total: 3,
            rows: [
                {
                    label: slip.fastestLap,
                    value: namedDriver(props.drivers, props.fastestLap, emptyLabel),
                    empty: props.fastestLap === null,
                },
                {
                    label: slip.driverOfTheRace,
                    value: namedDriver(props.drivers, props.driverOfTheRace, emptyLabel),
                    empty: props.driverOfTheRace === null,
                },
                {
                    label: slip.safetyCar,
                    value: safetyLabel,
                    empty: props.safetyCar === null,
                },
            ],
        },
    ];

    return (
        <aside className={`${props.mainClass}__slip`}>
            <header className={`${props.mainClass}__slip-header`}>
                <Title isH1={false} title={slip.title} />
            </header>
            {groups.map((group) => (
                <div key={group.title} className={`${props.mainClass}__slip-group`}>
                    <div className={`${props.mainClass}__slip-group-head`}>
                        <p>{group.title}</p>
                        <Text
                            text={`${group.picked}/${group.total ?? PREDICTION_SLOT_COUNT} ${slip.picked}`}
                            variant="muted"
                            mainClass={`${props.mainClass}__slip-count`}
                        />
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
            <Button variant="primary" text="Confirm choices" />
        </aside>
    );
};

export default PredictionSlip;

import { calendarContent } from "@/app/content/calendar"; // adjust to your content file path
import { CircuitSecondaryInfo } from "@/app/data/circuit-secondary-info";

export interface RaceInfoCardData {
    label: string,
    value: string,
    subText: string,
    highlight: boolean
}

type CardKey = "lapRecord" | "firstYear" | "corners" | "lengthKm";

const abbreviate = (fullName: string) => {
    const [first, ...rest] = fullName.split(" ");
    return rest.length ? `${first[0]}. ${rest.join(" ")}` : fullName;
};

const resolvers: Record<CardKey, (info: CircuitSecondaryInfo) => { value: string, subText?: string } | null> = {
    lapRecord: ({ lapRecord }) => lapRecord
        ? {
            value: lapRecord.time,
            subText: `${abbreviate(lapRecord.driver)}${lapRecord.year ? ` (${lapRecord.year})` : ""}`,
        }
        : null,
    firstYear: ({ firstYear }) => firstYear ? { value: String(firstYear) } : null,
    corners: ({ corners }) => corners ? { value: String(corners) } : null,
    lengthKm: ({ lengthKm }) => lengthKm ? { value: `${lengthKm} km` } : null,
};

export const getRaceInfoCards = (info: CircuitSecondaryInfo | null): RaceInfoCardData[] => {
    if (!info) return [];

    return calendarContent.raceInfo.cards.flatMap((card) => {
        const resolved = resolvers[card.key as CardKey](info);

        return resolved
            ? [{
                label: card.name,
                value: resolved.value,
                subText: resolved.subText ?? card.subText,
                highlight: card.highlight,
            }]
            : [];
    });
};
import { BET_CATEGORIES, DNF_FROM_NUMBER, red_flags_FROM_NUMBER, SAFETY_CAR_FROM_NUMBER } from "../content/bet-categories";

export interface BetSummary {
    qualifying: (string | null)[];
    race: (string | null)[];
    sprint: (string | null)[] | null;
    fastestLap: string | null;
    driverOfTheDay: string | null;
    safetyCar: string | null;
    dnf: string | null;
    redFlag: string | null
}

export interface PickRow {
    category: string;
    position: number | null;
    driver_id: number | null;
    safety_car: number | null;
    dnf: number | null,
    red_flags: number | null
}

const LIST_SIZE = 10;

export const toBetSummary = (
    rows: PickRow[],
    nameById: Map<number, string>,
    hasSprint: boolean
): BetSummary => {
    const driverName = (driverId: number | null | undefined): string | null =>
        driverId ? nameById.get(driverId) ?? null : null;

    const podium = (category: string) =>
        Array.from({ length: LIST_SIZE }, (_, index) =>
            driverName(
                rows.find((row) => row.category === category && row.position === index + 1)?.driver_id
            )
        );

    const special = (category: string) => rows.find((row) => row.category === category);
    const safetyCar = special(BET_CATEGORIES.safetyCar)?.safety_car;
    const dnf = special(BET_CATEGORIES.dnf)?.dnf;
    const redFlag = special(BET_CATEGORIES.redFlag)?.safety_car;

    return {
        qualifying: podium(BET_CATEGORIES.qualifying),
        race: podium(BET_CATEGORIES.race),
        sprint: hasSprint ? podium(BET_CATEGORIES.sprint) : null,
        fastestLap: driverName(special(BET_CATEGORIES.fastestLap)?.driver_id),
        driverOfTheDay: driverName(special(BET_CATEGORIES.driverOfTheDay)?.driver_id),
        safetyCar: safetyCar == null ? null : SAFETY_CAR_FROM_NUMBER[safetyCar] ?? null,
        dnf: dnf == null ? null : DNF_FROM_NUMBER[dnf] ?? null,
        redFlag: redFlag == null ? null : red_flags_FROM_NUMBER[redFlag] ?? null,
    };
};
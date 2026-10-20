export interface PredictionDriver {
    driverNumber: number;
    name: string;
    team: string;
    teamColour: string;
    acronym: string;
}

export type PredictionSlot = PredictionDriver | null;

export type SafetyCarChoice = "0" | "1-2" | "3+";

export type DNFChoice = "0" | "1-2" | "3-5" | "6+"

export type RedFlagChoice = "0" | "1" | "2" | "3+";

export type RacePredictionVariant = "race" | "sprint";

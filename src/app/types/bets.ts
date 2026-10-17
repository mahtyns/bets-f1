import type { SafetyCarChoice } from "@/app/types/predictions";

export interface SaveBetInput {
    raceId: number;
    qualifying: (number | null)[];
    race: (number | null)[];
    sprint: (number | null)[];
    fastestLap: number | null;
    driverOfTheRace: number | null;
    safetyCar: SafetyCarChoice | null;
}
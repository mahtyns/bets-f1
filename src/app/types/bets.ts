import type { SafetyCarChoice, DNFChoice, RedFlagChoice } from "@/app/types/predictions";

export interface SaveBetInput {
    raceId: number;
    qualifying: (number | null)[];
    race: (number | null)[];
    sprint: (number | null)[];
    fastestLap: number | null;
    driverOfTheRace: number | null;
    safetyCar: SafetyCarChoice | null;
    dnf: DNFChoice | null,
    redFlag: RedFlagChoice | null
}
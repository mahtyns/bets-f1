import type { SafetyCarChoice } from "@/app/types/predictions";

export const BET_CATEGORIES = {
    qualifying: "qualifying",
    race: "race",
    sprint: "sprint",
    fastestLap: "fastest_lap",
    driverOfTheDay: "driver_of_the_day",
    safetyCar: "safety_car",
} as const;

export const SAFETY_CAR_TO_NUMBER: Record<SafetyCarChoice, number> = {
    "0": 0,
    "1-2": 1,
    "3+": 2,
};

export const SAFETY_CAR_FROM_NUMBER: Record<number, SafetyCarChoice> = {
    0: "0",
    1: "1-2",
    2: "3+",
};
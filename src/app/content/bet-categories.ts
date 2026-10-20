import type { DNFChoice, RedFlagChoice, SafetyCarChoice } from "@/app/types/predictions";

export const BET_CATEGORIES = {
    qualifying: "qualifying",
    race: "race",
    sprint: "sprint",
    fastestLap: "fastest_lap",
    driverOfTheDay: "driver_of_the_day",
    safetyCar: "safety_car",
    dnf: "dnf",
    redFlag: "red_flag"
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

export const DNF_TO_NUMBER: Record<DNFChoice, number> = {
    "0": 0,
    "1-2": 1,
    "3-5": 2,
    "6+": 3
};

export const DNF_FROM_NUMBER: Record<number, DNFChoice> = {
    0: "0",
    1: "1-2",
    2: "3-5",
    3: "6+"
};

export const RED_FLAG_TO_NUMBER: Record<RedFlagChoice, number> = {
    "0": 0,
    "1": 1,
    "2": 2,
    "3+": 3
};

export const RED_FLAG_FROM_NUMBER: Record<number, RedFlagChoice> = {
    0: "0",
    1: "1",
    2: "2",
    3: "3+"
};
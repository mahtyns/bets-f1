export type Result = "W" | "P" | "L";
export type Trend = "up" | "down" | "same";

export interface Standing {
    userId: string;
    rank: number;
    trend: Trend;
    name: string;
    team: string;
    avatarId: number;
    totalPoints: number;
    lastGpPoints: number;
    poles: number;
    podiums: number;
    races: number;
    winRate: number;
    form: Result[];
}
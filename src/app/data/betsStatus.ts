import type { NextRace } from "./nextRace";

const ONE_HOUR = 60 * 60 * 1000;

export const getBetsOpensAt = (race: NextRace): number => {
    const start = new Date(race.start);

    // Monday 00:00 (UTC) of the race week
    const daysSinceMonday = (start.getUTCDay() + 6) % 7;
    return Date.UTC(
        start.getUTCFullYear(),
        start.getUTCMonth(),
        start.getUTCDate() - daysSinceMonday
    );
};

export const getBetsOpen = (race: NextRace, now: number): boolean => {
    const closesAt = new Date(race.start).getTime() - ONE_HOUR;

    return now >= getBetsOpensAt(race) && now < closesAt;
};
import { cacheLife } from "next/cache";
import { CHAMPIONSHIP_YEAR } from "../content/helperValues";
import { API_BASE } from "./api";
import type { ApiMeeting } from '@/app/types/meetings'

export interface NextRace {
    circuitKey: number;
    circuit: string;
    start: string;
    end: string,
    round: number,
    totalRounds: number,
    meetingKey: number
}


const fetchNextRace = async (): Promise<NextRace | null> => {
    "use cache"
    cacheLife("hours")

    const res = await fetch(`${API_BASE}meetings?year=${CHAMPIONSHIP_YEAR}`);
    if (!res.ok) throw new Error(`OpenF1 meetings failed: ${res.status}`);

    const meetings: ApiMeeting[] = await res.json();
    const now = Date.now();

    const races = meetings
        .filter((m) => !m.is_cancelled && !/testing/i.test(m.meeting_name))
        .sort(
            (a, b) =>
                new Date(a.date_start).getTime() - new Date(b.date_start).getTime()
        );

    const next = races.find((m) => new Date(m.date_end).getTime() > now);

    if (!next) return null;

    return {
        circuitKey: next.circuit_key,
        circuit: next.circuit_short_name,
        start: next.date_start,
        end: next.date_end,
        round: races.indexOf(next) + 1,
        totalRounds: races.length,
        meetingKey: next.meeting_key
    };
};

export const getNextRace = async (): Promise<NextRace | null> => {
    try {
        return await fetchNextRace();
    } catch (error) {
        console.error(error);
        return null;
    }
};
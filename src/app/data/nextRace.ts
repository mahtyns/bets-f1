import { CHAMPIONSHIP_YEAR } from "../content/helperValues";
import { API_BASE } from "./api";

const REVALIDATE_SECONDS = 3600;

interface ApiMeeting {
    circuit_key: number;
    circuit_short_name: string;
    date_start: string;
    is_cancelled: boolean;
    meeting_name: string
}

export interface NextRace {
    circuitKey: number;
    circuit: string;
    start: string;
    round: number,
    totalRounds: number
}


export const getNextRace = async (): Promise<NextRace | null> => {
    try {
        const res = await fetch(`${API_BASE}meetings?year=${CHAMPIONSHIP_YEAR}`, {
            next: { revalidate: REVALIDATE_SECONDS },
        });

        if (!res.ok) return null;

        const meetings: ApiMeeting[] = await res.json();
        const now = Date.now();

        const races = meetings
            .filter((m) => !m.is_cancelled && !/testing/i.test(m.meeting_name))
            .sort(
                (a, b) =>
                    new Date(a.date_start).getTime() - new Date(b.date_start).getTime()
            );

        const next = races.find((m) => new Date(m.date_start).getTime() > now);

        if (!next) return null;

        return {
            circuitKey: next.circuit_key,
            circuit: next.circuit_short_name,
            start: next.date_start,
            round: races.indexOf(next) + 1,
            totalRounds: races.length,
        };
    } catch (error) {
        console.error(error);
        return null;
    }
};
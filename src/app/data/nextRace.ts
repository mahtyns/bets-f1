import { API_BASE } from "./api";

const YEAR = 2026;
const REVALIDATE_SECONDS = 3600;

interface ApiMeeting {
    circuit_short_name: string;
    date_start: string;
    is_cancelled: boolean;
}

export interface NextRace {
    circuit: string;
    start: string;
}

export const getNextRace = async (): Promise<NextRace | null> => {
    try {
        const res = await fetch(`${API_BASE}meetings?year=${YEAR}`, {
            next: { revalidate: REVALIDATE_SECONDS },
        });

        if (!res.ok) return null;

        const meetings: ApiMeeting[] = await res.json();
        const now = Date.now();

        const upcoming = meetings
            .filter((m) => !m.is_cancelled && new Date(m.date_start).getTime() > now)
            .sort(
                (a, b) =>
                    new Date(a.date_start).getTime() - new Date(b.date_start).getTime()
            );

        if (!upcoming[0]) return null;

        return {
            circuit: upcoming[0].circuit_short_name,
            start: upcoming[0].date_start,
        };
    } catch (error) {
        console.error(error);
        return null;
    }
};
import { cacheLife } from "next/cache";
import { API_BASE } from "./api";

interface ApiSession {
    session_name: string;
    date_start: string;
    date_end: string;
}

export interface RaceSession {
    name: string;
    start: string;
    end: string;
}

export const getRaceWeekend = async (meetingKey: number): Promise<RaceSession[]> => {
    "use cache";
    cacheLife("hours");

    try {
        const res = await fetch(`${API_BASE}sessions?meeting_key=${meetingKey}`);
        if (!res.ok) return [];

        const sessions: ApiSession[] = await res.json();

        return sessions
            .map((s) => ({ name: s.session_name, start: s.date_start, end: s.date_end }))
            .sort((a, b) => new Date(a.start).getTime() - new Date(b.start).getTime());
    } catch (error) {
        console.error(error);
        return [];
    }
};
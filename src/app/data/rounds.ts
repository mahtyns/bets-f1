import { cacheLife } from "next/cache";
import { CHAMPIONSHIP_YEAR } from "../content/helperValues";
import { API_BASE } from "./api";

const REVALIDATE_SECONDS = 3600;

interface ApiMeeting {
    meeting_key: number;
    meeting_name: string;
    circuit_key: number;
    circuit_short_name: string;
    circuit_image: string;
    circuit_type: string;
    country_name: string;
    country_flag: string;
    date_start: string;
    date_end: string;
    is_cancelled: boolean;
}

export type RoundStatus = 'completed' | 'next' | 'upcoming';

export interface Round {
    meetingKey: number;
    circuitKey: number;
    round: number;
    status: RoundStatus;
    name: string;
    circuit: string;
    country: string;
    flag: string;
    image: string;
    type: string;
    start: string;
    end: string;
    isSprint: boolean;
}

const getSprintMeetingKeys = async (): Promise<Set<number>> => {
    try {
        const res = await fetch(
            `${API_BASE}sessions?year=${CHAMPIONSHIP_YEAR}&session_name=Sprint`,
            { next: { revalidate: REVALIDATE_SECONDS } }
        );

        if (!res.ok) return new Set();

        const sessions: { meeting_key: number }[] = await res.json();

        return new Set(sessions.map((session) => session.meeting_key));
    } catch (error) {
        console.error(error);
        return new Set();
    }
};

export const getRoundsOverview = async (): Promise<Round[]> => {
    "use cache";
    cacheLife("hours");
    try {
        const [res, sprintKeys] = await Promise.all([
            fetch(`${API_BASE}meetings?year=${CHAMPIONSHIP_YEAR}`, {
                next: { revalidate: REVALIDATE_SECONDS },
            }),
            getSprintMeetingKeys(),
        ]);
        if (!res.ok) return [];

        const meetings: ApiMeeting[] = await res.json();
        const now = Date.now();

        const races = meetings
            .filter((m) => !m.is_cancelled && !/testing/i.test(m.meeting_name))
            .sort(
                (a, b) =>
                    new Date(a.date_start).getTime() - new Date(b.date_start).getTime()
            );

        const currentIndex = races.findIndex(
            (m) => new Date(m.date_end).getTime() >= now
        );

        if (currentIndex === -1) return [];



        const toRound = (meeting: ApiMeeting, status: RoundStatus): Round => ({
            meetingKey: meeting.meeting_key,
            circuitKey: meeting.circuit_key,
            round: races.indexOf(meeting) + 1,
            status,
            name: meeting.meeting_name,
            circuit: meeting.circuit_short_name,
            country: meeting.country_name,
            flag: meeting.country_flag,
            image: meeting.circuit_image,
            type: meeting.circuit_type,
            start: meeting.date_start,
            end: meeting.date_end,
            isSprint: sprintKeys.has(meeting.meeting_key),
        });

        const rounds: Round[] = [];
        const previous = races[currentIndex - 1];
        const following = races[currentIndex + 1];

        if (previous) rounds.push(toRound(previous, 'completed'));
        rounds.push(toRound(races[currentIndex], 'next'));
        if (following) rounds.push(toRound(following, 'upcoming'));

        return rounds;
    } catch (error) {
        console.error(error);
        return [];
    }
};
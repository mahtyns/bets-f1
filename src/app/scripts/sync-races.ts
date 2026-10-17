import { createClient } from "@supabase/supabase-js";
import { CHAMPIONSHIP_YEAR, TIMEZONE_MADRID } from "../content/helperValues";
import { API_BASE } from "../data/api";


interface ApiMeeting {
    meeting_key: number;
    meeting_name: string;
    circuit_short_name: string;
    country_name: string;
    date_start: string;
    is_cancelled: boolean;
}

interface ApiSession {
    meeting_key: number;
    date_start: string;
}

const getJson = async <T>(path: string): Promise<T> => {
    const res = await fetch(`${API_BASE}${path}`);
    if (!res.ok) throw new Error(`OpenF1 request failed (${res.status}): ${path}`);
    return res.json();
};

const madridFormatter = new Intl.DateTimeFormat("en-GB", {
    timeZone: TIMEZONE_MADRID,
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    weekday: "short",
    hourCycle: "h23",
});

const getMadridParts = (date: Date) => {
    const parts = Object.fromEntries(
        madridFormatter.formatToParts(date).map((p) => [p.type, p.value])
    );

    return {
        year: Number(parts.year),
        month: Number(parts.month),
        day: Number(parts.day),
        hour: Number(parts.hour),
        minute: Number(parts.minute),
        second: Number(parts.second),
        weekday: parts.weekday,
    };
};

// Difference between Madrid local time and UTC at a given moment (handles summer/winter time)
const getMadridOffsetMs = (date: Date): number => {
    const p = getMadridParts(date);
    const asUtc = Date.UTC(p.year, p.month - 1, p.day, p.hour, p.minute, p.second);
    return asUtc - Math.floor(date.getTime() / 1000) * 1000;
};

const WEEKDAYS = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

// Monday 00:00 (Madrid time) of the week of the given moment, as an ISO string
const getMondayMadrid = (date: Date): string => {
    const p = getMadridParts(date);
    const daysSinceMonday = WEEKDAYS.indexOf(p.weekday);

    const guess = Date.UTC(p.year, p.month - 1, p.day - daysSinceMonday);
    const first = guess - getMadridOffsetMs(new Date(guess));
    const result = guess - getMadridOffsetMs(new Date(first));

    return new Date(result).toISOString();
};

const run = async () => {
    const supabase = createClient(
        process.env.NEXT_PUBLIC_SUPABASE_URL!,
        process.env.SUPABASE_SECRET_KEY!
    );

    const [meetings, raceSessions, sprintSessions] = await Promise.all([
        getJson<ApiMeeting[]>(`meetings?year=${CHAMPIONSHIP_YEAR}`),
        getJson<ApiSession[]>(`sessions?year=${CHAMPIONSHIP_YEAR}&session_name=Race`),
        getJson<ApiSession[]>(`sessions?year=${CHAMPIONSHIP_YEAR}&session_name=Sprint`),
    ]);

    const raceStarts = new Map(raceSessions.map((s) => [s.meeting_key, s.date_start]));
    const sprintKeys = new Set(sprintSessions.map((s) => s.meeting_key));

    const races = meetings
        .filter((m) => !m.is_cancelled && !/testing/i.test(m.meeting_name))
        .sort((a, b) => new Date(a.date_start).getTime() - new Date(b.date_start).getTime());

    const rows = [];
    for (const [index, meeting] of races.entries()) {
        const raceStart = raceStarts.get(meeting.meeting_key);
        if (!raceStart) {
            console.warn(`Skipped ${meeting.meeting_name} (no Race session found)`);
            continue;
        }

        rows.push({
            external_id: meeting.meeting_key,
            season: CHAMPIONSHIP_YEAR,
            round: index + 1,
            name: meeting.meeting_name,
            circuit: meeting.circuit_short_name,
            country: meeting.country_name,
            race_start: new Date(raceStart).toISOString(),
            bets_lock_at: new Date(meeting.date_start).toISOString(),
            bets_opens_at: getMondayMadrid(new Date(raceStart)),
            is_sprint: sprintKeys.has(meeting.meeting_key),
        });
    }

    const { error } = await supabase.from("races").upsert(rows, { onConflict: "external_id" });
    if (error) throw error;

    console.log(`Synced ${rows.length} races`);
    console.table(
        rows.map((r) => ({
            round: r.round,
            name: r.name,
            sprint: r.is_sprint,
            opens: r.bets_opens_at,
            locks: r.bets_lock_at,
        }))
    );
};

run().catch((error) => {
    console.error(error);
    process.exit(1);
});
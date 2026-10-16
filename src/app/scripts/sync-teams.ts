import { createClient } from "@supabase/supabase-js";

const YEAR = 2026;
const API_BASE = "https://api.openf1.org/v1/";

interface ApiSession {
    session_key: number;
    date_start: string;
    is_cancelled: boolean;
}

interface ApiDriver {
    team_name: string;
    team_colour: string;
}

const getJson = async <T>(path: string): Promise<T> => {
    const res = await fetch(`${API_BASE}${path}`);
    if (!res.ok) throw new Error(`OpenF1 request failed (${res.status}): ${path}`);
    return res.json();
};

const getLatestSessionKey = async (): Promise<number> => {
    const sessions = await getJson<ApiSession[]>(`sessions?year=${YEAR}`);
    const now = Date.now();

    const latest = sessions
        .filter((s) => !s.is_cancelled && new Date(s.date_start).getTime() <= now)
        .sort((a, b) => new Date(b.date_start).getTime() - new Date(a.date_start).getTime())[0];

    if (!latest) throw new Error(`No sessions found for ${YEAR}`);
    return latest.session_key;
};

const run = async () => {
    const supabase = createClient(
        process.env.NEXT_PUBLIC_SUPABASE_URL!,
        process.env.SUPABASE_SECRET_KEY!
    );

    const sessionKey = await getLatestSessionKey();
    const drivers = await getJson<ApiDriver[]>(`drivers?session_key=${sessionKey}`);

    const colours = new Map(drivers.map((d) => [d.team_name, d.team_colour]));
    const teamNames = [...new Set(drivers.map((d) => d.team_name).filter(Boolean))];
    const rows = teamNames.map((name) => ({ name, colour: colours.get(name) ?? null }));

    const { error } = await supabase.from("teams").upsert(rows, { onConflict: "name" });
    if (error) throw error;

    console.log(`Synced ${rows.length} teams:`, teamNames);
};

run().catch((error) => {
    console.error(error);
    process.exit(1);
});
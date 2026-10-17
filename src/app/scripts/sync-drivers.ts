import { createClient } from "@supabase/supabase-js";
import { CHAMPIONSHIP_YEAR } from "../content/helperValues";
import { API_BASE } from "../data/api";

interface ApiSession {
    session_key: number;
    date_start: string;
    is_cancelled: boolean;
}

interface ApiDriver {
    driver_number: number;
    first_name: string;
    last_name: string;
    team_name: string;
    name_acronym: string;
}

const getJson = async <T>(path: string): Promise<T> => {
    const res = await fetch(`${API_BASE}${path}`);
    if (!res.ok) throw new Error(`OpenF1 request failed (${res.status}): ${path}`);
    return res.json();
};

const getLatestSessionKey = async (): Promise<number> => {
    const sessions = await getJson<ApiSession[]>(`sessions?year=${CHAMPIONSHIP_YEAR}`);
    const now = Date.now();

    const latest = sessions
        .filter((s) => !s.is_cancelled && new Date(s.date_start).getTime() <= now)
        .sort((a, b) => new Date(b.date_start).getTime() - new Date(a.date_start).getTime())[0];

    if (!latest) throw new Error(`No sessions found for ${CHAMPIONSHIP_YEAR}`);
    return latest.session_key;
};

const run = async () => {
    const supabase = createClient(
        process.env.NEXT_PUBLIC_SUPABASE_URL!,
        process.env.SUPABASE_SECRET_KEY!
    );

    const { data: teams, error: teamsError } = await supabase
        .from("teams")
        .select("id, name");
    if (teamsError) throw teamsError;

    const teamIds = new Map(teams.map((t) => [t.name, t.id]));

    const sessionKey = await getLatestSessionKey();
    const apiDrivers = await getJson<ApiDriver[]>(`drivers?session_key=${sessionKey}`);

    const rows = [];
    for (const d of apiDrivers) {
        const teamId = teamIds.get(d.team_name);
        if (!d.driver_number || !teamId) {
            console.warn(`Skipped ${d.first_name} ${d.last_name} (team: ${d.team_name})`);
            continue;
        }
        rows.push({
            name: `${d.first_name} ${d.last_name}`,
            number: d.driver_number,
            team_id: teamId,
            external_id: d.driver_number,
            acronym: d.name_acronym,
        });
    }

    const { error } = await supabase.from("drivers").upsert(rows, { onConflict: "external_id" });
    if (error) throw error;

    console.log(`Synced ${rows.length} drivers:`, rows.map((r) => r.name));
};

run().catch((error) => {
    console.error(error);
    process.exit(1);
});
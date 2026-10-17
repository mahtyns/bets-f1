import { createClient } from "@supabase/supabase-js";
import { BET_CATEGORIES } from "../content/betCategories";
import { CHAMPIONSHIP_YEAR } from "../content/helperValues";
import { API_BASE } from "../data/api";

const TOP = 10;

interface ApiSession {
    session_key: number;
    session_name: string;
}

interface ApiResult {
    driver_number: number;
    position: number | null;
}

interface ApiLap {
    driver_number: number;
    lap_duration: number | null;
}

interface ApiRaceControl {
    message: string;
}

interface ResultRow {
    race_id: number;
    category: string;
    position: number | null;
    driver_id: number | null;
    team_id: number | null;
    safety_car: number | null;
}

const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

const getJson = async <T>(path: string, attempt = 1): Promise<T> => {
    const res = await fetch(`${API_BASE}${path}`);

    if (res.status === 429 && attempt <= 5) {
        await sleep(1500 * attempt);
        return getJson<T>(path, attempt + 1);
    }

    if (res.status === 404) return [] as T;
    if (!res.ok) throw new Error(`OpenF1 request failed (${res.status}): ${path}`);

    await sleep(500);
    return res.json();
};

const toSafetyCarValue = (count: number): number => (count === 0 ? 0 : count <= 2 ? 1 : 2);

const run = async () => {
    const round = Number(process.argv[2]);
    if (!round) throw new Error("Usage: sync-results.ts <round number>");

    const supabase = createClient(
        process.env.NEXT_PUBLIC_SUPABASE_URL!,
        process.env.SUPABASE_SECRET_KEY!
    );

    const { data: race, error: raceError } = await supabase
        .from("races")
        .select("id, name, external_id, is_sprint")
        .eq("season", CHAMPIONSHIP_YEAR)
        .eq("round", round)
        .maybeSingle();
    if (raceError || !race) throw new Error(`Round ${round} not found in races`);

    const { data: drivers, error: driversError } = await supabase
        .from("drivers")
        .select("id, number, team_id");
    if (driversError || !drivers) throw new Error("Could not load the drivers");

    const driversByNumber = new Map(drivers.map((driver) => [driver.number, driver]));

    const sessions = await getJson<ApiSession[]>(`sessions?meeting_key=${race.external_id}`);
    const sessionKey = (name: string) =>
        sessions.find((session) => session.session_name === name)?.session_key;

    const rows: ResultRow[] = [];

    const addPositions = async (category: string, sessionName: string) => {
        const key = sessionKey(sessionName);
        if (!key) {
            console.warn(`No ${sessionName} session found`);
            return;
        }

        const results = await getJson<ApiResult[]>(`session_result?session_key=${key}`);
        const top = results.filter((result) => result.position !== null && result.position <= TOP);
        if (top.length !== TOP) {
            console.table(top.map((result) => ({ position: result.position, driver: result.driver_number })));
        }
        let added = 0;

        for (const result of top) {
            if (result.position === null || result.position > TOP) continue;

            const driver = driversByNumber.get(result.driver_number);
            if (!driver) {
                console.warn(`Driver #${result.driver_number} is not in the drivers table`);
                continue;
            }

            rows.push({
                race_id: race.id,
                category,
                position: result.position,
                driver_id: driver.id,
                team_id: driver.team_id,
                safety_car: null,
            });
            added++;
        }

        console.log(`${sessionName}: ${added} positions`);
    };

    await addPositions(BET_CATEGORIES.qualifying, "Qualifying");
    await addPositions(BET_CATEGORIES.race, "Race");
    if (race.is_sprint) await addPositions(BET_CATEGORIES.sprint, "Sprint");

    if (!rows.some((row) => row.category === BET_CATEGORIES.race)) {
        throw new Error("No race results yet, nothing was changed");
    }

    const raceKey = sessionKey("Race")!;

    const laps = await getJson<ApiLap[]>(`laps?session_key=${raceKey}`);
    let fastest: ApiLap | null = null;
    for (const lap of laps) {
        if (lap.lap_duration === null) continue;
        if (!fastest || lap.lap_duration < fastest.lap_duration!) fastest = lap;
    }

    const fastestDriver = fastest ? driversByNumber.get(fastest.driver_number) : null;
    if (fastest && fastestDriver) {
        rows.push({
            race_id: race.id,
            category: BET_CATEGORIES.fastestLap,
            position: null,
            driver_id: fastestDriver.id,
            team_id: fastestDriver.team_id,
            safety_car: null,
        });
        console.log(`Fastest lap: driver #${fastest.driver_number} (${fastest.lap_duration}s)`);
    } else {
        console.warn("Fastest lap not found");
    }

    const control = await getJson<ApiRaceControl[]>(
        `race_control?session_key=${raceKey}&category=SafetyCar`
    );
    console.log("Safety car messages:");
    control.forEach((item) => console.log(`  ${item.message}`));

    const deployments = control.filter(
        (item) => /DEPLOYED/i.test(item.message) && !/VIRTUAL|VSC/i.test(item.message)
    ).length;

    rows.push({
        race_id: race.id,
        category: BET_CATEGORIES.safetyCar,
        position: null,
        driver_id: null,
        team_id: null,
        safety_car: toSafetyCarValue(deployments),
    });
    console.log(`Safety car deployments counted: ${deployments}`);

    const managed = [
        BET_CATEGORIES.qualifying,
        BET_CATEGORIES.race,
        BET_CATEGORIES.sprint,
        BET_CATEGORIES.fastestLap,
        BET_CATEGORIES.safetyCar,
    ];

    const { error: deleteError } = await supabase
        .from("race_results")
        .delete()
        .eq("race_id", race.id)
        .in("category", managed);
    if (deleteError) throw deleteError;

    const { error: insertError } = await supabase.from("race_results").insert(rows);
    if (insertError) throw insertError;

    console.log(`Saved ${rows.length} result rows for ${race.name}`);
};

run().catch((error) => {
    console.error(error);
    process.exit(1);
});
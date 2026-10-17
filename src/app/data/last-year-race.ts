import { cacheLife } from "next/cache";
import { CHAMPIONSHIP_YEAR } from "../content/helper-values";
import { API_BASE } from "./api";

const LAST_YEAR = CHAMPIONSHIP_YEAR - 1;

interface ApiMeeting {
    meeting_key: number;
    is_cancelled: boolean;
}

interface ApiSession {
    session_key: number;
}

interface ApiResult {
    driver_number: number;
    position: number | null;
}

interface ApiDriver {
    driver_number: number;
    first_name: string;
    last_name: string;
    team_name: string;
}

interface ApiLap {
    driver_number: number;
    lap_duration: number | null;
}

interface ApiRaceControl {
    message: string;
}

export interface LastYearDriver {
    name: string;
    team: string;
}

export interface LastYearRace {
    year: number;
    podium: LastYearDriver[];
    fastestLap: (LastYearDriver & { time: string }) | null;
    safetyCars: number;
}

const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

// OpenF1 limits requests per second, so retry a few times on 429
const getJson = async <T>(path: string, attempt = 1): Promise<T> => {
    const res = await fetch(`${API_BASE}${path}`);

    if (res.status === 429 && attempt <= 5) {
        await sleep(1500 * attempt);
        return getJson<T>(path, attempt + 1);
    }

    if (res.status === 404) return [] as T;
    if (!res.ok) throw new Error(`OpenF1 request failed (${res.status}): ${path}`);

    return res.json();
};

const formatLapTime = (seconds: number): string => {
    const minutes = Math.floor(seconds / 60);
    const rest = (seconds - minutes * 60).toFixed(3).padStart(6, "0");
    return `${minutes}:${rest}`;
};

const fetchLastYearRace = async (circuitKey: number): Promise<LastYearRace | null> => {
    "use cache";
    cacheLife("days");

    const meetings = await getJson<ApiMeeting[]>(
        `meetings?year=${LAST_YEAR}&circuit_key=${circuitKey}`
    );
    const meeting = meetings.find((item) => !item.is_cancelled);
    if (!meeting) return null;

    const sessions = await getJson<ApiSession[]>(
        `sessions?meeting_key=${meeting.meeting_key}&session_name=Race`
    );
    const sessionKey = sessions[0]?.session_key;
    if (!sessionKey) return null;

    const results = await getJson<ApiResult[]>(`session_result?session_key=${sessionKey}`);
    const drivers = await getJson<ApiDriver[]>(`drivers?session_key=${sessionKey}`);
    const laps = await getJson<ApiLap[]>(`laps?session_key=${sessionKey}`);
    const control = await getJson<ApiRaceControl[]>(
        `race_control?session_key=${sessionKey}&category=SafetyCar`
    );

    const driverByNumber = new Map(drivers.map((driver) => [driver.driver_number, driver]));

    const toDriver = (driverNumber: number): LastYearDriver => {
        const driver = driverByNumber.get(driverNumber);
        return {
            name: driver ? `${driver.first_name} ${driver.last_name}` : `#${driverNumber}`,
            team: driver?.team_name ?? "",
        };
    };

    const podium = results
        .filter((result) => result.position !== null && result.position <= 3)
        .sort((a, b) => a.position! - b.position!)
        .map((result) => toDriver(result.driver_number));

    let fastest: ApiLap | null = null;
    for (const lap of laps) {
        if (lap.lap_duration === null) continue;
        if (!fastest || lap.lap_duration < fastest.lap_duration!) fastest = lap;
    }

    const safetyCars = control.filter(
        (item) => /DEPLOYED/i.test(item.message) && !/VIRTUAL|VSC/i.test(item.message)
    ).length;

    return {
        year: LAST_YEAR,
        podium,
        fastestLap: fastest
            ? { ...toDriver(fastest.driver_number), time: formatLapTime(fastest.lap_duration!) }
            : null,
        safetyCars,
    };
};

export const getLastYearRace = async (circuitKey: number): Promise<LastYearRace | null> => {
    try {
        return await fetchLastYearRace(circuitKey);
    } catch (error) {
        console.error(error);
        return null;
    }
};
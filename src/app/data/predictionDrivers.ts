import { CHAMPIONSHIP_YEAR } from "../content/helperValues";
import type { PredictionDriver } from "@/app/types/predictions";
import { API_BASE } from "./api";

const REVALIDATE_SECONDS = 3600;
const FALLBACK_COLOUR = "66748f";

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
    team_colour: string;
    name_acronym: string;
}

const uniqueDrivers = (drivers: PredictionDriver[]): PredictionDriver[] => {
    const seen = new Set<number>();

    return drivers.filter((driver) => {
        if (seen.has(driver.driverNumber)) return false;
        seen.add(driver.driverNumber);
        return true;
    });
};

const getJson = async <T>(path: string): Promise<T> => {
    const res = await fetch(`${API_BASE}${path}`, {
        next: { revalidate: REVALIDATE_SECONDS },
    });

    if (res.status === 404) return [] as T;
    if (!res.ok) throw new Error(`OpenF1 request failed (${res.status}): ${path}`);

    return res.json();
};

const mapDrivers = (drivers: ApiDriver[]): PredictionDriver[] =>
    uniqueDrivers(
        drivers
            .filter((driver) => driver.driver_number && driver.last_name)
            .map((driver) => ({
                driverNumber: driver.driver_number,
                name: `${driver.first_name} ${driver.last_name}`,
                team: driver.team_name,
                teamColour: driver.team_colour || FALLBACK_COLOUR,
                acronym: driver.name_acronym,
            }))
            .sort((a, b) => a.name.localeCompare(b.name))
    );

const getYearSessionDrivers = async (): Promise<PredictionDriver[]> => {
    const sessions = await getJson<ApiSession[]>(`sessions?year=${CHAMPIONSHIP_YEAR}`);
    const now = Date.now();
    const latest = [...sessions]
        .filter(
            (session) =>
                !session.is_cancelled && new Date(session.date_start).getTime() <= now
        )
        .sort(
            (a, b) =>
                new Date(b.date_start).getTime() - new Date(a.date_start).getTime()
        )[0];

    if (!latest) return [];

    const drivers = await getJson<ApiDriver[]>(
        `drivers?session_key=${latest.session_key}`
    );

    return mapDrivers(drivers);
};

export const getPredictionDrivers = async (): Promise<PredictionDriver[]> => {
    try {
        const yearDrivers = await getYearSessionDrivers();
        if (yearDrivers.length) return yearDrivers;

        const latestDrivers = await getJson<ApiDriver[]>(
            "drivers?session_key=latest"
        );

        return mapDrivers(latestDrivers);
    } catch (error) {
        console.error(error);
        return [];
    }
};

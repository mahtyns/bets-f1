import { API_BASE } from "./api";
import type {
    ChampionshipStandings,
    DriverStanding,
    TeamStanding,
} from "@/app/types/championship";

const YEAR = 2026;
const REVALIDATE_SECONDS = 3600;
const MAX_RACES_TO_TRY = 3;
const FALLBACK_COLOUR = "66748f";

interface ApiSession {
    session_key: number;
    date_end: string;
    is_cancelled: boolean;
}

interface ApiDriverChampionship {
    driver_number: number;
    points_current: number;
    position_current: number;
}

interface ApiTeamChampionship {
    team_name: string;
    points_current: number;
    position_current: number;
}

interface ApiDriver {
    driver_number: number;
    first_name: string;
    last_name: string;
    team_name: string;
    team_colour: string;
}

const getJson = async <T>(path: string): Promise<T> => {
    const res = await fetch(`${API_BASE}${path}`, {
        next: { revalidate: REVALIDATE_SECONDS },
    });

    if (res.status === 404) return [] as T;
    if (!res.ok) throw new Error(`OpenF1 request failed (${res.status}): ${path}`);

    return res.json();
};

const getFinishedRaceKeys = async (): Promise<number[]> => {
    const sessions = await getJson<ApiSession[]>(
        `sessions?year=${YEAR}&session_name=Race`
    );
    const now = Date.now();

    return sessions
        .filter((s) => !s.is_cancelled && new Date(s.date_end).getTime() < now)
        .sort((a, b) => new Date(b.date_end).getTime() - new Date(a.date_end).getTime())
        .map((s) => s.session_key);
};

const buildStandings = (
    driverRows: ApiDriverChampionship[],
    teamRows: ApiTeamChampionship[],
    drivers: ApiDriver[]
): ChampionshipStandings => {
    const driverInfo = new Map(drivers.map((d) => [d.driver_number, d]));
    const teamColours = new Map(drivers.map((d) => [d.team_name, d.team_colour]));

    const sortedDrivers = [...driverRows].sort(
        (a, b) => a.position_current - b.position_current
    );
    const sortedTeams = [...teamRows].sort(
        (a, b) => a.position_current - b.position_current
    );

    const leaderDriverPoints = sortedDrivers[0].points_current;
    const leaderTeamPoints = sortedTeams[0].points_current;

    const driverStandings: DriverStanding[] = sortedDrivers.map((row) => {
        const info = driverInfo.get(row.driver_number);

        return {
            position: row.position_current,
            driverNumber: row.driver_number,
            name: info ? `${info.first_name} ${info.last_name}` : `#${row.driver_number}`,
            team: info?.team_name ?? "",
            teamColour: info?.team_colour ?? FALLBACK_COLOUR,
            points: row.points_current,
            deltaToLeader: row.points_current - leaderDriverPoints,
        };
    });

    const teamStandings: TeamStanding[] = sortedTeams.map((row) => ({
        position: row.position_current,
        name: row.team_name,
        teamColour: teamColours.get(row.team_name) ?? FALLBACK_COLOUR,
        points: row.points_current,
        progress:
            leaderTeamPoints > 0
                ? Math.round((row.points_current / leaderTeamPoints) * 100)
                : 0,
    }));

    return { year: YEAR, drivers: driverStandings, teams: teamStandings };
};

export const getChampionshipStandings =
    async (): Promise<ChampionshipStandings | null> => {
        try {
            const raceKeys = (await getFinishedRaceKeys()).slice(0, MAX_RACES_TO_TRY);

            for (const sessionKey of raceKeys) {
                const driverRows = await getJson<ApiDriverChampionship[]>(
                    `championship_drivers?session_key=${sessionKey}`
                );
                const teamRows = await getJson<ApiTeamChampionship[]>(
                    `championship_teams?session_key=${sessionKey}`
                );

                if (driverRows.length === 0 || teamRows.length === 0) continue;

                const drivers = await getJson<ApiDriver[]>(
                    `drivers?session_key=${sessionKey}`
                );

                return buildStandings(driverRows, teamRows, drivers);
            }

            return null;
        } catch (error) {
            console.error(error);
            return null;
        }
    };
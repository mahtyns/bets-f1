import { cacheLife } from "next/cache";
import { CHAMPIONSHIP_YEAR } from "../content/helper-values";
import { getNextRace } from "./next-race";
import { API_BASE } from "./api";
import type { ApiMeeting } from '@/app/types/meetings'

interface LastYearRace {
    sessionKey: number
}

interface LastYearWinner {
    driverNumber: number
}



const lastYear = CHAMPIONSHIP_YEAR - 1

const upcomingRace = await getNextRace()

const upcomingRaceCircuitKey = upcomingRace?.circuitKey

const fetchLastYearRace = async (): Promise<LastYearRace | null> => {
    "use cache"
    cacheLife("hours")

    const res = await fetch(`${API_BASE}meetings?year=${lastYear}`);

    if (!res.ok) throw new Error(`OpenF1 meetings failed: ${res.status}`);

    const meetings: ApiMeeting[] = await res.json();

    const races = meetings
        .filter((m) => !m.is_cancelled && !/testing/i.test(m.meeting_name))
        .sort(
            (a, b) =>
                new Date(a.date_start).getTime() - new Date(b.date_start).getTime()
        );

    const lastYearRace = races.find((m) => m.circuit_key === upcomingRaceCircuitKey)

    if (!lastYearRace) return null

    return {
        sessionKey: lastYearRace.session_key
    };
}

export const fetchLastYearRaceWinner = async (): Promise<LastYearWinner | null> => {
    const lastYearSessionKey = await fetchLastYearRace()

    const res = await fetch(`${API_BASE}session_result?session_key=${lastYearSessionKey}&position=1`);

    if (!res.ok) throw new Error(`OpenF1 meetings failed: ${res.status}`);

    const winner = await res.json()

    return (
        {
            driverNumber: winner.driver_number
        }
    )
}
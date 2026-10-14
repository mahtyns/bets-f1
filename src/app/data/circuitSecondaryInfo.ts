import { cacheLife } from "next/cache";
import { API_SECONDARY } from "./api";
import { F1API_CIRCUIT_IDS } from "../content/circuitsIds";

interface ApiCircuit {
    circuitLength: number | null;
    lapRecord: string | null;
    firstParticipationYear: number | null;
    numberOfCorners: number | null;
    fastestLapDriverId: string | null;
    fastestLapTeamId: string | null;
    fastestLapYear: number | null;
}

export interface CircuitSecondaryInfo {
    corners: number | null;
    lengthKm: string | null;
    firstYear: number | null;
    lapRecord: { time: string; driver: string; team: string; year: number | null } | null;
}

const getJson = async <T>(url: string): Promise<T | null> => {
    const res = await fetch(url);
    return res.ok ? res.json() : null;
};

export const getCircuitSecondaryInfo = async (
    circuitKey: number
): Promise<CircuitSecondaryInfo | null> => {
    "use cache";
    cacheLife("days");

    const circuitId = F1API_CIRCUIT_IDS[circuitKey];
    if (!circuitId) return null;

    try {
        const circuitData = await getJson<{ circuit: ApiCircuit[] }>(
            `${API_SECONDARY}circuits/${circuitId}`
        );
        const circuit = circuitData?.circuit[0];
        if (!circuit) return null;

        const [driverData, teamData] = await Promise.all([
            circuit.fastestLapDriverId
                ? getJson<{ driver: { name: string; surname: string }[] }>(
                    `${API_SECONDARY}drivers/${circuit.fastestLapDriverId}`)
                : null,
            circuit.fastestLapTeamId
                ? getJson<{ team: { teamName: string }[] }>(
                    `${API_SECONDARY}teams/${circuit.fastestLapTeamId}`)
                : null,
        ]);

        const driver = driverData?.driver[0];
        const team = teamData?.team[0];

        return {
            corners: circuit.numberOfCorners,
            lengthKm: circuit.circuitLength ? (circuit.circuitLength / 1000).toFixed(3) : null,
            firstYear: circuit.firstParticipationYear,
            lapRecord: circuit.lapRecord
                ? {
                    time: circuit.lapRecord.replace(/:(\d{3})$/, ".$1"),
                    driver: driver ? `${driver.name} ${driver.surname}` : "",
                    team: team?.teamName ?? "",
                    year: circuit.fastestLapYear,
                }
                : null,
        };
    } catch (error) {
        console.error(error);
        return null;
    }
};
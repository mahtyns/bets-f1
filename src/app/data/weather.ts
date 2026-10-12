import { API_BASE } from "./api";

const REVALIDATE_SECONDS = 3600;

interface ApiSession {
    session_key: number;
}

interface ApiWeather {
    air_temperature: number;
    track_temperature: number;
    wind_speed: number;
    rainfall: number;
}

export interface RaceWeather {
    airTemp: number;
    trackTemp: number;
    windKmh: number;
    rain: boolean;
}

const average = (values: number[]) =>
    values.reduce((sum, value) => sum + value, 0) / values.length;

export const getRaceWeather = async (
    meetingKey: number
): Promise<RaceWeather | null> => {
    try {
        const sessionRes = await fetch(
            `${API_BASE}sessions?meeting_key=${meetingKey}&session_name=Race`,
            { next: { revalidate: REVALIDATE_SECONDS } }
        );

        if (!sessionRes.ok) return null;

        const sessions: ApiSession[] = await sessionRes.json();
        const session = sessions[0];

        if (!session) return null;

        const weatherRes = await fetch(
            `${API_BASE}weather?session_key=${session.session_key}`,
            { next: { revalidate: REVALIDATE_SECONDS } }
        );

        if (!weatherRes.ok) return null;

        const samples: ApiWeather[] = await weatherRes.json();

        if (samples.length === 0) return null;

        return {
            airTemp: Math.round(average(samples.map((s) => s.air_temperature))),
            trackTemp: Math.round(average(samples.map((s) => s.track_temperature))),
            windKmh: Math.round(average(samples.map((s) => s.wind_speed)) * 3.6),
            rain: samples.some((s) => Boolean(s.rainfall)),
        };
    } catch (error) {
        console.error(error);
        return null;
    }
};
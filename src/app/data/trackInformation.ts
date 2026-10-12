import { CHAMPIONSHIP_YEAR } from "../content/helperValues";
import { API_BASE } from "./api";

const REVALIDATE_SECONDS = 3600;

interface ApiTrackInformation {
    circuit_image: string;
    circuit_type: string;
    circuit_short_name: string;
    country_flag: string;
    meeting_official_name: string;
    meeting_name: string
}

export interface TrackInformation {
    image: string;
    type: string;
    name: string;
    flag: string;
    meetingName: string;
    meetingShort: string
}

export const getTrackInformation = async (
    circuitKey: number
): Promise<TrackInformation | null> => {
    try {
        const res = await fetch(
            `${API_BASE}meetings?year=${CHAMPIONSHIP_YEAR}&circuit_key=${circuitKey}`,
            { next: { revalidate: REVALIDATE_SECONDS } }
        );

        if (!res.ok) return null;

        const meetings: ApiTrackInformation[] = await res.json();
        const meeting = meetings[0];

        if (!meeting) return null;

        return {
            image: meeting.circuit_image,
            type: meeting.circuit_type,
            name: meeting.circuit_short_name,
            flag: meeting.country_flag,
            meetingName: meeting.meeting_official_name,
            meetingShort: meeting.meeting_name
        };
    } catch (error) {
        console.error(error);
        return null;
    }
};
export interface ApiMeeting {
    circuit_key: number;
    circuit_short_name: string;
    date_start: string;
    date_end: string,
    is_cancelled: boolean;
    meeting_name: string;
    meeting_key: number;
    session_key: number
}
import { getNextRace } from "@/app/data/nextRace";
import { getRaceWeekend } from "@/app/data/raceWeekend";
import { getTrackInformation } from "@/app/data/trackInformation";
import { getSessionCode } from "@/app/content/sessionCodes";
import { formatSessionDay, formatSessionTimes, formatTimeZoneLabel } from "@/app/utils/helpers/formatSessionTime";
import WeekendSchedule from "../organisms/weekend-schedule/WeekendSchedule";

export const RaceWeekendSchedule = async () => {
    const mainClass = "weekend-schedule";
    const nextRace = await getNextRace();

    const [track, sessions] = nextRace
        ? await Promise.all([
            getTrackInformation(nextRace.circuitKey),
            getRaceWeekend(nextRace.meetingKey),
        ])
        : [null, []];

    return (
        <section id="weekend-schedule" className={mainClass}>
            {track && sessions.length > 0 ? (
                <WeekendSchedule
                    mainClass={mainClass}
                    title={`${track.meetingShort} weekend schedule`}
                    timeZone={formatTimeZoneLabel(sessions[0].start)}
                    sessions={sessions.map((session) => ({
                        code: getSessionCode(session.name),
                        name: session.name,
                        day: formatSessionDay(session.start),
                        time: formatSessionTimes(session.start, session.end),
                    }))}
                />
            ) : (
                <p>Weekend schedule is not available yet.</p>
            )}
        </section>
    )
}
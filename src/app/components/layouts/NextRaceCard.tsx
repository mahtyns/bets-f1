// layouts/NextRace.tsx
import { getNextRace } from "@/app/data/nextRace";
import NextRaceHeader from "../organisms/next-race/NextRaceHeader";
import TrackLayoutCard from "../molecules/next-race/TrackLayoutCard";
import { getTrackInformation } from "@/app/data/trackInformation";
import { formatRaceDays } from "@/app/utils/helpers/formatRaceDays";

export const NextRace = async () => {

    const mainClass = "next-race-info"
    const nextRace = await getNextRace();
    const track = nextRace ? await getTrackInformation(nextRace.circuitKey) : null;

    return (
        <section id="next-race-info" className={mainClass}>
            {nextRace && track ? (
                <>
                    <NextRaceHeader
                        mainClass={mainClass}
                        round={nextRace.round}
                        totalRounds={nextRace.totalRounds}
                        dateRange={formatRaceDays(track.start, track.end)}
                        flag={track.flag}
                        title={track.meetingName}
                        subtitle={`${track.name} • ${track.country}`}
                    />
                    <TrackLayoutCard
                        mainClass={mainClass}
                        image={track.image}
                        name={track.name}
                        type={track.type}
                    />
                </>
            ) : (
                <p>Next race information is not available yet.</p>
            )}
        </section>
    )
}
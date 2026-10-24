import { getNextRace } from "@/app/data/next-race";
import { getCircuitSecondaryInfo } from "@/app/data/circuit-secondary-info";
import { getRaceInfoCards } from "@/app/utils/helpers/raceInfoCards";
import NextRaceHeader from "../organisms/next-race/NextRaceHeader";
import { NextRaceInfoCards } from "../organisms/next-race/NextRaceInfoCards";
import TrackLayoutCard from "../molecules/next-race/TrackLayoutCard";
import { getTrackInformation } from "@/app/data/track-information";
import { formatRaceDays } from "@/app/utils/helpers/formatRaceDays";
import { RaceWeekendSchedule } from "./RaceWeekendSchedule";

export const NextRace = async () => {

    const mainClass = "next-race-info"
    const nextRace = await getNextRace();
    const [track, circuitInfo] = nextRace
        ? await Promise.all([
            getTrackInformation(nextRace.circuitKey),
            getCircuitSecondaryInfo(nextRace.circuitKey),
        ])
        : [null, null];
    const cards = getRaceInfoCards(circuitInfo);


    return (
        <section id="next-race-info" className={mainClass}>
            {nextRace && track ? (
                <>
                    <div className={`${mainClass}__content--left`}>
                        <NextRaceHeader
                            mainClass={mainClass}
                            round={nextRace.round}
                            totalRounds={nextRace.totalRounds}
                            dateRange={formatRaceDays(track.start, track.end)}
                            flag={track.flag}
                            title={track.meetingName}
                            subtitle={`${track.name} • ${track.country}`}
                        />
                        <div className={`${mainClass}__overview`}>
                            <TrackLayoutCard
                                mainClass={mainClass}
                                image={track.image}
                                name={track.name}
                                type={track.type}
                            />
                            <NextRaceInfoCards mainClass={mainClass} cards={cards} />
                        </div>
                    </div>
                    <div className={`${mainClass}__content--right`}>
                        <RaceWeekendSchedule />
                    </div>
                </>
            ) : (
                <p>Next race information is not available yet.</p>
            )}
        </section>
    )
}
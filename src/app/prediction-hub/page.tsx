import { SecondaryPageHeading } from "../components/layouts/SecondaryPageHeading";
import PredictionHub from "../components/layouts/prediction-hub/PredictionHub";
import { CHAMPIONSHIP_YEAR } from "../content/helper-values";
import { predictionHubContent } from "../content/prediction-hub";
import { getNextRace } from "../data/next-race";
import { getPredictionDrivers } from "../data/prediction-drivers";
import { getTrackInformation } from "../data/track-information";
import styles from "./../page.module.css";
import RaceWeekGate from "../components/layouts/RaceWeekGate";
import { getCurrentRace } from "../data/current-race";
import { getUserBet } from "../data/user-bet";
import { PredictionHubLocked } from "../components/layouts/prediction-hub/PredictionHubLocked";
import { PredictionHubIdle } from "../components/layouts/prediction-hub/PredictionHubIdle";

export default async function PredictionHubPage() {
    const [nextRace] = await Promise.all([
        getNextRace(),
    ]);
    const [drivers, currentRace] = await Promise.all([
        getPredictionDrivers(),
        getCurrentRace(),
    ]);
    const initialBet = currentRace ? await getUserBet(currentRace.id) : null;
    const track = nextRace ? await getTrackInformation(nextRace.circuitKey) : null;
    const pageFullTitle = track
        ? `${CHAMPIONSHIP_YEAR} ${track.name} ${predictionHubContent.mainTitle}`
        : predictionHubContent.mainTitle;

    return (
        <div className={styles.page}>
            <main className="predictions">
                {nextRace && track ? (
                    <SecondaryPageHeading
                        titleText={pageFullTitle}
                        roundNumber={nextRace.round}
                        trackName={track.meetingShort}
                        trackType={track.type}
                        flag={track.flag}
                    />
                ) : (
                    <section>
                        <h1 className="title-h1">{predictionHubContent.mainTitle}</h1>
                    </section>
                )}
                <RaceWeekGate
                    open={<PredictionHub drivers={drivers} hasSprint={currentRace?.isSprint ?? false} raceId={currentRace?.id ?? null} initialBet={initialBet} />}
                    locked={<PredictionHubLocked />}
                    idle={<PredictionHubIdle />}
                />
            </main>
        </div>
    );
}

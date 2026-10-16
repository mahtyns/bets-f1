import { SecondaryPageHeading } from "../components/layouts/SecondaryPageHeading";
import PredictionHub from "../components/layouts/PredictionHub";
import { CHAMPIONSHIP_YEAR } from "../content/helperValues";
import { predictionHubContent } from "../content/prediction-hub";
import { getNextRace } from "../data/nextRace";
import { getPredictionDrivers } from "../data/predictionDrivers";
import { getTrackInformation } from "../data/trackInformation";
import styles from "./../page.module.css";
import RaceWeekGate from "../components/layouts/RaceWeekGate";
import { getCurrentRace } from "../data/currentRace";

export default async function PredictionHubPage() {
    const [nextRace] = await Promise.all([
        getNextRace(),
    ]);
    const [drivers, currentRace] = await Promise.all([
        getPredictionDrivers(),
        getCurrentRace(),
    ]);
    const track = nextRace ? await getTrackInformation(nextRace.circuitKey) : null;
    const pageFullTitle = track
        ? `${CHAMPIONSHIP_YEAR} ${track.name} ${predictionHubContent.mainTitle}`
        : predictionHubContent.mainTitle;

    return (
        <div className={styles.page}>
            <main>
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
                    open={<PredictionHub drivers={drivers} hasSprint={currentRace?.isSprint ?? false} />}
                    locked={<PredictionHub drivers={drivers} hasSprint={currentRace?.isSprint ?? false} />}
                    idle={<PredictionHub drivers={drivers} hasSprint={currentRace?.isSprint ?? false} />}
                />
            </main>
        </div>
    );
}

import { SecondaryPageHeading } from "../components/layouts/SecondaryPageHeading";
import PredictionHub from "../components/layouts/prediction-hub/PredictionHub";
import { CHAMPIONSHIP_YEAR } from "../content/helper-values";
import { predictionHubContent } from "../content/prediction-hub";
import { getNextRace } from "../data/next-race";
import { getPredictionDrivers } from "../data/prediction-drivers";
import { getTrackInformation } from "../data/track-information";
import RaceWeekGate from "../components/layouts/RaceWeekGate";
import { getCurrentRace } from "../data/current-race";
import { getUserBet } from "../data/user-bet";
import { PredictionHubLocked } from "../components/layouts/prediction-hub/PredictionHubLocked";
import { getSessionUserId } from "../lib/session";
import { getLastYearRace } from "../data/last-year-race";
import { getLastRound } from "../data/last-round";
import { getRaceBets } from "../data/race-bets";
import { PredictionHubIdle } from "../components/layouts/prediction-hub/PredictionHubIdle";
import { getBetsWindow } from "../data/bets-window";
import AuthGate from "../components/layouts/AuthGate";
import Login from "../components/layouts/Login";

export default async function PredictionHubPage() {
    const nextRace = await getNextRace();

    const [betsWindow, userId, track] = await Promise.all([
        nextRace ? getBetsWindow(nextRace.meetingKey) : null,
        getSessionUserId(),
        nextRace ? getTrackInformation(nextRace.circuitKey) : null,
    ]);

    const now = Date.now();
    const phase =
        !betsWindow || now < new Date(betsWindow.opensAt).getTime()
            ? "idle"
            : now < new Date(betsWindow.locksAt).getTime()
                ? "open"
                : "locked";

    const [drivers, currentRace, lastYear, lastRound, bets] = await Promise.all([
        phase === "open" ? getPredictionDrivers() : [],
        phase === "open" ? getCurrentRace() : null,
        phase === "idle" && nextRace ? getLastYearRace(nextRace.circuitKey) : null,
        phase === "idle" ? getLastRound(userId) : null,
        phase === "locked" && nextRace ? getRaceBets(nextRace.meetingKey) : [],
    ]);

    const initialBet = currentRace ? await getUserBet(currentRace.id) : null;
    const myBet = bets.find((bet) => bet.userId === String(userId))?.summary ?? null;

    const pageFullTitle = track
        ? `${CHAMPIONSHIP_YEAR} ${track.name} ${predictionHubContent.mainTitle}`
        : predictionHubContent.mainTitle;

    return (
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
            <AuthGate
                loggedIn={<RaceWeekGate
                    open={<PredictionHub drivers={drivers} hasSprint={currentRace?.isSprint ?? false} raceId={currentRace?.id ?? null} initialBet={initialBet} />}
                    locked={<PredictionHubLocked bets={bets} myBet={myBet} userId={userId} />}
                    idle={<PredictionHubIdle lastRound={lastRound} lastYear={lastYear} trackName={track?.meetingShort} />}
                />}
                loggedOut={<Login />} />
        </main>
    );
}

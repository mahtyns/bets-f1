import { CHAMPIONSHIP_YEAR } from "@/app/content/helper-values";
import { predictionHubContent } from "@/app/content/prediction-hub";
import { getBetsWindow } from "@/app/data/bets-window";
import { getCurrentRace } from "@/app/data/current-race";
import { getLastRound } from "@/app/data/last-round";
import { getLastYearRace } from "@/app/data/last-year-race";
import { getNextRace } from "@/app/data/next-race";
import { getPredictionDrivers } from "@/app/data/prediction-drivers";
import { getRaceBets } from "@/app/data/race-bets";
import { getTrackInformation } from "@/app/data/track-information";
import { getUserBet } from "@/app/data/user-bet";
import { getSessionUserId } from "@/app/lib/session";
import AuthGate from "../layouts/AuthGate";
import RaceWeekGate from "../layouts/RaceWeekGate";
import PredictionHub from "../layouts/prediction-hub/PredictionHub";
import { PredictionHubLocked } from "../layouts/prediction-hub/PredictionHubLocked";
import { PredictionHubIdle } from "../layouts/prediction-hub/PredictionHubIdle";
import Login from "../layouts/Login";
import { SecondaryPageHeading } from "../layouts/SecondaryPageHeading";
import Title from "../atoms/Title";

export const PredictionHubContent = async () => {
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
        <>
            {nextRace && track ? (
                <SecondaryPageHeading
                    titleText={pageFullTitle}
                    roundNumber={nextRace.round}
                    trackName={track.meetingShort}
                    trackType={track.type}
                    flag={track.flag}
                />
            ) : (
                <section className="prediction-hub-heading">
                    <Title isH1={true} title="Prediction hub" />
                </section>
            )}
            <AuthGate
                loggedIn={<RaceWeekGate
                    open={<PredictionHub drivers={drivers} hasSprint={currentRace?.isSprint ?? false} raceId={currentRace?.id ?? null} initialBet={initialBet} />}
                    locked={<PredictionHubLocked bets={bets} myBet={myBet} userId={userId} />}
                    idle={<PredictionHubIdle lastRound={lastRound} lastYear={lastYear} trackName={track?.meetingShort} />}
                />}
                loggedOut={<Login />} /></>
    )
}

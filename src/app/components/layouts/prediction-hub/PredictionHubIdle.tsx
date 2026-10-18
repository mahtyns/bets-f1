import type { LastRound } from "@/app/data/last-round";
import type { LastYearRace } from "@/app/data/last-year-race";
import Title from "../../atoms/Title";
import { PredictionIdleCountdown } from "../../organisms/prediction-hub/PredictionIdleCountdown";
import { PredictionIdleLastYear } from "../../organisms/prediction-hub/PredictionIdleLastYear";
import { PredictionIdleResults } from "../../organisms/prediction-hub/PredictionIdleResults";
import AuthGate from "../AuthGate";
import Login from "../Login";

interface PredictionHubIdleProps {
    lastRound: LastRound | null;
    lastYear: LastYearRace | null;
    trackName: string | undefined;
}

export const PredictionHubIdle = (props: PredictionHubIdleProps) => {
    return (
        <>
            <PredictionIdleCountdown />
            <AuthGate
                loggedIn={<PredictionIdleResults lastRound={props.lastRound} />}
                loggedOut={<div>
                    <Title isH1={false} title="Log in to see your results" />
                    <Login />
                </div>} />
            <PredictionIdleLastYear race={props.lastYear} trackName={props.trackName} />
        </>
    )
}
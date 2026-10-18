import type { BetSummary } from "@/app/data/bet-summary";
import type { PlayerBet } from "@/app/data/race-bets";
import Title from "../../atoms/Title";
import { PredictionLockedOpener } from "../../organisms/prediction-hub/PredictionLockedOpener";
import { PredictionLockedResults } from "../../organisms/prediction-hub/PredictionLockedResults";
import { PredictionLockedStats } from "../../organisms/prediction-hub/PredictionLockedStats";
import AuthGate from "../AuthGate";
import Login from "../Login";

interface PredictionHubLockedProps {
    bets: PlayerBet[];
    myBet: BetSummary | null;
}

export const PredictionHubLocked = (props: PredictionHubLockedProps) => {
    return (
        <>
            <PredictionLockedOpener />
            <AuthGate
                loggedIn={<PredictionLockedResults bet={props.myBet} />}
                loggedOut={<div>
                    <Title isH1={false} title="Log in to see your bets" />
                    <Login />
                </div>} />
            <PredictionLockedStats bets={props.bets} />
        </>
    )
}
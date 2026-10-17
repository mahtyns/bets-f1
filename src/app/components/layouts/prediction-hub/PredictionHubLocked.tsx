import type { PlayerBet } from "@/app/data/race-bets";
import { PredictionLockedOpener } from "../../organisms/prediction-hub/PredictionLockedOpener";
import { PredictionLockedResults } from "../../organisms/prediction-hub/PredictionLockedResults";
import { PredictionLockedStats } from "../../organisms/prediction-hub/PredictionLockedStats";

interface PredictionHubLockedProps {
    bets: PlayerBet[];
}

export const PredictionHubLocked = (props: PredictionHubLockedProps) => {
    return (
        <>
            <PredictionLockedOpener />
            <PredictionLockedResults bets={props.bets} />
            <PredictionLockedStats />
        </>
    )
}
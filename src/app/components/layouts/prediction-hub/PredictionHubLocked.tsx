import { PredictionLockedOpener } from "../../organisms/prediction-hub/PredictionLockedOpener";
import { PredictionLockedResults } from "../../organisms/prediction-hub/PredictionLockedResults";
import { PredictionLockedStats } from "../../organisms/prediction-hub/PredictionLockedStats";

export const PredictionHubLocked = () => {
    return (
        <>
            <PredictionLockedOpener />
            <PredictionLockedResults />
            <PredictionLockedStats />
        </>
    )
}

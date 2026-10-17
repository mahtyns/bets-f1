import { PredictionIdleCountdown } from "../../organisms/prediction-hub/PredictionIdleCountdown";
import { PredictionIdleLastYear } from "../../organisms/prediction-hub/PredictionIdleLastYear";
import { PredictionIdleResults } from "../../organisms/prediction-hub/PredictionIdleResults";

export const PredictionHubIdle = () => {
    return (
        <>
            <PredictionIdleCountdown />
            <PredictionIdleResults />
            <PredictionIdleLastYear />
        </>
    )
}

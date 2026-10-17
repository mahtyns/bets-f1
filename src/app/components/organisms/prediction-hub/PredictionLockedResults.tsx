import Title from "../../atoms/Title";
import { ResultsCardMain } from "../../molecules/prediction-hub/ResultsCardMain";

export const PredictionLockedResults = () => {
    return (
        <section id="prediction-hub-bet">
            <Title isH1={false} title="Your bets" />
            <div className="prediction-hub--results">
                <ResultsCardMain />
            </div>
        </section>
    )
}

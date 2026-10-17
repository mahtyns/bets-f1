import Title from "../../atoms/Title";
import { ResultsCardMain } from "../../molecules/prediction-hub/ResultsCardMain";

export const PredictionIdleLastYear = () => {
    return (
        <section id="prediction-hub-last-year">
            <Title isH1={false} title="Check how last year went" />
            <div>
                <div className="prediction-hub--results">
                    <ResultsCardMain />
                </div>
            </div>
        </section>
    )
}

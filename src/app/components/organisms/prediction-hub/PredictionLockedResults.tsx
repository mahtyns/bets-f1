import type { BetSummary } from "@/app/data/bet-summary";
import Title from "../../atoms/Title";
import BetSummaryList from "../../molecules/prediction-hub/BetSummaryList";

interface PredictionLockedResultsProps {
    bet: BetSummary | null;
}

export const PredictionLockedResults = (props: PredictionLockedResultsProps) => {
    const mainClass = "prediction-hub";

    return (
        <section id="prediction-hub-bet">
            <Title isH1={false} title="Your predictions" />
            {props.bet ? (
                <article className={`${mainClass}__module`}>
                    <BetSummaryList mainClass={mainClass} summary={props.bet} />
                </article>
            ) : (
                <p>You did not place a bet for this race.</p>
            )}
        </section>
    );
};
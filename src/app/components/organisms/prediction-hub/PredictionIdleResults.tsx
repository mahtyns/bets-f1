import type { LastRound } from "@/app/data/last-round";
import Title from "../../atoms/Title";
import BetSummaryList from "../../molecules/prediction-hub/BetSummaryList";

interface PredictionIdleResultsProps {
    lastRound: LastRound | null;
}

export const PredictionIdleResults = (props: PredictionIdleResultsProps) => {
    const mainClass = "prediction-hub";
    const { lastRound } = props;

    return (
        <section id="prediction-hub-results">
            <Title isH1={false} title="Review your last results" />
            {!lastRound ? (
                <p>There are no finished races yet.</p>
            ) : !lastRound.bet ? (
                <p>You did not play the last round ({lastRound.raceName}).</p>
            ) : (
                <>
                    <p className={`${mainClass}__results-total`}>
                        {lastRound.raceName} ·{" "}
                        {lastRound.points !== null
                            ? `${lastRound.points} pts`
                            : "Points not calculated yet"}
                    </p>
                    <div className={`${mainClass}__results`}>
                        <article className={`${mainClass}__module`}>
                            <Title isH1={false} title="Your bets" />
                            <BetSummaryList mainClass={mainClass} summary={lastRound.bet} />
                        </article>
                        {lastRound.result ? (
                            <article className={`${mainClass}__module`}>
                                <Title isH1={false} title="Result" />
                                <BetSummaryList mainClass={mainClass} summary={lastRound.result} />
                            </article>
                        ) : (
                            <p>The official results are not in yet.</p>
                        )}
                    </div>
                </>
            )}
        </section>
    );
};
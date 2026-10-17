import type { PlayerBet } from "@/app/data/race-bets";
import Title from "../../atoms/Title";
import PlayerCell from "../../molecules/PlayerCell";
import BetSummaryList from "../../molecules/prediction-hub/BetSummaryList";

interface PredictionLockedResultsProps {
    bets: PlayerBet[];
}

export const PredictionLockedResults = (props: PredictionLockedResultsProps) => {
    const mainClass = "prediction-hub";

    return (
        <section id="prediction-hub-bet">
            <Title isH1={false} title="Everyone's bets" />
            {props.bets.length === 0 ? (
                <p>No bets were placed for this race.</p>
            ) : (
                <div className={`${mainClass}__results`}>
                    {props.bets.map((bet) => (
                        <article key={bet.userId} className={`${mainClass}__module`}>
                            <PlayerCell
                                mainClass={mainClass}
                                name={bet.name}
                                team={bet.team}
                                avatarId={bet.avatarId}
                            />
                            <BetSummaryList mainClass={mainClass} summary={bet.summary} />
                        </article>
                    ))}
                </div>
            )}
        </section>
    );
};
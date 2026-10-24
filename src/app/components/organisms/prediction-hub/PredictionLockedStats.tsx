import type { PlayerBet } from "@/app/data/race-bets";
import { Subtitle } from "../../atoms/Subtitle";
import Title from "../../atoms/Title";
import LockedStatCard from "../../molecules/prediction-hub/LockedStatsCard";
import { getBetStats, joinNames, type TopVote, type SafetyCarPrediction } from "@/app/content/bet-stats";

interface PredictionLockedStatsProps {
    bets: PlayerBet[];
}

const mainClass = "prediction-hub";
const podiumAreas = ["p1", "p2", "p3"] as const;

const voteName = (vote: TopVote): string =>
    vote.names.length > 0 ? vote.names.join(" vs ") : "No picks";

const votePercent = (vote: TopVote): string | undefined =>
    vote.percent !== null ? `${vote.percent}% of the votes` : undefined;

const safetyCarText = (prediction: SafetyCarPrediction): string => {
    const verb = prediction.players.length === 1 ? "predicts" : "predict";
    const who = joinNames(prediction.players);

    return prediction.atLeast === 1
        ? `${who} ${verb} the safety car will be out at least 1 time.`
        : `${who} ${verb} the safety car will be out at least 3 times!`;
};

export const PredictionLockedStats = (props: PredictionLockedStatsProps) => {

    const stats = getBetStats(props.bets);
    const safety = stats.safetyCar;

    return (
        <section id="prediction-hub-stats">
            <Title isH1={false} title="What they say in the paddock" />
            <Subtitle isH3={true} title="Predicted results from your friends" />
            <div className={`${mainClass}__stats${safety ? "" : ` ${mainClass}__stats--no-safety`}`}>
                <LockedStatCard
                    mainClass={mainClass}
                    area="winner"
                    title="Predicted winner"
                    text={`🥇 ${voteName(stats.winner)}`}
                    detail={votePercent(stats.winner)}
                />
                {stats.podium.map((vote, index) => (
                    <LockedStatCard
                        key={podiumAreas[index]}
                        mainClass={mainClass}
                        area={podiumAreas[index]}
                        title={`Podium P${index + 1}`}
                        text={voteName(vote)}
                        detail={votePercent(vote)}
                    />
                ))}
                <LockedStatCard
                    mainClass={mainClass}
                    area="fastest"
                    title="Fastest lap"
                    text={voteName(stats.fastestLap)}
                    detail={votePercent(stats.fastestLap)}
                />
                <LockedStatCard
                    mainClass={mainClass}
                    area="dotd"
                    title="Driver of the day"
                    text={voteName(stats.driverOfTheDay)}
                    detail={votePercent(stats.driverOfTheDay)}
                />
                {safety && (
                    <LockedStatCard
                        mainClass={mainClass}
                        area="safety"
                        title="Inchidents on the race!"
                        detail={safetyCarText(safety)}
                    />
                )}
            </div>
        </section>
    );
};
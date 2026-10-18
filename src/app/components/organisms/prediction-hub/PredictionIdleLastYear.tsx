import type { LastYearRace } from "@/app/data/last-year-race";
import Title from "../../atoms/Title";
import { ResultsCardMain } from "../../molecules/prediction-hub/ResultsCardMain";
import { Subtitle } from "../../atoms/Subtitle";
import { CHAMPIONSHIP_YEAR } from "@/app/content/helper-values";

const lastYear = CHAMPIONSHIP_YEAR - 1;
interface PredictionIdleLastYearProps {
    race: LastYearRace | null;
    trackName: string | undefined
}

export const PredictionIdleLastYear = (props: PredictionIdleLastYearProps) => {
    const { race } = props;

    return (
        <section id="prediction-hub-last-year">
            <Title isH1={false} title="Check how last year went" />
            <Subtitle isH3={false} title={`Results for ${props.trackName} in ${lastYear}`} />
            {race && race.podium.length > 0 ? (
                <div className="prediction-hub__results">
                    {race.podium.map((driver, index) => (
                        <ResultsCardMain
                            key={driver.name}
                            title={index === 0 ? "Winner" : `P${index + 1}`}
                            name={driver.name}
                            team={driver.team}
                        />
                    ))}
                    {race.fastestLap && (
                        <ResultsCardMain
                            title="Fastest lap"
                            name={race.fastestLap.name}
                            team={race.fastestLap.team}
                            detail={race.fastestLap.time}
                        />
                    )}
                    <ResultsCardMain
                        title="Safety cars"
                        name={String(race.safetyCars)}
                        detail="full deployments"
                    />
                </div>
            ) : (
                <p>No data from last year for this circuit.</p>
            )}
        </section>
    );
};
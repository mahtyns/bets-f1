import { getRoundsOverview } from "@/app/data/rounds";
import { getRaceWeather } from "@/app/data/weather";
import RoundsHeader from "../organisms/upcoming-races/RoundHeader";
import RoundCard from "../organisms/upcoming-races/RoundCard";


export const UpcomingRounds = async () => {

    const mainClass = "upcoming-rounds"
    const rounds = await getRoundsOverview();
    const weather = await Promise.all(
        rounds.map((round) =>
            round.status === 'completed' ? getRaceWeather(round.meetingKey) : null
        )
    );

    return (
        <section id="upcoming-rounds" className={mainClass}>
            {rounds.length > 0 ? (
                <>
                    <RoundsHeader
                        mainClass={mainClass}
                        firstRound={rounds[0].round}
                        lastRound={rounds[rounds.length - 1].round}
                    />
                    <div className={`${mainClass}__cards`}>
                        {rounds.map((round, index) => (
                            <RoundCard
                                key={round.meetingKey}
                                mainClass={mainClass}
                                round={round}
                                weather={weather[index]}
                            />
                        ))}
                    </div>
                </>
            ) : (
                <p>Upcoming rounds are not available yet.</p>
            )}
        </section>
    )
}
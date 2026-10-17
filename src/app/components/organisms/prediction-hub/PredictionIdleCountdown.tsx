"use client"
import Countdown from "../../atoms/Countdown";
import { Subtitle } from "../../atoms/Subtitle";
import Text from "../../atoms/Text";
import Title from "../../atoms/Title";
import { useNextRace } from "@/app/context/NextRaceContext";

export const PredictionIdleCountdown = () => {
    const { nextRace, betsOpensAt } = useNextRace();

    if (!nextRace || !betsOpensAt) return null;

    return (
        <section id="prediction-hub-countdown" className="prediction-hub-countdown">
            <Title isH1={false} title="Race weekend is coming soon!" />
            <Subtitle isH3={true} title="Are you ready?" />
            <div className="countdown__container">
                <Text variant="primary" text="Pool opens in:" />
                <span className="countdown"><Countdown targetDate={betsOpensAt} /></span>
            </div>
        </section>
    )
}

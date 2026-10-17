"use client"
import { fetchLastYearRaceWinner } from "@/app/data/lastYearRace";
import { Subtitle } from "../../atoms/Subtitle";

export const ResultsCardMain = () => {
    return (
        <div className="prediction-hub-winner">
            <Subtitle isH3={false} title="Winner" />
            <p className="winner-name">Leclerc</p>
            <p>#16</p>
            <p>Ferrari</p>
        </div>
    )
}

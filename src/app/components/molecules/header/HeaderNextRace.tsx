"use client";

import { useNextRace } from "@/app/context/NextRaceContext";
import Countdown from "../../atoms/Countdown";

const HeaderNextRace = ({ text, opens }: { text: string; opens: string }) => {
    const { nextRace, betsOpensAt } = useNextRace();

    if (!nextRace || !betsOpensAt) return null;

    return (
        <div className="next-race">
            <p>{text}</p>
            <p className="next-race__name">{nextRace.circuit}</p>
            <p>{opens} <span><Countdown targetDate={betsOpensAt} /></span></p>
        </div>
    );
};

export default HeaderNextRace;
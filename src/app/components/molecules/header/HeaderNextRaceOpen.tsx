"use client";

import { useNextRace } from "@/app/context/NextRaceContext";
import Countdown from "../../atoms/Countdown";

const HeaderNextRaceOpen = ({ text, opens }: { text: string; opens: string }) => {
    const { nextRace, betsClosesAt } = useNextRace();

    if (!nextRace || !betsClosesAt) return null;

    return (
        <div className="next-race next-race--locked">
            <p>{text} <span className="next-race__name">{nextRace.circuit}</span></p>
            <p>{opens} <span><Countdown targetDate={betsClosesAt} /></span></p>
        </div>
    );
};

export default HeaderNextRaceOpen;
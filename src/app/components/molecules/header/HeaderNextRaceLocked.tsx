"use client";

import { useNextRace } from "@/app/context/NextRaceContext";

const HeaderNextRaceLocked = ({ text }: { text: string; }) => {
    const { nextRace, betsClosesAt } = useNextRace();

    if (!nextRace || !betsClosesAt) return null;

    return (
        <div className="next-race next-race--locked">
            <p>{text} <span className="next-race__name">{nextRace.circuit}</span></p>
        </div>
    );
};

export default HeaderNextRaceLocked;
"use client";

import { ReactNode, useEffect, useState } from "react";
import { useNextRace } from "@/app/context/NextRaceContext";

type Phase = "open" | "locked" | "idle";

interface RaceWeekGateProps {
    open: ReactNode;
    locked: ReactNode;
    idle: ReactNode;
}

const RaceWeekGate = ({ open, locked, idle }: RaceWeekGateProps) => {
    const { betsOpensAt, betsClosesAt } = useNextRace();
    const [phase, setPhase] = useState<Phase | null>(null);

    useEffect(() => {
        if (!betsOpensAt || !betsClosesAt) return;

        const opensAt = new Date(betsOpensAt).getTime();
        const closesAt = new Date(betsClosesAt).getTime();

        const update = () => {
            const now = Date.now();
            setPhase(now < opensAt ? "idle" : now < closesAt ? "open" : "locked");
        };

        const timeout = setTimeout(update, 0);
        const interval = setInterval(update, 1000);

        return () => {
            clearTimeout(timeout);
            clearInterval(interval);
        };
    }, [betsOpensAt, betsClosesAt]);

    if (!betsOpensAt) return idle;
    if (phase === null) return null;

    return phase === "open" ? open : phase === "locked" ? locked : idle;
};

export default RaceWeekGate;
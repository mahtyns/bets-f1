"use client";

import { createContext, useContext } from "react";
import { NextRace } from "@/app/data/next-race";

interface NextRaceState {
    nextRace: NextRace | null;
    betsOpensAt: string | null;
    betsClosesAt: string | null;
}

const NextRaceContext = createContext<NextRaceState | null>(null);

export const NextRaceProvider = ({
    value,
    children,
}: {
    value: NextRaceState;
    children: React.ReactNode;
}) => <NextRaceContext.Provider value={value}>{children}</NextRaceContext.Provider>;

export const useNextRace = () => {
    const ctx = useContext(NextRaceContext);
    if (!ctx) throw new Error("useNextRace must be used inside NextRaceProvider");
    return ctx;
};
import type { PlayerBet } from "@/app/data/race-bets";

export interface TopVote {
    names: string[];
    percent: number | null;
}

export interface SafetyCarPrediction {
    players: string[];
    atLeast: 1 | 3;
}

export interface BetStats {
    winner: TopVote;
    podium: TopVote[];
    fastestLap: TopVote;
    driverOfTheDay: TopVote;
    safetyCar: SafetyCarPrediction | null;
}

const PODIUM_SIZE = 3;

const topVote = (votes: (string | null)[]): TopVote => {
    const picked = votes.filter((vote): vote is string => vote !== null);
    if (picked.length === 0) return { names: [], percent: null };

    const counts = new Map<string, number>();
    picked.forEach((name) => counts.set(name, (counts.get(name) ?? 0) + 1));

    const max = Math.max(...counts.values());
    const names = [...counts.entries()]
        .filter(([, count]) => count === max)
        .map(([name]) => name);

    return {
        names,
        percent: names.length === 1 ? Math.round((max / picked.length) * 100) : null,
    };
};

export const joinNames = (names: string[]): string =>
    names.length <= 1
        ? names.join("")
        : `${names.slice(0, -1).join(", ")} and ${names[names.length - 1]}`;

export const getBetStats = (bets: PlayerBet[]): BetStats => {
    const raceVotes = (index: number) => bets.map((bet) => bet.summary.race[index] ?? null);

    const safetyCarPlayers = bets.filter(
        (bet) => bet.summary.safetyCar === "1-2" || bet.summary.safetyCar === "3+"
    );

    return {
        winner: topVote(raceVotes(0)),
        podium: Array.from({ length: PODIUM_SIZE }, (_, index) => topVote(raceVotes(index))),
        fastestLap: topVote(bets.map((bet) => bet.summary.fastestLap)),
        driverOfTheDay: topVote(bets.map((bet) => bet.summary.driverOfTheDay)),
        safetyCar:
            safetyCarPlayers.length === 0
                ? null
                : {
                    players: safetyCarPlayers.map((bet) => bet.name),
                    atLeast: bets.some((bet) => bet.summary.safetyCar === "1-2") ? 1 : 3,
                },
    };
};
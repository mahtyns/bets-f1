const sessionCodes: Record<string, string> = {
    "Practice 1": "FP1",
    "Practice 2": "FP2",
    "Practice 3": "FP3",
    "Qualifying": "Q",
    "Sprint Qualifying": "SQ",
    "Sprint Shootout": "SQ",
    "Sprint": "S",
    "Race": "GP",
};

export const getSessionCode = (name: string) => sessionCodes[name] ?? name.slice(0, 3).toUpperCase();
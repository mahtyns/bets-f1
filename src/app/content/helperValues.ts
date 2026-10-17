export const avatars: Record<number, string> = {
    1: "/profiles/user-icon.png",
    2: "/profiles/leclerc-icon.png",
    3: "/profiles/max-icon.png",
    4: "/profiles/kimi-icon.png",
    5: "/profiles/norris-icon.png",
    6: "/profiles/gasly-icon.png",
    7: "/profiles/alonso-icon.png",
    8: "/profiles/russel-icon.png",
    9: "/profiles/bearman-icon.png",
    10: "/profiles/hulkenberg-icon.png",
    11: "/profiles/bottas-icon.png",
};

const avatarAlts: Record<number, string> = {
    1: "Default user avatar",
    2: "Charles Leclerc avatar",
    3: "Max Verstappen avatar",
    4: "Kimi Antonelli avatar",
    5: "Lando Norris avatar",
    6: "Pierre Gasly avatar",
    7: "Fernando Alonso avatar",
    8: "George Russell avatar",
    9: "Ollie Bearman avatar",
    10: "Nico Hulkenberg avatar",
    11: "Valteri Bottas avatar",
};

export const avatarOptions = Object.entries(avatars).map(([id, src]) => ({
    id: Number(id),
    src,
    alt: avatarAlts[Number(id)],
}));

export const avatarTeams: Record<number, string> = {
    1: "no-team",
    2: "ferrari",
    3: "redbull",
    4: "mercedes",
    5: "mclaren",
    6: "alpine",
    7: "aston-martin",
    8: "mercedes",
    9: "haas",
    10: "audi",
    11: "cadillac",
};

export const CHAMPIONSHIP_YEAR = 2026;
export const CHAMPIONSHIP_NAME = "FIA FORMULA 1 WORLD CHAMPIONSHIP"
export const TIMEZONE_MADRID = "Europe/Madrid"
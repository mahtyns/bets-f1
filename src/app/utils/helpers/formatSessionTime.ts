const TIME_ZONE = "Europe/Madrid";

const dayFormat = new Intl.DateTimeFormat("en-US", {
    weekday: "long",
    month: "short",
    day: "numeric",
    timeZone: TIME_ZONE,
});

const timeFormat = new Intl.DateTimeFormat("en-GB", {
    hour: "2-digit",
    minute: "2-digit",
    timeZone: TIME_ZONE,
});

const timeZonePart = (iso: string, timeZoneName: "short" | "shortOffset") =>
    new Intl.DateTimeFormat("en-GB", { timeZone: TIME_ZONE, timeZoneName })
        .formatToParts(new Date(iso))
        .find((part) => part.type === "timeZoneName")?.value ?? "";

export const formatSessionDay = (iso: string) => dayFormat.format(new Date(iso));

export const formatSessionTimes = (start: string, end: string) =>
    `${timeFormat.format(new Date(start))} - ${timeFormat.format(new Date(end))}`;

// "CEST (UTC+2)"
export const formatTimeZoneLabel = (iso: string) =>
    `${timeZonePart(iso, "short")} (${timeZonePart(iso, "shortOffset").replace("GMT", "UTC")})`;
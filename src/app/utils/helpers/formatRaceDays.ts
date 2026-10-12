// app/utils/formatRaceWeekend.ts
const formatDay = (date: Date) =>
    date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', timeZone: 'UTC' });

export const formatRaceDays = (start: string, end: string) => {
    const last = new Date(end);

    return `${formatDay(new Date(start))} - ${formatDay(last)}, ${last.getUTCFullYear()}`;
}
import { CHAMPIONSHIP_NAME, CHAMPIONSHIP_YEAR } from "./helperValues";

export const calendarContent = {
    pageH1: CHAMPIONSHIP_YEAR + ' ' + CHAMPIONSHIP_NAME + ' CALENDAR',
    description: "Past results, future grids. Everything on this year's calendar, from the next green light to the last chequered flag.",
    raceInfo: {
        cards: [
            { name: "Lap Record", key: "lapRecord", subText: "", highlight: true },
            { name: "First participation year", key: "firstYear", subText: "First Grand Prix", highlight: false },
            { name: "Number of corners", key: "corners", subText: "Turns per lap", highlight: false },
            { name: "Circuit length", key: "lengthKm", subText: "Lap distance", highlight: false },
        ]
    }
}
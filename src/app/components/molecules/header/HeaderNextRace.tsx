import { NextRace } from "@/app/data/nextRace";
import { getBetsOpensAt } from "@/app/data/betsStatus";
import Countdown from "../../atoms/Countdown";

interface NextRaceProps {
    text: string,
    opens: string,
    nextRace: NextRace | null
}

const HeaderNextRace = (props: NextRaceProps) => {
    const { nextRace } = props;

    if (!nextRace) return null;

    const betsOpenDate = new Date(getBetsOpensAt(nextRace)).toISOString();

    return (
        <div className="next-race">
            <p>{props.text}</p>
            <p className="next-race__name">{nextRace.circuit}</p>
            <p>{props.opens} <span><Countdown targetDate={betsOpenDate} /></span></p>
        </div>
    )
}

export default HeaderNextRace